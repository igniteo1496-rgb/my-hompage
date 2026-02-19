import Link from 'next/link'
import { Card, Badge } from '@/components/ui'
import { formatDate } from '@/lib/utils'
import type { NotionPost } from '@/types'

interface WritingCardProps {
  post: NotionPost
}

export function WritingCard({ post }: WritingCardProps) {
  return (
    <Link href={`/writing/${post.slug}`}>
      <Card variant="writing" className="cursor-pointer h-full">
        <div className="p-7">
          <Badge className="mb-4">{post.category}</Badge>
          <h3 className="text-xl font-semibold mb-3 leading-snug">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
              {post.excerpt}
            </p>
          )}
          <span className="text-gray-400 text-xs">{formatDate(post.date)}</span>
        </div>
      </Card>
    </Link>
  )
}
