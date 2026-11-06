import type { StaticImageData } from 'next/image'
import keepsake from 'src/assets/media/images/6.jpeg'
import type { Locale } from 'src/lib/i18n'

export interface Letter {
  text: string
  name: string
  country: string
  image?: StaticImageData
  sample?: boolean
}

interface Content {
  heading: string
  photo: string
  sample: string
  letters: Array<Letter>
}

export const content: Record<Locale, Content> = {
  en: {
    heading: 'Letters from guests',
    photo: 'Photo',
    sample: 'Sample',
    letters: [
      {
        text: 'We came for the mountains and left with a family. Shota and Nodo knew which bend in the road had the best view, which grandmother made the best khachapuri, and when to simply stop talking and let us look. On our last evening in Kakheti, our host poured wine from a qvevri he had buried thirty years ago. We still talk about that table.',
        name: 'Anna & Tomasz',
        country: 'Poland',
        image: keepsake
      },
      {
        text: 'Place for a letter from a family or a group of friends.',
        name: '[Name]',
        country: '[Country]',
        sample: true
      },
      {
        text: 'Place for a letter from a group with its own reason to come, such as a yoga class.',
        name: '[Name]',
        country: '[Country]',
        sample: true
      }
    ]
  }
}
