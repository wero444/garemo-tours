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
          className='hero-image object-cover'
        />
        <div className='hero-shade absolute inset-0 bg-linear-to-b from-white/20 via-transparent to-black/30' />
      </div>

      <div className='relative flex h-full flex-col items-center justify-center px-6'>
        <h1 className='hero-reveal invisible -mt-[8vh] w-[min(56vw,300px)] text-primary'>
          <Logo className='hero-logo h-auto w-full overflow-visible' />
        </h1>
        <p
          aria-label={tagline}
          className='hero-reveal invisible absolute bottom-10 text-sm font-light tracking-[0.15em] text-white/90 md:text-base'
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
