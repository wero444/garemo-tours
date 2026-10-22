import type { PointerEvent } from 'react'
import { gsap } from 'src/lib/gsap'
import { pressEnter, pressMove, pressRelease } from 'src/lib/press'

export const useTileHover = () => {
  const onTileEnter = (event: PointerEvent<HTMLElement>) => {
    pressEnter(event)
    gsap.to(event.currentTarget.querySelector('.tile-image'), { scale: 1.08, duration: 2.2, ease: 'power2.out', overwrite: 'auto' }).then()
  }

  const onTileLeave = (event: PointerEvent<HTMLElement>) => {
    pressRelease(event)
    gsap.to(event.currentTarget.querySelector('.tile-image'), { scale: 1, duration: 0.6, ease: 'power2.out', overwrite: 'auto' }).then()
  }

  return { onTileEnter, onTileMove: pressMove, onTileLeave }
}
