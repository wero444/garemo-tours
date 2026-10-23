import { useRef } from 'react'
import { gsap, useGSAP } from 'src/lib/gsap'
import { reducedMotion } from 'src/lib/intro'
import { titleIntro } from 'src/components/gallery/helpers/titleIntro'

export const useGallery = () => {
  const container = useRef<HTMLElement>(null)

  useGSAP((_, contextSafe) => {
    const mm = gsap.matchMedia()

    mm.add(reducedMotion, () => {
      gsap.set('.gallery-title, .gallery-tile, .gallery-cta', { autoAlpha: 1 }).then()
    })

    mm.add(`not all and ${reducedMotion}`, () => {
      titleIntro('gallery', gsap.timeline({
        defaults: { ease: 'expo.out' },
        scrollTrigger: { trigger: container.current, start: 'top 75%', once: true }
      })).then()

      const grid = container.current?.querySelector<HTMLElement>('.gallery-grid')
      if (!grid) return

      const tiles = gsap.utils.toArray<HTMLElement>('.gallery-tile')
      const q = (selector: string) => tiles.map(tile => tile.querySelector(selector))
      const turns = tiles.map(() => gsap.utils.random(-75, 75))
      const pull = tiles.map(tile => ({
        x: (grid.clientWidth / 2 - tile.offsetLeft - tile.offsetWidth / 2) * 0.9,
        y: (grid.clientHeight / 2 - tile.offsetTop - tile.offsetHeight / 2) * 0.9
      }))
      const stagger = { each: 0.08, from: 'center' as const }

      const drift = contextSafe!(() => {
        tiles.forEach(tile => {
          gsap.fromTo(tile.querySelector('.tile-parallax'), { yPercent: -5 }, {
            yPercent: 5,
            ease: 'none',
            scrollTrigger: { trigger: tile, start: 'top bottom', end: 'bottom top', scrub: true }
          }).then()
        })
      })

      let frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(drift)
      })

      gsap.timeline({
        defaults: { ease: 'expo.out' },
        scrollTrigger: { trigger: grid, start: 'top 80%', once: true }
      })
        .set(tiles, { autoAlpha: 1 })
        .fromTo(grid, { rotate: -16, scale: 0.7 }, { rotate: 0, scale: 1, duration: 2.8 }, 0)
        .fromTo(tiles,
          { x: (i: number) => pull[i]!.x, y: (i: number) => pull[i]!.y, rotate: (i: number) => turns[i]!, scale: 0.2 },
          { x: 0, y: 0, rotate: 0, scale: 1, duration: 2.4, stagger }, 0)
        .fromTo(q('.tile-spin'),
          { rotate: (i: number) => -turns[i]! * 1.8, scale: 2 },
          { rotate: 0, scale: 1, duration: 2.8, stagger }, 0)
        .fromTo(q('.tile-frame'),
          { clipPath: 'circle(0% at 50% 50%)' },
          { clipPath: 'circle(75% at 50% 50%)', duration: 1.6, ease: 'expo.inOut', stagger, clearProps: 'clipPath' }, 0)
        .fromTo(q('.tile-shadow'), { opacity: 0 }, { opacity: 1, duration: 1.2, stagger }, 1)
        .set('.gallery-cta', { autoAlpha: 1 }, 1.5)
        .fromTo('.gallery-cta',
          { y: 40, scale: 0.85, rotate: -4 },
          { y: 0, scale: 1, rotate: 0, duration: 1.4 }, 1.5)
        .fromTo('.cta-thumb',
          { scale: 0, rotate: -90 },
          { scale: 1, rotate: 0, duration: 1, stagger: 0.07, ease: 'back.out(2)' }, 1.65)
        .fromTo('.cta-in', { yPercent: 110 }, { yPercent: 0, duration: 0.9, stagger: 0.02 }, 1.75)
        .fromTo('.cta-count', { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.9 }, 1.95)
        .fromTo('.cta-arrow-box', { scale: 0, rotate: -180 }, { scale: 1, rotate: 0, duration: 1.2, ease: 'back.out(1.8)' }, 1.8).then()

      return () => cancelAnimationFrame(frame)
    })

    return () => mm.revert()
  }, { scope: container })

  return { container }
}
