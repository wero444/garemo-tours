import type { MetadataRoute } from 'next'
import { siteConfig } from 'src/lib/site'

const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: siteConfig.url,
    changeFrequency: 'weekly',
    priority: 1
  }
]

export default sitemap
