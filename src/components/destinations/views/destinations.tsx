'use client'

import { useDestinations } from 'src/components/destinations/hooks/useDestinations'
import { content } from 'src/components/destinations/helpers'
import { DestinationsTitle } from 'src/components/destinations/views/destinationsTitle'
import { RegionPanel } from 'src/components/destinations/views/regionPanel'
import { Words } from 'src/components/ui/words'
import { useLocale } from 'src/lib/useLocale'

export const Destinations = () => {
  const { title, subtitle } = content[useLocale()]
  const { regions, region, marked, active, slide, container, wrapper, canvas, panel, route, tip, label, handlers, select, close, hover, slideTo, onSlideDown, onSlideUp } = useDestinations()

  return (
    <section
      ref={container}
      id='destinations'
      aria-labelledby='destinations-title'
      className='relative flex min-h-svh -scroll-mt-20 flex-col justify-center overflow-hidden bg-secondary px-5 pt-24 pb-12 md:px-8 lg:px-12'
    >
      <header className='flex flex-col items-center text-center'>
        <h2 id='destinations-title' className='w-[min(80vw,22rem)] text-primary md:w-104'>
          <span className='sr-only'>{title}</span>
          <DestinationsTitle className='destinations-title invisible h-auto w-full overflow-visible' />
        </h2>
        <p className='mt-4 text-[0.9375rem] text-secondary-foreground/75'>
          <Words text={subtitle} className='destinations-word' />
        </p>
      </header>

      <div className='relative mx-auto mt-6 w-full max-w-6xl'>
        <div
          ref={wrapper}
          onPointerMove={handlers.onPointerMove}
          onPointerLeave={handlers.onPointerLeave}
          onClick={handlers.onClick}
          className='relative h-[min(calc(100svh-20rem),calc(min(100vw-2.5rem,72rem)*0.52))] min-h-56 w-full'
        >
          <canvas ref={canvas} aria-hidden className='absolute inset-0 size-full' />
          <svg aria-hidden className='pointer-events-none absolute inset-0 size-full overflow-visible text-primary'>
            <path ref={route} fill='none' stroke='currentColor' strokeWidth='1.25' strokeLinecap='round' opacity='0' />
            <circle ref={tip} r='3.5' fill='currentColor' opacity='0' />
          </svg>
          <span
            ref={label}
            aria-hidden
            className='pointer-events-none absolute top-0 left-0 whitespace-nowrap font-hand text-xl text-primary opacity-0 transition-opacity duration-300 md:text-2xl'
          >
            {marked?.name}
          </span>
        </div>

        {region && (
          <RegionPanel
            key={region.id}
            ref={panel}
            region={region}
            slide={slide}
            onClose={close}
            onSlide={slideTo}
            onSlideDown={onSlideDown}
            onSlideUp={onSlideUp}
          />
        )}
      </div>

      <div className='mt-8 lg:-mx-8 lg:overflow-x-auto lg:px-8 lg:scrollbar-none'>
        <ul className='mx-auto flex max-w-2xl flex-wrap justify-center gap-1.5 lg:w-max lg:max-w-none lg:flex-nowrap xl:gap-2'>
          {regions.map(({ id, name }) => (
            <li key={id}>
              <button
                type='button'
                aria-pressed={active === id}
                onClick={() => select(id)}
                onPointerEnter={() => hover(id)}
                onPointerLeave={() => hover(null)}
                onFocus={() => hover(id)}
                onBlur={() => hover(null)}
                className='destinations-chip invisible whitespace-nowrap rounded-full border border-primary/35 px-3 py-1.5 text-[0.6875rem] xl:px-3.5 xl:text-xs text-primary outline-none transition-[background-color,border-color,color] duration-300 hover:border-primary focus-visible:ring-2 focus-visible:ring-primary/40 aria-pressed:bg-primary aria-pressed:text-primary-foreground'
              >
                {name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
