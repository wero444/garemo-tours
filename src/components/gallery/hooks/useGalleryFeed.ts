import { useRef } from 'react'
import { gsap, useGSAP, ScrollTrigger } from 'src/lib/gsap'
import { reducedMotion } from 'src/lib/intro'
import { titleIntro } from 'src/components/gallery/helpers/titleIntro'

const sides = ['inset(0% 100% 0% 0%)', 'inset(0% 0% 0% 100%)', 'inset(100% 0% 0% 0%)', 'inset(0% 0% 100% 0%)']

const entrances: Array<(tile: Element, at: number) => gsap.core.Timeline> = [
  (tile, at) => {
    const turn = gsap.utils.random(-16, 16)

    return gsap.timeline({ defaults: { ease: 'expo.out' }, delay: at })
      .fromTo(tile, { y: 140, rotate: turn, scale: 0.7 }, { y: 0, rotate: 0, scale: 1, duration: 1.6 }, 0)
      .fromTo(tile.querySelector('.tile-spin'), { rotate: -turn * 2.2, scale: 1.7 }, { rotate: 0, scale: 1, duration: 2 }, 0)
      .fromTo(tile.querySelector('.tile-frame'),
        { clipPath: 'circle(0% at 50% 50%)' },
        { clipPath: 'circle(75% at 50% 50%)', duration: 1.4, ease: 'expo.inOut', clearProps: 'clipPath' }, 0)
  },
  (tile, at) => gsap.timeline({ defaults: { ease: 'expo.out' }, delay: at })
    .fromTo(tile,
      { rotationY: gsap.utils.random([-1, 1]) * 95, transformPerspective: 1400, scale: 0.85 },
      { rotationY: 0, scale: 1, duration: 1.8 }, 0)
    .fromTo(tile.querySelector('.tile-spin'), { scale: 1.3 }, { scale: 1, duration: 2 }, 0),
  (tile, at) => gsap.timeline({ defaults: { ease: 'expo.out' }, delay: at })
    .fromTo(tile, { y: 220, rotationX: -40, transformPerspective: 1200 }, { y: 0, rotationX: 0, duration: 1.7 }, 0)
    .fromTo(tile.querySelector('.tile-spin'), { scale: 1.45, yPercent: -10 }, { scale: 1, yPercent: 0, duration: 2.1 }, 0),
  (tile, at) => gsap.timeline({ defaults: { ease: 'expo.inOut' }, delay: at })
    .fromTo(tile.querySelector('.tile-frame'),
      { clipPath: 'circle(0% at 50% 50%)' },
      { clipPath: 'circle(75% at 50% 50%)', duration: 1.6, clearProps: 'clipPath' }, 0)
    .fromTo(tile.querySelector('.tile-spin'), { scale: 1.8, rotate: 12 }, { scale: 1, rotate: 0, duration: 2.2, ease: 'expo.out' }, 0),
  (tile, at) => gsap.timeline({ defaults: { ease: 'expo.inOut' }, delay: at })
    .fromTo(tile.querySelector('.tile-frame'),
      { clipPath: gsap.utils.random(sides) },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, clearProps: 'clipPath' }, 0)
    .fromTo(tile.querySelector('.tile-spin'), { scale: 1.35 }, { scale: 1, duration: 2, ease: 'expo.out' }, 0),
  (tile, at) => gsap.timeline({ delay: at })
    .fromTo(tile,
      { y: -160, rotate: gsap.utils.random(-12, 12), scale: 0.9 },
      { y: 0, rotate: 0, scale: 1, duration: 1.5, ease: 'back.out(1.4)' }, 0)
    .fromTo(tile.querySelector('.tile-spin'), { scale: 1.25 }, { scale: 1, duration: 1.8, ease: 'expo.out' }, 0),
  (tile, at) => gsap.timeline({ defaults: { ease: 'expo.out' }, delay: at })
    .fromTo(tile, { scale: 1.15 }, { scale: 1, duration: 1.8 }, 0)
    .fromTo(tile.querySelector('.tile-spin'),
      { filter: 'blur(24px)', scale: 1.4 },
      { filter: 'blur(0px)', scale: 1, duration: 1.6, clearProps: 'filter' }, 0),
  (tile, at) => {
    const side = gsap.utils.random([-1, 1])

    return gsap.timeline({ defaults: { ease: 'expo.out' }, delay: at })
      .fromTo(tile, { x: side * 180, skewX: side * -14 }, { x: 0, skewX: 0, duration: 1.6 }, 0)
      .fromTo(tile.querySelector('.tile-spin'), { x: side * -60, scale: 1.3 }, { x: 0, scale: 1, duration: 1.9 }, 0)
  }
]

export const useGalleryFeed = () => {
  const container = useRef<HTMLElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add(reducedMotion, () => {
      gsap.set('.feed-intro, .feed-title, .feed-theme, .feed-tile', { autoAlpha: 1 }).then()
    })

    mm.add(`not all and ${reducedMotion}`, context => {
      titleIntro('feed', gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.2 }).set('.feed-intro', { autoAlpha: 1 }))
        .fromTo('.feed-intro .back-circle', { scale: 0, rotate: 180 }, { scale: 1, rotate: 0, duration: 1.3, ease: 'back.out(1.8)' }, 0.1)
        .fromTo('.feed-intro .back-arrow', { xPercent: 220 }, { xPercent: 0, duration: 1 }, 0.5)
        .fromTo('.feed-intro .back-in', { yPercent: 110 }, { yPercent: 0, duration: 0.9, stagger: 0.05 }, 0.45).then()

      gsap.utils.toArray<HTMLElement>('.feed-theme').forEach(heading => {
        gsap.timeline({
          defaults: { ease: 'expo.out' },
          scrollTrigger: { trigger: heading, start: 'top 90%', once: true }
        })
          .set(heading, { autoAlpha: 1 })
          .fromTo(heading.querySelectorAll('.feed-theme-char'), { yPercent: 110 }, { yPercent: 0, duration: 1.1, stagger: 0.04 }, 0)
          .fromTo(heading.querySelector('.feed-theme-rule'), { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'expo.inOut' }, 0.15).then()
      })

      const reveal = (batch: Array<Element>, delay = 0) => {
        batch.forEach((tile, i) => {
          const at = delay + i * 0.08

          gsap.set(tile, { autoAlpha: 1, delay: at }).then()
          gsap.utils.random(entrances)(tile, at).then()
          gsap.fromTo(tile.querySelector('.tile-shadow'), { opacity: 0 }, { opacity: 1, duration: 1.2, delay: at + 0.6 }).then()
          gsap.fromTo(tile.querySelector('.tile-parallax'), { yPercent: -5 }, {
            yPercent: 5,
            ease: 'none',
            scrollTrigger: { trigger: tile, start: 'top bottom', end: 'bottom top', scrub: true }
          }).then()
        })
      }

      const tiles = gsap.utils.toArray<HTMLElement>('.feed-tile')
      const passed = tiles.filter(tile => tile.getBoundingClientRect().top < window.innerHeight * 0.92)
      const ahead = tiles.filter(tile => !passed.includes(tile))

      if (passed.length) reveal(passed, 0.4)
      if (ahead.length) ScrollTrigger.batch(ahead, { start: 'top 92%', once: true, onEnter: batch => context.add(() => reveal(batch)) })
    })

    return () => mm.revert()
  }, { scope: container })

  return { container }
}
