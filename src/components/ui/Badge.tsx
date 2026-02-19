import { cn } from '@/lib/utils'
import type { HTMLAttributes, ReactNode } from 'react'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
}

export function Badge({ children, className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-block px-3 py-1.5 text-xs font-semibold rounded-full',
        'bg-gradient-to-r from-primary/10 to-primary-light/10 text-primary',
        className
      )}
      style={{
        background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(14, 165, 233, 0.1))',
        color: '#2563eb',
      }}
      {...props}
    >
      {children}
    </span>
  )
}
