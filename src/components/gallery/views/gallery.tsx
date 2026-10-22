import { getHomeGallery } from 'src/components/gallery/helpers/data'
import { GalleryView } from 'src/components/gallery/views/galleryView'

export const Gallery = async () => {
  const { tiles, preview, total } = await getHomeGallery()

  return <GalleryView tiles={tiles} preview={preview} total={total} />
}
