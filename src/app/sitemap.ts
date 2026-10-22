import type { MetadataRoute } from 'next'
import { siteConfig } from 'src/lib/site'

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: siteConfig.url,
    changeFrequency: 'weekly',
    priority: 1
  },
  {
    url: `${siteConfig.url}/gallery`,
    changeFrequency: 'weekly',
    priority: 0.8
  }
]

export default sitemap
