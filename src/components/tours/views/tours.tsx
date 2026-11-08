'use client'

import Image, { type StaticImageData } from 'next/image'
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

const coverSizes = ({ width, height }: StaticImageData) => {
  const stretch = Math.max(1, (width / height) / (0.8 / 1.16))
  return `(min-width: 1280px) ${Math.ceil(360 * stretch)}px, (min-width: 768px) ${Math.ceil(30 * stretch)}vw, ${Math.ceil(384 * stretch)}px`
}

export const Tours = () => {
  const { container, open, active, onOpenChange, onOpen, onAsk, onOpenChangeComplete, onMediaEnter, onMediaLeave } = useTours()
  const { title, subtitle, more, note, ask, close, tours } = content[useLocale()]

  return (
    <section
      ref={container}
      id='tours'
      aria-labelledby='tours-title'
      className='relative flex min-h-svh -scroll-mt-20 flex-col justify-center overflow-hidden bg-[#993c1d] px-6 pt-20 pb-10 md:px-10 md:pt-16 md:pb-8 lg:px-16 xl:px-24 [--tone:#e3dcd4]'
    >
      <div className='mx-auto w-full'>
        <header className='flex flex-col items-center text-center'>
          <div className='relative'>
            <h2 id='tours-title' className='w-[min(40vw,10rem)] text-(--tone) md:w-[10.25rem]'>
              <span className='sr-only'>{title}</span>
              <ToursTitle className='tours-title invisible h-auto w-full overflow-visible' />
            </h2>
            <Eagle className='tours-eagle invisible absolute -top-7 -right-11 w-9 overflow-visible text-(--tone) md:-top-8 md:-right-14 md:w-11' />
          </div>
          <p className='tours-subtitle invisible mt-3 text-[0.9375rem] text-(--tone)/85 md:text-[0.875rem]'>{subtitle}</p>
        </header>

        <ul className='-mx-6 mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto px-[14vw] pb-8 [scrollbar-width:none] md:mx-auto md:mt-7 md:grid md:max-w-4xl md:grid-cols-3 md:gap-x-10 md:overflow-visible md:px-0 md:pb-0 lg:max-w-5xl lg:gap-x-16 xl:max-w-[70rem] xl:gap-x-[5.875rem] [&::-webkit-scrollbar]:hidden'>
          {tours.map(({ title, text, image, alt, focus }, index) => (
            <li key={title} className='tour invisible flex w-[min(72vw,calc((100svh-27rem)*0.8))] min-w-48 shrink-0 snap-center flex-col items-center text-center md:w-auto md:min-w-0'>
              <button
                type='button'
                aria-label={`${more}: ${title}`}
                onClick={() => onOpen(index)}
                onPointerEnter={onMediaEnter}
                onPointerLeave={onMediaLeave}
                className='relative block aspect-4/5 w-full rounded-t-full outline-none focus-visible:ring-2 focus-visible:ring-(--tone)/70 focus-visible:ring-offset-4 focus-visible:ring-offset-[#993c1d] md:w-[min(100%,19.5rem,calc((100svh-23.5rem)*0.8))]'
              >
                <span aria-hidden className='tour-shadow absolute inset-x-[10%] -bottom-6 h-10 rounded-[50%] bg-black/35 blur-2xl' />
                <ArchFrame className='tour-frame absolute! inset-0 rounded-b-none bg-black/10 shadow-[0_1.875rem_3.75rem_-1.875rem_rgb(0_0_0/0.55)]'>
                  <div className='tour-parallax absolute inset-x-0 inset-y-[-8%]'>
                    <Image
                      src={image}
                      alt={alt}
                      fill
                      placeholder='blur'
                      quality={100}
                      sizes={coverSizes(image)}
                      className='tour-image object-cover'
                      style={{ objectPosition: focus }}
                    />
                  </div>
                  <span aria-hidden className='pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-white/15 ring-inset' />
                </ArchFrame>
              </button>

              <h3 className='mt-3 text-[1.3125rem] font-normal leading-[1.3] text-(--tone)'>
                <span className='sr-only'>{title}</span>
                <Words text={title} className='tour-title-word' chars />
              </h3>

              <p className='mt-1 mb-3 max-w-[21rem] text-[0.875rem] leading-[1.55] text-(--tone)/85'>
                <Words text={text} className='tour-word' />
              </p>

              <button
                type='button'
                onClick={() => onOpen(index)}
                aria-label={`${more}: ${title}`}
                className='tour-more group/more relative mt-auto inline-flex items-center gap-1 pb-1 text-[0.625rem] font-medium uppercase tracking-[0.2em] text-(--tone) outline-none focus-visible:ring-2 focus-visible:ring-(--tone)/60 focus-visible:ring-offset-4 focus-visible:ring-offset-[#993c1d]'
              >
                {more}
                <ArrowRight aria-hidden className={`size-3 transition-transform duration-500 group-hover/more:translate-x-1 ${ease}`} strokeWidth={1.75} />
                <span aria-hidden className={`absolute inset-x-0 bottom-0 h-px origin-right bg-current transition-transform duration-500 group-hover/more:scale-x-0 ${ease}`} />
                <span aria-hidden className={`absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-current transition-transform duration-500 group-hover/more:scale-x-100 group-hover/more:delay-200 ${ease}`} />
              </button>
            </li>
          ))}
        </ul>

        <p className='tours-note invisible mt-4 text-center text-[0.625rem] font-medium uppercase tracking-[0.2em] text-(--tone)/80 md:mt-6'>
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
