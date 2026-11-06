'use client'

import { gsap } from 'src/lib/gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { reducedMotion } from 'src/lib/intro'

gsap.registerPlugin(ScrollToPlugin)

const landings = new Map<string, () => number | undefined>()

export const setLanding = (id: string, top: () => number | undefined) => {
  landings.set(id, top)
  return () => {
    landings.delete(id)
  }
}

export const glide = (top: number) => {
  const distance = Math.abs(top - window.scrollY)
  const duration = window.matchMedia(reducedMotion).matches ? 0 : gsap.utils.clamp(1, 2.2, 0.8 + distance / window.innerHeight * 0.18)

  return gsap.to(window, { scrollTo: { y: top, autoKill: true }, duration, ease: 'power3.inOut', overwrite: true })
}

const topOf = (id: string) => {
  if (!id) return 0

  const custom = landings.get(id)?.()
  if (custom !== undefined) return custom

  const target = document.getElementById(id)
  if (!target) return undefined

  const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0
  const padding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0

  return target.getBoundingClientRect().top + window.scrollY - margin - padding
}

export const glideTo = (hash: string) => {
  const id = decodeURIComponent(hash.replace(/^#/, ''))
  const top = topOf(id)
  if (top === undefined) return false

  glide(top)
  history.replaceState(null, '', id ? `#${id}` : `${location.pathname}${location.search}`)

  return true
}

export const onHashClick = (event: MouseEvent) => {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

  const link = (event.target as Element | null)?.closest?.('a[href^="#"]')
  if (!link) return

  if (glideTo(link.getAttribute('href') ?? '')) event.preventDefault()
}
