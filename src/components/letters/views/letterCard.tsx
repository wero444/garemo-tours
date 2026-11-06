import Image from 'next/image'
import type { Letter } from 'src/components/letters/helpers'
import { useLocale } from 'src/lib/useLocale'

const keepsake = {
  en: ({ name, country }: Letter) => `Keepsake from ${name}, ${country}`
}

export const LetterCard = ({ letter, photo, sample }: { letter: Letter, photo: string, sample: string }) => {
  const locale = useLocale()

  return (
    <li className='letter-card invisible'>
      <figure className='letter-paper flex h-full min-h-56 flex-col justify-between gap-8 rounded-md border border-primary/15 bg-[color-mix(in_oklab,var(--secondary),white_45%)] p-5 shadow-[0_1.125rem_2.5rem_-1.5rem_rgb(0_0_0/0.35)] transition-[rotate,translate,box-shadow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] rotate-(--tilt) hover:-translate-y-1.5 hover:rotate-0 hover:shadow-[0_1.75rem_3.125rem_-1.5rem_rgb(0_0_0/0.4)] md:min-h-64 md:p-6'>
        <div className='flex items-start justify-between gap-4'>
          <blockquote className={`text-sm leading-[1.75] md:text-[0.9375rem] ${letter.sample ? 'italic text-secondary-foreground/55' : 'text-secondary-foreground/80'}`}>
            {letter.text}
          </blockquote>
          <span className='letter-stamp relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xs border border-dashed border-primary/40 p-0.75'>
            {letter.image
              ? <Image src={letter.image} alt={keepsake[locale](letter)} fill sizes='48px' className='object-cover p-0.75' />
              : <span aria-hidden className='flex size-full items-center justify-center bg-primary/8 text-[0.4375rem] italic uppercase tracking-widest text-secondary-foreground/40'>{photo}</span>}
          </span>
        </div>
        <figcaption className='text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-primary'>
          {[letter.sample && sample, letter.name, letter.country].filter(Boolean).join(' · ')}
        </figcaption>
      </figure>
    </li>
  )
}
