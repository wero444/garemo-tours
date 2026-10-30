import Image from 'next/image'
import type { Letter } from 'src/components/letters/helpers'

export const LetterCard = ({ letter }: { letter: Letter }) => (
  <li className='letter-card invisible'>
    <figure className='letter-paper flex h-full min-h-48 flex-col justify-between gap-10 rounded-md border border-primary/15 bg-[color-mix(in_oklab,var(--secondary),white_45%)] p-6 shadow-[0_18px_40px_-24px_rgb(0_0_0/0.35)] transition-[rotate,translate,box-shadow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] rotate-(--tilt) hover:-translate-y-1.5 hover:rotate-0 hover:shadow-[0_28px_50px_-24px_rgb(0_0_0/0.4)] md:min-h-60 md:p-7 dark:bg-[color-mix(in_oklab,var(--secondary),white_6%)]'>
      <div className='flex items-start justify-between gap-5'>
        <blockquote className='text-[15px] leading-[1.75] text-secondary-foreground/80 md:text-base'>
          {letter.text}
        </blockquote>
        <span className='letter-stamp relative size-14 shrink-0 overflow-hidden rounded-xs border border-dashed border-primary/40'>
          {letter.image && <Image src={letter.image} alt={`Keepsake from ${letter.name}, ${letter.country}`} fill sizes='56px' className='object-cover p-1' />}
        </span>
      </div>
      <figcaption className='flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-primary'>
        <span aria-hidden className='relative flex size-2'>
          <span className='absolute inset-0 rounded-full bg-primary motion-safe:animate-pulse-ring' />
          <span className='relative size-2 rounded-full bg-primary' />
        </span>
        {`${letter.name} · ${letter.country}`}
      </figcaption>
    </figure>
  </li>
)
