import type { Locale } from 'src/lib/i18n'

// The CTA goes to Contact for now; it will later point to a separate page for agencies
export const content: Record<Locale, { eyebrow: string, title: Array<string>, description: string, regionsLabel: string, regions: Array<string>, cta: string }> = {
  en: {
    eyebrow: 'For travel partners',
    title: ['Your DMC', 'in Georgia'],
    description: 'Tailor-made group journeys across Georgia, from cultural and pilgrimage tours to corporate and special-interest travel.',
    regionsLabel: 'Destinations',
    regions: ['Georgia', 'Armenia', 'Azerbaijan'],
    cta: 'Work with us'
  }
}

// Ridge line of the opening mountain: [position across, height] with both in 0–1, the main peak in the middle
const ridge: Array<[number, number]> = [
  [0, 0], [0.1, 0.35], [0.17, 0.27], [0.3, 0.62], [0.37, 0.52], [0.5, 1],
  [0.58, 0.78], [0.63, 0.84], [0.73, 0.5], [0.8, 0.56], [0.9, 0.25], [1, 0]
]

interface Box {
  left: number
  right: number
  base: number
  top: number
}

// A clip-path polygon of the ridge inside the box, in percent. flat = 1 lifts every point to the top, giving a
// plain rectangle with the same number of points, so GSAP can morph the mountain into the full frame
export const mountain = ({ left, right, base, top }: Box, flat = 0) => {
  const x = (u: number) => left + u * (right - left)
  const y = (h: number) => base - (h + (1 - h) * flat) * (base - top)
  const line = ridge.map(([u, h]) => `${x(u)}% ${y(h)}%`)

  return `polygon(${x(0)}% ${base}%, ${line.join(', ')}, ${x(1)}% ${base}%)`
}

export const mountainStart = {
  phone: { left: 6, right: 94, base: 70, top: 30 },
  wide: { left: 18, right: 82, base: 76, top: 22 }
}

export const fullFrame = mountain({ left: 0, right: 100, base: 100, top: 0 }, 1)
