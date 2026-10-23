import { useRef } from 'react'
import { gsap, useGSAP } from 'src/lib/gsap'
import { reducedMotion } from 'src/lib/intro'

const knot = '143 97'

export const useLetters = () => {
  const container = useRef<HTMLElement>(null)

  useGSAP(() => {
    const papers = gsap.utils.toArray<HTMLElement>('.letter-paper')

    const tilt = () => papers.forEach(paper => {
      gsap.set(paper, { '--tilt': `${gsap.utils.random([-1, 1]) * gsap.utils.random(1.2, 2.8)}deg` }).then()
    })

    const mm = gsap.matchMedia()

    mm.add(reducedMotion, () => {
      gsap.set('.letters-figure, .letter-card', { autoAlpha: 1 }).then()
      tilt()
    })

    mm.add(`not all and ${reducedMotion}`, () => {
      const lines = '.letters-figure .megreli-line'

      gsap.set('.megreli-cape', { svgOrigin: knot }).then()

      const breeze = () => {
        gsap.set('.megreli-breeze', { autoAlpha: 1 }).then()
        gsap.to('.megreli-cape', { skewY: 2.5, duration: 0.45, ease: 'sine.inOut', yoyo: true, repeat: -1 }).then()

        gsap.timeline({ repeat: -1, repeatDelay: 1.6 })
          .fromTo('.megreli-breeze path', { drawSVG: '0% 0%' }, { drawSVG: '0% 45%', duration: 0.7, stagger: 0.18, ease: 'power1.in' }, 0)
          .to('.megreli-breeze path', { drawSVG: '100% 100%', duration: 0.9, stagger: 0.18, ease: 'power1.out' }, 0.7)
          .to('.megreli-cape', { rotate: 7, scaleX: 1.06, duration: 1.3, ease: 'sine.inOut' }, 0.3)
          .to('.megreli-cape', { rotate: 4, scaleX: 1.03, duration: 0.7, ease: 'sine.inOut' })
          .to('.megreli-cape', { rotate: 8, scaleX: 1.07, duration: 0.8, ease: 'sine.inOut' })
          .to('.megreli-cape', { rotate: 0, scaleX: 1, duration: 2, ease: 'sine.inOut' }).then()
      }

      gsap.timeline({
        defaults: { ease: 'expo.out' },
        scrollTrigger: { trigger: container.current, start: 'top 70%', once: true }
      })
        .set('.letters-figure', { autoAlpha: 1 })
        .set(lines, { stroke: 'currentColor', strokeWidth: 0.4, fillOpacity: 0, autoRound: false })
        .fromTo('.letters-figure', { y: 30, rotate: -3 }, { y: 0, rotate: 0, duration: 2.2 }, 0)
        .fromTo(lines, { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.8, stagger: { amount: 0.8 }, ease: 'power2.inOut' }, 0)
        .to(lines, { fillOpacity: 1, strokeOpacity: 0, duration: 0.8, stagger: { amount: 0.4 }, ease: 'power2.out' }, 1.6)
        .fromTo('.letters-char',
          { yPercent: 110, rotate: 8 },
          { yPercent: 0, rotate: 0, duration: 1.2, stagger: 0.035 }, 0.4)
        .fromTo('.letters-underline path', { drawSVG: '0%' }, { drawSVG: '100%', duration: 1.1, ease: 'power2.inOut' }, 1.2)
        .fromTo('.letter-card', { autoAlpha: 0, y: 70 }, { autoAlpha: 1, y: 0, duration: 1.4, stagger: 0.15 }, 0.9)
        .call(tilt, [], 1.1)
        .fromTo('.letter-stamp',
          { autoAlpha: 0, scale: 0.6, rotate: -12 },
          { autoAlpha: 1, scale: 1, rotate: 0, duration: 1, stagger: 0.15, ease: 'back.out(2)' }, 1.4)
        .call(breeze, [], 2.6).then()

      const drift = () => ({ trigger: container.current, start: 'top bottom', end: 'bottom top', scrub: true })

      gsap.fromTo('.letters-heading', { yPercent: 12 }, { yPercent: -12, ease: 'none', scrollTrigger: drift() }).then()
      gsap.fromTo('.letters-drift', { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: drift() }).then()
    })

    return () => mm.revert()
  }, { scope: container })

  return { container }
}
