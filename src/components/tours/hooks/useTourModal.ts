import { useRef } from 'react'
import { gsap, useGSAP } from 'src/lib/gsap'
import { reducedMotion } from 'src/lib/intro'

export const useTourModal = () => {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add(`not all and ${reducedMotion}`, () => {
      gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.12 })
        .fromTo('.moment-heading', { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, stagger: 0.08 }, 0)
        .fromTo('.moment', { y: 32, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.1, stagger: 0.06, clearProps: 'opacity,visibility,transform' }, 0.1)
        .fromTo('.moment-image', { scale: 1.12 }, { scale: 1, duration: 1.6, stagger: 0.06 }, 0.1)
        .fromTo('.moment-ask', { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1 }, 0.6).then()
    })

    return () => mm.revert()
  }, { scope: container })

  return { container }
}
