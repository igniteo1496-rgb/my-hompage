"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export type Report = {
  id: string;
  title: string;
  description: string | null;
  file_url: string;
  published_at: string | null;
  tags: string[] | null;
  category: string | null;
};

type Props = {
  reports: Report[];
};

export default function ReportsClient({ reports }: Props) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string>("전체");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const tagParam = searchParams.get("tag");
    if (tagParam) {
      setActiveTag(tagParam);
    } else {
      setActiveTag("전체");
    }
  }, [searchParams]);

  const tags = useMemo(() => {
    const set = new Set<string>();
    reports.forEach((report) => {
      report.tags?.forEach((tag) => set.add(tag));
    });
    return ["전체", ...Array.from(set)];
  }, [reports]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return reports.filter((report) => {
      const matchesTag =
        activeTag === "전체" || report.tags?.includes(activeTag) || false;
      const matchesQuery =
        !normalized ||
        report.title.toLowerCase().includes(normalized) ||
        report.description?.toLowerCase().includes(normalized);
      return matchesTag && matchesQuery;
    });
  }, [activeTag, query, reports]);

  const grouped = useMemo(() => {
    return {
      종목: filtered.filter((report) => report.category === "종목"),
      시장: filtered.filter((report) => report.category === "시장"),
      산업: filtered.filter((report) => report.category === "산업"),
      기타: filtered.filter(
        (report) =>
          !report.category ||
          !["종목", "시장", "산업"].includes(report.category)
      ),
    };
  }, [filtered]);

  const onTagClick = (tag: string) => {
    setActiveTag(tag);
    const params = new URLSearchParams(searchParams.toString());
    if (tag === "전체") {
      params.delete("tag");
    } else {
      params.set("tag", tag);
    }
    const queryString = params.toString();
    router.replace(queryString ? `?${queryString}` : "#reports", {
      scroll: false,
    });
  };

  return (
    <div className="reports-client">
      <div className="report-controls">
        <div className="search-field">
          <input
            type="search"
            placeholder="보고서 제목/요약 검색"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <div className="tag-row">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={`tag ${activeTag === tag ? "active" : ""}`}
              onClick={() => onTagClick(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <h4>검색 결과가 없습니다.</h4>
          <p>다른 키워드나 태그를 선택해보세요.</p>
        </div>
      ) : (
        ([
          ["종목", grouped["종목"]],
          ["시장", grouped["시장"]],
          ["산업", grouped["산업"]],
          ["기타", grouped["기타"]],
        ] as const).map(([label, list]) =>
          list.length ? (
            <section className="report-group" key={label}>
              <h4>{label}</h4>
              <div className="report-list">
                {list.map((report) => (
                  <article className="report-card" key={report.id}>
                    <div>
                      <h3>{report.title}</h3>
                      <p>{report.description ?? "보고서 요약을 준비 중입니다."}</p>
                      <div className="report-meta">
                        {report.published_at ? (
                          <span>{report.published_at}</span>
                        ) : (
                          <span>날짜 미정</span>
                        )}
                        {report.tags?.length ? (
                          <span>{report.tags.join(" · ")}</span>
                        ) : null}
                      </div>
                    </div>
                    <div className="report-actions">
                      <a className="btn small ghost" href={`/reports/${report.id}`}>
                        상세 보기
                      </a>
                      <a className="btn small" href={report.file_url} download>
                        PDF 다운로드
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ) : null
        )
      )}
    </div>
  );
}
