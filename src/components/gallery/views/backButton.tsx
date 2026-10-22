'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useBackButton } from 'src/components/gallery/hooks/useBackButton'

const label = 'Back'

export const BackButton = ({ className }: { className?: string }) => {
  const { button, onBack, onBackEnter, onBackMove, onBackLeave } = useBackButton()

  return (
    <Link
      ref={button}
      href='/'
      onClick={onBack}
      onPointerEnter={onBackEnter}
      onPointerMove={onBackMove}
      onPointerLeave={onBackLeave}
      onFocus={onBackEnter}
      onBlur={onBackLeave}
      aria-label={label}
      className={`group/back inline-flex items-center gap-4 text-primary outline-none ${className ?? ''}`}
    >
      <span aria-hidden className='back-circle relative flex size-12 shrink-0 items-center justify-center rounded-full border border-primary/30 transition-colors duration-500 group-hover/back:border-primary group-focus-visible/back:ring-3 group-focus-visible/back:ring-ring/50 md:size-14'>
        <span className='back-fill absolute inset-0 rounded-full bg-primary' style={{ transform: 'scale(0)' }} />
        <span className='relative flex size-full items-center justify-center overflow-hidden rounded-full transition-colors duration-500 group-hover/back:text-primary-foreground group-focus-visible/back:text-primary-foreground'>
          <ArrowLeft className='back-arrow size-5' strokeWidth={1.75} />
          <ArrowLeft className='back-arrow-next absolute size-5' strokeWidth={1.75} style={{ transform: 'translateX(220%)' }} />
        </span>
      </span>

      <span aria-hidden className='relative block overflow-hidden text-xs font-medium uppercase tracking-[0.3em] md:text-[13px]'>
        <span className='block'>
          {label.split('').map((char, i) => (
            <span key={i} className='back-char back-in inline-block'>{char}</span>
          ))}
        </span>
        <span className='absolute inset-0 block translate-y-full'>
          {label.split('').map((char, i) => (
            <span key={i} className='back-char inline-block'>{char}</span>
          ))}
        </span>
      </span>
    </Link>
  )
}
