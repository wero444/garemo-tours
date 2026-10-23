import { useCallback, useEffect, useRef, useState } from 'react'
import { preload } from 'react-dom'
import { getImageProps } from 'next/image'
import { gsap, useGSAP, ScrollTrigger } from 'src/lib/gsap'
import { reducedMotion } from 'src/lib/intro'
import { batchSize, feedSizes, quality, type Tile } from 'src/components/gallery/helpers'
import { titleIntro } from 'src/components/gallery/helpers/titleIntro'

const patience = 4000

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

export const useGalleryFeed = (tiles: Array<Tile>) => {
  const container = useRef<HTMLElement>(null)
  const sentinel = useRef<HTMLDivElement>(null)
  const animated = useRef(0)
  const first = Math.min(batchSize, tiles.length)
  const feed = useRef({ near: false, shown: first, loaded: 0, grace: 0 })

  const [shown, setShown] = useState(first)
  const [loaded, setLoaded] = useState(0)
  const [grace, setGrace] = useState(0)

  const done = shown >= tiles.length
  const waiting = !done && loaded < shown && grace !== shown

  const advance = useCallback(() => {
    const state = feed.current
    const busy = state.loaded < state.shown && state.grace !== state.shown

    if (!state.near || busy || state.shown >= tiles.length) return

    state.shown = Math.min(state.shown + batchSize, tiles.length)
    setShown(state.shown)
  }, [tiles.length])

  const onTileLoad = useCallback(() => {
    feed.current.loaded++
    setLoaded(feed.current.loaded)
    advance()
  }, [advance])

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      feed.current.near = entry?.isIntersecting ?? false
      advance()
    }, { rootMargin: '0px 0px 900px 0px' })

    if (sentinel.current) observer.observe(sentinel.current)

    return () => observer.disconnect()
  }, [advance])

  useEffect(() => {
    tiles.slice(shown, shown + batchSize).forEach(tile => {
      const { props } = getImageProps({ src: tile.image, alt: '', fill: true, quality, sizes: feedSizes(tile) })

      preload(props.src, { as: 'image', imageSrcSet: props.srcSet, imageSizes: props.sizes, fetchPriority: 'low' })
    })

    const timer = setTimeout(() => {
      feed.current.grace = shown
      setGrace(shown)
      advance()
    }, patience)

    return () => clearTimeout(timer)
  }, [tiles, shown, advance])

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add(reducedMotion, () => {
      gsap.set('.feed-intro, .feed-title', { autoAlpha: 1 }).then()
    })

    mm.add(`not all and ${reducedMotion}`, () => {
      titleIntro('feed', gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.2 }).set('.feed-intro', { autoAlpha: 1 }))
        .fromTo('.back-circle', { scale: 0, rotate: 180 }, { scale: 1, rotate: 0, duration: 1.3, ease: 'back.out(1.8)' }, 0.1)
        .fromTo('.back-arrow', { xPercent: 220 }, { xPercent: 0, duration: 1 }, 0.5)
        .fromTo('.back-in', { yPercent: 110 }, { yPercent: 0, duration: 0.9, stagger: 0.05 }, 0.45).then()
    })

    return () => mm.revert()
  }, { scope: container })

  useGSAP((_, contextSafe) => {
    const all = gsap.utils.toArray<HTMLElement>('.feed-tile')
    const intro = animated.current === 0
    const fresh = all.slice(animated.current)
    animated.current = all.length

    const reset = () => {
      animated.current = 0
    }

    if (window.matchMedia(reducedMotion).matches) {
      gsap.set(fresh, { autoAlpha: 1 }).then()
      return reset
    }

    const reveal = contextSafe!((batch: Array<Element>, delay = 0) => {
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
    })

    if (intro) {
      reveal(fresh, 0.4)
      return reset
    }

    const passed = fresh.filter(tile => tile.getBoundingClientRect().top < window.innerHeight * 0.92)
    const ahead = fresh.filter(tile => !passed.includes(tile))

    if (passed.length) reveal(passed)
    if (ahead.length) ScrollTrigger.batch(ahead, { start: 'top 92%', once: true, onEnter: batch => reveal(batch) })

    ScrollTrigger.refresh()

    return reset
  }, { scope: container, dependencies: [shown], revertOnUpdate: false })

  return { container, sentinel, shown, waiting, done, onTileLoad }
}
