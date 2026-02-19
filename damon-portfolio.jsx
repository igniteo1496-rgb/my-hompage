import React, { useState, useEffect } from 'react';

const DamonPortfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleContactClick = () => {
    window.location.href = 'mailto:damon@example.com?subject=협업 문의&body=안녕하세요, Damon님.%0D%0A%0D%0A문의 내용을 작성해주세요.';
    setEmailSent(true);
    setTimeout(() => setEmailSent(false), 3000);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #FAFBFC 0%, #F0F4F8 100%)',
      fontFamily: "'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif",
      color: '#1a202c',
      overflowX: 'hidden'
    }}>
      {/* CSS for animations and fonts */}
      <style>{`
        @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.6s ease-out forwards;
        }
        
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.3s; }
        .delay-4 { animation-delay: 0.4s; }
        .delay-5 { animation-delay: 0.5s; }
        
        .nav-link {
          position: relative;
          color: #4a5568;
          text-decoration: none;
          font-size: 15px;
          font-weight: 500;
          padding: 8px 0;
          transition: color 0.3s ease;
          cursor: pointer;
        }
        
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #2563eb, #0ea5e9);
          transition: width 0.3s ease;
        }
        
        .nav-link:hover {
          color: #2563eb;
        }
        
        .nav-link:hover::after {
          width: 100%;
        }
        
        .cta-button {
          background: linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%);
          color: white;
          border: none;
          padding: 14px 32px;
          font-size: 15px;
          font-weight: 600;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
        }
        
        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(37, 99, 235, 0.4);
        }
        
        .cta-button:active {
          transform: translateY(0);
        }
        
        .secondary-button {
          background: transparent;
          color: #2563eb;
          border: 2px solid #2563eb;
          padding: 12px 28px;
          font-size: 15px;
          font-weight: 600;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .secondary-button:hover {
          background: #2563eb;
          color: white;
        }
        
        .card {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.9);
          border-radius: 24px;
          padding: 32px;
          transition: all 0.4s ease;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
        }
        
        .card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(37, 99, 235, 0.1);
          border-color: rgba(37, 99, 235, 0.2);
        }
        
        .section-title {
          font-family: 'Instrument Serif', serif;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 3px;
          color: #2563eb;
          margin-bottom: 16px;
        }
        
        .writing-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.4s ease;
          border: 1px solid #e2e8f0;
        }
        
        .writing-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .floating-shape {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.4;
          animation: pulse 4s ease-in-out infinite;
        }
        
        @media (max-width: 768px) {
          .mobile-menu {
            position: fixed;
            top: 0;
            right: 0;
            width: 100%;
            height: 100vh;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 32px;
            z-index: 999;
          }
        }
      `}</style>

      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'rgba(250, 251, 252, 0.8)',
        backdropFilter: 'blur(20px)',
        zIndex: 1000,
        borderBottom: '1px solid rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{
          fontSize: '20px',
          fontWeight: '700',
          letterSpacing: '-0.5px'
        }}>
          <span className="gradient-text">Damon</span>
        </div>
        
        {/* Desktop Navigation */}
        <div style={{
          display: 'flex',
          gap: '40px',
          alignItems: 'center'
        }} className="desktop-nav">
          <span className="nav-link" onClick={() => scrollToSection('home')}>Home</span>
          <span className="nav-link" onClick={() => scrollToSection('about')}>About</span>
          <span className="nav-link" onClick={() => scrollToSection('experience')}>Experience</span>
          <span className="nav-link" onClick={() => scrollToSection('writing')}>Writing</span>
          <button className="cta-button" onClick={handleContactClick}>
            문의하기
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px'
          }}
        >
          <div style={{
            width: '24px',
            height: '2px',
            background: '#1a202c',
            marginBottom: '6px',
            transition: 'all 0.3s ease',
            transform: isMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
          }}></div>
          <div style={{
            width: '24px',
            height: '2px',
            background: '#1a202c',
            marginBottom: '6px',
            opacity: isMenuOpen ? 0 : 1,
            transition: 'all 0.3s ease'
          }}></div>
          <div style={{
            width: '24px',
            height: '2px',
            background: '#1a202c',
            transition: 'all 0.3s ease',
            transform: isMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none'
          }}></div>
        </button>
      </nav>

      {/* Hero Section */}
      <section id="home" style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 40px 80px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Decorations */}
        <div className="floating-shape" style={{
          width: '400px',
          height: '400px',
          background: 'linear-gradient(135deg, #2563eb, #0ea5e9)',
          top: '10%',
          right: '-100px'
        }}></div>
        <div className="floating-shape" style={{
          width: '300px',
          height: '300px',
          background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
          bottom: '10%',
          left: '-50px',
          animationDelay: '2s'
        }}></div>

        <div style={{
          maxWidth: '1200px',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          {/* Left Content */}
          <div className={isVisible ? 'animate-fadeInUp' : ''} style={{ opacity: 0 }}>
            <p className="section-title" style={{ marginBottom: '24px' }}>
              Blockchain Finance Expert
            </p>
            <h1 style={{
              fontSize: 'clamp(40px, 6vw, 64px)',
              fontWeight: '700',
              lineHeight: '1.1',
              marginBottom: '24px',
              letterSpacing: '-2px'
            }}>
              전략으로 연결하는<br />
              <span className="gradient-text">블록체인과 금융</span>
            </h1>
            <p style={{
              fontSize: '18px',
              lineHeight: '1.8',
              color: '#64748b',
              marginBottom: '40px',
              maxWidth: '480px'
            }}>
              전통 금융에서 블록체인으로 건너온 사람.<br />
              거래소에서 규제와 혁신 사이를 잇는 일을 합니다.
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button className="cta-button" onClick={handleContactClick}>
                협업 문의하기
              </button>
              <button className="secondary-button" onClick={() => scrollToSection('about')}>
                더 알아보기
              </button>
            </div>
          </div>

          {/* Right - Profile Image */}
          <div 
            className={isVisible ? 'animate-fadeIn delay-3' : ''} 
            style={{ 
              opacity: 0,
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <div style={{
              width: '380px',
              height: '460px',
              background: 'linear-gradient(145deg, #e2e8f0 0%, #cbd5e1 100%)',
              borderRadius: '200px 200px 40px 40px',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 40px 80px rgba(0, 0, 0, 0.1)'
            }}>
              {/* Placeholder for profile image */}
              <div style={{
                position: 'absolute',
                bottom: '0',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '280px',
                height: '360px',
                background: 'linear-gradient(180deg, #94a3b8 0%, #64748b 100%)',
                borderRadius: '140px 140px 0 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                  <circle cx="12" cy="8" r="4"/>
                  <path d="M4 20c0-4 4-6 8-6s8 2 8 6"/>
                </svg>
              </div>
              
              {/* Decorative elements */}
              <div style={{
                position: 'absolute',
                top: '30px',
                right: '30px',
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, #2563eb, #0ea5e9)',
                borderRadius: '50%',
                opacity: '0.8'
              }}></div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          animation: 'float 2s ease-in-out infinite'
        }}>
          <span style={{ fontSize: '12px', color: '#94a3b8', letterSpacing: '2px' }}>SCROLL</span>
          <div style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(180deg, #94a3b8, transparent)'
          }}></div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={{
        padding: '120px 40px',
        background: 'white'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <p className="section-title">About</p>
          <h2 style={{
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: '700',
            marginBottom: '48px',
            letterSpacing: '-1px'
          }}>
            왜 <span className="gradient-text">블록체인</span>인가
          </h2>

          <div style={{
            fontSize: '18px',
            lineHeight: '2',
            color: '#374151'
          }}>
            <p style={{ marginBottom: '28px' }}>
              저는 전통 금융에서 커리어를 시작했습니다. 
              증권사에서 숫자를 다루고, 보험사에서 리스크를 계산하면서 
              금융이라는 시스템이 어떻게 돌아가는지 배웠죠.
            </p>
            
            <p style={{ marginBottom: '28px' }}>
              그러다 Web3를 만났습니다. 
              <span style={{ 
                background: 'linear-gradient(180deg, transparent 60%, rgba(37, 99, 235, 0.15) 60%)',
                padding: '0 4px'
              }}>
                누구나 참여할 수 있고, 코드가 곧 규칙이 되는 세계.
              </span>{' '}
              그 자유로움과 서사에 끌려 이 업계로 넘어왔습니다.
            </p>

            <p style={{ marginBottom: '28px' }}>
              지금은 거래소에서 전략을 담당하고 있습니다. 
              거래소는 독특한 위치에 있어요. 
              전통 금융과 Web3가 만나는 접점이자, 규제와 혁신 사이의 중립 지대. 
              여기서 양쪽을 모두 바라보면서 변화에 대응하는 게 제 일입니다.
            </p>

            <p style={{ 
              fontSize: '20px',
              fontWeight: '500',
              color: '#1a202c',
              padding: '32px 0',
              borderTop: '1px solid #e2e8f0',
              borderBottom: '1px solid #e2e8f0',
              marginTop: '40px'
            }}>
              "블록체인이 하나의 금융 인프라로 자리잡는 과정,<br />
              <span className="gradient-text">그 변화의 한가운데서 기여하고 싶습니다.</span>"
            </p>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" style={{
        padding: '80px 40px',
        background: 'linear-gradient(180deg, #F0F4F8 0%, #FAFBFC 100%)'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <p className="section-title">Experience</p>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            flexWrap: 'wrap',
            marginTop: '32px'
          }}>
            <span style={{ 
              fontSize: '17px', 
              color: '#64748b',
              fontWeight: '500'
            }}>Hanwha Life</span>
            <span style={{ color: '#cbd5e1' }}>→</span>
            <span style={{ 
              fontSize: '17px', 
              color: '#64748b',
              fontWeight: '500'
            }}>Hanwha Investment & Securities</span>
            <span style={{ color: '#cbd5e1' }}>→</span>
            <span style={{ 
              fontSize: '17px', 
              color: '#64748b',
              fontWeight: '500'
            }}>Bithumb</span>
            <span style={{ color: '#cbd5e1' }}>→</span>
            <span style={{ 
              fontSize: '17px', 
              color: '#1a202c',
              fontWeight: '600',
              background: 'linear-gradient(180deg, transparent 60%, rgba(37, 99, 235, 0.15) 60%)',
              padding: '0 8px'
            }}>Coinone</span>
          </div>
          <p style={{
            marginTop: '24px',
            color: '#94a3b8',
            fontSize: '15px'
          }}>
            전통 금융에서 시작해, 블록체인으로.
          </p>
        </div>
      </section>

      {/* Writing Section */}
      <section id="writing" style={{
        padding: '120px 40px',
        background: 'white'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <p className="section-title">Writing</p>
          <h2 style={{
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: '700',
            marginBottom: '60px',
            letterSpacing: '-1px'
          }}>
            생각의 <span className="gradient-text">기록</span>
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {/* Sample Writing Cards - Placeholder */}
            {[
              {
                category: '시장 분석',
                title: '2025년 가상자산 시장 전망',
                excerpt: '규제 환경 변화와 기관 투자자 진입이 만들어갈 새로운 시장 구조를 분석합니다.',
                date: '2025.01'
              },
              {
                category: '규제 동향',
                title: '법인의 가상자산 시장 참여, 무엇이 달라지나',
                excerpt: '새로운 규제 프레임워크가 기업들에게 의미하는 바와 준비해야 할 것들.',
                date: '2024.12'
              },
              {
                category: '인사이트',
                title: '거래소 수수료 전쟁의 승자는',
                excerpt: '글로벌 거래소들의 수수료 전략을 비교 분석하고 지속 가능한 모델을 탐구합니다.',
                date: '2024.11'
              }
            ].map((post, idx) => (
              <div key={idx} className="writing-card" style={{ cursor: 'pointer' }}>
                <div style={{ padding: '28px' }}>
                  <span style={{
                    display: 'inline-block',
                    background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(14, 165, 233, 0.1))',
                    color: '#2563eb',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600',
                    marginBottom: '16px'
                  }}>
                    {post.category}
                  </span>
                  <h3 style={{ 
                    fontSize: '20px', 
                    fontWeight: '600', 
                    marginBottom: '12px',
                    lineHeight: '1.4'
                  }}>
                    {post.title}
                  </h3>
                  <p style={{ 
                    color: '#64748b', 
                    lineHeight: '1.7',
                    marginBottom: '16px',
                    fontSize: '15px'
                  }}>
                    {post.excerpt}
                  </p>
                  <span style={{ color: '#94a3b8', fontSize: '13px' }}>{post.date}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ 
            textAlign: 'center', 
            marginTop: '48px' 
          }}>
            <button className="secondary-button">
              모든 글 보기 →
            </button>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section style={{
        padding: '120px 40px',
        background: 'linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background decoration */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-20%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.3) 0%, transparent 70%)',
          borderRadius: '50%'
        }}></div>

        <div style={{ 
          maxWidth: '800px', 
          margin: '0 auto', 
          textAlign: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: '700',
            color: 'white',
            marginBottom: '24px',
            letterSpacing: '-1px'
          }}>
            함께 일하고 싶으신가요?
          </h2>
          <p style={{
            fontSize: '18px',
            color: 'rgba(255, 255, 255, 0.7)',
            marginBottom: '40px',
            lineHeight: '1.7'
          }}>
            강의, 컨설팅, 또는 협업 프로젝트에 관심이 있으시다면<br />
            편하게 연락주세요.
          </p>
          <button 
            className="cta-button" 
            onClick={handleContactClick}
            style={{
              fontSize: '17px',
              padding: '18px 40px'
            }}
          >
            이메일로 문의하기
          </button>
          
          {emailSent && (
            <p style={{
              marginTop: '20px',
              color: '#0ea5e9',
              fontSize: '14px'
            }}>
              ✓ 이메일 앱이 열렸습니다
            </p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '40px',
        background: '#0f172a',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <span style={{ 
              color: 'white', 
              fontWeight: '700',
              fontSize: '18px'
            }}>Damon</span>
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.5)', 
              fontSize: '13px',
              marginTop: '8px'
            }}>
              © 2025 All rights reserved.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                color: 'rgba(255, 255, 255, 0.6)',
                textDecoration: 'none',
                fontSize: '14px',
                transition: 'color 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.color = 'white'}
              onMouseOut={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.6)'}
            >
              LinkedIn
            </a>
            <a 
              href="mailto:damon@example.com"
              style={{
                color: 'rgba(255, 255, 255, 0.6)',
                textDecoration: 'none',
                fontSize: '14px',
                transition: 'color 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.color = 'white'}
              onMouseOut={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.6)'}
            >
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DamonPortfolio;
