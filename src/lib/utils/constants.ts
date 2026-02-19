export const SITE_CONFIG = {
  name: 'Damon',
  title: 'Damon - Blockchain Finance Expert',
  description: '전통 금융에서 블록체인으로 건너온 사람. 거래소에서 규제와 혁신 사이를 잇는 일을 합니다.',
  email: process.env.NEXT_PUBLIC_EMAIL || '',
  linkedin: 'https://www.linkedin.com/in/kwansub-shim-077b301b1/',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://localhost:3000',
} as const

export const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Writing', href: '#writing' },
] as const
