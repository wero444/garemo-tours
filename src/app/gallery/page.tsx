import type { Metadata } from 'next'
import { getGalleryFeed } from 'src/components/gallery/helpers/data'
import { GalleryFeed } from 'src/components/gallery/views/galleryFeed'

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'People, dogs and weather met along the way: photos from GAREMO journeys across Georgia.',
  alternates: {
    canonical: '/gallery'
  }
}

const GalleryPage = async () => {
  const tiles = await getGalleryFeed()

  return (
    <main className='flex flex-1 flex-col bg-secondary'>
      <GalleryFeed tiles={tiles} />
    </main>
  )
}

export default GalleryPage
