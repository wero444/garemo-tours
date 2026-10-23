import { siteConfig } from 'src/lib/site'
import { founders } from 'src/components/founders/helpers'
import { tours } from 'src/components/tours/helpers'

const { name, legalName, url, about, address, email, phone, areaServed, languages } = siteConfig

const organization = `${url}/#organization`
const website = `${url}/#website`

const absolute = (path: string) => new URL(path, url).toString()

export const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'TravelAgency',
      '@id': organization,
      name,
      legalName,
      url,
      logo: absolute('/icon.svg'),
      image: absolute('/opengraph-image'),
      description: about,
      slogan: siteConfig.tagline,
      email,
      telephone: phone,
      address: {
        '@type': 'PostalAddress',
        addressLocality: address.locality,
        addressCountry: address.country
      },
      areaServed: areaServed.map(country => ({ '@type': 'Country', name: country })),
      knowsLanguage: languages,
      founder: founders.map(founder => ({ '@type': 'Person', name: founder.name, jobTitle: founder.role })),
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          email,
          telephone: phone,
          availableLanguage: languages,
          areaServed: areaServed
        },
        {
          '@type': 'ContactPoint',
          contactType: 'sales',
          description: 'Partnerships with tour operators and travel agencies (DMC services)',
          email,
          telephone: phone,
          availableLanguage: languages
        }
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Tours in Georgia',
        itemListElement: tours.map(tour => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'TouristTrip',
            name: tour.title,
            description: tour.text,
            image: absolute(tour.image.src),
            touristType: tour.format,
            provider: { '@id': organization }
          }
        }))
      },
      knowsAbout: [
        'Small-group tours',
        'Private tours',
        'Mountain hiking in the Caucasus',
        'Georgian wine and vineyards',
        'Georgian history and culture',
        'Group travel and pilgrimages',
        'Corporate and special interest tours'
      ]
    },
    {
      '@type': 'WebSite',
      '@id': website,
      name,
      url,
      inLanguage: 'en',
      publisher: { '@id': organization }
    },
    {
      '@type': 'WebPage',
      '@id': `${url}/#webpage`,
      url,
      name: siteConfig.title,
      description: siteConfig.description,
      inLanguage: 'en',
      isPartOf: { '@id': website },
      about: { '@id': organization },
      primaryImageOfPage: absolute('/opengraph-image')
    }
  ]
}

export const galleryJsonLd = (photos: Array<{ src: string, alt: string }>) => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['CollectionPage', 'ImageGallery'],
      '@id': `${url}/gallery#webpage`,
      url: absolute('/gallery'),
      name: `Gallery | ${name}`,
      description: 'People, dogs and weather met along the way: photos from GAREMO journeys across Georgia.',
      inLanguage: 'en',
      isPartOf: { '@id': website },
      about: { '@id': organization },
      numberOfItems: photos.length,
      image: photos.map(photo => ({
        '@type': 'ImageObject',
        contentUrl: absolute(photo.src),
        caption: photo.alt,
        creator: { '@id': organization },
        copyrightHolder: { '@id': organization }
      }))
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: url },
        { '@type': 'ListItem', position: 2, name: 'Gallery', item: absolute('/gallery') }
      ]
    }
  ]
})

export const serializeJsonLd = (data: object) => JSON.stringify(data).replace(/</g, '\\u003c')
