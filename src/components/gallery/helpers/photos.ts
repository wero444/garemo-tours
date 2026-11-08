
import type { StaticImageData } from 'next/image'
import culture01 from 'src/assets/media/gallery/culture/01.jpg'
import culture02 from 'src/assets/media/gallery/culture/02.jpg'
import culture03 from 'src/assets/media/gallery/culture/03.jpg'
import culture04 from 'src/assets/media/gallery/culture/04.jpg'
import culture05 from 'src/assets/media/gallery/culture/05.jpg'
import culture06 from 'src/assets/media/gallery/culture/06.jpg'
import culture07 from 'src/assets/media/gallery/culture/07.jpg'
import culture08 from 'src/assets/media/gallery/culture/08.jpg'
import culture09 from 'src/assets/media/gallery/culture/09.jpg'
import culture10 from 'src/assets/media/gallery/culture/10.jpg'
import culture11 from 'src/assets/media/gallery/culture/11.jpg'
import culture12 from 'src/assets/media/gallery/culture/12.jpg'
import food01 from 'src/assets/media/gallery/food/01.jpg'
import food02 from 'src/assets/media/gallery/food/02.jpg'
import food03 from 'src/assets/media/gallery/food/03.jpg'
import food04 from 'src/assets/media/gallery/food/04.jpg'
import food05 from 'src/assets/media/gallery/food/05.jpg'
import food06 from 'src/assets/media/gallery/food/06.jpg'
import food07 from 'src/assets/media/gallery/food/07.jpg'
import food08 from 'src/assets/media/gallery/food/08.jpg'
import food09 from 'src/assets/media/gallery/food/09.jpg'
import food10 from 'src/assets/media/gallery/food/10.jpg'
import food11 from 'src/assets/media/gallery/food/11.jpg'
import food12 from 'src/assets/media/gallery/food/12.jpg'
import georgia01 from 'src/assets/media/gallery/georgia/01.jpg'
import georgia02 from 'src/assets/media/gallery/georgia/02.jpg'
import georgia03 from 'src/assets/media/gallery/georgia/03.jpg'
import georgia04 from 'src/assets/media/gallery/georgia/04.jpg'
import georgia05 from 'src/assets/media/gallery/georgia/05.jpg'
import georgia06 from 'src/assets/media/gallery/georgia/06.jpg'
import georgia07 from 'src/assets/media/gallery/georgia/07.jpg'
import georgia08 from 'src/assets/media/gallery/georgia/08.jpg'
import georgia09 from 'src/assets/media/gallery/georgia/09.jpg'
import georgia10 from 'src/assets/media/gallery/georgia/10.jpg'
import georgia11 from 'src/assets/media/gallery/georgia/11.jpg'
import georgia12 from 'src/assets/media/gallery/georgia/12.jpg'

export const themeIds = ['culture', 'food', 'georgia'] as const

export type ThemeId = typeof themeIds[number]

export const themes: Record<ThemeId, Array<StaticImageData>> = {
  culture: [culture01, culture02, culture03, culture04, culture05, culture06, culture07, culture08, culture09, culture10, culture11, culture12],
  food: [food01, food02, food03, food04, food05, food06, food07, food08, food09, food10, food11, food12],
  georgia: [georgia01, georgia02, georgia03, georgia04, georgia05, georgia06, georgia07, georgia08, georgia09, georgia10, georgia11, georgia12]
}

export const photos = themeIds.flatMap(id => themes[id])
