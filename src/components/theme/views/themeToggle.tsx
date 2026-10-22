'use client'

import { useId } from 'react'
import { cn } from 'cn'
import { useTheme } from 'src/components/theme/hooks/useTheme'

const rays = [0, 45, 90, 135, 180, 225, 270, 315]
const ease = 'ease-[cubic-bezier(0.65,0,0.35,1)]'

export const ThemeToggle = ({ className }: { className?: string }) => {
  const { theme, toggle } = useTheme()
  const maskId = `theme-mask-${useId().replace(/[^\w-]/g, '')}`

  return (
    <button
      type='button'
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      className={cn(
        'group flex size-11 cursor-pointer items-center justify-center rounded-full text-primary outline-none focus-visible:ring-2 focus-visible:ring-primary/50 transition-[scale] active:scale-90',
        className
      )}
    >
      <svg
        viewBox='0 0 24 24'
        aria-hidden
        className={`size-6 overflow-visible transition-transform duration-700 group-hover:rotate-45 dark:group-hover:-rotate-12 ${ease}`}
      >
        <mask id={maskId}>
          <rect width='24' height='24' fill='white' />
          <circle
            cx='17'
            cy='7'
            r='7'
            fill='black'
            className={`translate-x-2.5 -translate-y-2.5 transition-[translate] duration-500 dark:translate-x-0 dark:translate-y-0 dark:delay-150 ${ease}`}
          />
        </mask>
        <circle
          cx='12'
          cy='12'
          r='5'
          fill='currentColor'
          mask={`url(#${maskId})`}
          className={`origin-center transition-[scale] duration-500 [transform-box:fill-box] dark:scale-[1.8] ${ease}`}
        />
        <g
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          className={`origin-center transition-[scale,rotate,opacity] duration-500 [transform-box:fill-box] dark:scale-50 dark:rotate-90 dark:opacity-0 ${ease}`}
        >
          {rays.map(angle => (
            <line key={angle} x1='12' y1='3' x2='12' y2='1.5' transform={`rotate(${angle} 12 12)`} />
          ))}
        </g>
      </svg>
    </button>
  )
}
