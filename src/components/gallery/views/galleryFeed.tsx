'use client'

import { useGalleryFeed } from 'src/components/gallery/hooks/useGalleryFeed'
import { useLightbox } from 'src/components/gallery/hooks/useLightbox'
import { BackButton } from 'src/components/gallery/views/backButton'
import { content, feedSizes, type Tile } from 'src/components/gallery/helpers'
import type { ThemeId } from 'src/components/gallery/helpers/photos'
import { FloatingBack } from 'src/components/gallery/views/floatingBack'
import { GalleryNote } from 'src/components/gallery/views/galleryNote'
import { GalleryTile } from 'src/components/gallery/views/galleryTile'
import { GalleryTitle } from 'src/components/gallery/views/galleryTitle'
import { Lightbox } from 'src/components/gallery/views/lightbox'
import { Words } from 'src/components/ui/words'
import { useLocale } from 'src/lib/useLocale'

interface Props {
  themes: Array<{ id: ThemeId, tiles: Array<Tile> }>
}

export const GalleryFeed = ({ themes }: Props) => {
  const { container } = useGalleryFeed()
  const { active, open, close } = useLightbox()
  const { themes: labels, all } = content[useLocale()]
  const count = themes.reduce((sum, { tiles }) => sum + tiles.length, 0)

  return (
    <>
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
                <span className='sr-only'>Gallery</span>
                <GalleryTitle className='feed-title invisible h-auto w-full overflow-visible' />
              </h1>
            </div>
            <GalleryNote prefix='feed' count={count} />
          </header>

          {themes.map(({ id, tiles }, t) => (
            <section key={id} aria-labelledby={`gallery-${id}`} className='mt-16 md:mt-24'>
              <h2 id={`gallery-${id}`} className='feed-theme invisible flex items-center gap-5 text-primary'>
                <span className='sr-only'>{labels[id]}</span>
                <span aria-hidden className='text-xs font-medium tabular-nums tracking-[0.3em] text-primary/60'>
                  {String(t + 1).padStart(2, '0')}
                </span>
                <span aria-hidden className='text-2xl font-light uppercase tracking-[0.15em] md:text-3xl lg:text-4xl'>
                  <Words text={labels[id]} className='feed-theme-char' chars />
                </span>
                <span aria-hidden className='feed-theme-rule h-px flex-1 origin-left bg-primary/25' />
              </h2>

              <div className='@container mt-6 md:mt-8'>
                <ul className='relative grid auto-rows-[calc((100cqw_-_0.75rem)/2)] grid-cols-2 gap-3 md:auto-rows-[calc((100cqw_-_3rem)/4)] md:grid-cols-4 md:gap-4 xl:auto-rows-[calc((100cqw_-_4rem)/5)] xl:grid-cols-5'>
                  {tiles.map((tile, i) => (
                    <GalleryTile
                      key={tile.id}
                      tile={tile}
                      className='feed-tile'
                      sizes={feedSizes(tile)}
                      preload={t === 0 && i === 0}
                      loading={t === 0 && i < 6 ? 'eager' : undefined}
                      onOpen={open}
                    />
                  ))}
                </ul>
              </div>
            </section>
          ))}

          <p className='mt-14 text-center text-xs font-medium uppercase tracking-[0.3em] text-secondary-foreground/60 md:mt-20'>
            {all(count)}
          </p>
        </div>

        {active && <Lightbox key={active.tile.id} tile={active.tile} origin={active.origin} onClosed={close} />}
      </section>

      <FloatingBack />
    </>
  )
}
