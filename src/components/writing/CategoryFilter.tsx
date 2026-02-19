'use client'

import { cn } from '@/lib/utils'

interface CategoryFilterProps {
  categories: string[]
  selectedCategory: string | null
  onSelectCategory: (category: string | null) => void
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelectCategory(null)}
        className={cn(
          'px-4 py-2 text-sm font-medium rounded-full transition-all',
          selectedCategory === null
            ? 'gradient-bg text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        )}
      >
        전체
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={cn(
            'px-4 py-2 text-sm font-medium rounded-full transition-all',
            selectedCategory === category
              ? 'gradient-bg text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          )}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
