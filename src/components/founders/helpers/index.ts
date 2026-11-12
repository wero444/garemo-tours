import type { StaticImageData } from 'next/image'
import shota from 'src/assets/media/images/about/shota.png'
import nodo from 'src/assets/media/images/about/nodo.jpeg'
import type { Locale } from 'src/lib/i18n'

interface Founder {
  name: Record<Locale, string>
  role: string
  image: StaticImageData
  position: string
}

export const founders: Array<Founder> = [
  { name: { en: 'Shota Tsereteli' }, role: 'Co-founder and guide', image: shota, position: 'object-[50%_30%]' },
  { name: { en: 'Nodo Shonia' }, role: 'Co-founder and guide', image: nodo, position: 'object-[50%_30%]' }
]

export const portrait: Record<Locale, (name: string) => string> = {
  en: name => `Portrait of ${name}`
}

export const label: Record<Locale, string> = { en: 'Founders' }
