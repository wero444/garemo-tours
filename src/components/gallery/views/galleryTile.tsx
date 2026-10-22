'use client'

import Image from 'next/image'
import { quality, type Tile } from 'src/components/gallery/helpers'
import { useGalleryTile } from 'src/components/gallery/hooks/useGalleryTile'
import { pressDent, pressDown, pressUp } from 'src/lib/press'

interface Props {
  tile: Tile
  className: string
  sizes: string
  preload?: boolean
  loading?: 'eager' | 'lazy'
  onLoad?: () => void
  onOpen: (tile: Tile, origin: HTMLElement) => void
}

export const GalleryTile = ({ tile, className, sizes, preload, loading, onLoad, onOpen }: Props) => {
  const { place, open, onKeyDown, onTileEnter, onTileMove, onTileLeave } = useGalleryTile(tile, onOpen)

  return (
    <li
      style={place}
      className={`${className} invisible relative col-(--mc) row-(--mr) md:col-(--c) md:row-(--r) xl:col-(--xc) xl:row-(--xr)`}
    >
      <div
        role='button'
        tabIndex={0}
        aria-label={`Open ${tile.alt}`}
        onClick={open}
        onKeyDown={onKeyDown}
        onPointerEnter={onTileEnter}
        onPointerMove={onTileMove}
        onPointerLeave={onTileLeave}
        onPointerDown={pressDown}
        onPointerUp={pressUp}
        className='group relative size-full cursor-pointer rounded-2xl outline-none perspective-distant focus-visible:ring-3 focus-visible:ring-ring/50'
      >
        <span aria-hidden className='tile-shadow absolute inset-x-[10%] -bottom-4 h-8 rounded-[50%] bg-black/30 blur-2xl' />
        <div className='press-tilt absolute inset-0'>
          <div className='tile-frame absolute inset-0 overflow-hidden rounded-2xl bg-[color-mix(in_oklab,var(--secondary),var(--foreground)_8%)] shadow-[0_24px_48px_-28px_rgb(0_0_0/0.55)]'>
            <div className='tile-spin absolute inset-0'>
              <div className='tile-parallax absolute inset-x-0 inset-y-[-8%]'>
                <Image
                  src={tile.image}
                  alt={tile.alt}
                  fill
                  placeholder='blur'
                  quality={quality}
                  sizes={sizes}
                  preload={preload}
                  loading={loading}
                  onLoad={onLoad}
                  onError={onLoad}
                  className='tile-image object-cover'
                />
              </div>
            </div>
            <span aria-hidden className='pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-white/15 ring-inset' />
            <span aria-hidden className={pressDent} />
          </div>
        </div>
      </div>
    </li>
  )
}
