"use client";

import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";

type Status = "idle" | "uploading" | "success" | "error";

export default function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [publishedAt, setPublishedAt] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("종목");
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setSession(newSession);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPublishedAt("");
    setTags("");
    setCategory("종목");
    setFile(null);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("uploading");
    setMessage("");

    if (!file) {
      setStatus("error");
      setMessage("PDF 파일을 선택해주세요.");
      return;
    }

    try {
      const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("reports")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
          contentType: "application/pdf",
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data: publicUrlData } = supabase.storage
        .from("reports")
        .getPublicUrl(filePath);

      const tagList = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

      const { error: insertError } = await supabase.from("reports").insert({
        user_id: session.user.id,
        title,
        description,
        file_url: publicUrlData.publicUrl,
        file_path: filePath,
        tags: tagList,
        category,
        published_at: publishedAt || null,
      });

      if (insertError) {
        throw insertError;
      }

      setStatus("success");
      setMessage("업로드 완료! 목록에 반영되었습니다.");
      resetForm();
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage("업로드 중 오류가 발생했습니다. 콘솔을 확인해주세요.");
    }
  };

  const signIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("uploading");
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email: authEmail,
      password: authPassword,
    });

    if (error) {
      setStatus("error");
      setMessage("로그인 실패: 이메일/비밀번호를 확인해주세요.");
      return;
    }

    setStatus("success");
    setMessage("로그인 성공!");
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  if (!session) {
    return (
      <main className="admin">
        <div className="container">
          <div className="section-title">
            <h1>관리자 로그인</h1>
            <p>보고서 업로드를 위해 먼저 로그인해주세요.</p>
          </div>
          <form className="admin-form" onSubmit={signIn}>
            <label>
              이메일
              <input
                type="email"
                value={authEmail}
                onChange={(event) => setAuthEmail(event.target.value)}
                placeholder="you@example.com"
                required
              />
            </label>
            <label>
              비밀번호
              <input
                type="password"
                value={authPassword}
                onChange={(event) => setAuthPassword(event.target.value)}
                required
              />
            </label>
            <button className="btn" type="submit">
              로그인
            </button>
            {message && (
              <p className={`status ${status === "error" ? "error" : "success"}`}>
                {message}
              </p>
            )}
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="admin">
      <div className="container">
        <div className="section-title">
          <h1>보고서 업로드</h1>
          <p>PDF를 올리면 홈페이지 보고서 목록에 자동 반영됩니다.</p>
        </div>

        <form className="admin-form" onSubmit={onSubmit}>
          <label>
            제목
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="예: Alphabet Q4 2025 Earnings Preview"
              required
            />
          </label>

          <label>
            요약
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="보고서 요약을 입력하세요"
            />
          </label>

          <label>
            게시 날짜
            <input
              type="date"
              value={publishedAt}
              onChange={(event) => setPublishedAt(event.target.value)}
            />
          </label>

          <label>
            태그 (쉼표로 구분)
            <input
              type="text"
              value={tags}
              onChange={(event) => setTags(event.target.value)}
              placeholder="crypto, regulation, ai"
            />
          </label>

          <label>
            카테고리
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="종목">종목</option>
              <option value="시장">시장</option>
              <option value="산업">산업</option>
            </select>
          </label>

          <label>
            PDF 파일
            <input
              type="file"
              accept="application/pdf"
              onChange={(event) => setFile(event.target.files?.[0] ?? null)}
              required
            />
          </label>

          <button className="btn" type="submit" disabled={status === "uploading"}>
            {status === "uploading" ? "업로드 중..." : "업로드"}
          </button>

          {message && (
            <p className={`status ${status === "error" ? "error" : "success"}`}>
              {message}
            </p>
          )}
        </form>

        <div className="admin-actions">
          <button className="btn ghost" type="button" onClick={signOut}>
            로그아웃
          </button>
        </div>
      </div>
    </main>
  );
}
