'use client'

import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { useTours } from 'src/components/tours/hooks/useTours'
import { content } from 'src/components/tours/helpers'
import { ToursTitle } from 'src/components/tours/views/toursTitle'
import { Eagle } from 'src/components/tours/views/eagle'
import { TourModal } from 'src/components/tours/views/tourModal'
import { Words } from 'src/components/ui/words'
import { ArchFrame } from 'src/components/ui/archFrame'
import { useLocale } from 'src/lib/useLocale'

const ease = 'ease-[cubic-bezier(0.16,1,0.3,1)]'

export const Tours = () => {
  const { container, open, active, onOpenChange, onOpen, onAsk, onOpenChangeComplete, onMediaEnter, onMediaLeave } = useTours()
  const { title, subtitle, more, note, ask, close, tours } = content[useLocale()]

  return (
    <section
      ref={container}
      id='tours'
      aria-labelledby='tours-title'
      className='relative flex min-h-dvh -scroll-mt-20 flex-col justify-center overflow-hidden bg-primary px-6 pt-24 pb-14 md:px-10 md:pt-20 md:pb-10 lg:px-16 xl:px-24 [--tone:var(--secondary)]'
    >
      <div className='mx-auto w-full'>
        <header className='flex flex-col items-center text-center'>
          <div className='relative'>
            <h2 id='tours-title' className='w-[min(40vw,10rem)] text-(--tone) md:w-44'>
              <span className='sr-only'>{title}</span>
              <ToursTitle className='tours-title invisible h-auto w-full overflow-visible' />
            </h2>
            <Eagle className='tours-eagle invisible absolute -top-7 -right-11 w-9 overflow-visible text-(--tone) md:-top-8 md:-right-14 md:w-11' />
          </div>
          <p className='tours-subtitle invisible mt-3 text-[0.9375rem] text-(--tone)/85'>{subtitle}</p>
        </header>

        <ul className='mx-auto mt-10 grid max-w-sm grid-cols-1 gap-14 md:mt-8 md:max-w-4xl md:grid-cols-3 md:gap-x-10 lg:max-w-5xl lg:gap-x-20 xl:max-w-6xl xl:gap-x-24'>
          {tours.map(({ title, text, image, alt }, index) => (
            <li key={title} className='tour invisible flex flex-col items-center text-center'>
              <button
                type='button'
                aria-label={`${more}: ${title}`}
                onClick={() => onOpen(index)}
                onPointerEnter={onMediaEnter}
                onPointerLeave={onMediaLeave}
                className='relative block aspect-4/5 w-full rounded-t-full rounded-b-md outline-none focus-visible:ring-2 focus-visible:ring-(--tone)/70 focus-visible:ring-offset-4 focus-visible:ring-offset-primary md:w-[min(100%,19rem,calc((100dvh-31rem)*0.8))]'
              >
                <span aria-hidden className='tour-shadow absolute inset-x-[10%] -bottom-6 h-10 rounded-[50%] bg-black/35 blur-2xl' />
                <ArchFrame className='tour-frame absolute! inset-0 bg-black/10 shadow-[0_1.875rem_3.75rem_-1.875rem_rgb(0_0_0/0.55)]'>
                  <div className='tour-parallax absolute inset-x-0 inset-y-[-8%]'>
                    <Image
                      src={image}
                      alt={alt}
                      fill
                      placeholder='blur'
                      sizes='(min-width: 1280px) 360px, (min-width: 768px) 30vw, 384px'
                      className='tour-image object-cover'
                    />
                  </div>
                  <span aria-hidden className='pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-white/15 ring-inset' />
                </ArchFrame>
              </button>

              <h3 className='mt-5 text-2xl font-normal text-(--tone) md:text-[1.375rem] lg:text-2xl'>
                <span className='sr-only'>{title}</span>
                <Words text={title} className='tour-title-word' chars />
              </h3>

              <p className='mt-2 mb-4 max-w-xs text-[0.9375rem] leading-[1.6] text-(--tone)/85'>
                <Words text={text} className='tour-word' />
              </p>

              <button
                type='button'
                onClick={() => onOpen(index)}
                aria-label={`${more}: ${title}`}
                className='tour-more group/more relative mt-auto inline-flex items-center gap-1.5 pb-1 text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-(--tone) outline-none focus-visible:ring-2 focus-visible:ring-(--tone)/60 focus-visible:ring-offset-4 focus-visible:ring-offset-primary'
              >
                {more}
                <ArrowRight aria-hidden className={`size-3.5 transition-transform duration-500 group-hover/more:translate-x-1 ${ease}`} strokeWidth={1.75} />
                <span aria-hidden className={`absolute inset-x-0 bottom-0 h-px origin-right bg-current transition-transform duration-500 group-hover/more:scale-x-0 ${ease}`} />
                <span aria-hidden className={`absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-current transition-transform duration-500 group-hover/more:scale-x-100 group-hover/more:delay-200 ${ease}`} />
              </button>
            </li>
          ))}
        </ul>

        <p className='tours-note invisible mt-12 text-center text-[0.625rem] font-medium uppercase tracking-[0.2em] text-(--tone)/80 md:mt-8 md:text-[0.6875rem]'>
          {note}
        </p>
      </div>

      <TourModal
        open={open}
        onOpenChange={onOpenChange}
        onOpenChangeComplete={onOpenChangeComplete}
        tour={tours[active]}
        ask={ask}
        close={close}
        onAsk={onAsk}
      />
    </section>
  )
}
