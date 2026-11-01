'use client'

import { useLetters } from 'src/components/letters/hooks/useLetters'
import { content } from 'src/components/letters/helpers'
import { LetterCard } from 'src/components/letters/views/letterCard'
import { Megreli } from 'src/components/letters/views/megreli'
import { Words } from 'src/components/ui/words'
import { useLocale } from 'src/lib/useLocale'

// Georgian words run longer, so the heading steps down a size on phones to keep each word on one line
const headingSize = { en: 'text-5xl md:text-6xl lg:text-7xl', ge: 'text-4xl md:text-6xl lg:text-7xl' }

export const Letters = () => {
  const { container } = useLetters()
  const locale = useLocale()
  const { heading, letter } = content[locale]

  return (
    <section
      ref={container}
      id='letters'
      aria-labelledby='letters-title'
      className='overflow-hidden bg-secondary px-5 pt-16 pb-24 md:px-8 md:pt-24 md:pb-32 lg:px-12'
    >
      <div className='mx-auto max-w-6xl'>
        <header className='flex flex-col items-center gap-8 md:flex-row md:justify-center md:gap-14'>
          <div className='letters-drift'>
            <Megreli className='letters-figure invisible h-auto w-[min(78vw,20rem)] overflow-visible text-primary md:w-sm lg:w-md' />
          </div>
          <h2 id='letters-title' className={`letters-heading text-center font-light leading-[1.05] tracking-tight text-primary md:text-left ${headingSize[locale]}`}>
            <span className='sr-only'>{[heading.top, heading.bottom, heading.accent].filter(Boolean).join(' ')}</span>
            <span className='block'>
              <Words text={heading.top} className='letters-char' chars />
            </span>
            <span className='block'>
              {heading.bottom && <><Words text={heading.bottom} className='letters-char' chars />{' '}</>}
              <span className='relative inline-block'>
                <Words text={heading.accent} className='letters-char' chars />
                <svg aria-hidden viewBox='0 0 200 16' className='letters-underline absolute inset-x-0 -bottom-2 h-auto w-full overflow-visible md:-bottom-3'>
                  <path d='M3 10C28 4 48 13 78 8C108 3 128 5 154 9C172 12 186 8 197 4' fill='none' stroke='currentColor' strokeWidth='3' strokeLinecap='round' />
                </svg>
              </span>
            </span>
          </h2>
        </header>

        <ul className='mx-auto mt-14 max-w-xl md:mt-20'>
          <LetterCard letter={letter} />
        </ul>
      </div>
    </section>
  )
}
