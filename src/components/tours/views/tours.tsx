'use client'

import Image from 'next/image'
import { useTours } from 'src/components/tours/hooks/useTours'
import { description, tours } from 'src/components/tours/helpers'
import { ToursTitle } from 'src/components/tours/views/toursTitle'
import { Eagle } from 'src/components/tours/views/eagle'
import { Words } from 'src/components/ui/words'
import { ArchFrame } from 'src/components/ui/archFrame'
import { pressDown, pressUp } from 'src/lib/press'

export const Tours = () => {
  const { container, onMediaEnter, onMediaMove, onMediaLeave, onCtaEnter, onCtaLeave } = useTours()

  return (
    <section
      ref={container}
      id='tours'
      aria-labelledby='tours-title'
      className='relative overflow-hidden bg-primary px-6 pt-16 pb-12 md:px-10 md:pt-20 md:pb-14 lg:px-16 xl:px-24 [--tone:var(--secondary)]'
    >
      <div className='mx-auto w-full'>
        <header className='flex flex-col items-center text-center'>
          <div className='relative'>
            <h2 id='tours-title' className='w-[min(48vw,200px)] text-(--tone) md:w-60'>
              <span className='sr-only'>Tours in Georgia</span>
              <ToursTitle className='tours-title invisible h-auto w-full overflow-visible' />
            </h2>
            <Eagle className='tours-eagle invisible absolute -top-7 -right-11 w-9 overflow-visible text-(--tone) md:-top-9 md:-right-16 md:w-13' />
          </div>

          <p className='tours-description invisible mt-4 max-w-xs text-[15px] leading-[1.8] text-(--tone) md:mt-6 md:max-w-sm md:text-lg'>
            <Words text={description} className='tours-word' />
          </p>
        </header>

        <ul className='mx-auto mt-10 grid max-w-md grid-cols-1 gap-12 md:mt-12 md:max-w-4xl md:grid-cols-3 md:gap-x-8 lg:max-w-5xl lg:gap-x-14 xl:max-w-6xl xl:gap-x-20'>
          {tours.map(({ format, title, text, cta, image, alt }) => (
            <li key={title} className='tour invisible flex flex-col items-center text-center'>
              <div
                onPointerEnter={onMediaEnter}
                onPointerMove={onMediaMove}
                onPointerLeave={onMediaLeave}
                onPointerDown={pressDown}
                onPointerUp={pressUp}
                className='group relative aspect-4/5 w-full cursor-pointer perspective-distant'
              >
                <span aria-hidden className='tour-shadow absolute inset-x-[10%] -bottom-6 h-10 rounded-[50%] bg-black/35 blur-2xl' />
                <div className='press-tilt absolute inset-0'>
                  <ArchFrame className='tour-frame absolute! inset-0 bg-black/10 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.55)]'>
                    <div className='tour-parallax absolute inset-x-0 inset-y-[-8%]'>
                      <Image
                        src={image}
                        alt={alt}
                        fill
                        placeholder='blur'
                        sizes='(min-width: 1280px) 420px, (min-width: 768px) 33vw, (min-width: 448px) 448px, 100vw'
                        className='tour-image object-cover'
                      />
                    </div>
                    <span aria-hidden className='pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-white/15 ring-inset' />
                  </ArchFrame>
                </div>
              </div>

              <p className='mt-6 flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.3em] text-(--tone) md:text-xs'>
                <Words text={format} className='tour-meta' />
                <span aria-hidden className='tour-dot relative flex size-1.5'>
                  <span className='absolute inset-0 rounded-full bg-(--tone) motion-safe:animate-pulse-ring' />
                  <span className='absolute inset-0 rounded-full bg-(--tone) [animation-delay:1.2s] motion-safe:animate-pulse-ring' />
                  <span className='relative size-1.5 rounded-full bg-(--tone)' />
                </span>
                <Words text='Example' className='tour-meta' />
              </p>

              <h3 className='mt-3 text-2xl font-medium text-(--tone) md:text-[1.375rem] lg:text-2xl'>
                <span className='sr-only'>{title}</span>
                <Words text={title} className='tour-title-word' chars />
              </h3>

              <p className='mt-3 max-w-xs text-[15px] leading-[1.7] text-(--tone)'>
                <Words text={text} className='tour-word' />
              </p>

              <a
                href='#contact'
                onPointerEnter={onCtaEnter}
                onPointerLeave={onCtaLeave}
                onFocus={onCtaEnter}
                onBlur={onCtaLeave}
                className='tour-cta relative mt-6 inline-block pb-1.5 text-xs font-medium uppercase tracking-[0.25em] text-(--tone) outline-none md:text-[13px]'
              >
                <span className='sr-only'>{cta}</span>
                <span aria-hidden className='relative block overflow-hidden'>
                  <span className='block'>
                    {cta.split('').map((char, i) => (
                      <span key={i} className='tour-cta-char tour-cta-in inline-block whitespace-pre'>{char}</span>
                    ))}
                  </span>
                  <span className='absolute inset-0 block translate-y-full'>
                    {cta.split('').map((char, i) => (
                      <span key={i} className='tour-cta-char inline-block whitespace-pre'>{char}</span>
                    ))}
                  </span>
                </span>
                <span aria-hidden className='tour-cta-line absolute inset-x-0 bottom-0 block h-px origin-left bg-(--tone)' />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
