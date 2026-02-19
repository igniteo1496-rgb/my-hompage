'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui'
import { NAV_ITEMS, openContactEmail } from '@/lib/utils'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const scrollToSection = (href: string) => {
    setIsMenuOpen(false)
    if (!href.startsWith('#')) return

    const id = href.slice(1)
    if (pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      router.push(`/#${id}`)
    }
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 px-5 md:px-10 py-5 flex justify-between items-center"
      style={{
        background: 'rgba(250, 251, 252, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
      }}
    >
      <Link
        href="/"
        className="text-xl font-bold tracking-tight gradient-text"
      >
        Damon
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-10">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.href}
            onClick={() => scrollToSection(item.href)}
            className="nav-link"
          >
            {item.label}
          </button>
        ))}
        <Button onClick={openContactEmail}>문의하기</Button>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden p-2 bg-transparent border-none cursor-pointer"
        aria-label="Toggle menu"
      >
        <div
          className="w-6 h-0.5 bg-gray-800 mb-1.5 transition-all"
          style={{
            transform: isMenuOpen
              ? 'rotate(45deg) translate(5px, 5px)'
              : 'none',
          }}
        />
        <div
          className="w-6 h-0.5 bg-gray-800 mb-1.5 transition-all"
          style={{ opacity: isMenuOpen ? 0 : 1 }}
        />
        <div
          className="w-6 h-0.5 bg-gray-800 transition-all"
          style={{
            transform: isMenuOpen
              ? 'rotate(-45deg) translate(5px, -5px)'
              : 'none',
          }}
        />
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 md:hidden"
          style={{
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-5 right-5 p-2"
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollToSection(item.href)}
              className="text-xl font-medium text-gray-700 hover:text-primary transition-colors"
            >
              {item.label}
            </button>
          ))}
          <Button onClick={openContactEmail}>문의하기</Button>
        </div>
      )}
    </nav>
  )
}
