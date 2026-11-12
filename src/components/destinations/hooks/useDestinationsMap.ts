import { useEffect, useRef, useState, type MouseEvent, type PointerEvent, type RefObject } from 'react'
import { gsap, useGSAP } from 'src/lib/gsap'
import { reducedMotion } from 'src/lib/intro'
import type * as Drawing from 'src/components/destinations/helpers/map'
import { anchors, type Zone } from 'src/components/destinations/helpers/zones'

type MapData = typeof Drawing

export interface Target {
  id: string | null
  zone: Zone | null
}

export interface Selected {
  id: string
  zone: Zone
  x: number
  y: number
}

interface Options {
  wrapper: RefObject<HTMLDivElement | null>
  lit: Zone | null
  selected: Selected | null
  onHover: (target: Target) => void
  onPick: (target: Target) => void
}

const still = () => window.matchMedia(reducedMotion).matches
const zones = Object.keys(anchors) as Array<Zone>

// Dots and zone shapes carry data-dot / data-hit, so one set of listeners on the wrapper covers the whole map
const find = (event: MouseEvent<HTMLElement>): Target => {
  const hit = (event.target as Element).closest<HTMLElement>('[data-dot], [data-hit]')
  return { id: hit?.dataset.dot ?? null, zone: (hit?.dataset.hit ?? null) as Zone | null }
}

export const useDestinationsMap = ({ wrapper, lit, selected, onHover, onPick }: Options) => {
  const [data, setData] = useState<MapData | null>(null)
  const current = useRef('')
  const shown = useRef<{ lit: Zone | null, selected: Selected | null }>({ lit: null, selected: null })

  // The drawing is ~130 KB gzipped: fetch it only once the section gets close
  useEffect(() => {
    const element = wrapper.current
    if (!element) return undefined

    let live = true
    const near = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return
      near.disconnect()
      import('src/components/destinations/helpers/map').then((module) => {
        if (live) setData(module)
      })
    }, { rootMargin: '800px 0px' })

    near.observe(element)
    return () => {
      live = false
      near.disconnect()
    }
  }, [wrapper])

  // Intro: the country outline draws itself, the regions surface one by one, then the dots pop in
  useGSAP(() => {
    if (!data) return undefined
    gsap.set('[data-edge], [data-ring]', { autoAlpha: 0 }).then()

    const mm = gsap.matchMedia()

    mm.add(reducedMotion, () => {
      gsap.set('.destinations-dot', { autoAlpha: 1 }).then()
    })

    mm.add(`not all and ${reducedMotion}`, () => {
      gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: wrapper.current, start: 'top 70%', once: true }
      })
        .fromTo('[data-layer="outline"]', { drawSVG: '0%' }, { drawSVG: '100%', duration: 2.6, ease: 'power2.inOut' }, 0)
        .fromTo('[data-zone]', { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.09 }, 0.35)
        .fromTo('[data-layer="borders"]', { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.4, ease: 'power1.inOut' }, 1.3)
        .fromTo('[data-layer="sky"], [data-layer="sea"]', { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 1.6, stagger: 0.2 }, 0.9)
        .fromTo('.destinations-dot', { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, scale: 1, duration: 0.7, stagger: 0.05, ease: 'back.out(2.5)' }, 1.9).then()
    })

    return () => mm.revert()
  }, { scope: wrapper, dependencies: [data] })

  // Hover and selection read differently:
  // hover — a soft wash of the region's colour and a hairline tracing out from one point both ways
  // select — the colour floods out from the chosen dot and a bold border draws around the whole region
  useGSAP(() => {
    if (!data) return
    const before = shown.current
    if (before.lit === lit && before.selected?.id === selected?.id) return
    shown.current = { lit, selected }

    const speed = still() ? 0 : 1
    const picked = selected?.zone ?? null
    const was = before.selected?.zone ?? null
    const tween = (target: string, vars: gsap.TweenVars, duration = 0.6) => gsap.to(target, { ease: 'power2.out', overwrite: true, ...vars, duration: duration * speed }).then()

    zones.forEach((zone) => {
      const hovered = zone === lit && zone !== picked
      const wasHovered = zone === before.lit && zone !== was

      if (hovered !== wasHovered) {
        tween(`[data-wash="${zone}"]`, { fillOpacity: hovered ? 0.55 : 0 }, hovered ? 0.7 : 0.5)
        if (hovered) {
          gsap.fromTo(`[data-edge="${zone}"]`,
            { drawSVG: '50% 50%', autoAlpha: 1 },
            { drawSVG: '0% 100%', duration: 1.3 * speed, ease: 'expo.inOut', overwrite: true }).then()
        } else tween(`[data-edge="${zone}"]`, { drawSVG: '50% 50%', autoAlpha: 0, ease: 'power2.inOut' })
      }

      const open = zone === lit || zone === picked
      if (open !== (zone === before.lit || zone === was)) tween(`[data-hole="${zone}"]`, { fillOpacity: open ? 1 : 0 }, 0.7)
    })

    if (was && was !== picked) {
      tween(`[data-flood="${was}"]`, { attr: { r: 0 }, ease: 'power3.in' }, 0.7)
      tween(`[data-ring="${was}"]`, { drawSVG: '100% 100%', autoAlpha: 0, ease: 'power2.in' })
    }

    if (selected && selected.id !== before.selected?.id) {
      const { zone, x, y } = selected
      const fill = wrapper.current?.querySelector<SVGPathElement>(`[data-fill="${zone}"]`)
      const box = fill?.getBBox()
      const reach = box
        ? Math.hypot(Math.max(x - box.x, box.x + box.width - x), Math.max(y - box.y, box.y + box.height - y))
        : 900

      gsap.fromTo(`[data-flood="${zone}"]`,
        { attr: { cx: x, cy: y, r: 0 } },
        { attr: { r: reach }, duration: 1.5 * speed, ease: 'expo.inOut', overwrite: true }).then()
      if (zone !== was) {
        gsap.fromTo(`[data-ring="${zone}"]`,
          { drawSVG: '0% 0%', autoAlpha: 1 },
          { drawSVG: '0% 100%', duration: 1.6 * speed, delay: 0.25 * speed, ease: 'power3.inOut', overwrite: true }).then()
      }
    }

    tween('[data-veil]', { opacity: lit || picked ? 0.6 : 0 }, 0.8)
  }, { scope: wrapper, dependencies: [data, lit, selected] })

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === 'touch') return
    const target = find(event)
    const key = `${target.id}:${target.zone}`
    if (key === current.current) return
    current.current = key
    onHover(target)
  }

  const onPointerLeave = () => {
    current.current = ''
    onHover({ id: null, zone: null })
  }

  const onClick = (event: MouseEvent<HTMLElement>) => onPick(find(event))

  return { data, handlers: { onPointerMove, onPointerLeave, onClick } }
}
