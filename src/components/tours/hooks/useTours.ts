import { useRef, type MouseEvent, type PointerEvent } from 'react'
import { useToursReducer } from 'src/components/tours/store'
import { gsap, useGSAP } from 'src/lib/gsap'
import { reducedMotion } from 'src/lib/intro'

export const useTours = () => {
  const container = useRef<HTMLElement>(null)
  const [{ open, active, asking }, dispatch] = useToursReducer()

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add(reducedMotion, () => {
      gsap.set('.tour, .tours-title, .tours-eagle, .tours-subtitle, .tours-note', { autoAlpha: 1 }).then()
    })

    mm.add(`not all and ${reducedMotion}`, () => {
      const header = gsap.timeline({
        defaults: { ease: 'expo.out' },
        scrollTrigger: { trigger: '.tours-title', start: 'top 85%', once: true }
      })

      header.set('.tours-title', { autoAlpha: 1 })
        .set('.tours-letter', { stroke: 'currentColor', strokeWidth: 0.35, fillOpacity: 0, autoRound: false })
        .fromTo('.tours-letter',
          { drawSVG: '0%', y: 6 },
          { drawSVG: '100%', y: 0, duration: 1.1, stagger: 0.1, ease: 'power2.inOut' }, 0)
        .to('.tours-letter', { fillOpacity: 1, strokeOpacity: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out' }, 0.9).then()

      const flap = gsap.timeline({ repeat: -1, yoyo: true, defaults: { duration: 0.32, ease: 'sine.inOut' } })
        .fromTo('.eagle-wing-top',
          { scaleY: 1, rotate: 0, transformOrigin: '8% 95%' },
          { scaleY: 0.55, rotate: 8 }, 0)
        .fromTo('.eagle-wing-bottom',
          { scaleY: 1, rotate: 0, transformOrigin: '60% 4%' },
          { scaleY: 0.6, rotate: -6 }, 0)
        .timeScale(1.8)

      const wind = gsap.timeline({ repeat: -1, repeatDelay: 0.25 })
        .fromTo('.eagle-wind path',
          { drawSVG: '0% 0%', opacity: 0 },
          { drawSVG: '0% 100%', opacity: 0.85, duration: 0.55, stagger: 0.14, ease: 'power2.out' })
        .to('.eagle-wind path', { drawSVG: '100% 100%', opacity: 0, duration: 0.6, stagger: 0.14, ease: 'power2.in' }, 0.45)
        .timeScale(1.4)

      header.fromTo('.tours-eagle',
        { autoAlpha: 0, x: -160, scale: 0.4, rotate: -30 },
        { autoAlpha: 1, x: 0, scale: 1, rotate: 0, duration: 2.4, ease: 'power3.out' }, 0.2)
        .fromTo('.tours-eagle', { y: 90 }, { y: 0, duration: 2.4, ease: 'power2.out' }, 0.2)
        .to(flap, { timeScale: 0.55, duration: 1.6, ease: 'power2.out' }, 1.8)
        .to(wind, { timeScale: 0.7, duration: 1.6, ease: 'power2.out' }, 1.8)
        .call(() => {
          gsap.timeline({ repeat: -1, repeatDelay: 4 })
            .to([flap, wind], { timeScale: (i: number) => [1.6, 1.4][i], duration: 0.4, ease: 'power2.out' })
            .to([flap, wind], { timeScale: (i: number) => [0.55, 0.7][i], duration: 1.6, ease: 'power2.inOut' }, 1.2).then()
        }, [], 2.6)
        .fromTo('.tours-subtitle', { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 1.1 }, 0.6).then()

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
          .fromTo(q('.tour-title-word'),
            { yPercent: 110, rotate: 8 },
            { yPercent: 0, rotate: 0, duration: 1.1, stagger: 0.018 }, 0.8)
          .fromTo(q('.tour-word'), { yPercent: 100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1, stagger: 0.025 }, 0.95)
          .fromTo(q('.tour-more'), { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.9 }, 1.2).then()

        gsap.fromTo(q('.tour-parallax'), { yPercent: -5 }, {
          yPercent: 5,
          ease: 'none',
          scrollTrigger: { trigger: tour, start: 'top bottom', end: 'bottom top', scrub: true }
        }).then()
      })
      gsap.fromTo('.tours-note',
        { autoAlpha: 0, y: 16 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.tours-note', start: 'top 95%', once: true }
        }
      ).then()
    })

    return () => mm.revert()
  }, { scope: container })

  const onMediaEnter = (event: PointerEvent<HTMLElement>) => {
    gsap.to(event.currentTarget.querySelector('.tour-image'), { scale: 1.08, duration: 2.2, ease: 'power2.out', overwrite: 'auto' }).then()
  }

  const onMediaLeave = (event: PointerEvent<HTMLElement>) => {
    gsap.to(event.currentTarget.querySelector('.tour-image'), { scale: 1, duration: 0.6, ease: 'power2.out', overwrite: 'auto' }).then()
  }

  const onOpen = (index: number) => dispatch({ type: 'OPEN_TOUR', index })

  const onOpenChange = (opened: boolean) => {
    if (!opened) dispatch({ type: 'CLOSE_TOUR' })
  }

  const onAsk = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    dispatch({ type: 'ASK_ABOUT_TOUR' })
  }

  const onOpenChangeComplete = (opened: boolean) => {
    if (opened || !asking) return
    dispatch({ type: 'DONE_ASKING' })
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    history.replaceState(null, '', '#contact')
  }

  return { container, open, active, onOpenChange, onOpen, onAsk, onOpenChangeComplete, onMediaEnter, onMediaLeave }
}
