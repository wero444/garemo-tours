import type { StaticImageData } from 'next/image'
import shota from 'src/assets/media/images/26.jpeg'
import nodo from 'src/assets/media/images/27.jpeg'
import type { Locale } from 'src/lib/i18n'

interface Founder {
  name: Record<Locale, string>
  role: string
  image: StaticImageData
  position: string
}

export const founders: Array<Founder> = [
  { name: { en: 'Shota Tsereteli', ge: 'შოთა წერეთელი' }, role: 'Co-founder and guide', image: shota, position: 'object-[50%_30%]' },
  { name: { en: 'Nodo Shonia', ge: 'ნოდო შონია' }, role: 'Co-founder and guide', image: nodo, position: 'object-[32%_50%]' }
]

export const portrait: Record<Locale, (name: string) => string> = {
  en: name => `Portrait of ${name}`,
  ge: name => `${name}, პორტრეტი`
}

export const label: Record<Locale, string> = { en: 'Founders', ge: 'დამფუძნებლები' }
