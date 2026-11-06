import { useRef, type FocusEvent, type PointerEvent } from 'react'
import { gsap, useGSAP } from 'src/lib/gsap'
import { reducedMotion } from 'src/lib/intro'
import { fullFrame, mountain, mountainStart } from 'src/components/partners/helpers'

type Target = PointerEvent<HTMLElement> | FocusEvent<HTMLElement>

const ease = { ease: 'expo.out', overwrite: 'auto' as const }

const expanded = 0.7

export const usePartners = () => {
  const container = useRef<HTMLElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add(reducedMotion, () => {
      gsap.set('.partners-cta', { autoAlpha: 1 }).then()
    })

    mm.add({ motion: `not all and ${reducedMotion}`, phone: '(max-width: 767px)' }, context => {
      if (!context.conditions?.motion) return

      gsap.set('.partners-letter', { stroke: 'currentColor', strokeWidth: 0.35, autoRound: false }).then()

      const reveal = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } })
        .fromTo('.partners-rule', { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'expo.inOut' }, 0.6)
        .fromTo('.partners-eyebrow',
          { autoAlpha: 0, letterSpacing: '0.6em' },
          { autoAlpha: 1, letterSpacing: '0.22em', duration: 1.6 }, 0.7)
        .fromTo('.partners-letter',
          { drawSVG: '0%', y: 4 },
          { drawSVG: '100%', y: 0, duration: 1.1, stagger: 0.05, ease: 'power2.inOut' }, 0)
        .fromTo('.partners-letter',
          { fillOpacity: 0, strokeOpacity: 1 },
          { fillOpacity: 1, strokeOpacity: 0, duration: 0.6, stagger: 0.04, ease: 'power2.out' }, 0.8)
        .fromTo('.partners-word', { yPercent: 100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1, stagger: 0.02 }, 0.7)
        .fromTo('.partners-cta',
          { autoAlpha: 0, y: 24, clipPath: 'inset(0% 100% 0% 0% round 999px)' },
          { autoAlpha: 1, y: 0, clipPath: 'inset(0% 0% 0% 0% round 999px)', duration: 1.4, ease: 'expo.inOut' }, 1.1)
        .fromTo('.partners-arrow', { xPercent: -220 }, { xPercent: 0, duration: 1 }, 1.8)

      const show = () => reveal.timeScale(1).play()

      const hide = () => reveal.timeScale(2.5).reverse()

      const opening = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: ({ progress }) => {
            if (progress >= expanded) show().then()
            else if (progress < expanded - 0.08) hide().then()
          }
        }
      })
        .fromTo('.partners-media',
          { clipPath: mountain(context.conditions.phone ? mountainStart.phone : mountainStart.wide) },
          { clipPath: fullFrame, duration: expanded, ease: 'power2.inOut' }, 0)
        .fromTo('.partners-image', { scale: 1.3 }, { scale: 1, duration: expanded, ease: 'power1.out' }, 0)
        .to({}, { duration: 1 - expanded })

      const land = (behavior: ScrollBehavior) => {
        const end = opening.scrollTrigger?.end
        if (end === undefined) return
        window.scrollTo({ top: end, behavior })
        history.replaceState(null, '', '#partners')
      }

      const onClick = (event: MouseEvent) => {
        const link = (event.target as Element | null)?.closest?.('a[href="#partners"]')
        if (!link) return
        event.preventDefault()
        land('smooth')
      }

      document.addEventListener('click', onClick)
      if (location.hash === '#partners') requestAnimationFrame(() => land('instant'))

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

      return () => document.removeEventListener('click', onClick)
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
