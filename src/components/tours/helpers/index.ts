import type { StaticImageData } from 'next/image'
import classic from 'src/assets/media/images/18.png'
import trekking from 'src/assets/media/images/40.jpg'
import occasion from 'src/assets/media/images/60.jpg'
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
        alt: 'Svan defensive towers above a village in a green valley',
        moments: moments(
          ['Old Tbilisi', 'Ancient churches', 'Wine country', 'A family cellar', 'The mountains', 'The road'],
          [themes.culture[0], themes.culture[3], themes.food[1], themes.food[5], themes.georgia[2], themes.georgia[7]]
        )
      },
      {
        title: 'Trekking',
        text: 'Several days on foot, with professional mountain guides.',
        image: trekking,
        alt: 'A horse on a dark ridge below the snowy peaks of the Caucasus',
        moments: moments(
          ['The trail', 'A high pass', 'Our guides', 'A village stop', 'A guesthouse', 'The view'],
          [themes.georgia[0], themes.georgia[4], themes.culture[6], themes.culture[9], themes.food[3], themes.georgia[10]]
        )
      },
      {
        title: 'Your own occasion',
        text: 'For a team, a family or a class with its own reason to come.',
        image: occasion,
        alt: 'An elderly Georgian woman in a patterned green headscarf, smiling',
        moments: moments(
          ['Your group', 'Your reason', 'A day together', 'A shared table', 'Free time', 'The way home'],
          [themes.culture[2], themes.culture[11], themes.georgia[5], themes.food[8], themes.food[10], themes.georgia[9]]
        )
      }
    ]
  }
}

export const { tours } = content.en
