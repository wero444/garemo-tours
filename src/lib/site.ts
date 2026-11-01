// Set when the site is served from a sub-path, e.g. /garemo-tours on GitHub Pages
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export const siteConfig = {
  name: 'GAREMO',
  legalName: 'GAREMO Tours',
  // Full public URL of the site root, including the base path
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://garemotours.com').replace(/\/$/, ''),
  locale: 'en_US',
  title: 'Garemo Tours | Small-Group & Private Tours in Georgia',
  tagline: 'Georgia, the way we know it',
  description:
    'Tbilisi-based small-group and private tours across Georgia — mountain regions, historic towns, vineyards and local life, beyond the usual tourist paths.',
  about:
    'Garemo is Georgian for “surroundings”: the atmosphere of a place and the people who share it. Founded in Tbilisi by two local guides with fourteen years on the road, Garemo shares Georgia with all its beauty, contrasts and everyday life.',
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
  email: 'info@garemotours.com',
  // TODO: confirm the official Instagram handle
  instagram: 'https://www.instagram.com/garemotours/',
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
