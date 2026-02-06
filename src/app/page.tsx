export default function Home() {
  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <div className="brand">Kwansub Shim</div>
          <nav className="nav">
            <a href="#about">소개</a>
            <a href="/research">리서치</a>
            <a href="/cv">이력</a>
            <a href="#contact">연락처</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container">
            <p className="eyebrow">Digital assets x Traditional finance</p>
            <h1>
              가상자산 산업에서<br />규제·시장·제품이 만나는 지점을 설계합니다
            </h1>
            <p className="subhead">
              거래소에서 기관/법인 비즈니스, 인프라 PM, 전략기획을 아우르며 복잡한
              문제를 구조화하고 실행 가능한 운영 체계로 전환해왔습니다. 사업화와
              제도화의 접점을 만드는 일을 합니다.
            </p>
            <div className="hero-actions">
              <a className="btn" href="/research">
                리서치 보기
              </a>
              <a className="btn ghost" href="#contact">
                연락하기
              </a>
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="container">
            <div className="section-title">
              <h2>소개</h2>
              <p>가상자산 산업에서 전략과 실행을 잇는 역할을 합니다.</p>
            </div>
            <div className="card-grid">
              <article className="card">
                <h3>한 줄 요약</h3>
                <p>규제·시장·제품이 만나는 지점을 설계하는 전략/PM 리드.</p>
              </article>
              <article className="card">
                <h3>전문 영역</h3>
                <p>가상자산 거래소에서 기관/법인 비즈니스, 인프라 PM, 전략기획을 리드.</p>
              </article>
              <article className="card">
                <h3>핵심 관점</h3>
                <p>가상자산을 단순 자산이 아니라 금융 인프라로 바라봅니다.</p>
              </article>
              <article className="card">
                <h3>콘텐츠</h3>
                <p>가상자산, AI, 금융 규제가 맞닿는 지점을 구조화해 정리합니다.</p>
              </article>
            </div>
          </div>
        </section>

        <section id="track-record" className="section">
          <div className="container">
            <div className="section-title">
              <h2>대표 트랙 레코드</h2>
              <p>가상자산 산업에서 사업화와 인프라를 함께 설계해온 경험.</p>
            </div>
            <div className="card-grid">
              <article className="card">
                <h3>디지털 금융 파트너십 전략</h3>
                <p>대형 금융사 연계 서비스의 기획과 실행을 총괄하며 전략적 제휴를 설계.</p>
              </article>
              <article className="card">
                <h3>디지털 금융 인프라 기획</h3>
                <p>거래소 인프라 고도화와 운영 체계 재설계를 통해 서비스 확장 기반 구축.</p>
              </article>
              <article className="card">
                <h3>기관·법인 비즈니스 전략</h3>
                <p>법인사업 로드맵과 파트너십 전략을 수립하고 실행 구조를 정립.</p>
              </article>
            </div>
          </div>
        </section>

        <section id="contact" className="section alt">
          <div className="container contact">
            <div>
              <h2>연락처</h2>
              <p>간단한 협업, 자문, 네트워킹 모두 환영합니다.</p>
            </div>
            <div className="contact-links">
              <a className="btn" href="mailto:igniteo1496@gmail.com">
                이메일 보내기
              </a>
              <a
                className="btn ghost"
                href="https://www.linkedin.com/feed/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">© 2026 Kwansub Shim</div>
      </footer>
    </>
  );
}
