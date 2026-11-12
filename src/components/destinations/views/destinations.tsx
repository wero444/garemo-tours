'use client'

import { useDestinations } from 'src/components/destinations/hooks/useDestinations'
import { content } from 'src/components/destinations/helpers'
import { DestinationsMap } from 'src/components/destinations/views/destinationsMap'
import { DestinationsTitle } from 'src/components/destinations/views/destinationsTitle'
import { RegionPanel } from 'src/components/destinations/views/regionPanel'
import { Words } from 'src/components/ui/words'
import { useLocale } from 'src/lib/useLocale'

export const Destinations = () => {
  const { title, subtitle } = content[useLocale()]
  const { regions, region, active, focus, label, slide, data, container, wrapper, panel, route, tip, handlers, select, close, hover, slideTo, onSlideDown, onSlideUp } = useDestinations()

  return (
    <section
      ref={container}
      id='destinations'
      aria-labelledby='destinations-title'
      className='relative flex h-dvh -scroll-mt-20 flex-col justify-center overflow-hidden bg-secondary px-5 pt-20 pb-5 md:px-8 md:pt-24 md:pb-8 lg:px-12'
    >
      <header className='flex shrink-0 flex-col items-center text-center'>
        <h2 id='destinations-title' className='w-[min(80vw,22rem,60dvh)] text-primary md:w-[min(26rem,60dvh)]'>
          <span className='sr-only'>{title}</span>
          <DestinationsTitle className='destinations-title invisible h-auto w-full overflow-visible' />
        </h2>
        <p className='mt-2 text-[0.9375rem] text-secondary-foreground/75 md:mt-4'>
          <Words text={subtitle} className='destinations-word' />
        </p>
      </header>

      <ul className='sr-only'>
        {regions.map(({ id, name, text, places }) => (
          <li key={id} id={`destination-${id}`}>
            <h3>{name}</h3>
            <p>{text}</p>
            <p>{places.join(', ')}</p>
          </li>
        ))}
      </ul>

      <div className='-mx-5 mt-4 flex max-h-[calc(100vw/1.7117)] min-h-0 flex-1 items-center justify-center [container-type:size] md:-mx-8 md:mt-6 lg:-mx-12'>
        <div className='w-[min(100cqw,calc(100cqh*1.7117))] lg:relative'>
          <DestinationsMap
            wrapper={wrapper}
            route={route}
            tip={tip}
            data={data}
            regions={regions}
            active={active}
            focus={focus}
            label={label}
            handlers={handlers}
          />

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
      </div>

      <div className='mt-4 shrink-0 md:-mx-8 md:mt-6 md:overflow-x-auto md:px-8 md:scrollbar-none'>
        <ul className='mx-auto flex flex-wrap justify-center gap-1.5 md:w-max md:flex-nowrap xl:gap-2'>
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
