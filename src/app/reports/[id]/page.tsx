import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";

type Report = {
  id: string;
  title: string;
  description: string | null;
  file_url: string;
  published_at: string | null;
  tags: string[] | null;
};

async function getReport(id: string) {
  const { data, error } = await supabaseServer
    .from("reports")
    .select("id,title,description,file_url,published_at,tags")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return data as Report;
}

export default async function ReportDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const report = await getReport(params.id);

  if (!report) {
    return (
      <main className="report-detail">
        <div className="container">
          <h1>보고서를 찾을 수 없습니다.</h1>
          <p>링크가 잘못되었거나 삭제된 보고서일 수 있습니다.</p>
          <Link className="btn ghost" href="/#reports">
            보고서 목록으로
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="report-detail">
      <div className="container">
        <div className="report-detail-header">
          <Link className="breadcrumb" href="/#reports">
            ← 보고서 목록
          </Link>
          <h1>{report.title}</h1>
          <p>{report.description ?? "보고서 요약을 준비 중입니다."}</p>
          <div className="report-meta">
            {report.published_at ? <span>{report.published_at}</span> : null}
            {report.tags?.length ? <span>{report.tags.join(" · ")}</span> : null}
          </div>
          <div className="report-actions">
            <a className="btn" href={report.file_url} download>
              PDF 다운로드
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
