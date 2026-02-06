import ReportsClient, { type Report } from "@/components/ReportsClient";
import { supabaseServer } from "@/lib/supabaseServer";

const fallbackReports: Report[] = [
  {
    id: "fallback-1",
    title: "Alphabet Q4 2025 Earnings IgniteO",
    description: "실적 분석과 요약 포인트를 정리한 리포트.",
    file_url: "/reports/Alphabet_Q4_2025_Earnings_IgniteO.pdf",
    published_at: "2025-02-01",
    tags: ["earnings", "alphabet", "equities"],
    category: "종목",
  },
  {
    id: "fallback-2",
    title: "Alphabet Q4 2025 Earnings Preview",
    description: "실적 발표 전, 기대 포인트와 리스크를 정리.",
    file_url: "/reports/Alphabet_Q4_2025_Earnings_Preview.pdf",
    published_at: "2025-01-25",
    tags: ["preview", "alphabet"],
    category: "종목",
  },
  {
    id: "fallback-3",
    title: "Amazon Q4 2025 Earnings Shim",
    description: "핵심 지표와 전략적 시사점을 요약.",
    file_url: "/reports/Amazon_Q4_2025_Earnings_Shim.pdf",
    published_at: "2025-01-18",
    tags: ["earnings", "amazon"],
    category: "종목",
  },
];

async function getReports() {
  const { data, error } = await supabaseServer
    .from("reports")
    .select("id,title,description,file_url,published_at,tags,category")
    .order("published_at", { ascending: false });

  if (error || !data?.length) {
    return fallbackReports;
  }

  return data as Report[];
}

export default async function ResearchPage() {
  const reportItems = await getReports();
  const latestReports = reportItems.slice(0, 3);

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <div className="brand">Kwansub Shim</div>
          <nav className="nav">
            <a href="/">홈</a>
            <a href="/research">리서치</a>
            <a href="/cv">이력</a>
            <a href="/#contact">연락처</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="section">
          <div className="container">
            <div className="section-title">
              <h2>리서치</h2>
              <p>규제, 시장, 제품 전략을 연결하는 관점의 리포트를 정리합니다.</p>
            </div>

            <div className="latest-block">
              <h3>최신 리서치</h3>
              <div className="report-list compact">
                {latestReports.map((report) => (
                  <article className="report-card" key={report.id}>
                    <div>
                      <h4>{report.title}</h4>
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
            </div>

            <div className="all-block">
              <h3>전체 리서치</h3>
              <ReportsClient reports={reportItems} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
