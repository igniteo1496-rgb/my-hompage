'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import type { HTMLAttributes, ReactNode } from 'react'

interface AnimatedSectionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  animation?: 'fadeInUp' | 'fadeIn'
  delay?: number
}

export function AnimatedSection({
  children,
  animation = 'fadeInUp',
  delay = 0,
  className,
  ...props
}: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const animationClass =
    animation === 'fadeInUp' ? 'animate-fade-in-up' : 'animate-fade-in'

  return (
    <div
      ref={ref}
      className={cn(isVisible ? animationClass : 'opacity-0', className)}
      style={{ animationDelay: `${delay}s` }}
      {...props}
    >
      {children}
    </div>
  )
}
