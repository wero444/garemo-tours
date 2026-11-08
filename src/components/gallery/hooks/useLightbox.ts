import { useCallback, useState } from 'react'
import type { Tile } from 'src/components/gallery/helpers'
import type { Photo } from 'src/components/gallery/hooks/useLightboxMotion'

export const useLightbox = <T extends Photo = Tile>() => {
  const [active, setActive] = useState<{ tile: T, origin: HTMLElement } | null>(null)

  const open = useCallback((tile: T, origin: HTMLElement) => setActive({ tile, origin }), [])
  const close = useCallback(() => setActive(null), [])

  return { active, open, close }
}
