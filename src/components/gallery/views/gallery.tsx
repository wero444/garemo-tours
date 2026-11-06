import { getHomeGallery } from 'src/components/gallery/helpers/data'
import { GalleryView } from 'src/components/gallery/views/galleryView'

export const Gallery = async () => {
  const { tabs, preview, total } = await getHomeGallery()

  return <GalleryView tabs={tabs} preview={preview} total={total} />
}
