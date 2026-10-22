import { cacheLife } from 'next/cache'
import { photos } from 'src/components/gallery/helpers/photos'
import { aspect, homeSlots, mirror, pack, pickShape, shuffle, toTile } from 'src/components/gallery/helpers'

const ratio = ({ width, height }: { width: number, height: number }) => width / height

export const getHomeGallery = async () => {
  'use cache'
  cacheLife('hours')

  const order = shuffle(photos)
  const picked = order.slice(0, homeSlots.length).sort((a, b) => ratio(a) - ratio(b))
  const flip = Math.random() < 0.5

  const tiles = shuffle(homeSlots)
    .sort((a, b) => aspect(a.md) - aspect(b.md))
    .map(({ md, sm }, i) => ({ md: flip ? mirror(md, 6) : md, sm, image: picked[i]! }))
    .sort((a, b) => a.md.r - b.md.r || a.md.c - b.md.c)
    .map(({ md, sm, image }) => toTile(image, photos.indexOf(image), photos.length, md, sm))

  return {
    tiles,
    preview: order.slice(homeSlots.length, homeSlots.length + 4),
    total: photos.length
  }
}

export const getGalleryFeed = async () => {
  'use cache'
  cacheLife('hours')

  const order = shuffle(photos)
  const shapes = order.map(image => pickShape(ratio(image)))
  const md = pack(shapes, 4)
  const xl = pack(shapes, 5)
  const sm = pack(shapes.map(([w, h]) => [Math.min(w, 2), h]), 2)

  return order.map((image, i) => toTile(image, photos.indexOf(image), photos.length, md[i]!, sm[i]!, xl[i]!))
}
