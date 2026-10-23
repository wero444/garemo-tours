import { useRef } from 'react'
import { gsap, useGSAP } from 'src/lib/gsap'
import { reducedMotion } from 'src/lib/intro'

export const useTravel = () => {
  const container = useRef<HTMLElement>(null)
  const loops = useRef<Array<gsap.core.Animation | undefined>>([])

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add(reducedMotion, () => {
      gsap.set('.travel-way', { autoAlpha: 1 }).then()
    })

    mm.add(`not all and ${reducedMotion}`, () => {
      gsap.timeline({
        defaults: { ease: 'expo.out' },
        scrollTrigger: { trigger: container.current, start: 'top 75%', once: true }
      })
        .fromTo('.travel-title-char',
          { yPercent: 110, rotate: 10 },
          { yPercent: 0, rotate: 0, duration: 1.2, stagger: 0.035 }, 0)
        .fromTo('.travel-rule', { scaleX: 0 }, { scaleX: 1, duration: 1.4, ease: 'expo.inOut' }, 0.4).then()

      const columns = window.matchMedia('(min-width: 40rem)').matches

      const idle = [
        () => gsap.to('.sun-rays', { rotate: -360, svgOrigin: '148.41 98.36', duration: 36, ease: 'none', repeat: -1 }),
        () => gsap.timeline({ repeat: -1 })
          .fromTo('.puri-steam path',
            { drawSVG: '0% 0%', opacity: 0, y: 0 },
            { drawSVG: '0% 100%', opacity: 0.9, duration: 1.4, stagger: 0.5, ease: 'sine.out' }, 0)
          .to('.puri-steam path', { drawSVG: '100% 100%', opacity: 0, y: -2.5, duration: 1.4, stagger: 0.5, ease: 'sine.in' }, 1.2),
        () => gsap.timeline({ repeat: -1, repeatDelay: 2.6 })
          .to('.travel-bottle', {
            keyframes: { rotate: [0, -8, 7, -5, 3, -1, 0] },
            transformOrigin: '50% 100%',
            duration: 0.9,
            ease: 'sine.inOut'
          })
      ]

      gsap.utils.toArray<HTMLElement>('.travel-way').forEach((way, i) => {
        const q = gsap.utils.selector(way)
        // Icons differ (only the bread has steam, the bottle has no filled shapes), so skip parts an icon lacks
        const steam = q('.puri-steam path')
        const fills = q('.travel-fill')
        const strokes = q('.travel-stroke')

        const tl = gsap.timeline({
          delay: columns ? i * 0.18 : 0,
          defaults: { ease: 'expo.out' },
          scrollTrigger: { trigger: way, start: 'top 85%', once: true }
        })
          .set(way, { autoAlpha: 1 })
          .fromTo(q('.travel-label'),
            { yPercent: 110, rotate: 8 },
            { yPercent: 0, rotate: 0, duration: 1.1, stagger: 0.025 }, 0.6)
          .fromTo(q('.travel-word'), { yPercent: 100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1, stagger: 0.025 }, 0.8)
          .call(() => {
            loops.current[i] = idle[i]?.()
          }, [], 1.6)

        tl.fromTo(q('.travel-icon'), { scale: 0.7, rotate: -10 }, { scale: 1, rotate: 0, duration: 1.4, ease: 'back.out(1.8)' }, 0).then()

        if (fills.length || strokes.length) {
          tl.fromTo([...fills, ...strokes],
            { drawSVG: '0%' },
            { drawSVG: '100%', duration: 1.3, stagger: 0.05, ease: 'power2.inOut' }, 0).then()
        }

        if (steam.length) tl.set(steam, { opacity: 0 }, 0).then()

        if (fills.length) {
          tl.set(fills, { stroke: 'currentColor', strokeWidth: 0.3, fillOpacity: 0, autoRound: false }, 0)
            .to(fills, { fillOpacity: 1, strokeOpacity: 0, duration: 0.6, stagger: 0.03, ease: 'power2.out' }, 1).then()
        }
      })
    })

    return () => mm.revert()
  }, { scope: container })

  const onWayEnter = (i: number) => {
    if (loops.current[i]) gsap.to(loops.current[i], { timeScale: 3, duration: 0.6, ease: 'power2.out' }).then()
  }

  const onWayLeave = (i: number) => {
    if (loops.current[i]) gsap.to(loops.current[i], { timeScale: 1, duration: 1, ease: 'power2.out' }).then()
  }

  return { container, onWayEnter, onWayLeave }
}
