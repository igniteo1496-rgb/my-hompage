const experience = [
  {
    role: "법인사업팀장 / Product Owner / 전략기획",
    company: "코인원",
    period: "2024.12 – 현재",
    highlights: [
      "기관/법인 비즈니스 전략 및 파트너십 설계.",
      "가상자산 서비스의 기획·출시 및 운영 체계 정립.",
    ],
  },
  {
    role: "Project Manager",
    company: "빗썸 (블록체인개발실)",
    period: "2022.06 – 2024.11",
    highlights: [
      "거래소 인프라 재설계 및 운영 체계 고도화.",
      "차세대 커스터디 전환 전략 수립.",
    ],
  },
  {
    role: "신사업 전략 매니저",
    company: "한화생명 (미래전략실)",
    period: "2020.07 – 2022.05",
    highlights: [
      "디지털 금융/헬스케어 신사업 전략 및 투자 검토.",
    ],
  },
  {
    role: "디지털 전략/기획",
    company: "한화투자증권 (디지털전략실)",
    period: "2017.12 – 2020.06",
    highlights: [
      "디지털 금융 전략 수립 및 핀테크 투자 검토.",
    ],
  },
  {
    role: "Research Analyst",
    company: "삼일 PwC (Analytics2)",
    period: "2017.03 – 2017.08",
    highlights: [
      "금융 데이터 분석 및 리스크 모델 검증.",
    ],
  },
];

export default function CVPage() {
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
              <h2>이력</h2>
              <p>가상자산 산업에서 전략과 실행을 연결해온 경력 요약.</p>
              <p className="cv-brandline">
                규제·시장·제품의 교차점에서 사업화 가능한 구조를 설계합니다.
              </p>
            </div>

            <div className="cv-themes">
              <span>규제·정책 대응</span>
              <span>거래소 인프라/커스터디</span>
              <span>기관·법인 비즈니스</span>
            </div>

            <div className="cv-block">
              <h3>경력</h3>
              <div className="cv-list">
                {experience.map((item) => (
                  <article className="cv-card" key={`${item.company}-${item.role}`}>
                    <div className="cv-header">
                      <div>
                        <h4>{item.role}</h4>
                        <p>{item.company}</p>
                      </div>
                      <span>{item.period}</span>
                    </div>
                    <ul>
                      {item.highlights.map((highlight) => (
                        <li key={highlight}>{highlight}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>

          </div>
        </section>
      </main>
    </>
  );
}
