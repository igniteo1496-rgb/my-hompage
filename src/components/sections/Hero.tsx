'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui'
import { openContactEmail } from '@/lib/utils'

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-5 md:px-10 pt-28 pb-20 relative overflow-hidden"
    >
      {/* Background Decorations */}
      <div
        className="floating-shape"
        style={{
          width: '400px',
          height: '400px',
          background: 'linear-gradient(135deg, #2563eb, #0ea5e9)',
          top: '10%',
          right: '-100px',
        }}
      />
      <div
        className="floating-shape"
        style={{
          width: '300px',
          height: '300px',
          background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
          bottom: '10%',
          left: '-50px',
          animationDelay: '2s',
        }}
      />

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center relative z-10">
        {/* Left Content */}
        <div
          className={isVisible ? 'animate-fade-in-up' : ''}
          style={{ opacity: isVisible ? 1 : 0 }}
        >
          <p className="section-title mb-6">Blockchain Finance Expert</p>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            style={{ letterSpacing: '-2px' }}
          >
            전략으로 연결하는
            <br />
            <span className="gradient-text">블록체인과 금융</span>
          </h1>
          <p className="text-lg leading-relaxed text-gray-500 mb-10 max-w-md">
            전통 금융에서 블록체인으로 건너온 사람.
            <br />
            거래소에서 규제와 혁신 사이를 잇는 일을 합니다.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button onClick={openContactEmail}>협업 문의하기</Button>
            <Button variant="secondary" onClick={() => scrollToSection('about')}>
              더 알아보기
            </Button>
          </div>
        </div>

        {/* Right - Profile Image */}
        <div
          className={`flex justify-center ${isVisible ? 'animate-fade-in delay-3' : ''}`}
          style={{ opacity: isVisible ? 1 : 0 }}
        >
          <div
            className="w-72 h-96 md:w-80 md:h-[460px] relative overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, #e2e8f0 0%, #cbd5e1 100%)',
              borderRadius: '200px 200px 40px 40px',
              boxShadow: '0 40px 80px rgba(0, 0, 0, 0.1)',
            }}
          >
            {/* Placeholder for profile image */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-56 md:w-72 h-72 md:h-[360px] flex items-center justify-center"
              style={{
                background: 'linear-gradient(180deg, #94a3b8 0%, #64748b 100%)',
                borderRadius: '140px 140px 0 0',
              }}
            >
              <svg
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="1.5"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
              </svg>
            </div>

            {/* Decorative element */}
            <div
              className="absolute top-8 right-8 w-14 h-14 rounded-full opacity-80"
              style={{
                background: 'linear-gradient(135deg, #2563eb, #0ea5e9)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float"
      >
        <span className="text-xs text-gray-400 tracking-widest">SCROLL</span>
        <div
          className="w-px h-10"
          style={{
            background: 'linear-gradient(180deg, #94a3b8, transparent)',
          }}
        />
      </div>
    </section>
  )
}
