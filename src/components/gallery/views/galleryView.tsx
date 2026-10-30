'use client'

import type { StaticImageData } from 'next/image'
import { useGallery } from 'src/components/gallery/hooks/useGallery'
import { useLightbox } from 'src/components/gallery/hooks/useLightbox'
import { homeSizes, type Tile } from 'src/components/gallery/helpers'
import { GalleryTile } from 'src/components/gallery/views/galleryTile'
import { GalleryCta } from 'src/components/gallery/views/galleryCta'
import { GalleryNote } from 'src/components/gallery/views/galleryNote'
import { GalleryTitle } from 'src/components/gallery/views/galleryTitle'
import { Lightbox } from 'src/components/gallery/views/lightbox'

interface Props {
  tiles: Array<Tile>
  preview: Array<StaticImageData>
  total: number
}

export const GalleryView = ({ tiles, preview, total }: Props) => {
  const { container } = useGallery()
  const { active, open, close } = useLightbox()

  return (
    <section
      ref={container}
      id='gallery'
      aria-labelledby='gallery-title'
      className='overflow-hidden bg-secondary px-5 py-20 md:px-8 md:py-28 lg:px-12'
    >
      <div className='mx-auto max-w-[100rem]'>
        <header className='flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10'>
          <h2 id='gallery-title' className='w-[min(64vw,16rem)] text-primary md:w-80 lg:w-96 xl:w-md'>
            <span className='sr-only'>Gallery</span>
            <GalleryTitle className='gallery-title invisible h-auto w-full overflow-visible' />
          </h2>
          <GalleryNote prefix='gallery' />
        </header>

        <div className='@container mx-auto mt-10 max-w-6xl md:mt-14'>
          <ul className='gallery-grid relative grid auto-rows-[calc((100cqw_-_0.75rem)/2)] grid-cols-2 gap-3 md:auto-rows-[calc((100cqw_-_5rem)/6)] md:grid-cols-6 md:gap-4'>
            {tiles.map(tile => (
              <GalleryTile key={tile.id} tile={tile} className='gallery-tile' sizes={homeSizes(tile)} onOpen={open} />
            ))}
          </ul>
        </div>

        <GalleryCta preview={preview} total={total} />
      </div>

      {active && <Lightbox key={active.tile.id} tile={active.tile} origin={active.origin} onClosed={close} />}
    </section>
  )
}
