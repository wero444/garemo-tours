'use client'

import Image, { type StaticImageData } from 'next/image'
import { useGallery } from 'src/components/gallery/hooks/useGallery'
import { offset, place, useGalleryCarousel } from 'src/components/gallery/hooks/useGalleryCarousel'
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

const start = (index: number, count: number) => {
  const { xPercent, z, rotationY, opacity, zIndex } = place(offset(index, 0, count))

  return { transform: `translateX(${xPercent}%) translateZ(${z}px) rotateY(${rotationY}deg)`, opacity, zIndex }
}

export const GalleryView = ({ tabs, preview, total }: Props) => {
  const { container } = useGallery()
  const { active: lightbox, open, close } = useLightbox()
  const { track, active, tiles, select, onCard, onPointerDown, onPointerMove, onPointerUp, onWheel, onKeyDown } = useGalleryCarousel(tabs, open)
  const { title, subtitle, tabs: labels, drag } = content[useLocale()]

  return (
    <section
      ref={container}
      id='gallery'
      aria-labelledby='gallery-title'
      className='flex min-h-dvh -scroll-mt-20 flex-col justify-center overflow-hidden bg-secondary px-5 pt-24 pb-12 md:px-8 md:pb-10 lg:px-12'
    >
      <header className='flex flex-col items-center text-center'>
        <h2 id='gallery-title' className='w-[min(56vw,13rem)] text-primary md:w-60'>
          <span className='sr-only'>{title}</span>
          <GalleryTitle className='gallery-title invisible h-auto w-full overflow-visible' />
        </h2>
        <p className='mt-3 text-[0.9375rem] text-secondary-foreground/75 md:text-base'>
          <Words text={subtitle} className='gallery-word' />
        </p>

        <div role='tablist' aria-label={title} className='gallery-tabs relative mt-6 flex gap-6 md:gap-7'>
          {themeIds.map(id => (
            <button
              key={id}
              type='button'
              role='tab'
              data-tab={id}
              aria-selected={active === id}
              aria-controls='gallery-carousel'
              onClick={() => select(id)}
              className='gallery-tab group/tab relative pb-1.5 text-[0.8125rem] text-secondary-foreground/70 outline-none transition-colors duration-500 hover:text-primary'
            >
              {labels[id]}
              <span aria-hidden className='absolute inset-x-0 bottom-0 h-px bg-primary/25' />
              <span aria-hidden className='absolute inset-x-0 bottom-0 h-px origin-right scale-x-0 bg-primary transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/tab:origin-left group-hover/tab:scale-x-100' />
            </button>
          ))}
        </div>
      </header>

      <ul
        ref={track}
        id='gallery-carousel'
        role='tabpanel'
        tabIndex={0}
        aria-label={`${labels[active]}. ${drag}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onWheel={onWheel}
        onKeyDown={onKeyDown}
        className='relative mt-8 grid touch-pan-y select-none place-items-center outline-none perspective-[1600px] active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-primary/40 md:mt-10'
      >
        {tiles.map((tile, i) => (
          <li
            key={tile.id}
            style={start(i, tiles.length)}
            className='carousel-card relative col-start-1 row-start-1 aspect-4/5 w-[min(62vw,20.5rem,calc((100dvh-27rem)*0.8))] min-w-44 will-change-transform md:w-[min(25vw,20.5rem,calc((100dvh-27rem)*0.8))]'
          >
            <span aria-hidden className='carousel-shadow absolute inset-x-[8%] -bottom-5 h-10 rounded-[50%] bg-black/35 blur-2xl' />
            <div
              onClick={onCard(i)}
              className='carousel-frame group relative size-full overflow-hidden rounded-2xl backface-hidden bg-[color-mix(in_oklab,var(--secondary),var(--foreground)_8%)] shadow-[0_1.5rem_3rem_-1.75rem_rgb(0_0_0/0.55)]'
            >
              <div className='carousel-parallax absolute inset-y-0 inset-x-[-8%]'>
                <Image
                  src={tile.image}
                  alt={tile.alt}
                  fill
                  draggable={false}
                  placeholder='blur'
                  quality={quality}
                  sizes={carouselSizes}
                  className='carousel-image object-cover transition-[scale] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]'
                />
              </div>
              <span aria-hidden className='pointer-events-none absolute inset-0 rounded-[inherit] bg-linear-to-br from-white/12 via-transparent to-black/15 ring-1 ring-white/20 ring-inset' />
            </div>
          </li>
        ))}
      </ul>

      <GalleryCta preview={preview} total={total} />

      {lightbox && <Lightbox key={lightbox.tile.id} tile={lightbox.tile} origin={lightbox.origin} onClosed={close} />}
    </section>
  )
}
