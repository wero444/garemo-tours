import { useEffect, useRef, type KeyboardEvent, type MouseEvent, type PointerEvent, type WheelEvent } from 'react'
import { gsap, useGSAP, ScrollTrigger } from 'src/lib/gsap'
import { reducedMotion } from 'src/lib/intro'
import type { Tile } from 'src/components/gallery/helpers'
import type { ThemeId } from 'src/components/gallery/helpers/photos'
import { useGalleryReducer } from 'src/components/gallery/store'

const still = () => window.matchMedia(reducedMotion).matches

const desktop = () => window.matchMedia('(min-width: 48rem)').matches

const mod = (value: number, count: number) => (value % count + count) % count

// Endless loop: every card sits at a wrapped offset from the current position, so there is always a
// neighbour on both sides and the jump from one end to the other happens out of sight
export const useGalleryCarousel = (tabs: Record<ThemeId, Array<Tile>>, onOpen: (tile: Tile, origin: HTMLElement) => void) => {
  const [{ active, shown, slide }, dispatch] = useGalleryReducer()
  const track = useRef<HTMLUListElement>(null)
  const proxy = useRef({ pos: 0 })
  const entered = useRef(false)
  const leaving = useRef<gsap.core.Timeline | null>(null)
  const drag = useRef<{ x: number, start: number, moved: boolean } | null>(null)
  const dragged = useRef(false)
  const wheel = useRef({ sum: 0, locked: false })
  const tiles = tabs[shown]

  const metrics = () => {
    const cards = Array.from(track.current?.children ?? []) as Array<HTMLElement>
    const gap = track.current ? parseFloat(getComputedStyle(track.current).columnGap) || 0 : 0
    const visible = desktop() ? 3 : 1

    return { cards, step: (cards[0]?.offsetWidth ?? 0) + gap, visible }
  }

  const offset = (index: number, count: number, visible: number) => {
    const center = (visible - 1) / 2
    return gsap.utils.wrap(center - count / 2, center + count / 2, index - proxy.current.pos)
  }

  const render = () => {
    const { cards, step, visible } = metrics()
    cards.forEach((card, i) => gsap.set(card, { x: offset(i, cards.length, visible) * step }).then())
  }

  const goTo = (target: number, duration = 0.9) => {
    dispatch({ type: 'SLIDE', index: mod(target, tiles.length) })
    gsap.to(proxy.current, { pos: target, duration: still() ? 0 : duration, ease: 'expo.out', overwrite: true, onUpdate: render }).then()
  }

  const nearest = () => Math.round(proxy.current.pos)

  // Cards on screen and the half-faded neighbours animate; the rest are simply set
  const split = () => {
    const { cards, visible } = metrics()
    const near = (i: number) => {
      const d = offset(i, cards.length, visible)
      return d >= -1 && d <= visible
    }

    return { inView: cards.filter((_, i) => near(i)), rest: cards.filter((_, i) => !near(i)) }
  }

  const within = (cards: Array<HTMLElement>, selector: string) => cards.map(card => card.querySelector(selector))

  const reveal = () => {
    const { inView, rest } = split()

    gsap.set(within(rest, '.carousel-frame'), { clipPath: 'inset(0% 0% 0% 0%)', y: 0 }).then()
    gsap.set(within(rest, '.carousel-shadow'), { opacity: 1 }).then()

    gsap.timeline({ defaults: { ease: 'expo.out', stagger: 0.09 } })
      .fromTo(within(inView, '.carousel-frame'),
        { clipPath: 'inset(100% 0% 0% 0%)', y: 48 },
        { clipPath: 'inset(0% 0% 0% 0%)', y: 0, duration: 1.3 }, 0)
      .fromTo(within(inView, '.carousel-image'), { scale: 1.3 }, { scale: 1, duration: 1.8 }, 0)
      .fromTo(within(inView, '.carousel-shadow'), { opacity: 0 }, { opacity: 1, duration: 1.2 }, 0.3).then()
  }

  useGSAP(() => {
    gsap.killTweensOf(proxy.current)
    proxy.current.pos = 0
    render()

    if (still()) return

    if (entered.current) {
      reveal()
      return
    }

    const { cards } = metrics()
    gsap.set(within(cards, '.carousel-frame'), { clipPath: 'inset(100% 0% 0% 0%)' }).then()
    gsap.set(within(cards, '.carousel-shadow'), { opacity: 0 }).then()

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

  // Card size and the number of visible cards change with the viewport
  useEffect(() => {
    window.addEventListener('resize', render)
    return () => window.removeEventListener('resize', render)
  })

  const select = (tab: ThemeId) => {
    if (tab === active) return
    dispatch({ type: 'SELECT_TAB', tab })

    if (still() || !entered.current) {
      dispatch({ type: 'SHOW_TAB' })
      return
    }

    if (leaving.current?.isActive()) return

    gsap.killTweensOf(proxy.current)
    const { inView } = split()

    leaving.current = gsap.timeline({ defaults: { ease: 'power3.in', stagger: 0.06 }, onComplete: () => dispatch({ type: 'SHOW_TAB' }) })
      .to(within(inView, '.carousel-frame'), { clipPath: 'inset(0% 0% 100% 0%)', y: -32, duration: 0.6 }, 0)
      .to(within(inView, '.carousel-image'), { scale: 1.15, duration: 0.6 }, 0)
      .to(within(inView, '.carousel-shadow'), { opacity: 0, duration: 0.3 }, 0)
  }

  const onPointerDown = (event: PointerEvent<HTMLElement>) => {
    if (event.button !== 0 || leaving.current?.isActive()) return

    gsap.killTweensOf(proxy.current)
    drag.current = { x: event.clientX, start: proxy.current.pos, moved: false }
  }

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    const state = drag.current
    if (!state) return

    const dx = event.clientX - state.x
    if (!state.moved && Math.abs(dx) < 6) return

    if (!state.moved) {
      state.moved = true
      event.currentTarget.setPointerCapture(event.pointerId)
    }

    proxy.current.pos = state.start - dx / (metrics().step || 1)
    render()
  }

  const onPointerUp = (event: PointerEvent<HTMLElement>) => {
    const state = drag.current
    drag.current = null
    if (!state) return

    if (!state.moved) {
      goTo(Math.round(state.start))
      return
    }

    dragged.current = true
    requestAnimationFrame(() => {
      dragged.current = false
    })

    const { step } = metrics()
    const dx = event.clientX - state.x
    const shift = Math.abs(dx) > step * 0.15 ? -Math.sign(dx) * Math.max(1, Math.round(Math.abs(dx) / step)) : 0

    goTo(Math.round(state.start) + shift, 1.1)
  }

  const onPointerCancel = () => {
    if (!drag.current) return
    drag.current = null
    goTo(nearest())
  }

  const onWheel = (event: WheelEvent<HTMLElement>) => {
    if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return

    wheel.current.sum += event.deltaX
    if (wheel.current.locked || Math.abs(wheel.current.sum) < 40) return

    goTo(nearest() + Math.sign(wheel.current.sum))
    wheel.current = { sum: 0, locked: true }
    setTimeout(() => {
      wheel.current.locked = false
    }, 450)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return

    event.preventDefault()
    goTo(nearest() + (event.key === 'ArrowRight' ? 1 : -1))
  }

  // Dots take the shortest way round the loop
  const pick = (index: number) => goTo(nearest() + gsap.utils.wrap(-tiles.length / 2, tiles.length / 2, index - slide))

  // A tap on a half-faded neighbour slides it into view; a tap on a visible card opens it
  const onCard = (index: number) => (event: MouseEvent<HTMLElement>) => {
    if (dragged.current) return

    const { visible } = metrics()
    const d = Math.round(offset(index, tiles.length, visible))

    if (d < 0) goTo(nearest() + d)
    else if (d >= visible) goTo(nearest() + d - visible + 1)
    else onOpen(tiles[index]!, event.currentTarget)
  }

  return { track, active, tiles, slide, select, pick, onCard, onPointerDown, onPointerMove, onPointerUp, onPointerCancel, onWheel, onKeyDown }
}
