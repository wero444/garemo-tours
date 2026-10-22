import type { ReactNode } from 'react'
import { cn } from 'cn'

export const ArchFrame = ({ className, children }: { className?: string, children?: ReactNode }) => (
  <div data-slot='arch' className={cn('relative overflow-hidden rounded-t-full rounded-b-md', className)}>
    {children}
  </div>
)
