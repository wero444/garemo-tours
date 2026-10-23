import { useRef, type FocusEvent, type PointerEvent } from 'react'
import { gsap, useGSAP } from 'src/lib/gsap'
import { reducedMotion } from 'src/lib/intro'

type Target = PointerEvent<HTMLElement> | FocusEvent<HTMLElement>

const ease = { ease: 'expo.out', overwrite: 'auto' as const }

export const usePartners = () => {
  const container = useRef<HTMLElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add(reducedMotion, () => {
      gsap.set('.partners-tag, .partners-cta', { autoAlpha: 1 }).then()
    })

    mm.add(`not all and ${reducedMotion}`, () => {
      gsap.timeline({
        defaults: { ease: 'expo.out' },
        scrollTrigger: { trigger: container.current, start: 'top 65%', once: true }
      })
        .fromTo('.partners-media',
          { clipPath: 'inset(12% 8% 12% 8% round 32px)' },
          { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 2.2, ease: 'expo.inOut' }, 0)
        .fromTo('.partners-image', { scale: 1.3 }, { scale: 1, duration: 2.8, ease: 'power3.out' }, 0)
        .fromTo('.partners-rule', { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'expo.inOut' }, 0.8)
        .fromTo('.partners-eyebrow',
          { autoAlpha: 0, letterSpacing: '0.9em' },
          { autoAlpha: 1, letterSpacing: '0.35em', duration: 1.6 }, 0.9)
        .fromTo('.partners-char',
          { yPercent: 110, rotate: 6 },
          { yPercent: 0, rotate: 0, duration: 1.3, stagger: 0.035 }, 1)
        .fromTo('.partners-word', { yPercent: 100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1, stagger: 0.02 }, 1.5)
        .fromTo('.partners-tag',
          { autoAlpha: 0, y: 16, scale: 0.9, filter: 'blur(6px)' },
          { autoAlpha: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1, stagger: 0.12, clearProps: 'filter' }, 1.9)
        .fromTo('.partners-cta',
          { autoAlpha: 0, y: 24, clipPath: 'inset(0% 100% 0% 0% round 999px)' },
          { autoAlpha: 1, y: 0, clipPath: 'inset(0% 0% 0% 0% round 999px)', duration: 1.4, ease: 'expo.inOut', clearProps: 'clipPath' }, 2.2)
        .fromTo('.partners-arrow', { xPercent: -220 }, { xPercent: 0, duration: 1 }, 2.9).then()

      // Slow parallax on the photo and mist drifting across it
      gsap.fromTo('.partners-image', { yPercent: -6 }, {
        yPercent: 6,
        ease: 'none',
        scrollTrigger: { trigger: container.current, start: 'top bottom', end: 'bottom top', scrub: true }
      }).then()

      gsap.utils.toArray<HTMLElement>('.partners-mist').forEach((mist, i) => {
        gsap.to(mist, {
          xPercent: i ? -18 : 22,
          yPercent: i ? 8 : -6,
          duration: 9 + i * 3,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1
        }).then()
      })
    })

    return () => mm.revert()
  }, { scope: container })

  const onCtaEnter = (event: Target) => {
    const cta = event.currentTarget

    gsap.to(cta.querySelector('.partners-cta-fill'), { clipPath: 'circle(150% at 0% 50%)', duration: 0.9, ...ease }).then()
    gsap.to(cta.querySelectorAll('.partners-cta-char'), { yPercent: -100, duration: 0.5, stagger: 0.012, ease: 'power3.out', overwrite: 'auto' }).then()
    gsap.to(cta.querySelector('.partners-arrow'), { xPercent: 220, duration: 0.45, ease: 'power3.in', overwrite: 'auto' }).then()
    gsap.fromTo(cta.querySelector('.partners-arrow-next'), { xPercent: -220 }, { xPercent: 0, duration: 0.7, delay: 0.25, ...ease }).then()
  }

  const onCtaLeave = (event: Target) => {
    const cta = event.currentTarget

    gsap.to(cta.querySelector('.partners-cta-fill'), { clipPath: 'circle(0% at 0% 50%)', duration: 0.7, ease: 'power3.inOut', overwrite: 'auto' }).then()
    gsap.to(cta.querySelectorAll('.partners-cta-char'), { yPercent: 0, duration: 0.5, stagger: 0.012, ease: 'power3.out', overwrite: 'auto' }).then()
    gsap.to(cta.querySelector('.partners-arrow-next'), { xPercent: 220, duration: 0.4, ease: 'power3.in', overwrite: 'auto' }).then()
    gsap.fromTo(cta.querySelector('.partners-arrow'), { xPercent: -220 }, { xPercent: 0, duration: 0.7, delay: 0.2, ...ease }).then()
    gsap.to(cta, { x: 0, y: 0, duration: 1.2, ease: 'elastic.out(1, 0.45)', overwrite: 'auto' }).then()
  }

  const onCtaMove = (event: PointerEvent<HTMLElement>) => {
    if (window.matchMedia(reducedMotion).matches) return

    const { left, top, width, height } = event.currentTarget.getBoundingClientRect()
    const px = (event.clientX - left) / width - 0.5
    const py = (event.clientY - top) / height - 0.5

    gsap.to(event.currentTarget, { x: px * 14, y: py * 10, duration: 0.6, ease: 'power3.out', overwrite: 'auto' }).then()
  }

  return { container, onCtaEnter, onCtaMove, onCtaLeave }
}
