import { useRef } from 'react'
import { gsap, useGSAP } from 'src/lib/gsap'
import { reducedMotion } from 'src/lib/intro'

const threshold = 280

export const useFloatingBack = () => {
  const wrapper = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const element = wrapper.current
    if (!element) return

    const still = window.matchMedia(reducedMotion).matches
    let shown = false
    let frame = 0

    gsap.set(element, { autoAlpha: 0, x: -16, scale: 0.8 }).then()

    const update = () => {
      frame = 0
      const show = window.scrollY > threshold
      if (show === shown) return
      shown = show

      element.inert = !show

      gsap.to(element, show
        ? { autoAlpha: 1, x: 0, scale: 1, duration: still ? 0 : 0.8, ease: 'expo.out', overwrite: 'auto' }
        : { autoAlpha: 0, x: -16, scale: 0.8, duration: still ? 0 : 0.45, ease: 'power3.in', overwrite: 'auto' }).then()
    }

    const schedule = () => {
      frame ||= requestAnimationFrame(update)
    }

    element.inert = true
    window.addEventListener('scroll', schedule, { passive: true })
    schedule()

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
    }
  }, { scope: wrapper })

  return { wrapper }
}
