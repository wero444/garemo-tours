import type { StaticImageData } from 'next/image'
import type { Locale } from 'src/lib/i18n'
import type { ThemeId } from 'src/components/gallery/helpers/photos'

interface Content {
  title: string
  subtitle: string
  tabs: Record<ThemeId, string>
  drag: string
  tagline: string
  cta: string
  photos: (count: number) => string
  themes: Record<ThemeId, string>
  all: (count: number) => string
}

export const content: Record<Locale, Content> = {
  en: {
    title: 'Gallery',
    subtitle: 'What happens between the sights.',
    tabs: { culture: 'People we visit', food: 'Tables we share', georgia: 'Roads we take' },
    drag: 'Drag or use the arrow keys to browse the photos',
    tagline: 'People, dogs and weather met along the way.',
    cta: 'View all photos',
    photos: count => `${count} photos`,
    themes: { culture: 'Culture', food: 'Food', georgia: 'Georgia' },
    all: count => `That's all ${count} photos`
  }
}
export const quality = 100

interface Slot {
  c: number
  r: number
  w: number
  h: number
}

export interface Tile {
  id: string
  image: StaticImageData
  alt: string
  w: number
  mw: number
  xw: number
  c: string
  r: string
  mc: string
  mr: string
  xc: string
  xr: string
}

export const carouselSizes = '(min-width: 768px) 21rem, 64vw'

export const feedSizes = ({ w, mw, xw }: Tile) =>
  `(min-width: 1280px) ${xw * 20}vw, (min-width: 768px) ${w * 25}vw, ${mw * 50}vw`

export const shuffle = <T>(items: Array<T>) => {
  const out = [...items]

  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]]
  }

  return out
}

export const photoAlt = (index: number, total: number) => `Photo ${index + 1} of ${total} from GAREMO journeys across Georgia`

const span = (start: number, size: number) => `${start} / span ${size}`

export const toTile = (image: StaticImageData, index: number, total: number, md: Slot, sm: Slot, xl = md): Tile => ({
  id: image.src,
  image,
  alt: photoAlt(index, total),
  w: md.w,
  mw: sm.w,
  xw: xl.w,
  c: span(md.c, md.w),
  r: span(md.r, md.h),
  mc: span(sm.c, sm.w),
  mr: span(sm.r, sm.h),
  xc: span(xl.c, xl.w),
  xr: span(xl.r, xl.h)
})

type Shape = [number, number]

export const pickShape = (ratio: number): Shape => {
  const roll = Math.random()

  if (ratio > 1.2) return roll < 0.5 ? [2, 1] : roll < 0.7 ? [2, 2] : [1, 1]
  if (ratio < 0.83) return roll < 0.6 ? [1, 2] : roll < 0.85 ? [1, 1] : [2, 2]

  return roll < 0.5 ? [1, 1] : roll < 0.85 ? [2, 2] : [2, 1]
}

export const pack = (shapes: Array<Shape>, cols: number): Array<Slot> => {
  const taken: Array<Array<boolean>> = []
  const free = (r: number, c: number) => !taken[r]?.[c]
  const fits = (r: number, c: number, w: number, h: number) => {
    if (c + w > cols) return false

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (!free(r + y, c + x)) return false
      }
    }

    return true
  }

  let r = 0
  let c = 0

  return shapes.map(([w, h]) => {
    while (!free(r, c)) {
      c++
      if (c === cols) {
        c = 0
        r++
      }
    }

    const options: Array<Shape> = [[Math.min(w, cols), h], [1, h], [Math.min(w, cols), 1], [1, 1]]
    const [fw, fh] = options.find(([ow, oh]) => fits(r, c, ow, oh)) ?? [1, 1]

    for (let y = 0; y < fh; y++) {
      taken[r + y] ??= []
      for (let x = 0; x < fw; x++) taken[r + y]![c + x] = true
    }

    return { c: c + 1, r: r + 1, w: fw, h: fh }
  })
}
