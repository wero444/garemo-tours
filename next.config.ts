import type { NextConfig } from 'next'
import { deviceSizes, imageSizes } from './image-sizes.mjs'

// GitHub Pages only serves static files: export the site and pre-render images instead of optimising on demand
const pages = process.env.GITHUB_PAGES === 'true'

const nextConfig: NextConfig = {
  // Cache Components (and partial prefetching) cannot be combined with a static export
  cacheComponents: !pages,
  partialPrefetching: !pages,
  ...(pages && {
    output: 'export',
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
    trailingSlash: true,
    experimental: { useCache: true }
  }),
  images: {
    qualities: [75, 100],
    deviceSizes,
    imageSizes,
    ...(pages && { loader: 'custom', loaderFile: './src/lib/imageLoader.ts' })
  },
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css'
      }
    }
  }
}

export default nextConfig
