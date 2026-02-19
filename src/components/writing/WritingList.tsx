'use client'

import { useState, useMemo } from 'react'
import { WritingCard } from './WritingCard'
import { CategoryFilter } from './CategoryFilter'
import type { NotionPost } from '@/types'

interface WritingListProps {
  posts: NotionPost[]
  categories: string[]
}

export function WritingList({ posts, categories }: WritingListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredPosts = useMemo(() => {
    if (!selectedCategory) return posts
    return posts.filter((post) => post.category === selectedCategory)
  }, [posts, selectedCategory])

  return (
    <div>
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {filteredPosts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500">아직 작성된 글이 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {filteredPosts.map((post) => (
            <WritingCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
