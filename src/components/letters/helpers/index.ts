import type { StaticImageData } from 'next/image'
import keepsake from 'src/assets/media/images/6.jpeg'
import type { Locale } from 'src/lib/i18n'

export interface Letter {
  text: string
  name: string
  country: string
  image?: StaticImageData
}

export const content: Record<Locale, { heading: { top: string, bottom: string, accent: string }, letter: Letter }> = {
  // TODO: sample letter for the showcase, replace with a real guest's words before launch
  en: {
    heading: { top: 'Letters', bottom: 'from', accent: 'guests' },
    letter: {
      text: 'We came for the mountains and left with a family. Shota and Nodo knew which bend in the road had the best view, which grandmother made the best khachapuri, and when to simply stop talking and let us look. On our last evening in Kakheti, our host poured wine from a qvevri he had buried thirty years ago. We still talk about that table.',
      name: 'Anna & Tomasz',
      country: 'Poland',
      image: keepsake
    }
  },
  ge: {
    heading: { top: 'წერილები', bottom: '', accent: 'სტუმრებისგან' },
    letter: {
      text: 'მთების სანახავად ჩამოვედით და ოჯახით დავბრუნდით. შოთამ და ნოდომ იცოდნენ, გზის რომელ მოსახვევში იშლება საუკეთესო ხედი, რომელი ბებია აცხობს საუკეთესო ხაჭაპურს და როდის ჯობს უბრალოდ გაჩუმება, რომ ყურება შეგვეძლოს. კახეთში ბოლო საღამოს მასპინძელმა ოცდაათი წლის წინ ჩაფლული ქვევრიდან ღვინო დაგვისხა. იმ სუფრაზე დღემდე ვსაუბრობთ.',
      name: 'ანა და ტომაში',
      country: 'პოლონეთი',
      image: keepsake
    }
  }
}
