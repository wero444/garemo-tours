import type { MetadataRoute } from 'next'
import { photos } from 'src/components/gallery/helpers/photos'
import { tours } from 'src/components/tours/helpers'
import { siteConfig } from 'src/lib/site'

const absolute = (path: string) => new URL(path, siteConfig.url).toString()

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: siteConfig.url,
    changeFrequency: 'weekly',
    priority: 1,
    images: tours.map(tour => absolute(tour.image.src))
  },
  {
    url: absolute('/gallery'),
    changeFrequency: 'weekly',
    priority: 0.8,
    images: photos.map(photo => absolute(photo.src))
  }
]

export default sitemap
