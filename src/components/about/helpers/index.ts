import type { Locale } from 'src/lib/i18n'

export const content: Record<Locale, { title: string, paragraphs: Array<string> }> = {
  en: {
    title: 'About GAREMO',
    paragraphs: [
      'Garemo means “surroundings” in Georgian: a place, and the people who live in it.',
      'We started guiding fourteen years ago, as two friends, and founded Garemo two years ago. Today a small circle of guides travels with us, friends we have trusted from the start.',
      'Not a glossy Georgia, but the one we call home: its beauty, its contrasts and its ordinary days.'
    ]
  }
}
