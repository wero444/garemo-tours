import type { Locale } from 'src/lib/i18n'

export const content: Record<Locale, { eyebrow: string, title: Array<string>, description: string, cta: string }> = {
  en: {
    eyebrow: 'For travel partners',
    title: ['Your DMC', 'in Georgia'],
    description: 'Your team on the Georgian side: programs, transport, hosts and guides who speak English and Polish. Also in Armenia and Azerbaijan.',
    cta: 'Work with us'
  }
}

const ridge: Array<[number, number]> = [
  [0, 0.118], [0.032, 0.212], [0.06, 0.173], [0.08, 0.188], [0.104, 0.145], [0.128, 0.129], [0.164, 0.141],
  [0.186, 0.275], [0.24, 0.382], [0.298, 0.651], [0.324, 0.749], [0.352, 0.843], [0.384, 0.902], [0.412, 0.971],
  [0.434, 1], [0.458, 0.937], [0.476, 0.859], [0.492, 0.812], [0.512, 0.8], [0.532, 0.824], [0.56, 0.898],
  [0.588, 0.953], [0.612, 0.973], [0.641, 0.918], [0.681, 0.82], [0.725, 0.733], [0.77, 0.643], [0.793, 0.478],
  [0.833, 0.447], [0.869, 0.382], [0.921, 0.275], [1, 0.212]
]

interface Box {
  left: number
  right: number
  base: number
  top: number
}

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
