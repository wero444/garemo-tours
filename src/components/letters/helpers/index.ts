import type { StaticImageData } from 'next/image'

export interface Letter {
  text: string
  name: string
  country: string
  image?: StaticImageData
}

export const heading = { top: 'Letters', bottom: 'from', accent: 'guests' }

export const letters: Array<Letter> = [
  { text: 'A guest\'s few lines will go here, in their own words.', name: 'Name', country: 'Country' },
  { text: 'A second letter, written after the trip.', name: 'Name', country: 'Country' },
  { text: 'And a third, from someone who came back for more.', name: 'Name', country: 'Country' }
]
