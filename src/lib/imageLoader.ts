import type { ImageLoaderProps } from 'next/image'

// Points bundled photos at the WebP copies made by scripts/optimizeImages.mjs; anything else is served as-is
const imageLoader = ({ src, width }: ImageLoaderProps) =>
  src.includes('/_next/static/media/') ? src.replace(/\.(jpe?g|png)$/i, `-w${width}.webp`) : src

export default imageLoader
