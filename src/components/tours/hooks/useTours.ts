import { useRef, type PointerEvent, type FocusEvent } from 'react'
import { gsap, useGSAP } from 'src/lib/gsap'
import { reducedMotion } from 'src/lib/intro'
import { pressEnter, pressMove, pressRelease } from 'src/lib/press'

type Target = PointerEvent<HTMLElement> | FocusEvent<HTMLElement>

export const useTours = () => {
  const container = useRef<HTMLElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add(reducedMotion, () => {
      gsap.set('.tour, .tours-title, .tours-eagle, .tours-description', { autoAlpha: 1 }).then()
    })

    mm.add(`not all and ${reducedMotion}`, () => {
      const header = gsap.timeline({
        defaults: { ease: 'expo.out' },
        scrollTrigger: { trigger: '.tours-title', start: 'top 85%', once: true }
      })

      // Title is drawn letter by letter, then filled
      header.set('.tours-title, .tours-description', { autoAlpha: 1 })
        .set('.tours-letter', { stroke: 'currentColor', strokeWidth: 0.35, fillOpacity: 0 })
        .fromTo('.tours-letter',
          { drawSVG: '0%', y: 6 },
          { drawSVG: '100%', y: 0, duration: 1.1, stagger: 0.1, ease: 'power2.inOut' }, 0)
        .to('.tours-letter', { fillOpacity: 1, strokeOpacity: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out' }, 0.9)
        .fromTo('.tours-word', { yPercent: 100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1, stagger: 0.03 }, 0.6).then()

      // Wings beat by folding toward the body from where they join it
      const flap = gsap.timeline({ repeat: -1, yoyo: true, defaults: { duration: 0.32, ease: 'sine.inOut' } })
        .fromTo('.eagle-wing-top',
          { scaleY: 1, rotate: 0, transformOrigin: '8% 95%' },
          { scaleY: 0.55, rotate: 8 }, 0)
        .fromTo('.eagle-wing-bottom',
          { scaleY: 1, rotate: 0, transformOrigin: '60% 4%' },
          { scaleY: 0.6, rotate: -6 }, 0)
        .timeScale(1.8)

      // Air peels off under the wing: thin streaks slice through and trail away
      const wind = gsap.timeline({ repeat: -1, repeatDelay: 0.25 })
        .fromTo('.eagle-wind path',
          { drawSVG: '0% 0%', opacity: 0 },
          { drawSVG: '0% 100%', opacity: 0.85, duration: 0.55, stagger: 0.14, ease: 'power2.out' })
        .to('.eagle-wind path', { drawSVG: '100% 100%', opacity: 0, duration: 0.6, stagger: 0.14, ease: 'power2.in' }, 0.45)
        .timeScale(1.4)

      // The eagle sweeps in on an arc beating fast, then settles into a slow glide
      header.fromTo('.tours-eagle',
        { autoAlpha: 0, x: -160, scale: 0.4, rotate: -30 },
        { autoAlpha: 1, x: 0, scale: 1, rotate: 0, duration: 2.4, ease: 'power3.out' }, 0.2)
        .fromTo('.tours-eagle', { y: 90 }, { y: 0, duration: 2.4, ease: 'power2.out' }, 0.2)
        .to(flap, { timeScale: 0.55, duration: 1.6, ease: 'power2.out' }, 1.8)
        .to(wind, { timeScale: 0.7, duration: 1.6, ease: 'power2.out' }, 1.8)
        .call(() => {
          // Every so often it beats a few quick strokes and glides again
          gsap.timeline({ repeat: -1, repeatDelay: 4 })
            .to([flap, wind], { timeScale: (i: number) => [1.6, 1.4][i], duration: 0.4, ease: 'power2.out' })
            .to([flap, wind], { timeScale: (i: number) => [0.55, 0.7][i], duration: 1.6, ease: 'power2.inOut' }, 1.2).then()
        }, [], 2.6).then()

      const columns = window.matchMedia('(min-width: 48rem)').matches

      gsap.utils.toArray<HTMLElement>('.tour').forEach((tour, i) => {
        const q = gsap.utils.selector(tour)

        gsap.timeline({
          delay: columns ? i * 0.16 : 0,
          defaults: { ease: 'expo.out' },
          scrollTrigger: { trigger: tour, start: 'top 85%', once: true }
        })
          .set(tour, { autoAlpha: 1 })
          .fromTo(q('.tour-frame'),
            { clipPath: 'inset(100% 0% 0% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'expo.inOut' }, 0)
          .fromTo(q('.tour-image'), { scale: 1.35 }, { scale: 1, duration: 2.4 }, 0.2)
          .fromTo(q('.tour-shadow'), { scaleX: 0.2, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 1.4 }, 0.5)
          .fromTo(q('.tour-meta'), { yPercent: 110 }, { yPercent: 0, duration: 1, stagger: 0.08 }, 0.8)
          .fromTo(q('.tour-dot'), { scale: 0 }, { scale: 1, duration: 0.8, ease: 'back.out(3)' }, 0.9)
          .fromTo(q('.tour-title-word'),
            { yPercent: 110, rotate: 8 },
            { yPercent: 0, rotate: 0, duration: 1.1, stagger: 0.018 }, 0.95)
          .fromTo(q('.tour-word'), { yPercent: 100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1, stagger: 0.025 }, 1.1)
          .fromTo(q('.tour-cta-in'), { yPercent: 110 }, { yPercent: 0, duration: 0.9, stagger: 0.02 }, 1.3)
          .fromTo(q('.tour-cta-line'),
            { scaleX: 0, transformOrigin: 'left center' },
            { scaleX: 1, duration: 1.2, ease: 'expo.inOut' }, 1.35).then()

        // Images drift slightly slower than the page while scrolling past
        gsap.fromTo(q('.tour-parallax'), { yPercent: -5 }, {
          yPercent: 5,
          ease: 'none',
          scrollTrigger: { trigger: tour, start: 'top bottom', end: 'bottom top', scrub: true }
        }).then()
      })
    })

    return () => mm.revert()
  }, { scope: container })

  // Slow, soft zoom in and a press-in tilt on hover; a quicker return when the pointer leaves
  const onMediaEnter = (event: PointerEvent<HTMLElement>) => {
    pressEnter(event)
    gsap.to(event.currentTarget.querySelector('.tour-image'), { scale: 1.08, duration: 2.2, ease: 'power2.out', overwrite: 'auto' }).then()
  }

  const onMediaLeave = (event: PointerEvent<HTMLElement>) => {
    pressRelease(event)
    gsap.to(event.currentTarget.querySelector('.tour-image'), { scale: 1, duration: 0.6, ease: 'power2.out', overwrite: 'auto' }).then()
  }

  // CTA letters roll up to reveal a second copy, while the underline sweeps out and back in
  const onCtaEnter = (event: Target) => {
    const cta = event.currentTarget

    gsap.to(cta.querySelectorAll('.tour-cta-char'), { yPercent: -100, duration: 0.5, stagger: 0.012, ease: 'power3.out', overwrite: 'auto' }).then()
    gsap.timeline()
      .to(cta.querySelector('.tour-cta-line'), { scaleX: 0, transformOrigin: 'right center', duration: 0.35, ease: 'power2.in', overwrite: 'auto' })
      .set(cta.querySelector('.tour-cta-line'), { transformOrigin: 'left center' })
      .to(cta.querySelector('.tour-cta-line'), { scaleX: 1, duration: 0.55, ease: 'expo.out' }).then()
  }

  const onCtaLeave = (event: Target) => {
    gsap.to(event.currentTarget.querySelectorAll('.tour-cta-char'), { yPercent: 0, duration: 0.5, stagger: 0.012, ease: 'power3.out', overwrite: 'auto' }).then()
  }

  return { container, onMediaEnter, onMediaMove: pressMove, onMediaLeave, onCtaEnter, onCtaLeave }
}
