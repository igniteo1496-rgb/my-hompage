import { cn } from '@/lib/utils'
import type { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  variant?: 'glass' | 'writing'
}

export function Card({
  children,
  variant = 'glass',
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        variant === 'glass' ? 'glass-card p-8' : 'writing-card',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
