import { useCallback, useEffect, useRef } from 'react'
import { gsap, useGSAP } from 'src/lib/gsap'
import { reducedMotion } from 'src/lib/intro'
import type { Tile } from 'src/components/gallery/helpers'

export type Photo = Pick<Tile, 'image' | 'alt'>

export const fit = ({ image }: Photo) => {
  const phone = window.innerWidth < 768
  const maxWidth = window.innerWidth - (phone ? 32 : 160)
  const maxHeight = window.innerHeight - (phone ? 144 : 112)
  const ratio = image.width / image.height
  const width = Math.min(maxWidth, maxHeight * ratio)
  const height = width / ratio

  return { left: (window.innerWidth - width) / 2, top: (window.innerHeight - height) / 2, width, height }
}

const rectOf = (element: HTMLElement) => {
  const { left, top, width, height } = element.getBoundingClientRect()

  return { left, top, width, height }
}

const cornersOf = (element: HTMLElement) => {
  const style = getComputedStyle(element)
  const max = Math.min(element.offsetWidth, element.offsetHeight) / 2
  const corner = (value: string) => Math.min(parseFloat(value) || 0, max)

  return {
    borderTopLeftRadius: corner(style.borderTopLeftRadius),
    borderTopRightRadius: corner(style.borderTopRightRadius),
    borderBottomRightRadius: corner(style.borderBottomRightRadius),
    borderBottomLeftRadius: corner(style.borderBottomLeftRadius)
  }
}

const openCorners = (origin: HTMLElement, square: boolean) => {
  const radius = square || !Object.values(cornersOf(origin)).some(Boolean) ? 0 : 12

  return { borderTopLeftRadius: radius, borderTopRightRadius: radius, borderBottomRightRadius: radius, borderBottomLeftRadius: radius }
}

export const useLightboxMotion = (tile: Photo, origin: HTMLElement, onClosed: () => void, square = false) => {
  const root = useRef<HTMLDivElement>(null)
  const frame = useRef<HTMLDivElement>(null)
  const closeButton = useRef<HTMLButtonElement>(null)
  const closing = useRef(false)

  useGSAP(() => {
    gsap.set(origin, { autoAlpha: 0 }).then()

    if (window.matchMedia(reducedMotion).matches) {
      gsap.set(frame.current, fit(tile)).then()
      gsap.fromTo(root.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3 }).then()
      return
    }

    gsap.timeline({ defaults: { ease: 'expo.out' } })
      .fromTo('.lightbox-backdrop', { opacity: 0 }, { opacity: 1, duration: 0.7, ease: 'power2.out' }, 0)
      .fromTo(frame.current, { ...rectOf(origin), ...cornersOf(origin) }, { ...fit(tile), ...openCorners(origin, square), duration: 1 }, 0)
      .fromTo('.lightbox-close',
        { opacity: 0, scale: 0.4, rotate: -90 },
        { opacity: 1, scale: 1, rotate: 0, duration: 0.9 }, 0.35).then()
  }, { scope: root })

  const close = useCallback(() => {
    if (closing.current) return
    closing.current = true

    if (window.matchMedia(reducedMotion).matches) {
      gsap.to(root.current, { autoAlpha: 0, duration: 0.25, onComplete: onClosed }).then()
      return
    }

    gsap.timeline({ defaults: { ease: 'expo.inOut' }, onComplete: onClosed })
      .to(closeButton.current, { opacity: 0, scale: 0.4, rotate: 90, duration: 0.45, ease: 'power3.in' }, 0)
      .to(frame.current, { ...rectOf(origin), ...cornersOf(origin), duration: 0.85 }, 0)
      .to(root.current?.querySelector('.lightbox-backdrop') ?? [], { opacity: 0, duration: 0.6, ease: 'power2.inOut' }, 0.2).then()
  }, [origin, onClosed])

  useEffect(() => {
    const html = document.documentElement
    const overflow = html.style.overflow
    const previous = document.activeElement as HTMLElement | null

    html.style.overflow = 'hidden'
    closeButton.current?.focus({ preventScroll: true })

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      event.stopPropagation()
      close()
    }

    const onResize = () => {
      if (!closing.current) gsap.set(frame.current, fit(tile)).then()
    }

    window.addEventListener('keydown', onKey, true)
    window.addEventListener('resize', onResize)

    return () => {
      html.style.overflow = overflow
      window.removeEventListener('keydown', onKey, true)
      window.removeEventListener('resize', onResize)
      previous?.focus({ preventScroll: true })
    }
  }, [tile, close])

  return { root, frame, closeButton, close }
}
