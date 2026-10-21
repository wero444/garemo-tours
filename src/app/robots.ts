import type { MetadataRoute } from 'next'
import { siteConfig } from 'src/lib/site'

const robots = (): MetadataRoute.Robots => ({
  rules: { userAgent: '*', allow: '/' },
  sitemap: `${siteConfig.url}/sitemap.xml`,
  host: siteConfig.url
})

export default robots
