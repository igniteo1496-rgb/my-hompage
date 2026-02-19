import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { AnimatedSection, Badge, Button } from '@/components/ui'
import { NotionRenderer, getPostBySlug, getAllPosts } from '@/lib/notion'
import { formatFullDate } from '@/lib/utils'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: post.title,
    description: post.excerpt || `${post.title} - ${post.category}`,
  }
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export const revalidate = 3600

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-5 md:px-10">
      <AnimatedSection className="max-w-3xl mx-auto">
        <Link href="/writing">
          <Button variant="secondary" className="mb-8 text-sm px-4 py-2">
            &larr; 목록으로
          </Button>
        </Link>

        <article>
          <header className="mb-12">
            <Badge className="mb-4">{post.category}</Badge>
            <h1
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ letterSpacing: '-1px' }}
            >
              {post.title}
            </h1>
            <time className="text-gray-400 text-sm">
              {formatFullDate(post.date)}
            </time>
          </header>

          <NotionRenderer blocks={post.blocks} />
        </article>

        <div className="mt-16 pt-8 border-t border-gray-200">
          <Link href="/writing">
            <Button variant="secondary">다른 글 보기 &rarr;</Button>
          </Link>
        </div>
      </AnimatedSection>
    </div>
  )
}
