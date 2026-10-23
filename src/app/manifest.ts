import type { MetadataRoute } from 'next'
import { siteConfig } from 'src/lib/site'

const manifest = (): MetadataRoute.Manifest => ({
  name: siteConfig.title,
  short_name: siteConfig.name,
  description: siteConfig.description,
  start_url: '/',
  display: 'standalone',
  background_color: siteConfig.colors.secondary,
  theme_color: siteConfig.colors.primary,
  categories: ['travel'],
  lang: 'en',
  icons: [
    { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
    { src: '/apple-icon', sizes: '180x180', type: 'image/png' }
  ]
})

export default manifest
