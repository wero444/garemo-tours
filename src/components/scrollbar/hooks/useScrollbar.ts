import { useEffect, useRef, useState, type PointerEvent } from 'react'

const inset = 8
const minSize = 48

export const useScrollbar = () => {
  const thumb = useRef<HTMLDivElement>(null)
  const drag = useRef<{ y: number, scroll: number } | null>(null)
  const [visible, setVisible] = useState(false)

  const metrics = () => {
    const { scrollHeight, clientHeight } = document.documentElement
    const track = clientHeight - inset * 2
    const size = Math.max((clientHeight / scrollHeight) * track, minSize)

    return { max: scrollHeight - clientHeight, track, size }
  }

  useEffect(() => {
    const element = thumb.current
    if (!element) return

    let frame = 0
    let idle = 0

    const update = () => {
      frame = 0
      const { max, track, size } = metrics()
      const progress = max > 0 ? window.scrollY / max : 0

      element.style.height = `${size}px`
      element.style.transform = `translateY(${progress * (track - size)}px)`
      setVisible(max > 1)
    }

    const schedule = () => {
      frame ||= requestAnimationFrame(update)
    }

    const onScroll = () => {
      schedule()
      element.setAttribute('data-active', '')
      window.clearTimeout(idle)
      idle = window.setTimeout(() => element.removeAttribute('data-active'), 900)
    }

    const observer = new ResizeObserver(schedule)
    observer.observe(document.body)

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', schedule)
    schedule()

    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(idle)
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', schedule)
    }
  }, [])

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId)
    drag.current = { y: event.clientY, scroll: window.scrollY }
  }

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return

    const { max, track, size } = metrics()
    const delta = (event.clientY - drag.current.y) * (max / (track - size))

    window.scrollTo({ top: drag.current.scroll + delta, behavior: 'instant' })
  }

  const onPointerUp = () => {
    drag.current = null
  }

  return { thumb, visible, onPointerDown, onPointerMove, onPointerUp }
}
