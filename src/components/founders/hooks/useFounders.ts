import { useRef } from 'react'
import { gsap, useGSAP } from 'src/lib/gsap'
import { reducedMotion } from 'src/lib/intro'
import { pressEnter, pressMove, pressRelease } from 'src/lib/press'

export const useFounders = () => {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add(reducedMotion, () => {
      gsap.set('.founder', { autoAlpha: 1 }).then()
    })

    mm.add(`not all and ${reducedMotion}`, () => {
      // Each arch rises out of the ground, then its details, light and shadow settle in
      gsap.utils.toArray<HTMLElement>('.founder').forEach((founder, i) => {
        const q = gsap.utils.selector(founder)

        gsap.timeline({
          delay: i * 0.18,
          defaults: { ease: 'expo.out' },
          scrollTrigger: { trigger: founder, start: 'top 85%', once: true }
        })
          .set(founder, { autoAlpha: 1 })
          .fromTo(q('.founder-frame'),
            { clipPath: 'inset(100% 0% 0% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'expo.inOut' }, 0)
          .fromTo(q('.founder-image'), { scale: 1.3 }, { scale: 1, duration: 2.2 }, 0.2)
          .fromTo(q('.founder-ground'), { scaleX: 0.2, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 1.4 }, 0.5)
          .fromTo(q('.founder-glow'), { opacity: 0 }, { opacity: 1, duration: 1.6, ease: 'power2.out' }, 0.9)
          .fromTo(q('.founder-name'), { yPercent: 110 }, { yPercent: 0, duration: 1.1 }, 1.1).then()
      })
    })

    return () => mm.revert()
  }, { scope: container })

  return { container, onPointerEnter: pressEnter, onPointerMove: pressMove, onPointerLeave: pressRelease }
}
