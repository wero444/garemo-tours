'use client'

import { Fragment } from 'react'
import Image from 'next/image'
import heroImage from 'src/assets/media/images/5.jpeg'
import { useHero } from 'src/components/hero/hooks/useHero'
import { heading, tagline } from 'src/components/hero/helpers'
import { Logo } from 'src/components/hero/views/logo'
import { useLocale } from 'src/lib/useLocale'

export const Hero = () => {
  const { container } = useHero()
  const locale = useLocale()

  return (
    <section ref={container} className='relative h-(--hero-height,100svh) min-h-140 w-full overflow-hidden bg-secondary'>
      <div className='hero-reveal hero-frame invisible absolute inset-0 transform-gpu'>
        <Image
          src={heroImage}
          alt='Misty forested mountains in Georgia'
          fill
          preload
          sizes='100vw'
          placeholder='blur'
          className='hero-image object-cover dark:brightness-[0.6]'
        />
        <div className='hero-shade absolute inset-0 bg-linear-to-b from-white/20 via-transparent to-black/30 dark:from-black/50 dark:via-black/15 dark:to-black/60' />
      </div>

      <div className='relative flex h-full flex-col items-center px-6 pt-[22svh] pb-10 md:pt-[16svh] md:pb-12'>
        <h1 className='hero-reveal invisible w-[min(48vw,11.25rem)] text-primary md:w-[13.75rem] dark:drop-shadow-[0_0.0625rem_0.625rem_rgb(0_0_0/0.65)]'>
          <span className='sr-only'>{heading[locale]}</span>
          <Logo className='hero-logo h-auto w-full overflow-visible' />
        </h1>
        <p lang='en' className='hero-reveal invisible mt-auto text-center text-[0.625rem] font-medium uppercase tracking-[0.25em] text-white [text-shadow:0_0.0625rem_0.1875rem_rgb(0_0_0/0.35),0_0.125rem_0.875rem_rgb(0_0_0/0.3)] md:text-[0.6875rem]'>
          {tagline.split(' ').map((word, i) => (
            <Fragment key={i}>
              {i > 0 && ' '}
              <span className='inline-block overflow-hidden pb-1 align-bottom'>
                <span className='hero-word inline-block'>{word}</span>
              </span>
            </Fragment>
          ))}
        </p>
      </div>
    </section>
  )
}
