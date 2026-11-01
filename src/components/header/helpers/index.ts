import type { Locale } from 'src/lib/i18n'

export const content: Record<Locale, { home: string, nav: Array<{ label: string, href: string }>, tagline: string }> = {
  en: {
    home: 'Home',
    nav: [
      { label: 'About', href: '#about' },
      { label: 'Tours', href: '#tours' },
      { label: 'Gallery', href: '#gallery' },
      { label: 'Partners', href: '#partners' },
      { label: 'Contact', href: '#contact' }
    ],
    tagline: 'Journeys through the real Georgia'
  },
  ge: {
    home: 'მთავარი',
    nav: [
      { label: 'ჩვენ შესახებ', href: '#about' },
      { label: 'ტურები', href: '#tours' },
      { label: 'გალერეა', href: '#gallery' },
      { label: 'პარტნიორები', href: '#partners' },
      { label: 'კონტაქტი', href: '#contact' }
    ],
    tagline: 'მოგზაურობა ნამდვილ საქართველოში'
  }
}
