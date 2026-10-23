'use client'

import { ArrowUp } from 'lucide-react'
import { circumference, useBackToTop } from 'src/components/backToTop/hooks/useBackToTop'

export const BackToTop = () => {
  const { button, onTop, onTopEnter, onTopLeave } = useBackToTop()

  return (
    <button
      ref={button}
      type='button'
      onClick={onTop}
      onPointerEnter={onTopEnter}
      onPointerLeave={onTopLeave}
      onFocus={onTopEnter}
      onBlur={onTopLeave}
      className='invisible fixed right-6 bottom-6 z-40 flex size-12 cursor-pointer items-center justify-center rounded-full bg-secondary/75 text-primary shadow-[0_10px_40px_-16px_rgb(0_0_0/0.35)] outline-none backdrop-blur-2xl backdrop-saturate-125 transition-[background-color] duration-500 hover:bg-secondary focus-visible:ring-3 focus-visible:ring-ring/50 md:right-8 md:bottom-8 md:size-13 dark:hover:bg-[rgb(62_50_43/0.95)]'
    >
      <span className='sr-only'>Back to top</span>
      <svg aria-hidden viewBox='0 0 48 48' className='absolute inset-0 size-full -rotate-90'>
        <circle cx='24' cy='24' r='23' fill='none' stroke='currentColor' strokeOpacity={0.15} strokeWidth={1.5} />
        <circle
          className='top-ring'
          cx='24'
          cy='24'
          r='23'
          fill='none'
          stroke='currentColor'
          strokeWidth={1.5}
          strokeLinecap='round'
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
        />
      </svg>
      <span aria-hidden className='relative flex size-full items-center justify-center overflow-hidden rounded-full'>
        <ArrowUp className='top-arrow size-4.5' strokeWidth={1.75} />
        <ArrowUp className='top-arrow-next absolute size-4.5' strokeWidth={1.75} style={{ transform: 'translateY(220%)' }} />
      </span>
    </button>
  )
}
