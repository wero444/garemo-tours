'use client'

import { Fragment } from 'react'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { useTours } from 'src/components/tours/hooks/useTours'
import { content } from 'src/components/tours/helpers'
import { ToursTitle } from 'src/components/tours/views/toursTitle'
import { Eagle } from 'src/components/tours/views/eagle'
import { Words } from 'src/components/ui/words'
import { ArchFrame } from 'src/components/ui/archFrame'
import { useLocale } from 'src/lib/useLocale'

const chars = (word: string) => word.split('').map((char, i) => (
  <span key={i} className='tour-cta-char inline-block'>{char}</span>
))

const Rolling = ({ text }: { text: string }) => text.split(' ').map((word, i) => (
  <Fragment key={i}>
    {i > 0 && ' '}
    <span className='relative inline-block overflow-hidden whitespace-nowrap align-bottom'>
      <span className='block'>{chars(word)}</span>
      <span className='absolute inset-0 block translate-y-full'>{chars(word)}</span>
    </span>
  </Fragment>
))

export const Tours = () => {
  const { container, onMediaEnter, onMediaLeave, onCtaEnter, onCtaLeave } = useTours()
  const { title, cta, tours } = content[useLocale()]

  return (
    <section
      ref={container}
      id='tours'
      aria-labelledby='tours-title'
      className='relative overflow-hidden bg-primary px-6 pt-16 pb-16 md:px-10 md:pt-20 md:pb-20 lg:px-16 xl:px-24 [--tone:var(--secondary)]'
    >
      <div className='mx-auto w-full'>
        <header className='flex flex-col items-center text-center'>
          <div className='relative'>
            <h2 id='tours-title' className='w-[min(48vw,200px)] text-(--tone) md:w-60'>
              <span className='sr-only'>{title}</span>
              <ToursTitle className='tours-title invisible h-auto w-full overflow-visible' />
            </h2>
            <Eagle className='tours-eagle invisible absolute -top-7 -right-11 w-9 overflow-visible text-(--tone) md:-top-9 md:-right-16 md:w-13' />
          </div>
        </header>

        <ul className='mx-auto mt-10 grid max-w-md grid-cols-1 gap-12 md:mt-12 md:max-w-4xl md:grid-cols-3 md:gap-x-8 lg:max-w-5xl lg:gap-x-14 xl:max-w-6xl xl:gap-x-20'>
          {tours.map(({ title, text, image, alt }) => (
            <li key={title} className='tour invisible flex flex-col items-center text-center'>
              <div
                onPointerEnter={onMediaEnter}
                onPointerLeave={onMediaLeave}
                className='relative aspect-4/5 w-full'
              >
                <span aria-hidden className='tour-shadow absolute inset-x-[10%] -bottom-6 h-10 rounded-[50%] bg-black/35 blur-2xl' />
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

              <h3 className='mt-8 text-2xl font-medium text-(--tone) md:text-[1.375rem] lg:text-2xl'>
                <span className='sr-only'>{title}</span>
                <Words text={title} className='tour-title-word' chars />
              </h3>

              <p className='mt-3 max-w-xs text-[15px] leading-[1.7] text-(--tone)'>
                <Words text={text} className='tour-word' />
              </p>
            </li>
          ))}
        </ul>

        <div className='mt-14 flex justify-center md:mt-16'>
          <a
            href='#contact'
            onPointerEnter={onCtaEnter}
            onPointerLeave={onCtaLeave}
            onFocus={onCtaEnter}
            onBlur={onCtaLeave}
            className='tours-cta invisible group relative inline-flex items-center gap-4 rounded-full border border-(--tone)/45 py-4 pr-6 pl-7 text-center text-[11px] font-medium uppercase leading-relaxed tracking-[0.18em] text-(--tone) outline-none transition-colors duration-500 hover:border-(--tone) hover:bg-(--tone)/10 focus-visible:ring-2 focus-visible:ring-(--tone)/60 md:text-[13px] md:tracking-[0.25em]'
          >
            <span className='sr-only'>{cta}</span>
            <span aria-hidden className='block'><Rolling text={cta} /></span>
            <ArrowRight aria-hidden className='size-4.5 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1' strokeWidth={1.75} />
          </a>
        </div>
      </div>
    </section>
  )
}
