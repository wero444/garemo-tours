import { useRef, type FocusEvent, type MouseEvent, type PointerEvent } from 'react'
import { useRouter } from 'next/navigation'
import { gsap, useGSAP } from 'src/lib/gsap'
import { reducedMotion } from 'src/lib/intro'

type Target = PointerEvent<HTMLElement> | FocusEvent<HTMLElement>

const ease = { ease: 'expo.out', overwrite: 'auto' as const }

export const useBackButton = () => {
  const button = useRef<HTMLAnchorElement>(null)
  const nudge = useRef<gsap.core.Animation>(null)
  const resume = useRef<gsap.core.Tween>(null)
  const router = useRouter()

  useGSAP(() => {
    if (window.matchMedia(reducedMotion).matches) return

    nudge.current = gsap.timeline({ repeat: -1, repeatDelay: 2.8, delay: 2 })
      .to('.back-arrow', { x: -5, duration: 0.35, ease: 'power2.out' })
      .to('.back-arrow', { x: 0, duration: 0.9, ease: 'elastic.out(1, 0.4)' })
  }, { scope: button })

  const onBack = (event: MouseEvent<HTMLAnchorElement>) => {
    if (window.history.length < 2) return

    event.preventDefault()
    router.back()
  }

  const onBackEnter = (event: Target) => {
    const back = event.currentTarget

    resume.current?.kill()
    nudge.current?.pause()
    gsap.to(back.querySelector('.back-fill'), { scale: 1, duration: 0.7, ...ease }).then()
    gsap.to(back.querySelector('.back-arrow'), { x: 0, xPercent: -220, duration: 0.45, ease: 'power3.in', overwrite: 'auto' }).then()
    gsap.fromTo(back.querySelector('.back-arrow-next'), { xPercent: 220 }, { xPercent: 0, duration: 0.7, delay: 0.2, ...ease }).then()
    gsap.to(back.querySelectorAll('.back-char'), { yPercent: -100, duration: 0.5, stagger: 0.02, ease: 'power3.out', overwrite: 'auto' }).then()
  }

  const onBackLeave = (event: Target) => {
    const back = event.currentTarget

    gsap.to(back.querySelector('.back-fill'), { scale: 0, duration: 0.6, ease: 'power3.inOut', overwrite: 'auto' }).then()
    gsap.to(back.querySelector('.back-arrow-next'), { xPercent: -220, duration: 0.4, ease: 'power3.in', overwrite: 'auto' }).then()
    gsap.fromTo(back.querySelector('.back-arrow'), { xPercent: 220 }, { xPercent: 0, duration: 0.7, delay: 0.15, ...ease }).then()
    gsap.to(back.querySelectorAll('.back-char'), { yPercent: 0, duration: 0.5, stagger: 0.02, ease: 'power3.out', overwrite: 'auto' }).then()
    gsap.to(back, { x: 0, y: 0, duration: 1.2, ease: 'elastic.out(1, 0.45)', overwrite: 'auto' }).then()
    resume.current = gsap.delayedCall(1, () => nudge.current?.play())
  }

  const onBackMove = (event: PointerEvent<HTMLElement>) => {
    if (window.matchMedia(reducedMotion).matches) return

    const { left, top, width, height } = event.currentTarget.getBoundingClientRect()
    const px = (event.clientX - left) / width - 0.5
    const py = (event.clientY - top) / height - 0.5

    gsap.to(event.currentTarget, { x: px * 14, y: py * 14, duration: 0.6, ease: 'power3.out', overwrite: 'auto' }).then()
  }

  return { button, onBack, onBackEnter, onBackMove, onBackLeave }
}
