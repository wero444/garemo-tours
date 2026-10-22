import type { FocusEvent, PointerEvent } from 'react'
import { gsap } from 'src/lib/gsap'
import { reducedMotion } from 'src/lib/intro'

type Target = PointerEvent<HTMLElement> | FocusEvent<HTMLElement>

const ease = { ease: 'expo.out', overwrite: 'auto' as const }

export const useGalleryCta = () => {
  const onCtaEnter = (event: Target) => {
    const cta = event.currentTarget
    const thumbs = cta.querySelectorAll('.cta-thumb')
    const middle = (thumbs.length - 1) / 2

    gsap.to(cta.querySelector('.cta-fill'), { clipPath: 'circle(150% at 92% 50%)', duration: 0.9, ...ease }).then()
    gsap.to(thumbs, {
      x: (i: number) => (i - middle) * 7,
      y: (i: number) => (i % 2 ? 3 : -3),
      rotate: (i: number) => (i - middle) * 12,
      duration: 0.7,
      stagger: 0.03,
      ...ease
    }).then()
    gsap.to(cta.querySelectorAll('.cta-char'), { yPercent: -100, duration: 0.5, stagger: 0.012, ease: 'power3.out', overwrite: 'auto' }).then()
    gsap.to(cta.querySelector('.cta-arrow'), { xPercent: 220, duration: 0.5, ease: 'power3.in', overwrite: 'auto' }).then()
    gsap.fromTo(cta.querySelector('.cta-arrow-next'), { xPercent: -220 }, { xPercent: 0, duration: 0.7, delay: 0.25, ...ease }).then()
  }

  const onCtaLeave = (event: Target) => {
    const cta = event.currentTarget

    gsap.to(cta.querySelector('.cta-fill'), { clipPath: 'circle(0% at 92% 50%)', duration: 0.7, ease: 'power3.inOut', overwrite: 'auto' }).then()
    gsap.to(cta.querySelectorAll('.cta-thumb'), { x: 0, y: 0, rotate: 0, duration: 0.8, stagger: 0.03, ...ease }).then()
    gsap.to(cta.querySelectorAll('.cta-char'), { yPercent: 0, duration: 0.5, stagger: 0.012, ease: 'power3.out', overwrite: 'auto' }).then()
    gsap.to(cta.querySelector('.cta-arrow-next'), { xPercent: 220, duration: 0.4, ease: 'power3.in', overwrite: 'auto' }).then()
    gsap.fromTo(cta.querySelector('.cta-arrow'), { xPercent: -220 }, { xPercent: 0, duration: 0.7, delay: 0.2, ...ease }).then()
    gsap.to(cta, { x: 0, y: 0, duration: 1.2, ease: 'elastic.out(1, 0.45)', overwrite: 'auto' }).then()
  }

  const onCtaMove = (event: PointerEvent<HTMLElement>) => {
    if (window.matchMedia(reducedMotion).matches) return

    const { left, top, width, height } = event.currentTarget.getBoundingClientRect()
    const px = (event.clientX - left) / width - 0.5
    const py = (event.clientY - top) / height - 0.5

    gsap.to(event.currentTarget, { x: px * 18, y: py * 12, duration: 0.6, ease: 'power3.out', overwrite: 'auto' }).then()
  }

  return { onCtaEnter, onCtaMove, onCtaLeave }
}
