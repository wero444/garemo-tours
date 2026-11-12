import type { StaticImageData } from 'next/image'
import { regionImages } from 'src/components/destinations/helpers/images'
import type { Zone } from 'src/components/destinations/helpers/zones'
import type { Locale } from 'src/lib/i18n'

export interface Region {
  id: string
  name: string
  text: string
  places: Array<string>
  zone: Zone
  x: number
  y: number
  lat: number
  lng: number
  images: Array<StaticImageData>
}

interface Content {
  title: string
  subtitle: string
  ask: string
  close: string
  previous: string
  next: string
  photo: (region: string, index: number, total: number) => string
  soon: string
  zones: Record<Zone, string>
  regions: Array<Region>
}

const region = (id: string, name: string, text: string, places: Array<string>, zone: Zone, x: number, y: number, lat: number, lng: number): Region =>
  ({ id, name, text, places, zone, x, y, lat, lng, images: regionImages[id]! })

export const content: Record<Locale, Content> = {
  en: {
    title: 'Destinations',
    subtitle: 'The places we keep coming back to',
    ask: 'Ask about this region',
    close: 'Close',
    previous: 'Previous photo',
    next: 'Next photo',
    photo: (name, index, total) => `${name}, photo ${index + 1} of ${total}`,
    soon: 'No tours here yet',
    zones: {
      'kakheti': 'Kakheti',
      'kvemo-kartli': 'Tbilisi & Kvemo Kartli',
      'mtskheta-mtianeti': 'Mtskheta-Mtianeti',
      'shida-kartli': 'Shida Kartli',
      'samtskhe-javakheti': 'Samtskhe-Javakheti',
      'imereti': 'Imereti',
      'adjara': 'Adjara',
      'guria': 'Guria',
      'racha': 'Racha-Lechkhumi',
      'samegrelo-svaneti': 'Samegrelo & Svaneti',
      'abkhazia': 'Abkhazia'
    },
    regions: [
      region('tbilisi', 'Tbilisi', 'Wooden balconies, sulphur baths and the city lit up at night.', ['Old Town', 'Abanotubani', 'Narikala'], 'kvemo-kartli', 1325, 855, 41.694, 44.807),
      region('kartli', 'Kartli', 'The ancient capital and a cave town three thousand years old.', ['Mtskheta', 'Jvari', 'Uplistsikhe', 'Gori'], 'shida-kartli', 1206, 748, 41.94, 44.42),
      region('kakheti', 'Kakheti', 'Wine that spends the winter in clay jars under the ground.', ['Bodbe', 'Sighnaghi', 'Telavi'], 'kakheti', 1521, 802, 41.78, 45.68),
      region('khevi', 'Khevi (Kazbegi)', 'A church under Mount Kazbek, and weather that changes by the hour.', ['Stepantsminda', 'Gergeti', 'Truso'], 'mtskheta-mtianeti', 1261, 503, 42.66, 44.64),
      region('khevsureti', 'Khevsureti', 'Fortress-villages near the border ridge.', ['Shatili', 'Mutso'], 'mtskheta-mtianeti', 1401, 510, 42.64, 45.2),
      region('tusheti', 'Tusheti', 'Reached by one dirt track, open only in summer.', ['Omalo', 'Dartlo'], 'kakheti', 1514, 598, 42.38, 45.65),
      region('svaneti', 'Svaneti', 'A stone tower beside almost every house, and Ushba above them.', ['Mestia', 'Ushguli', 'Ushba'], 'samegrelo-svaneti', 813, 394, 42.98, 42.85),
      region('racha', 'Racha', 'Quiet valleys, and ham smoked over the fire.', ['Ambrolauri', 'Shaori', 'Nikortsminda'], 'racha', 891, 550, 42.52, 43.16),
      region('imereti', 'Imereti', 'Caves, canyons and a walkway hanging above one of them.', ['Kutaisi', 'Gelati', 'Bagrati', 'Okatse'], 'imereti', 781, 635, 42.27, 42.72),
      region('samegrelo', 'Samegrelo', 'Waterfalls, a boat ride through a gorge and the spiciest food in the country.', ['Martvili', 'Zugdidi'], 'samegrelo-svaneti', 626, 564, 42.48, 42.1),
      region('adjara', 'Adjara', 'The sea at Batumi, and tea and tangerines on the slopes behind it.', ['Batumi', 'Mtirala', 'Makhuntseti'], 'adjara', 526, 857, 41.62, 41.7),
      region('samtskhe', 'Samtskhe-Javakheti', 'A monastery cut into a cliff, and lakes on a high plateau.', ['Vardzia', 'Rabati', 'Borjomi', 'Paravani'], 'samtskhe-javakheti', 938, 880, 41.55, 43.35)
    ]
  }
}
