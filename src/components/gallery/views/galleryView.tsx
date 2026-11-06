'use client'

import Image, { type StaticImageData } from 'next/image'
import { useGallery } from 'src/components/gallery/hooks/useGallery'
import { useGalleryCarousel } from 'src/components/gallery/hooks/useGalleryCarousel'
import { useLightbox } from 'src/components/gallery/hooks/useLightbox'
import { carouselSizes, content, quality, type Tile } from 'src/components/gallery/helpers'
import { themeIds, type ThemeId } from 'src/components/gallery/helpers/photos'
import { GalleryCta } from 'src/components/gallery/views/galleryCta'
import { GalleryTitle } from 'src/components/gallery/views/galleryTitle'
import { Lightbox } from 'src/components/gallery/views/lightbox'
import { Words } from 'src/components/ui/words'
import { useLocale } from 'src/lib/useLocale'

interface Props {
  tabs: Record<ThemeId, Array<Tile>>
  preview: Array<StaticImageData>
  total: number
}

export const GalleryView = ({ tabs, preview, total }: Props) => {
  const { container } = useGallery()
  const { active: lightbox, open, close } = useLightbox()
  const { track, active, tiles, slide, select, pick, onCard, onPointerDown, onPointerMove, onPointerUp, onPointerCancel, onWheel, onKeyDown } = useGalleryCarousel(tabs, open)
  const { title, subtitle, tabs: labels, show } = content[useLocale()]

  return (
    <section
      ref={container}
      id='gallery'
      aria-labelledby='gallery-title'
      className='flex min-h-svh -scroll-mt-20 flex-col justify-center overflow-hidden bg-secondary px-5 pt-20 pb-10 md:px-8 md:pt-16 md:pb-8 lg:px-12'
    >
      <header className='flex flex-col items-center text-center'>
        <h2 id='gallery-title' className='w-[min(56vw,13rem)] text-primary md:w-[14.4rem]'>
          <span className='sr-only'>{title}</span>
          <GalleryTitle className='gallery-title invisible h-auto w-full overflow-visible' />
        </h2>
        <p className='mt-3.5 text-[0.9375rem] text-secondary-foreground/75 md:text-[0.875rem]'>
          <Words text={subtitle} className='gallery-word' />
        </p>

        <div role='tablist' aria-label={title} className='gallery-tabs relative mt-6 flex gap-6 md:mt-[1.65rem]'>
          {themeIds.map(id => (
            <button
              key={id}
              type='button'
              role='tab'
              data-tab={id}
              aria-selected={active === id}
              aria-controls='gallery-carousel'
              onClick={() => select(id)}
              className='gallery-tab group/tab relative pb-1.5 text-xs text-secondary-foreground/75 outline-none transition-colors duration-500 hover:text-primary focus-visible:text-primary aria-selected:text-primary md:pb-[0.3rem] md:text-[0.6875rem]'
            >
              {labels[id]}
              <span aria-hidden className='absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-primary transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-aria-selected/tab:scale-x-100' />
            </button>
          ))}
        </div>
      </header>

      <div className='gallery-slider relative mt-7 self-center [--visible:1] [--gap:1rem] [--card:min(72vw,calc((100svh_-_26rem)_*_0.8))] [--peek:calc((100vw_-_var(--card))_/_2_-_var(--gap))] md:[--visible:3] md:[--gap:2.5rem] md:[--peek:calc(var(--card)_*_0.35)] md:[--card:min(19.5rem,calc((100svh_-_23.5rem)_*_0.8),calc((100vw_-_4rem_-_4_*_var(--gap))_/_3.7))] lg:[--gap:4rem] lg:[--card:min(19.5rem,calc((100svh_-_23.5rem)_*_0.8),calc((100vw_-_6rem_-_4_*_var(--gap))_/_3.7))] 2xl:[--gap:5.875rem] 2xl:[--peek:calc(var(--card)_*_0.5)] 2xl:[--card:min(19.5rem,calc((100svh_-_23.5rem)_*_0.8),calc((100vw_-_6rem_-_4_*_var(--gap))_/_4))]'>
        <div
          id='gallery-carousel'
          role='tabpanel'
          tabIndex={0}
          aria-roledescription='carousel'
          aria-label={labels[active]}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
          onWheel={onWheel}
          onKeyDown={onKeyDown}
          className='-mb-8 w-[calc(var(--visible)_*_var(--card)_+_(var(--visible)_-_1)_*_var(--gap)_+_2_*_(var(--gap)_+_var(--peek)))] cursor-grab touch-pan-y select-none overflow-hidden pb-8 outline-none [mask-image:linear-gradient(to_right,transparent,black_calc(var(--peek)_+_var(--gap)),black_calc(100%_-_var(--peek)_-_var(--gap)),transparent)] focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-primary/40 active:cursor-grabbing'
        >
          <ul ref={track} className='relative grid gap-x-(--gap) pl-[calc(var(--gap)_+_var(--peek))]'>
            {tiles.map((tile, i) => (
              <li
                key={tile.id}
                aria-roledescription='slide'
                aria-label={`${i + 1} / ${tiles.length}`}
                className='carousel-card relative col-start-1 row-start-1 w-(--card) will-change-transform'
              >
                <span aria-hidden className='carousel-shadow absolute inset-x-[8%] -bottom-5 h-10 rounded-[50%] bg-black/30 blur-2xl' />
                <button
                  type='button'
                  aria-label={`Open ${tile.alt}`}
                  onClick={onCard(i)}
                  className='carousel-frame group relative block aspect-4/5 w-full overflow-hidden bg-[color-mix(in_oklab,var(--secondary),var(--foreground)_8%)] shadow-[0_1.5rem_3rem_-1.75rem_rgb(0_0_0/0.45)] outline-none focus-visible:ring-3 focus-visible:ring-ring/50'
                >
                  <Image
                    src={tile.image}
                    alt={tile.alt}
                    fill
                    draggable={false}
                    placeholder='blur'
                    quality={quality}
                    sizes={carouselSizes}
                    className='carousel-image pointer-events-none object-cover transition-[scale] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]'
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>

      </div>

      <div className='mt-5 flex justify-center gap-1.5 md:hidden'>
        {tiles.map((tile, i) => (
          <button
            key={tile.id}
            type='button'
            aria-label={show(i + 1)}
            aria-current={slide === i}
            onClick={() => pick(i)}
            className='h-1.5 w-1.5 rounded-full bg-primary/25 outline-none transition-[width,background-color] duration-500 aria-current:w-5 aria-current:bg-primary focus-visible:ring-2 focus-visible:ring-ring/50'
          />
        ))}
      </div>

      <GalleryCta preview={preview} total={total} />

      {lightbox && <Lightbox key={lightbox.tile.id} tile={lightbox.tile} origin={lightbox.origin} onClosed={close} />}
    </section>
  )
}
