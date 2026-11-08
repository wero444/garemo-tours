import type { StaticImageData } from 'next/image'
import classic from 'src/assets/media/images/archs/main/arch1.jpeg'
import trekking from 'src/assets/media/images/archs/main/arch2.jpg'
import caucasus from 'src/assets/media/images/archs/main/arch3.jpg'
import tbilisi from 'src/assets/media/images/archs/classicGeorgia/tbilisi.jpg'
import mtskheta from 'src/assets/media/images/archs/classicGeorgia/mtskheta.jpg'
import kutaisi from 'src/assets/media/images/archs/classicGeorgia/kutaisi.jpeg'
import batumi from 'src/assets/media/images/archs/classicGeorgia/batumi.jpg'
import vardzia from 'src/assets/media/images/archs/classicGeorgia/vardzia.jpeg'
import ancientChurches from 'src/assets/media/images/archs/classicGeorgia/ancientChurches.jpg'
import fortresses from 'src/assets/media/images/archs/classicGeorgia/fortresses.jpeg'
import atTheGeorgianTable from 'src/assets/media/images/archs/classicGeorgia/atTheGeorgianTable.jpg'
import wineCountry from 'src/assets/media/images/archs/classicGeorgia/wineCountry.jpeg'
import theMountains from 'src/assets/media/images/archs/classicGeorgia/theMountains.jpg'
import oldStreets from 'src/assets/media/images/archs/classicGeorgia/oldStreets.jpg'
import aLocalMarket from 'src/assets/media/images/archs/classicGeorgia/aLocalMarket.jpg'
import { themes } from 'src/components/gallery/helpers/photos'
import type { Locale } from 'src/lib/i18n'

interface Moment {
  label: string
  image: StaticImageData
}

export interface Tour {
  title: string
  text: string
  image: StaticImageData
  alt: string
  focus?: string
  moments: Array<Moment>
}

interface Content {
  title: string
  subtitle: string
  more: string
  note: string
  ask: string
  close: string
  tours: Array<Tour>
}

const moments = (labels: Array<string>, images: Array<StaticImageData>) =>
  labels.map((label, i) => ({ label, image: images[i] }))

export const content: Record<Locale, Content> = {
  en: {
    title: 'Tours',
    subtitle: 'Every trip starts with who is coming.',
    more: 'Look inside',
    note: 'In September and October, the grape harvest can be part of any trip.',
    ask: 'Ask about this trip',
    close: 'Close',
    tours: [
      {
        title: 'Classic Georgia',
        text: 'Our most requested trip, by coach: Tbilisi, ancient churches, wine country and the mountains.',
        image: classic,
        alt: 'A brick bell tower and tiled roof of an old Georgian church against a blue sky',
        moments: moments(
          [
            'Tbilisi', 'Mtskheta', 'Kutaisi', 'Batumi', 'Vardzia', 'Ancient churches',
            'Fortresses', 'Wine country', 'The mountains', 'At the Georgian table', 'Old streets', 'A local market'
          ],
          [
            tbilisi, mtskheta, kutaisi, batumi, vardzia, ancientChurches,
            fortresses, wineCountry, theMountains, atTheGeorgianTable, oldStreets, aLocalMarket
          ]
        )
      },
      {
        title: 'Trekking & 4x4',
        text: 'Several days on foot, with professional mountain guides.',
        image: trekking,
        alt: 'Riders crossing a highland meadow below an old stone tower and misty mountains',
        moments: moments(
          ['The trail', 'By 4x4', 'A mountain road', 'Our mountain guides', 'A high pass', 'A highland village', 'A guesthouse', 'The view'],
          [
            themes.georgia[0], themes.georgia[7], themes.georgia[9], themes.culture[6],
            themes.georgia[4], themes.culture[9], themes.food[3], themes.georgia[10]
          ]
        )
      },
      {
        title: 'South Caucasus',
        text: 'Georgia, Armenia and Azerbaijan in one trip.',
        image: caucasus,
        alt: 'A shepherd with his crook walking behind a flock of sheep at golden hour',
        focus: '85% 50%',
        moments: moments(
          ['Georgia', 'Armenia', 'Azerbaijan', 'Yerevan', 'Baku', 'Old monasteries', 'Sheki', 'Lake Sevan'],
          [
            themes.georgia[5], themes.culture[2], themes.culture[11], themes.culture[5],
            themes.culture[7], themes.culture[8], themes.culture[10], themes.georgia[1]
          ]
        )
      }
    ]
  }
}

export const { tours } = content.en
