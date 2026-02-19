import { SITE_CONFIG } from '@/lib/utils'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="px-10 py-10"
      style={{
        background: '#0f172a',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <div className="max-w-4xl mx-auto flex flex-wrap justify-between items-center gap-5">
        <div>
          <span className="text-white font-bold text-lg">
            {SITE_CONFIG.name}
          </span>
          <p className="text-white/50 text-sm mt-2">
            &copy; {currentYear} All rights reserved.
          </p>
        </div>
        <div className="flex gap-6">
          <a
            href={SITE_CONFIG.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 text-sm hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          {SITE_CONFIG.email && (
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="text-white/60 text-sm hover:text-white transition-colors"
            >
              Email
            </a>
          )}
        </div>
      </div>
    </footer>
  )
}
