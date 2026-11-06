import { useEffect, useRef, type MouseEvent, type PointerEvent, type RefObject } from 'react'
import { gsap, ScrollTrigger } from 'src/lib/gsap'
import { reducedMotion } from 'src/lib/intro'
import type { MapApi } from 'src/components/destinations/helpers/scene'
import type { Region } from 'src/components/destinations/helpers'

interface Options {
  regions: Array<Region>
  wrapper: RefObject<HTMLDivElement | null>
  canvas: RefObject<HTMLCanvasElement | null>
  onFrame: RefObject<(api: MapApi) => void>
  onHover: (id: string | null) => void
  onPick: (id: string | null) => void
  active: string | null
  hovered: string | null
}

const dark = () => document.documentElement.classList.contains('dark')

export const useDestinationsMap = ({ regions, wrapper, canvas, onFrame, onHover, onPick, active, hovered }: Options) => {
  const api = useRef<MapApi | null>(null)
  const hover = useRef<string | null>(null)
  const state = useRef({ active, hovered })

  useEffect(() => {
    state.current = { active, hovered }
    api.current?.setActive(active)
    api.current?.setHovered(hovered)
  }, [active, hovered])

  useEffect(() => {
    const element = wrapper.current
    const surface = canvas.current
    if (!element || !surface) return

    const still = window.matchMedia(reducedMotion).matches
    let disposed = false
    let visible = false
    let introduced = false
    let wantsIntro = false
    let cleanup: (() => void) | null = null

    const tick = (time: number) => {
      if (!api.current) return
      api.current.render(time)
      onFrame.current(api.current)
    }

    const run = (on: boolean) => {
      if (on === visible) return
      visible = on
      if (on) gsap.ticker.add(tick)
      else gsap.ticker.remove(tick)
    }

    const start = () => {
      if (!api.current || introduced || !wantsIntro) return
      introduced = true
      api.current.intro()
    }

    const intro = ScrollTrigger.create({
      trigger: element,
      start: 'top 75%',
      once: true,
      onEnter: () => {
        wantsIntro = true
        start()
      }
    })

    const build = async () => {
      const { createMap, themes } = await import('src/components/destinations/helpers/scene')
      if (disposed) return

      const map = createMap(surface, regions, themes[dark() ? 'dark' : 'light'], still)
      api.current = map
      map.resize(element.clientWidth, element.clientHeight)
      map.setActive(state.current.active)
      map.setHovered(state.current.hovered)

      const resize = new ResizeObserver(() => map.resize(element.clientWidth, element.clientHeight))
      resize.observe(element)

      const theme = new MutationObserver(() => map.setTheme(themes[dark() ? 'dark' : 'light']))
      theme.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

      const seen = new IntersectionObserver(([entry]) => run(Boolean(entry?.isIntersecting)))
      seen.observe(element)

      start()

      cleanup = () => {
        resize.disconnect()
        theme.disconnect()
        seen.disconnect()
        map.dispose()
      }
    }

    const near = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return
      near.disconnect()
      build().then()
    }, { rootMargin: '600px 0px' })
    near.observe(element)

    return () => {
      disposed = true
      near.disconnect()
      intro.kill()
      run(false)
      cleanup?.()
      api.current = null
    }
  }, [regions, wrapper, canvas, onFrame])

  const local = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    return { x: event.clientX - rect.left, y: event.clientY - rect.top, rect }
  }

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    const map = api.current
    if (!map || event.pointerType === 'touch') return

    const { x, y, rect } = local(event)
    map.lean(x / rect.width - 0.5, y / rect.height - 0.5)

    const id = map.pick(x, y)
    if (id === hover.current) return
    hover.current = id
    event.currentTarget.style.cursor = id ? 'pointer' : ''
    onHover(id)
  }

  const onPointerLeave = (event: PointerEvent<HTMLElement>) => {
    api.current?.lean(0, 0)
    hover.current = null
    event.currentTarget.style.cursor = ''
    onHover(null)
  }

  const onClick = (event: MouseEvent<HTMLElement>) => {
    const map = api.current
    if (!map) return
    const { x, y } = local(event)
    onPick(map.pick(x, y))
  }

  return { onPointerMove, onPointerLeave, onClick }
}
