import type { MetadataRoute } from 'next'
import { basePath, siteConfig } from 'src/lib/site'

export { generateStaticParams } from 'src/lib/staticRoute'

const manifest: MetadataRoute.Manifest = {
  name: siteConfig.legalName,
  short_name: siteConfig.name,
  description: siteConfig.description,
  start_url: `${basePath}/`,
  display: 'standalone',
  background_color: siteConfig.colors.secondary,
  theme_color: siteConfig.colors.primary,
  categories: ['travel'],
  lang: 'en',
  icons: [
    { src: `${basePath}/icon.svg`, sizes: 'any', type: 'image/svg+xml' },
    { src: `${basePath}/apple-touch-icon.png`, sizes: '180x180', type: 'image/png' }
  ]
}

export const GET = async () => Response.json(manifest, { headers: { 'Content-Type': 'application/manifest+json' } })
