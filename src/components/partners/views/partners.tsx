'use client'

import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import partnersImage from 'src/assets/media/images/21.jpeg'
import { usePartners } from 'src/components/partners/hooks/usePartners'
import { content } from 'src/components/partners/helpers'
import { Words } from 'src/components/ui/words'
import { useLocale } from 'src/lib/useLocale'

// Georgian words run longer, so the title steps down a size to keep each word on one line
const titleSize = { en: 'text-5xl md:text-7xl lg:text-8xl', ge: 'text-4xl md:text-6xl lg:text-7xl' }

export const Partners = () => {
  const { container, onCtaEnter, onCtaMove, onCtaLeave } = usePartners()
  const locale = useLocale()
  const { eyebrow, title, description, regionsLabel, regions, cta } = content[locale]

  return (
    <section
      ref={container}
      id='partners'
      aria-labelledby='partners-title'
      className='relative isolate flex min-h-168 items-center overflow-hidden bg-[#14100e] px-6 py-28 text-white md:min-h-svh md:px-10 md:py-36 lg:px-16'
    >
      <div aria-hidden className='partners-media absolute inset-0 -z-10 overflow-hidden'>
        <div className='partners-image absolute inset-y-[-8%] inset-x-0'>
          <Image
            src={partnersImage}
            alt='Misty mountain landscape in Georgia'
            fill
            sizes='100vw'
            placeholder='blur'
            className='object-cover brightness-[0.5] contrast-[1.05] saturate-[0.6]'
          />
        </div>
        <div className='absolute inset-0 bg-linear-to-r from-black/80 via-black/45 to-black/10' />
        <div className='absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/40' />
        <div className='partners-mist absolute top-[10%] -left-1/4 h-2/3 w-3/4 rounded-full bg-white/[0.07] blur-3xl' />
        <div className='partners-mist absolute -right-1/4 bottom-0 h-1/2 w-2/3 rounded-full bg-white/5 blur-3xl' />
      </div>

      <div className='mx-auto w-full max-w-6xl'>
        <div className='max-w-2xl'>
          <p className='flex items-center gap-4 text-xs font-medium uppercase tracking-[0.35em] text-white/70 md:text-[13px]'>
            <span aria-hidden className='partners-rule block h-px w-10 origin-left bg-white/50' />
            <span className='partners-eyebrow'>{eyebrow}</span>
          </p>

          <h2 id='partners-title' className={`mt-6 font-light leading-[1.04] tracking-tight md:mt-8 ${titleSize[locale]}`}>
            <span className='sr-only'>{title.join(' ')}</span>
            {title.map(line => (
              <span key={line} className='block'>
                <Words text={line} className='partners-char' chars />
              </span>
            ))}
          </h2>

          <p className='mt-6 max-w-lg text-base leading-[1.75] text-white/75 md:mt-8 md:text-lg'>
            <Words text={description} className='partners-word' />
          </p>

          <ul aria-label={regionsLabel} className='mt-8 flex flex-wrap gap-3'>
            {regions.map(region => (
              <li
                key={region}
                className='partners-tag invisible flex items-center gap-3 rounded-full border border-white/20 bg-white/5 py-2 pr-4 pl-3.5 text-xs font-medium uppercase tracking-[0.25em] text-white/85 backdrop-blur-md'
              >
                <span aria-hidden className='relative flex size-2'>
                  <span className='absolute inset-0 rounded-full bg-[color-mix(in_oklab,var(--primary),white_35%)] motion-safe:animate-pulse-ring' />
                  <span className='relative size-2 rounded-full bg-[color-mix(in_oklab,var(--primary),white_35%)]' />
                </span>
                {region}
              </li>
            ))}
          </ul>

          <a
            href='#contact'
            onPointerEnter={onCtaEnter}
            onPointerMove={onCtaMove}
            onPointerLeave={onCtaLeave}
            onFocus={onCtaEnter}
            onBlur={onCtaLeave}
            className='partners-cta invisible relative mt-10 inline-flex items-center gap-4 overflow-hidden rounded-full bg-primary py-4 pr-6 pl-7 text-xs font-medium uppercase tracking-[0.25em] text-primary-foreground shadow-[0_20px_50px_-20px_var(--primary)] outline-none transition-colors duration-500 hover:text-primary focus-visible:ring-3 focus-visible:ring-white/50 md:mt-12 md:text-[13px]'
          >
            <span aria-hidden className='partners-cta-fill absolute inset-0 rounded-full bg-white' style={{ clipPath: 'circle(0% at 0% 50%)' }} />
            <span className='sr-only'>{cta}</span>
            <span aria-hidden className='relative block overflow-hidden'>
              <span className='block'>
                {cta.split('').map((char, i) => (
                  <span key={i} className='partners-cta-char inline-block whitespace-pre'>{char}</span>
                ))}
              </span>
              <span className='absolute inset-0 block translate-y-full'>
                {cta.split('').map((char, i) => (
                  <span key={i} className='partners-cta-char inline-block whitespace-pre'>{char}</span>
                ))}
              </span>
            </span>
            <span aria-hidden className='relative flex overflow-hidden'>
              <ArrowRight className='partners-arrow size-4.5' strokeWidth={1.75} />
              <ArrowRight className='partners-arrow-next absolute size-4.5' strokeWidth={1.75} style={{ transform: 'translateX(-220%)' }} />
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
