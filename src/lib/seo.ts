import { siteConfig } from 'src/lib/site'

const { name, legalName, url, about, address } = siteConfig

export const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'TravelAgency',
      '@id': `${url}/#organization`,
      name,
      legalName,
      url,
      logo: `${url}/icon.svg`,
      image: `${url}/opengraph-image`,
      description: about,
      slogan: siteConfig.tagline,
      address: {
        '@type': 'PostalAddress',
        addressLocality: address.locality,
        addressCountry: address.country
      },
      areaServed: { '@type': 'Country', name: 'Georgia' },
      knowsAbout: [
        'Small-group tours',
        'Private tours',
        'Mountain hiking in the Caucasus',
        'Georgian wine and vineyards',
        'Georgian history and culture'
      ]
    },
    {
      '@type': 'WebSite',
      '@id': `${url}/#website`,
      name,
      url,
      inLanguage: 'en',
      publisher: { '@id': `${url}/#organization` }
    }
  ]
}

export const serializeJsonLd = (data: object) => JSON.stringify(data).replace(/</g, '\\u003c')
