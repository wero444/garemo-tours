'use client'

import { useLetters } from 'src/components/letters/hooks/useLetters'
import { content } from 'src/components/letters/helpers'
import { LetterCard } from 'src/components/letters/views/letterCard'
import { LettersTitle } from 'src/components/letters/views/lettersTitle'
import { Megreli } from 'src/components/letters/views/megreli'
import { useLocale } from 'src/lib/useLocale'

export const Letters = () => {
  const { container } = useLetters()
  const { heading, photo, sample, letters } = content[useLocale()]

  return (
    <section
      ref={container}
      id='letters'
      aria-labelledby='letters-title'
      className='flex min-h-svh -scroll-mt-20 flex-col justify-center overflow-hidden bg-secondary px-5 pt-24 pb-16 md:px-8 md:pt-24 md:pb-16 lg:px-12'
    >
      <div className='mx-auto w-full max-w-6xl'>
        <header className='flex flex-col items-center gap-8 md:flex-row md:justify-center md:gap-14'>
          <div className='letters-drift'>
            <Megreli className='letters-figure invisible h-auto w-[min(70vw,16rem)] overflow-visible text-primary md:w-72 lg:w-80' />
          </div>
          <h2 id='letters-title' className='letters-heading w-[min(78vw,18rem)] text-primary md:w-80 lg:w-96'>
            <span className='sr-only'>{heading}</span>
            <LettersTitle className='letters-title invisible h-auto w-full overflow-visible' />
          </h2>
        </header>

        <ul className='mx-auto mt-12 grid max-w-md grid-cols-1 gap-8 md:mt-14 md:max-w-none md:grid-cols-3 md:gap-6 lg:gap-8'>
          {letters.map(letter => (
            <LetterCard key={letter.text} letter={letter} photo={photo} sample={sample} />
          ))}
        </ul>
      </div>
    </section>
  )
}
