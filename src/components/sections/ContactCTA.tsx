'use client'

import { useState } from 'react'
import { Button } from '@/components/ui'
import { openContactEmail } from '@/lib/utils'

export function ContactCTA() {
  const [emailSent, setEmailSent] = useState(false)

  const handleContactClick = () => {
    openContactEmail()
    setEmailSent(true)
    setTimeout(() => setEmailSent(false), 3000)
  }

  return (
    <section
      className="py-20 md:py-28 px-5 md:px-10 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%)',
      }}
    >
      {/* Background decoration */}
      <div
        className="absolute -top-1/2 -right-1/5 w-[600px] h-[600px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(37, 99, 235, 0.3) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
          style={{ letterSpacing: '-1px' }}
        >
          함께 일하고 싶으신가요?
        </h2>
        <p className="text-lg text-white/70 mb-10 leading-relaxed">
          강의, 컨설팅, 또는 협업 프로젝트에 관심이 있으시다면
          <br />
          편하게 연락주세요.
        </p>
        <Button
          onClick={handleContactClick}
          className="text-base px-10 py-4"
        >
          이메일로 문의하기
        </Button>

        {emailSent && (
          <p className="mt-5 text-sky-400 text-sm">
            &#10003; 이메일 앱이 열렸습니다
          </p>
        )}
      </div>
    </section>
  )
}
