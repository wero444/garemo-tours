'use client'

import Image from 'next/image'
import heroImage from 'src/assets/media/images/5.jpeg'
import { useHero } from 'src/components/hero/hooks/useHero'
import { tagline } from 'src/components/hero/helpers'
import { Logo } from 'src/components/hero/views/logo'

export const Hero = () => {
  const { container } = useHero()

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
          <Logo className='hero-logo h-auto w-full overflow-visible' />
        </h1>
        <p
          aria-label={tagline}
          className='hero-reveal invisible absolute inset-x-6 bottom-8 text-center text-xs font-light tracking-[0.15em] text-white/90 sm:text-sm md:bottom-10 md:text-base'
        >
          {tagline.split(' ').map((word, i) => (
            <span key={i} aria-hidden className='inline-block overflow-hidden pb-1 align-bottom'>
              <span className='hero-word inline-block'>{word}&nbsp;</span>
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
