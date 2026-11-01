import type { StaticImageData } from 'next/image'
import culture from 'src/assets/media/images/18.png'
import wine from 'src/assets/media/images/4.jpeg'
import across from 'src/assets/media/images/22.jpeg'
import type { Locale } from 'src/lib/i18n'

interface Tour {
  title: string
  text: string
  image: StaticImageData
  alt: string
}

export const content: Record<Locale, { title: string, cta: string, tours: Array<Tour> }> = {
  en: {
    title: 'Tours in Georgia',
    cta: 'Plan your journey with us',
    tours: [
      {
        title: 'Culture & Heritage',
        text: 'Monasteries, cave towns and living traditions.',
        image: culture,
        alt: 'Svan defensive towers above a village in a green valley'
      },
      {
        title: 'Food & Wine',
        text: 'Family cellars, Georgian wines and a table that never quite empties.',
        image: wine,
        alt: 'Dark hillside under a pale sky in Kakheti'
      },
      {
        title: 'Across Georgia',
        text: 'From the Black Sea coast to mountain villages and high valleys.',
        image: across,
        alt: 'Misty mountain ridge in the Caucasus'
      }
    ]
  },
  ge: {
    title: 'ტურები საქართველოში',
    cta: 'დაგეგმეთ მოგზაურობა ჩვენთან ერთად',
    tours: [
      {
        title: 'კულტურა და მემკვიდრეობა',
        text: 'მონასტრები, კლდეში ნაკვეთი ქალაქები და ცოცხალი ტრადიციები.',
        image: culture,
        alt: 'სვანური კოშკები სოფლის თავზე, მწვანე ხეობაში'
      },
      {
        title: 'სამზარეულო და ღვინო',
        text: 'საოჯახო მარნები, ქართული ღვინო და სუფრა, რომელიც არასდროს ცარიელდება.',
        image: wine,
        alt: 'მუქი ფერდობი ფერმკრთალი ცის ქვეშ, კახეთში'
      },
      {
        title: 'მთელი საქართველო',
        text: 'შავი ზღვის სანაპიროდან მთის სოფლებამდე და მაღალმთიან ხეობებამდე.',
        image: across,
        alt: 'ნისლიანი მთის ქედი კავკასიონზე'
      }
    ]
  }
}

export const { tours } = content.en
