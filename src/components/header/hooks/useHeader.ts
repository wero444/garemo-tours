import { useRef } from 'react'
import { gsap, useGSAP } from 'src/lib/gsap'

export const useHeader = () => {
  const container = useRef<HTMLElement>(null)

  useGSAP(() => {
    const links = gsap.utils.toArray<HTMLAnchorElement>('.nav-link')
    const focus = { duration: 0.5, ease: 'power2.out', overwrite: true }

    const cleanups = links.map(link => {
      const others = links.filter(other => other !== link)

      const chars = link.querySelectorAll('.nav-char')
      const line = link.querySelector('.nav-line')

      const enter = () => {
        gsap.to(chars, {
          keyframes: { opacity: [1, 0.3, 1] },
          duration: 0.6,
          stagger: 0.03,
          ease: 'sine.inOut',
          overwrite: true
        }).then()
        gsap.set(line, { transformOrigin: 'left center' }).then()
        gsap.to(line, { scaleX: 1, duration: 0.6, ease: 'expo.out', overwrite: true }).then()
        gsap.to(others, { opacity: 0.45, ...focus }).then()
        gsap.to(link, { opacity: 1, ...focus }).then()
      }

      const leave = () => {
        gsap.set(line, { transformOrigin: 'right center' }).then()
        gsap.to(line, { scaleX: 0, duration: 0.5, ease: 'expo.inOut', overwrite: true }).then()
        gsap.to(links, { opacity: 1, ...focus }).then()
      }

      link.addEventListener('mouseenter', enter)
      link.addEventListener('mouseleave', leave)
      link.addEventListener('focus', enter)
      link.addEventListener('blur', leave)

      return () => {
        link.removeEventListener('mouseenter', enter)
        link.removeEventListener('mouseleave', leave)
        link.removeEventListener('focus', enter)
        link.removeEventListener('blur', leave)
      }
    })

    return () => cleanups.forEach(cleanup => cleanup())
  }, { scope: container })

  return { container }
}
