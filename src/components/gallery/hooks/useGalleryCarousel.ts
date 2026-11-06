import { useRef, type KeyboardEvent, type MouseEvent, type PointerEvent, type WheelEvent } from 'react'
import { gsap, useGSAP, ScrollTrigger } from 'src/lib/gsap'
import { reducedMotion } from 'src/lib/intro'
import type { Tile } from 'src/components/gallery/helpers'
import type { ThemeId } from 'src/components/gallery/helpers/photos'
import { useGalleryReducer } from 'src/components/gallery/store'

const spacing = 96

export const offset = (index: number, pos: number, count: number) => gsap.utils.wrap(-count / 2, count / 2, index - pos)

export const place = (d: number) => {
  const a = Math.abs(d)

  return {
    xPercent: Math.sign(d) * (a <= 1 ? a : 1 + (a - 1) * 0.82) * spacing,
    z: -Math.min(a, 3) * 90,
    rotationY: -gsap.utils.clamp(-2.5, 2.5, d) * 26,
    opacity: a <= 1.2 ? 1 : Math.max(0, 1 - (a - 1.2) * 0.65),
    zIndex: 10 - Math.round(a)
  }
}

const still = () => window.matchMedia(reducedMotion).matches

export const useGalleryCarousel = (tabs: Record<ThemeId, Array<Tile>>, onOpen: (tile: Tile, origin: HTMLElement) => void) => {
  const [{ active, shown }, dispatch] = useGalleryReducer()
  const track = useRef<HTMLUListElement>(null)
  const proxy = useRef({ pos: 0 })
  const drag = useRef<{ x: number, pos: number, t: number, v: number, moved: boolean } | null>(null)
  const dragged = useRef(false)
  const wheel = useRef({ sum: 0, locked: false })
  const entered = useRef(false)
  const leaving = useRef<gsap.core.Timeline | null>(null)
  const tiles = tabs[shown]

  const cards = () => gsap.utils.toArray<HTMLElement>(track.current?.querySelectorAll('.carousel-card') ?? [])

  const render = () => {
    const list = cards()

    list.forEach((card, i) => {
      const d = offset(i, proxy.current.pos, list.length)
      const { opacity, ...rest } = place(d)

      gsap.set(card, { x: 0, y: 0, rotationX: 0, rotation: 0, scale: 1, ...rest, opacity, pointerEvents: opacity > 0.05 ? 'auto' : 'none' }).then()
      gsap.set(card.querySelector('.carousel-parallax'), { xPercent: -d * 5 }).then()
    })
  }

  const goTo = (target: number, duration = 0.9) => {
    gsap.to(proxy.current, { pos: target, duration: still() ? 0 : duration, ease: 'expo.out', overwrite: true, onUpdate: render }).then()
  }

  const step = () => (cards()[0]?.offsetWidth ?? 300) * spacing / 100

  const ordered = (list: Array<HTMLElement>) => list.map((card, i) => ({ card, a: Math.abs(offset(i, proxy.current.pos, list.length)) }))

  const reveal = () => {
    const list = ordered(cards()).filter(({ a }) => a < 3)
    const frames = list.map(({ card }) => card.querySelector('.carousel-frame'))
    const delay = (i: number) => list[i]!.a * 0.09

    gsap.timeline({ defaults: { ease: 'expo.out' } })
      .fromTo(frames,
        { clipPath: 'inset(100% 0% 0% 0%)', y: 48 },
        { clipPath: 'inset(0% 0% 0% 0%)', y: 0, duration: 1.3, delay }, 0)
      .fromTo(list.map(({ card }) => card.querySelector('.carousel-image')), { scale: 1.3 }, { scale: 1, duration: 1.8, delay }, 0)
      .fromTo(list.map(({ card }) => card.querySelector('.carousel-shadow')), { opacity: 0 }, { opacity: 1, duration: 1.2, delay: (i: number) => delay(i) + 0.3 }, 0).then()
  }

  useGSAP(() => {
    proxy.current.pos = 0
    render()

    if (still()) return

    if (entered.current) {
      reveal()
      return
    }

    gsap.set(cards().map(card => card.querySelector('.carousel-frame')), { clipPath: 'inset(100% 0% 0% 0%)' }).then()
    gsap.set(cards().map(card => card.querySelector('.carousel-shadow')), { opacity: 0 }).then()

    ScrollTrigger.create({
      trigger: track.current,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        if (entered.current) return
        entered.current = true
        reveal()
      }
    })
  }, { scope: track, dependencies: [shown] })

  const select = (tab: ThemeId) => {
    if (tab === active) return
    dispatch({ type: 'SELECT_TAB', tab })

    if (still() || !entered.current) {
      dispatch({ type: 'SHOW_TAB' })
      return
    }

    if (leaving.current?.isActive()) return

    gsap.killTweensOf(proxy.current)
    const list = ordered(cards()).filter(({ a }) => a < 3)
    const delay = (i: number) => list[i]!.a * 0.06

    leaving.current = gsap.timeline({ defaults: { ease: 'power3.in' }, onComplete: () => dispatch({ type: 'SHOW_TAB' }) })
      .to(list.map(({ card }) => card.querySelector('.carousel-frame')), { clipPath: 'inset(0% 0% 100% 0%)', y: -32, duration: 0.6, delay }, 0)
      .to(list.map(({ card }) => card.querySelector('.carousel-image')), { scale: 1.15, duration: 0.6, delay }, 0)
      .to(list.map(({ card }) => card.querySelector('.carousel-shadow')), { opacity: 0, duration: 0.3, delay }, 0)
  }

  const onPointerDown = (event: PointerEvent<HTMLUListElement>) => {
    if (event.button !== 0 || leaving.current?.isActive()) return
    gsap.killTweensOf(proxy.current)
    drag.current = { x: event.clientX, pos: proxy.current.pos, t: performance.now(), v: 0, moved: false }
  }

  const onPointerMove = (event: PointerEvent<HTMLUListElement>) => {
    const state = drag.current
    if (!state) return

    const dx = event.clientX - state.x
    if (!state.moved && Math.abs(dx) < 6) return

    if (!state.moved) {
      state.moved = true
      event.currentTarget.setPointerCapture(event.pointerId)
    }

    const now = performance.now()
    const pos = state.pos - dx / step()
    state.v = (pos - proxy.current.pos) / Math.max(1, now - state.t) * 1000
    state.t = now
    proxy.current.pos = pos
    render()
  }

  const onPointerUp = () => {
    const state = drag.current
    drag.current = null
    if (!state?.moved) return

    dragged.current = true
    requestAnimationFrame(() => {
      dragged.current = false
    })

    const projected = proxy.current.pos + gsap.utils.clamp(-3, 3, state.v * 0.18)
    goTo(Math.round(projected), 1.1)
  }

  const onWheel = (event: WheelEvent<HTMLUListElement>) => {
    if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return

    wheel.current.sum += event.deltaX
    if (wheel.current.locked || Math.abs(wheel.current.sum) < 40) return

    goTo(Math.round(proxy.current.pos) + Math.sign(wheel.current.sum))
    wheel.current = { sum: 0, locked: true }
    setTimeout(() => {
      wheel.current.locked = false
    }, 450)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
    event.preventDefault()
    goTo(Math.round(proxy.current.pos) + (event.key === 'ArrowRight' ? 1 : -1))
  }

  const onCard = (index: number) => (event: MouseEvent<HTMLElement>) => {
    if (dragged.current) return

    const d = offset(index, proxy.current.pos, tiles.length)
    if (Math.abs(d) < 0.5) onOpen(tiles[index]!, event.currentTarget)
    else goTo(Math.round(proxy.current.pos + d))
  }

  return { track, active, tiles, select, onCard, onPointerDown, onPointerMove, onPointerUp, onWheel, onKeyDown }
}
