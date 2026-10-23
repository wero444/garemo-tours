'use client'

import { useLetters } from 'src/components/letters/hooks/useLetters'
import { heading, letters } from 'src/components/letters/helpers'
import { LetterCard } from 'src/components/letters/views/letterCard'
import { Megreli } from 'src/components/letters/views/megreli'
import { Words } from 'src/components/ui/words'

export const Letters = () => {
  const { container } = useLetters()

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
          <h2 id='letters-title' className='letters-heading text-center text-5xl font-light leading-[1.05] tracking-tight text-primary md:text-left md:text-6xl lg:text-7xl'>
            <span className='sr-only'>{`${heading.top} ${heading.bottom} ${heading.accent}`}</span>
            <span className='block'>
              <Words text={heading.top} className='letters-char' chars />
            </span>
            <span className='block'>
              <Words text={heading.bottom} className='letters-char' chars />
              {' '}
              <span className='relative inline-block'>
                <Words text={heading.accent} className='letters-char' chars />
                <svg aria-hidden viewBox='0 0 200 16' className='letters-underline absolute inset-x-0 -bottom-2 h-auto w-full overflow-visible md:-bottom-3'>
                  <path d='M3 10C28 4 48 13 78 8C108 3 128 5 154 9C172 12 186 8 197 4' fill='none' stroke='currentColor' strokeWidth='3' strokeLinecap='round' />
                </svg>
              </span>
            </span>
          </h2>
        </header>

        <ul className='mt-14 grid gap-8 md:mt-20 md:grid-cols-3 md:gap-6 lg:gap-8'>
          {letters.map((letter, i) => <LetterCard key={i} letter={letter} />)}
        </ul>
      </div>
    </section>
  )
}
