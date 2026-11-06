import { useRef } from 'react'
import { gsap, useGSAP } from 'src/lib/gsap'
import { reducedMotion } from 'src/lib/intro'

export const useContact = () => {
  const container = useRef<HTMLElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add(reducedMotion, () => {
      gsap.set('.contact-title', { autoAlpha: 1 }).then()
    })

    mm.add(`not all and ${reducedMotion}`, () => {
      const rows = gsap.utils.toArray<HTMLElement>('.contact-row')

      const tl = gsap.timeline({
        defaults: { ease: 'expo.out' },
        scrollTrigger: { trigger: container.current, start: 'top 75%', once: true }
      })
        .set('.contact-title', { autoAlpha: 1 }, 0)
        .set('.contact-letter', { stroke: 'currentColor', strokeWidth: 0.35, fillOpacity: 0, autoRound: false }, 0)
        .fromTo('.contact-letter',
          { drawSVG: '0%', y: 4 },
          { drawSVG: '100%', y: 0, duration: 1.1, stagger: 0.07, ease: 'power2.inOut' }, 0)
        .to('.contact-letter', { fillOpacity: 1, strokeOpacity: 0, duration: 0.6, stagger: 0.06, ease: 'power2.out' }, 0.8)
        .fromTo('.contact-word', { yPercent: 100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1, stagger: 0.03 }, 0.4)

      rows.forEach((row, i) => {
        const at = 0.5 + i * 0.18

        tl.fromTo(row.querySelector('.contact-line'), { scaleX: 0 }, { scaleX: 1, duration: 1.3, ease: 'expo.inOut' }, at)
          .fromTo(row.querySelector('.contact-icon'),
            { scale: 0, rotate: -90 },
            { scale: 1, rotate: 0, duration: 1, ease: 'back.out(2)' }, at + 0.3)
          .fromTo(row.querySelectorAll('.contact-in'), { yPercent: 100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.9, stagger: 0.07 }, at + 0.4).then()
      })

      tl.fromTo('.contact-rule', { scaleX: 0 }, { scaleX: 1, duration: 1.6, ease: 'expo.inOut' }, 0.9)
        .fromTo('.contact-foot', { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1, stagger: 0.12 }, 1.5).then()
    })

    return () => mm.revert()
  }, { scope: container })

  return { container }
}
