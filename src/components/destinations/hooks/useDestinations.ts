import { useEffect, useLayoutEffect, useRef, type PointerEvent } from 'react'
import { gsap, useGSAP } from 'src/lib/gsap'
import { reducedMotion } from 'src/lib/intro'
import { content } from 'src/components/destinations/helpers'
import type { MapApi } from 'src/components/destinations/helpers/scene'
import { useDestinationsMap } from 'src/components/destinations/hooks/useDestinationsMap'
import { useDestinationsReducer } from 'src/components/destinations/store'
import { useLocale } from 'src/lib/useLocale'

type Side = 'left' | 'right' | 'below'

const still = () => window.matchMedia(reducedMotion).matches
const wide = () => window.matchMedia('(min-width: 64rem)').matches
const reveal = 'inset(0% 0% 0% 0% round 1.5rem)'
const folded = 'inset(0% 0% 100% 0% round 1.5rem)'

export const useDestinations = () => {
  const { regions } = content[useLocale()]
  const [{ active, shown, hovered, slide }, dispatch] = useDestinationsReducer()
  const container = useRef<HTMLElement>(null)
  const wrapper = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const panel = useRef<HTMLDivElement>(null)
  const route = useRef<SVGPathElement>(null)
  const tip = useRef<SVGCircleElement>(null)
  const label = useRef<HTMLSpanElement>(null)
  const map = useRef<MapApi | null>(null)
  const side = useRef<Side>('right')
  const hiding = useRef<gsap.core.Timeline | null>(null)
  const live = useRef({ shown, marked: hovered ?? active })
  const swipe = useRef<number | null>(null)

  const overlay = (api: MapApi) => {
    map.current = api
    const { shown: open, marked } = live.current

    if (label.current) {
      const at = marked ? api.screen(marked) : null
      label.current.style.opacity = at ? '1' : '0'
      if (at) label.current.style.transform = `translate(${at.x}px, ${at.y - 16}px) translate(-50%, -100%)`
    }

    const from = open ? api.screen(open) : null
    if (!from || !panel.current || !wrapper.current || !route.current || !tip.current) return

    const box = panel.current.getBoundingClientRect()
    const frame = wrapper.current.getBoundingClientRect()
    const end = side.current === 'below'
      ? { x: box.left - frame.left + box.width / 2, y: box.top - frame.top }
      : { x: (side.current === 'right' ? box.left : box.right) - frame.left, y: box.top - frame.top + 64 }

    const d = side.current === 'below'
      ? `M ${from.x} ${from.y} C ${from.x} ${(from.y + end.y) / 2}, ${end.x} ${(from.y + end.y) / 2}, ${end.x} ${end.y}`
      : `M ${from.x} ${from.y} C ${(from.x + end.x) / 2} ${from.y}, ${(from.x + end.x) / 2} ${end.y}, ${end.x} ${end.y}`

    route.current.setAttribute('d', d)
    tip.current.setAttribute('cx', `${end.x}`)
    tip.current.setAttribute('cy', `${end.y}`)
  }

  const onFrame = useRef(overlay)

  useLayoutEffect(() => {
    live.current = { shown, marked: hovered ?? active }
    onFrame.current = overlay
  })

  const hide = (then: () => void) => {
    if (hiding.current?.isActive()) return
    if (still() || !panel.current) {
      then()
      return
    }

    hiding.current = gsap.timeline({ onComplete: then, defaults: { ease: 'power3.inOut' } })
      .to(panel.current.querySelectorAll('.panel-in'), { y: -8, autoAlpha: 0, duration: 0.3, stagger: { each: 0.03, from: 'end' }, ease: 'power2.in' }, 0)
      .to(panel.current, { clipPath: folded, y: -6, autoAlpha: 0, duration: 0.55 }, 0.12)
      .to(tip.current, { scale: 0, transformOrigin: '50% 50%', duration: 0.3, ease: 'power2.in' }, 0.35)
      .fromTo(route.current, { drawSVG: '0% 100%' }, { drawSVG: '0% 0%', duration: 0.55 }, 0.4)
  }

  const close = () => {
    if (!active) return
    dispatch({ type: 'CLOSE_REGION' })
    hide(() => dispatch({ type: 'SHOW_REGION' }))
  }

  const select = (id: string | null) => {
    if (!id || id === active) {
      close()
      return
    }

    dispatch({ type: 'SELECT_REGION', id })
    if (!shown) dispatch({ type: 'SHOW_REGION' })
    else hide(() => dispatch({ type: 'SHOW_REGION' }))
  }

  const hover = (id: string | null) => dispatch({ type: 'HOVER_REGION', id })

  const handlers = useDestinationsMap({ regions, wrapper, canvas, onFrame, onHover: hover, onPick: select, active, hovered })

  const position = () => {
    const box = panel.current
    const frame = wrapper.current
    const at = shown ? map.current?.screen(shown) : null
    if (!box || !frame) return

    if (!wide() || !at) {
      side.current = 'below'
      gsap.set(box, { clearProps: 'left,top' }).then()
      return
    }

    side.current = at.x < frame.clientWidth / 2 ? 'right' : 'left'
    const left = side.current === 'right' ? frame.clientWidth - box.offsetWidth : 0
    const top = gsap.utils.clamp(-24, Math.max(-24, frame.clientHeight - box.offsetHeight + 24), at.y - 96)

    gsap.set(box, { left, top }).then()
  }

  useGSAP(() => {
    if (!shown) {
      gsap.set([route.current, tip.current], { autoAlpha: 0 }).then()
      return
    }

    position()
    if (map.current) overlay(map.current)
    gsap.set([route.current, tip.current], { autoAlpha: 1 }).then()

    if (still()) {
      gsap.set(panel.current, { clipPath: reveal }).then()
      return
    }

    gsap.timeline({ defaults: { ease: 'expo.out' } })
      .fromTo(route.current,
        { drawSVG: '0%' },
        { drawSVG: '100%', duration: 0.8, ease: 'power2.inOut', onComplete: () => route.current?.style.removeProperty('stroke-dasharray') }, 0)
      .fromTo(tip.current, { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.5, ease: 'back.out(3)' }, 0.65)
      .fromTo(panel.current, { clipPath: folded, y: 8, autoAlpha: 1 }, { clipPath: reveal, y: 0, duration: 1.1, ease: 'expo.out' }, 0.7)
      .fromTo('.panel-in', { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.06 }, 0.85)
      .fromTo('.slide-image', { scale: 1.25 }, { scale: 1, duration: 1.6 }, 0.8).then()
  }, { scope: container, dependencies: [shown] })

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add(reducedMotion, () => {
      gsap.set('.destinations-chip, .destinations-title', { autoAlpha: 1 }).then()
    })

    mm.add(`not all and ${reducedMotion}`, () => {
      gsap.timeline({
        defaults: { ease: 'expo.out' },
        scrollTrigger: { trigger: container.current, start: 'top 75%', once: true }
      })
        .set('.destinations-title', { autoAlpha: 1 }, 0)
        .set('.destinations-letter', { stroke: 'currentColor', strokeWidth: 0.35, fillOpacity: 0, autoRound: false }, 0)
        .fromTo('.destinations-letter',
          { drawSVG: '0%', y: 6 },
          { drawSVG: '100%', y: 0, duration: 1.3, stagger: 0.07, ease: 'power2.inOut' }, 0)
        .to('.destinations-letter', { fillOpacity: 1, strokeOpacity: 0, duration: 0.7, stagger: 0.05, ease: 'power2.out' }, 0.9)
        .fromTo('.destinations-word', { yPercent: 100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1, stagger: 0.04 }, 0.4)
        .fromTo('.destinations-chip', { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.04 }, 1.2).then()
    })

    return () => mm.revert()
  }, { scope: container })

  useEffect(() => {
    if (!active) return undefined

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }
    const onResize = () => position()

    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  })

  const region = regions.find(({ id }) => id === shown) ?? null
  const marked = regions.find(({ id }) => id === (hovered ?? active)) ?? null
  const count = region?.images.length ?? 0

  const slideTo = (index: number) => {
    if (!count) return
    dispatch({ type: 'SLIDE_TO', index: (index + count) % count })
  }

  const onSlideDown = (event: PointerEvent<HTMLElement>) => {
    swipe.current = event.clientX
  }

  const onSlideUp = (event: PointerEvent<HTMLElement>) => {
    if (swipe.current === null) return
    const dx = event.clientX - swipe.current
    swipe.current = null
    if (Math.abs(dx) > 40) slideTo(slide + (dx < 0 ? 1 : -1))
  }

  return {
    regions,
    region,
    marked,
    active,
    slide,
    container,
    wrapper,
    canvas,
    panel,
    route,
    tip,
    label,
    handlers,
    select,
    close,
    hover,
    slideTo,
    onSlideDown,
    onSlideUp
  }
}
