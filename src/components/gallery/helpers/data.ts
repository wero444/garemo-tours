import { cacheLife } from 'next/cache'
import { photos, themeIds, themes, type ThemeId } from 'src/components/gallery/helpers/photos'
import { pack, pickShape, shuffle, toTile, type Tile } from 'src/components/gallery/helpers'

const ratio = ({ width, height }: { width: number, height: number }) => width / height

const single = { c: 1, r: 1, w: 1, h: 1 }

export const carouselCount = 9

export const getHomeGallery = async () => {
  'use cache'
  cacheLife('hours')

  const tabs = Object.fromEntries(themeIds.map(id => [
    id,
    shuffle(themes[id]).slice(0, carouselCount).map(image => toTile(image, photos.indexOf(image), photos.length, single, single))
  ])) as Record<ThemeId, Array<Tile>>

  return {
    tabs,
    preview: shuffle(photos).slice(0, 4),
    total: photos.length
  }
}

export const getGalleryFeed = async () => {
  'use cache'
  cacheLife('hours')

  return themeIds.map(id => {
    const order = shuffle(themes[id])
    const shapes = order.map(image => pickShape(ratio(image)))
    const md = pack(shapes, 4)
    const xl = pack(shapes, 5)
    const sm = pack(shapes.map(([w, h]) => [Math.min(w, 2), h]), 2)

    return {
      id,
      tiles: order.map((image, i) => toTile(image, photos.indexOf(image), photos.length, md[i]!, sm[i]!, xl[i]!))
    }
  })
}
