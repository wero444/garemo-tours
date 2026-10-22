import type { CSSProperties, KeyboardEvent, MouseEvent } from 'react'
import type { Tile } from 'src/components/gallery/helpers'
import { useTileHover } from 'src/components/gallery/hooks/useTileHover'

export const useGalleryTile = (tile: Tile, onOpen: (tile: Tile, origin: HTMLElement) => void) => {
  const { onTileEnter, onTileMove, onTileLeave } = useTileHover()
  const place = { '--c': tile.c, '--r': tile.r, '--mc': tile.mc, '--mr': tile.mr, '--xc': tile.xc, '--xr': tile.xr } as CSSProperties

  const open = (event: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => {
    const frame = event.currentTarget.querySelector<HTMLElement>('.tile-frame')
    if (frame) onOpen(tile, frame)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') return

    event.preventDefault()
    open(event)
  }

  return { place, open, onKeyDown, onTileEnter, onTileMove, onTileLeave }
}
