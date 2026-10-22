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
        .set('.hero-logo path', { stroke: 'currentColor', strokeWidth: 1.5, fillOpacity: 0 }, 0)
        .fromTo('.logo-sun',
          { drawSVG: 0, rotate: -60, scale: 0.85, transformOrigin: '50% 50%' },
          { drawSVG: '100%', rotate: 0, scale: 1, duration: 1.8, ease: 'power2.inOut' }, intro.logo)
        .fromTo('.logo-mountain',
          { drawSVG: '50% 50%' },
          { drawSVG: '0% 100%', duration: 1.2, stagger: 0.15, ease: 'power2.inOut' }, intro.logo + 0.3)
        .fromTo('.logo-letter',
          { drawSVG: 0 },
          { drawSVG: '100%', duration: 1.1, stagger: 0.08, ease: 'power2.inOut' }, intro.logo + 0.5)
        .fromTo('.logo-tours',
          { drawSVG: 0 },
          { drawSVG: '100%', duration: 0.9, ease: 'power2.inOut' }, intro.logo + 1.1)
        .to('.logo-sun, .logo-mountain', { fillOpacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' }, intro.logo + 1.5)
        .to('.logo-letter', { fillOpacity: 1, duration: 0.6, stagger: 0.06, ease: 'power2.out' }, intro.logo + 1.7)
        .to('.logo-tours', { fillOpacity: 1, duration: 0.6, ease: 'power2.out' }, intro.logo + 2.1)
        .to('.hero-logo path', { strokeOpacity: 0, duration: 0.8, ease: 'power2.out' }, intro.logo + 2.4)
        .fromTo('.hero-word',
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.4, stagger: 0.12 }, intro.tagline).then()
    })

    return () => mm.revert()
  }, { scope: container })

  return { container }
}
