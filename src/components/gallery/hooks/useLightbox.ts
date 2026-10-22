import { useCallback, useState } from 'react'
import type { Tile } from 'src/components/gallery/helpers'

export const useLightbox = () => {
  const [active, setActive] = useState<{ tile: Tile, origin: HTMLElement } | null>(null)

  const open = useCallback((tile: Tile, origin: HTMLElement) => setActive({ tile, origin }), [])
  const close = useCallback(() => setActive(null), [])

  return { active, open, close }
}
