import type { Metadata } from 'next'
import { getGalleryFeed } from 'src/components/gallery/helpers/data'
import { photoAlt } from 'src/components/gallery/helpers'
import { photos } from 'src/components/gallery/helpers/photos'
import { GalleryFeed } from 'src/components/gallery/views/galleryFeed'
import { galleryJsonLd, serializeJsonLd } from 'src/lib/seo'
import { siteConfig } from 'src/lib/site'

const title = 'Gallery'
const description = `People, dogs and weather met along the way: ${photos.length} photos from GAREMO journeys across Georgia.`

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/gallery'
  },
  openGraph: {
    type: 'website',
    url: '/gallery',
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    title: `${title} | GAREMO`,
    description
  },
  twitter: {
    card: 'summary_large_image',
    title: `${title} | GAREMO`,
    description
  }
}

const jsonLd = galleryJsonLd(photos.map((photo, i) => ({ src: photo.src, alt: photoAlt(i, photos.length) })))

const GalleryPage = async () => {
  const tiles = await getGalleryFeed()

  return (
    <main className='flex flex-1 flex-col bg-secondary'>
      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />
      <GalleryFeed tiles={tiles} />
    </main>
  )
}

export default GalleryPage
