import { useEffect, useRef, useState } from 'react'
import { gsap, useGSAP } from 'src/lib/gsap'
import { reducedMotion } from 'src/lib/intro'

export const useMenu = () => {
  const container = useRef<HTMLDivElement>(null)
  const timeline = useRef<gsap.core.Timeline>(null)
  const [open, setOpen] = useState(false)

  const toggle = () => setOpen(value => !value)
  const close = () => setOpen(false)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add({ reduce: reducedMotion, motion: `not all and ${reducedMotion}` }, context => {
      const { reduce } = context.conditions as { reduce: boolean }
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } })

      tl.fromTo('.menu-panel', { visibility: 'hidden' }, { visibility: 'visible', duration: 0.001 }, 0)
        .fromTo('.burger-top', { y: 0, rotate: 0 }, { y: 7, rotate: 45, duration: 0.6, ease: 'power3.inOut' }, 0)
        .fromTo('.burger-bottom', { y: 0, rotate: 0 }, { y: -7, rotate: -45, duration: 0.6, ease: 'power3.inOut' }, 0)
        .fromTo('.burger-mid', { scaleX: 1, opacity: 1 }, { scaleX: 0, opacity: 0, duration: 0.3, ease: 'power2.in' }, 0).then()

      if (reduce) {
        tl.fromTo('.menu-panel', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'none' }, 0)
          .fromTo('.menu-link, .menu-meta', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'none' }, 0.1).then()
      } else {
        tl.fromTo('.menu-panel',
          { clipPath: 'circle(0% at 100% 0%)' },
          { clipPath: 'circle(150% at 100% 0%)', duration: 1, ease: 'power4.inOut' }, 0)
          .fromTo('.menu-link .nav-char',
            { yPercent: 120, rotate: 12, opacity: 0 },
            { yPercent: 0, rotate: 0, opacity: 1, duration: 0.9, stagger: 0.018 }, 0.4)
          .fromTo('.menu-rule',
            { scaleX: 0, transformOrigin: 'left center' },
            { scaleX: 1, duration: 1.2, stagger: 0.08, ease: 'expo.inOut' }, 0.45)
          .fromTo('.menu-meta', { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.1 }, 0.7).then()
      }

      timeline.current = tl
    })

    return () => mm.revert()
  }, { scope: container })

  useGSAP(() => {
    const links = gsap.utils.toArray<HTMLAnchorElement>('.menu-link')
    const focus = { duration: 0.5, ease: 'power2.out', overwrite: true }

    const cleanups = links.map(link => {
      const others = links.filter(other => other !== link)
      const chars = link.querySelectorAll('.nav-char')

      const enter = () => {
        gsap.to(chars, {
          keyframes: { opacity: [1, 0.3, 1] },
          duration: 0.6,
          stagger: 0.03,
          ease: 'sine.inOut',
          overwrite: true
        }).then()
        gsap.to(link, { x: 10, opacity: 1, ...focus }).then()
        gsap.to(others, { x: 0, opacity: 0.45, ...focus }).then()
      }

      const leave = () => {
        gsap.to(links, { x: 0, opacity: 1, ...focus }).then()
      }

      link.addEventListener('pointerenter', enter)
      link.addEventListener('pointerleave', leave)
      link.addEventListener('focus', enter)
      link.addEventListener('blur', leave)

      return () => {
        link.removeEventListener('pointerenter', enter)
        link.removeEventListener('pointerleave', leave)
        link.removeEventListener('focus', enter)
        link.removeEventListener('blur', leave)
      }
    })

    return () => cleanups.forEach(cleanup => cleanup())
  }, { scope: container })

  useEffect(() => {
    const tl = timeline.current

    if (open) tl?.timeScale(1).play()
    else tl?.timeScale(1.6).reverse()

    document.documentElement.style.overflow = open ? 'hidden' : ''

    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 48rem)')
    const onChange = () => {
      if (desktop.matches) setOpen(false)
    }

    desktop.addEventListener('change', onChange)
    return () => desktop.removeEventListener('change', onChange)
  }, [])

  return { container, open, toggle, close }
}
