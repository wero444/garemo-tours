'use client'

import { useGalleryFeed } from 'src/components/gallery/hooks/useGalleryFeed'
import { useLightbox } from 'src/components/gallery/hooks/useLightbox'
import { BackButton } from 'src/components/gallery/views/backButton'
import { feedSizes, type Tile } from 'src/components/gallery/helpers'
import { GalleryNote } from 'src/components/gallery/views/galleryNote'
import { GalleryTile } from 'src/components/gallery/views/galleryTile'
import { GalleryTitle } from 'src/components/gallery/views/galleryTitle'
import { Lightbox } from 'src/components/gallery/views/lightbox'

export const GalleryFeed = ({ tiles }: { tiles: Array<Tile> }) => {
  const { container, sentinel, shown, waiting, done, onTileLoad } = useGalleryFeed(tiles)
  const { active, open, close } = useLightbox()

  return (
    <section
      ref={container}
      aria-labelledby='gallery-page-title'
      className='flex-1 overflow-hidden bg-secondary px-4 pt-28 pb-20 md:px-8 md:pt-36 md:pb-28 lg:px-10'
    >
      <div className='mx-auto max-w-[150rem]'>
        <header className='feed-intro invisible flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10'>
          <div>
            <BackButton className='mb-8 md:mb-10' />
            <h1 id='gallery-page-title' className='w-[min(72vw,18rem)] text-primary md:w-96 lg:w-[30rem] xl:w-xl'>
              <GalleryTitle className='feed-title invisible h-auto w-full overflow-visible' />
            </h1>
          </div>
          <GalleryNote prefix='feed' count={tiles.length} />
        </header>

        <div className='@container mt-12 md:mt-16'>
          <ul className='relative grid auto-rows-[calc((100cqw_-_0.75rem)/2)] grid-cols-2 gap-3 md:auto-rows-[calc((100cqw_-_3rem)/4)] md:grid-cols-4 md:gap-4 xl:auto-rows-[calc((100cqw_-_4rem)/5)] xl:grid-cols-5'>
            {tiles.slice(0, shown).map((tile, i) => (
              <GalleryTile
                key={tile.id}
                tile={tile}
                className='feed-tile'
                sizes={feedSizes(tile)}
                preload={i === 0}
                loading={i > 0 && i < 6 ? 'eager' : undefined}
                onLoad={onTileLoad}
                onOpen={open}
              />
            ))}
          </ul>
        </div>

        <div ref={sentinel} aria-hidden className='h-px' />

        <div role='status' className='mt-14 flex h-12 items-center justify-center gap-4 text-xs font-medium uppercase tracking-[0.3em] text-primary md:mt-20'>
          {waiting && (
            <>
              <span aria-hidden className='relative flex size-2'>
                <span className='absolute inset-0 rounded-full bg-primary motion-safe:animate-pulse-ring' />
                <span className='absolute inset-0 rounded-full bg-primary [animation-delay:1.2s] motion-safe:animate-pulse-ring' />
                <span className='relative size-2 rounded-full bg-primary' />
              </span>
              Loading photos
            </>
          )}
          {done && !waiting && <span className='text-secondary-foreground/60'>{`That's all ${tiles.length} photos`}</span>}
        </div>
      </div>

      {active && <Lightbox key={active.tile.id} tile={active.tile} origin={active.origin} onClosed={close} />}
    </section>
  )
}
