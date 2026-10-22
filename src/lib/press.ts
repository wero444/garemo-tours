import type { PointerEvent } from 'react'
import { gsap } from 'src/lib/gsap'
import { reducedMotion } from 'src/lib/intro'

export const pressDent = 'pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(220px_circle_at_var(--x)_var(--y),rgb(0_0_0/0.09),transparent_70%)] dark:bg-[radial-gradient(220px_circle_at_var(--x)_var(--y),rgb(0_0_0/0.3),transparent_70%)]'

const pointer = (event: PointerEvent<HTMLElement>) => {
  const { left, top, width, height } = event.currentTarget.getBoundingClientRect()
  const x = event.clientX - left
  const y = event.clientY - top

  return { x, y, px: x / width - 0.5, py: y / height - 0.5 }
}

const tilt = (event: PointerEvent<HTMLElement>) => event.currentTarget.querySelector('.press-tilt')

export const pressEnter = (event: PointerEvent<HTMLElement>) => {
  const { x, y } = pointer(event)
  gsap.set(event.currentTarget, { '--x': `${x}px`, '--y': `${y}px` }).then()
}

export const pressMove = (event: PointerEvent<HTMLElement>) => {
  const { x, y, px, py } = pointer(event)
  const ease = { duration: 0.6, ease: 'power3.out', overwrite: 'auto' as const }

  gsap.to(event.currentTarget, { '--x': `${x}px`, '--y': `${y}px`, ...ease }).then()

  if (window.matchMedia(reducedMotion).matches) return

  const depth = event.currentTarget.hasAttribute('data-pressed') ? 16 : 10
  const scale = event.currentTarget.hasAttribute('data-pressed') ? 0.94 : 0.985

  gsap.to(tilt(event), { rotateY: px * depth, rotateX: py * -depth, scale, ...ease }).then()
}

export const pressRelease = (event: PointerEvent<HTMLElement>) => {
  event.currentTarget.removeAttribute('data-pressed')
  gsap.to(tilt(event), { rotateY: 0, rotateX: 0, scale: 1, duration: 1.2, ease: 'elastic.out(1, 0.5)', overwrite: 'auto' }).then()
}

export const pressDown = (event: PointerEvent<HTMLElement>) => {
  event.currentTarget.setAttribute('data-pressed', '')
  if (window.matchMedia(reducedMotion).matches) return

  const { px, py } = pointer(event)
  gsap.to(tilt(event), { rotateY: px * 16, rotateX: py * -16, scale: 0.94, duration: 0.35, ease: 'power3.out', overwrite: 'auto' }).then()
}

export const pressUp = (event: PointerEvent<HTMLElement>) => {
  event.currentTarget.removeAttribute('data-pressed')
  if (window.matchMedia(reducedMotion).matches) return

  const { px, py } = pointer(event)
  gsap.timeline()
    .to(tilt(event), { rotateY: px * 10, rotateX: py * -10, scale: 1.01, duration: 0.35, ease: 'power2.out', overwrite: 'auto' })
    .to(tilt(event), { scale: 0.985, duration: 0.9, ease: 'elastic.out(1, 0.6)' }).then()
}
