import { useRef } from 'react'
import { gsap, useGSAP } from 'src/lib/gsap'
import { intro, reducedMotion } from 'src/lib/intro'

export const useHero = () => {
  const container = useRef<HTMLElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add(reducedMotion, () => {
      gsap.set('.hero-reveal', { autoAlpha: 1 }).then()
    })

    mm.add(`not all and ${reducedMotion}`, () => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

      tl.set('.hero-reveal', { autoAlpha: 1 })
        .fromTo('.hero-frame',
          { clipPath: 'inset(22% 34% 22% 34%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.8, ease: 'expo.inOut' }, 0)
        .fromTo('.hero-image', { scale: 1.4 }, { scale: 1, duration: 2.8 }, 0)
        .fromTo('.hero-shade', { opacity: 0 }, { opacity: 1, duration: 1.6, ease: 'power2.out' }, 0.8)
        .fromTo('.logo-sun',
          { scale: 0.4, rotate: -90, opacity: 0, transformOrigin: '50% 50%' },
          { scale: 1, rotate: 0, opacity: 1, duration: 1.8 }, intro.logo)
        .fromTo('.logo-mountain',
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, stagger: 0.12 }, intro.logo + 0.2)
        .fromTo('.logo-letter',
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, stagger: 0.06 }, intro.logo + 0.35)
        .fromTo('.logo-tours',
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 1 }, intro.logo + 0.8)
        .fromTo('.hero-word',
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.4, stagger: 0.12 }, intro.tagline).then()
    })

    return () => mm.revert()
  }, { scope: container })

  return { container }
}
