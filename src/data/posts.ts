import type { NotionPost } from '@/types'

export const samplePosts: NotionPost[] = [
  {
    id: '1',
    title: '2025년 가상자산 시장 전망',
    slug: 'crypto-market-outlook-2025',
    category: '시장 분석',
    date: '2025-01-15',
    published: true,
    excerpt:
      '규제 환경 변화와 기관 투자자 진입이 만들어갈 새로운 시장 구조를 분석합니다.',
  },
  {
    id: '2',
    title: '법인의 가상자산 시장 참여, 무엇이 달라지나',
    slug: 'corporate-crypto-participation',
    category: '규제 동향',
    date: '2024-12-10',
    published: true,
    excerpt:
      '새로운 규제 프레임워크가 기업들에게 의미하는 바와 준비해야 할 것들.',
  },
  {
    id: '3',
    title: '거래소 수수료 전쟁의 승자는',
    slug: 'exchange-fee-war',
    category: '인사이트',
    date: '2024-11-20',
    published: true,
    excerpt:
      '글로벌 거래소들의 수수료 전략을 비교 분석하고 지속 가능한 모델을 탐구합니다.',
  },
]

export const sampleCategories = ['시장 분석', '규제 동향', '인사이트']
