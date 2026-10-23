// Set when the site is served from a sub-path, e.g. /garemo-tours on GitHub Pages
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export const siteConfig = {
  name: 'GAREMO',
  legalName: 'GAREMO Tours',
  // Full public URL of the site root, including the base path
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://garemotours.com').replace(/\/$/, ''),
  locale: 'en_US',
  title: 'Garemo Tours',
  tagline: 'Journeys through the real Georgia',
  description:
    'Tbilisi-based small-group and private tours across Georgia — mountain regions, historic towns, vineyards and local life, beyond the usual tourist paths.',
  about:
    'GAREMO is a travel project based in Tbilisi, created to share the landscapes, culture and atmosphere of Georgia in a thoughtful and authentic way. We design journeys that combine nature, history and local life. From mountain regions to historic towns and vineyards, our routes are carefully planned to show the country beyond the usual tourist paths. Some of our tours bring travellers together in comfortable groups, while others are designed as private journeys. In every case, our goal is the same: to create meaningful travel experiences that allow guests to discover the real spirit of Georgia.',
  keywords: [
    'Georgia tours',
    'tours in Georgia',
    'Tbilisi tours',
    'Georgia travel agency',
    'private tours Georgia',
    'small group tours Georgia',
    'authentic travel Georgia',
    'Caucasus mountain tours',
    'Kazbegi tours',
    'Svaneti tours',
    'Kakheti wine tours',
    'Georgian wine tours',
    'historic towns of Georgia',
    'cultural tours Georgia',
    'Georgia travel itinerary',
    'DMC Georgia',
    'destination management company Georgia',
    'group travel Georgia Armenia Azerbaijan',
    'pilgrimage tours Georgia',
    'corporate travel Georgia'
  ],
  email: 'sh.tsereteli@garemotours.com',
  phone: '+995557996876',
  areaServed: ['Georgia', 'Armenia', 'Azerbaijan'],
  languages: ['English', 'Polish'],
  address: {
    locality: 'Tbilisi',
    country: 'GE'
  },
  colors: {
    primary: '#a6320c',
    secondary: '#e3dcd4',
    dark: '#14100e'
  }
}

// Absolute URL for a route or file path; bundled asset URLs already include the base path
export const absoluteUrl = (path: string) => {
  const { origin } = new URL(siteConfig.url)

  return basePath && path.startsWith(`${basePath}/`) ? `${origin}${path}` : `${siteConfig.url}${path}`
}
