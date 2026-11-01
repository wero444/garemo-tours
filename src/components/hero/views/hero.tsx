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
    <section ref={container} className='relative h-svh min-h-140 w-full overflow-hidden bg-secondary'>
      <div className='hero-reveal hero-frame invisible absolute inset-0'>
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

      <div className='relative flex h-full flex-col items-center justify-center px-6'>
        <h1 className='hero-reveal invisible -mt-[8vh] w-[min(60vw,260px)] text-primary md:w-[min(42vw,300px)] xl:w-80 dark:drop-shadow-[0_1px_10px_rgb(0_0_0/0.65)]'>
          <span className='sr-only'>{heading[locale]}</span>
          <Logo className='hero-logo h-auto w-full overflow-visible' />
        </h1>
        <p lang='en' className='hero-reveal invisible mt-6 text-center text-sm font-medium tracking-[0.15em] text-primary drop-shadow-[0_0_10px_rgb(255_255_255/0.85)] md:mt-8 md:text-base xl:text-lg dark:drop-shadow-[0_1px_10px_rgb(0_0_0/0.65)]'>
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
