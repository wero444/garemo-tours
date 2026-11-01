import type { Metadata } from 'next'
import { siteConfig } from 'src/lib/site'

export { default } from 'src/app/page'

const title = 'Garemo Tours | ტურები საქართველოში'
const description = 'თბილისელი გიდების მოგზაურობები მთელ საქართველოში: კულტურა და მემკვიდრეობა, სამზარეულო და ღვინო, შავი ზღვის სანაპიროდან მთის სოფლებამდე.'

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: {
    canonical: '/ge',
    languages: { en: '/', ka: '/ge' }
  },
  openGraph: {
    type: 'website',
    url: '/ge',
    siteName: siteConfig.name,
    locale: 'ka_GE',
    alternateLocale: siteConfig.locale,
    title,
    description
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description
  }
}
