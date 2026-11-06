'use client'

import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import partnersImage from 'src/assets/media/images/21.jpeg'
import { usePartners } from 'src/components/partners/hooks/usePartners'
import { content } from 'src/components/partners/helpers'
import { PartnersTitle } from 'src/components/partners/views/partnersTitle'
import { Words } from 'src/components/ui/words'
import { useLocale } from 'src/lib/useLocale'

export const Partners = () => {
  const { container, onCtaEnter, onCtaMove, onCtaLeave } = usePartners()
  const locale = useLocale()
  const { eyebrow, title, description, cta } = content[locale]

  return (
    <section
      ref={container}
      id='partners'
      aria-labelledby='partners-title'
      className='relative isolate flex min-h-dvh items-center overflow-hidden bg-[#14100e] px-6 py-24 text-white md:px-10 md:py-28 lg:px-16'
    >
      <div aria-hidden className='partners-media absolute inset-0 -z-10 overflow-hidden'>
        <div className='partners-image absolute inset-y-[-8%] inset-x-0'>
          <Image
            src={partnersImage}
            alt='Misty mountain landscape in Georgia'
            fill
            sizes='100vw'
            placeholder='blur'
            className='object-cover sepia-[0.75] brightness-[0.82] contrast-[0.95] saturate-[1.15]'
          />
        </div>
        <div className='absolute inset-0 bg-[#8a4a2c]/30 mix-blend-multiply' />
        <div className='absolute inset-0 bg-linear-to-r from-[#4a2416]/85 via-[#5c301d]/45 to-transparent' />
        <div className='absolute inset-0 bg-linear-to-t from-[#2a160d]/45 via-transparent to-[#2a160d]/25' />
        <div className='partners-mist absolute top-[10%] -left-1/4 h-2/3 w-3/4 rounded-full bg-[#f3dcc4]/[0.07] blur-3xl' />
        <div className='partners-mist absolute -right-1/4 bottom-0 h-1/2 w-2/3 rounded-full bg-[#f3dcc4]/6 blur-3xl' />
      </div>

      <div className='mx-auto w-full max-w-6xl'>
        <div className='max-w-2xl md:pl-[6%] lg:pl-[10%]'>
          <h2 id='partners-title' className='w-[min(80vw,19rem)] text-[#f6ede4] md:w-88 lg:w-[24rem]'>
            <span className='sr-only'>{title.join(' ')}</span>
            <PartnersTitle className='h-auto w-full overflow-visible' />
          </h2>

          <p className='mt-4 flex items-center gap-3 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-white/85 md:text-xs'>
            <span aria-hidden className='partners-rule block h-px w-6 origin-left bg-white/50' />
            <span className='partners-eyebrow'>{eyebrow}</span>
          </p>

          <p className='mt-6 max-w-sm text-[0.9375rem] leading-[1.7] text-white/85 md:max-w-md md:text-base'>
            <Words text={description} className='partners-word' />
          </p>

          <a
            href='#contact'
            onPointerEnter={onCtaEnter}
            onPointerMove={onCtaMove}
            onPointerLeave={onCtaLeave}
            onFocus={onCtaEnter}
            onBlur={onCtaLeave}
            className='partners-cta invisible relative mt-8 inline-flex items-center gap-3.5 overflow-hidden rounded-full bg-primary py-3.5 pr-6 pl-6.5 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-primary-foreground shadow-[0_1.25rem_3.125rem_-1.25rem_var(--primary)] outline-none transition-colors duration-500 hover:text-primary focus-visible:ring-3 focus-visible:ring-white/50 md:mt-9 md:text-xs'
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
