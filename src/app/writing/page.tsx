import type { Metadata } from 'next'
import { AnimatedSection } from '@/components/ui'
import { WritingList } from '@/components/writing'
import { getAllPosts, getCategories } from '@/lib/notion'
import { samplePosts, sampleCategories } from '@/data/posts'

export const metadata: Metadata = {
  title: 'Writing',
  description: '블록체인과 금융에 대한 생각의 기록',
}

export const revalidate = 3600

export default async function WritingPage() {
  const [posts, categories] = await Promise.all([
    getAllPosts(),
    getCategories(),
  ])

  const displayPosts = posts.length > 0 ? posts : samplePosts
  const displayCategories = categories.length > 0 ? categories : sampleCategories

  return (
    <div className="min-h-screen pt-28 pb-20 px-5 md:px-10">
      <AnimatedSection className="max-w-5xl mx-auto">
        <p className="section-title">Writing</p>
        <h1
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
          style={{ letterSpacing: '-1px' }}
        >
          생각의 <span className="gradient-text">기록</span>
        </h1>
        <p className="text-gray-500 mb-12 max-w-xl">
          블록체인, 금융, 그리고 그 사이에서 발견한 인사이트를 기록합니다.
        </p>

        <WritingList posts={displayPosts} categories={displayCategories} />
      </AnimatedSection>
    </div>
  )
}
