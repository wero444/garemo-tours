import { useRef, type FocusEvent, type PointerEvent } from 'react'
import { gsap, useGSAP } from 'src/lib/gsap'
import { reducedMotion } from 'src/lib/intro'

type Target = PointerEvent<HTMLElement> | FocusEvent<HTMLElement>

const threshold = 600

export const circumference = 2 * Math.PI * 23

export const useBackToTop = () => {
  const button = useRef<HTMLButtonElement>(null)

  useGSAP(() => {
    const element = button.current
    const ring = element?.querySelector<SVGCircleElement>('.top-ring')
    if (!element || !ring) return

    let shown = false
    let frame = 0

    gsap.set(element, { autoAlpha: 0, y: 16, scale: 0.8 }).then()

    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0

      ring.style.strokeDashoffset = `${circumference * (1 - progress)}`

      const show = window.scrollY > threshold
      if (show === shown) return
      shown = show

      gsap.to(element, show
        ? { autoAlpha: 1, y: 0, scale: 1, duration: 0.8, ease: 'expo.out', overwrite: 'auto' }
        : { autoAlpha: 0, y: 16, scale: 0.8, duration: 0.45, ease: 'power3.in', overwrite: 'auto' }).then()
    }

    const schedule = () => {
      frame ||= requestAnimationFrame(update)
    }

    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    schedule()

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, { scope: button })

  const lift = (element: HTMLElement) => {
    gsap.to(element.querySelector('.top-arrow'), { yPercent: -220, duration: 0.45, ease: 'power3.in', overwrite: 'auto' }).then()
    gsap.fromTo(element.querySelector('.top-arrow-next'), { yPercent: 220 }, { yPercent: 0, duration: 0.7, delay: 0.2, ease: 'expo.out', overwrite: 'auto' }).then()
  }

  const settle = (element: HTMLElement) => {
    gsap.to(element.querySelector('.top-arrow-next'), { yPercent: -220, duration: 0.4, ease: 'power3.in', overwrite: 'auto' }).then()
    gsap.fromTo(element.querySelector('.top-arrow'), { yPercent: 220 }, { yPercent: 0, duration: 0.7, delay: 0.15, ease: 'expo.out', overwrite: 'auto' }).then()
  }

  const onTopEnter = (event: Target) => lift(event.currentTarget)

  const onTopLeave = (event: Target) => settle(event.currentTarget)

  const onTop = () => {
    window.scrollTo({ top: 0, behavior: window.matchMedia(reducedMotion).matches ? 'auto' : 'smooth' })
  }

  return { button, onTop, onTopEnter, onTopLeave }
}
