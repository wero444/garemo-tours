import { useRef } from 'react'
import { gsap, useGSAP } from 'src/lib/gsap'
import { reducedMotion } from 'src/lib/intro'

export const useDivider = () => {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add(reducedMotion, () => {
      gsap.set('.divider-icon', { autoAlpha: 1 }).then()
    })

    mm.add(`not all and ${reducedMotion}`, () => {
      const [left, right] = gsap.utils.toArray<HTMLElement>('.divider-glint')

      // The icon pops up first, then the lines draw outward from it
      gsap.timeline({
        defaults: { ease: 'expo.out' },
        scrollTrigger: { trigger: container.current, start: 'top 85%', once: true }
      })
        .fromTo('.divider-icon',
          { autoAlpha: 0, scale: 0, rotate: -30, transformOrigin: '50% 100%' },
          { autoAlpha: 1, scale: 1, rotate: 0, duration: 1.2, ease: 'back.out(2.2)' }, 0)
        .fromTo('.divider-line', { scaleX: 0 }, { scaleX: 1, duration: 1.6, ease: 'expo.inOut' }, 0.2)
        .call(() => {
          gsap.fromTo('.divider-icon', { rotate: -6 }, { rotate: 6, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1 }).then()

          // Every few seconds a glint travels out along both lines and fades at the ends
          gsap.timeline({ repeat: -1, repeatDelay: 3.5, defaults: { duration: 1.8, ease: 'power2.inOut' } })
            .fromTo(left, { right: '0%' }, { right: '100%' }, 0)
            .fromTo(right, { left: '0%' }, { left: '100%' }, 0)
            .fromTo([left, right], { opacity: 0 }, { keyframes: { opacity: [0, 1, 1, 0] } }, 0).then()
        }, [], 1.6).then()
    })

    return () => mm.revert()
  }, { scope: container })

  return { container }
}
