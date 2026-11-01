import { basePath } from 'src/lib/site'

export type Locale = 'en' | 'ge'

export const languages = [
  { code: 'en', label: 'EN', name: 'English', href: '/', lang: 'en' },
  { code: 'pl', label: 'PL', name: 'Polski', href: null, lang: 'pl' },
  { code: 'ge', label: 'GE', name: 'ქართული', href: '/ge', lang: 'ka' }
] as const

export const htmlLang: Record<Locale, string> = { en: 'en', ge: 'ka' }

const localePath = /^\/ge(\/|$)/

export const localeOf = (pathname: string): Locale => localePath.test(pathname) ? 'ge' : 'en'

export const localeScript = `document.documentElement.lang = ${localePath}.test(location.pathname.slice(${JSON.stringify(basePath)}.length)) ? 'ka' : 'en'`
