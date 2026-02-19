import Link from 'next/link'
import { AnimatedSection, Button } from '@/components/ui'
import { WritingCard } from '@/components/writing'
import { samplePosts } from '@/data/posts'
import type { NotionPost } from '@/types'

interface WritingPreviewProps {
  posts: NotionPost[]
}

export function WritingPreview({ posts }: WritingPreviewProps) {
  const displayPosts = posts.length > 0 ? posts.slice(0, 3) : samplePosts

  return (
    <section id="writing" className="py-20 md:py-28 px-5 md:px-10 bg-white">
      <AnimatedSection className="max-w-5xl mx-auto">
        <p className="section-title">Writing</p>
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-14"
          style={{ letterSpacing: '-1px' }}
        >
          생각의 <span className="gradient-text">기록</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayPosts.map((post) => (
            <WritingCard key={post.id} post={post} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/writing">
            <Button variant="secondary">모든 글 보기 &rarr;</Button>
          </Link>
        </div>
      </AnimatedSection>
    </section>
  )
}
