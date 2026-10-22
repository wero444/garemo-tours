import { useRef } from 'react'
import { gsap, useGSAP, ScrollTrigger } from 'src/lib/gsap'
import { intro, reducedMotion } from 'src/lib/intro'

export const useHeader = () => {
  const container = useRef<HTMLElement>(null)

  useGSAP(() => {
    const still = window.matchMedia(reducedMotion).matches

    const sheen = gsap.fromTo('.header-sheen',
      { xPercent: -150, opacity: 1 },
      { xPercent: 450, duration: 1.8, ease: 'power2.inOut', repeat: -1, repeatDelay: 4.5, delay: 1.2, paused: true }
    )

    let scrolled = false

    const update = (scroll: number, direction: number) => {
      container.current?.toggleAttribute('data-hidden', direction > 0 && scroll > 160)

      if (scrolled === scroll > 40) return
      scrolled = scroll > 40
      container.current?.toggleAttribute('data-scrolled', scrolled)

      if (still) return

      if (scrolled) {
        sheen.restart(true).then()
      } else {
        sheen.pause().then()
        gsap.set('.header-sheen', { opacity: 0 }).then()
      }
    }

    const trigger = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: self => update(self.scroll(), self.direction)
    })

    update(window.scrollY, 0)

    return () => trigger.kill()
  }, { scope: container })

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add(reducedMotion, () => {
      gsap.set('.nav-item', { autoAlpha: 1 }).then()
    })

    mm.add(`not all and ${reducedMotion}`, () => {
      gsap.fromTo('.nav-item',
        { autoAlpha: 0, y: -14 },
        { autoAlpha: 1, y: 0, duration: 1.2, delay: intro.nav, stagger: { each: 0.08, from: 'center' }, ease: 'expo.out' }
      ).then()
    })

    return () => mm.revert()
  }, { scope: container })

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
