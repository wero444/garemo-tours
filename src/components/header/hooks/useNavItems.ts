import { usePathname } from 'next/navigation'
import { content } from 'src/components/header/helpers'
import { localeOf } from 'src/lib/i18n'

export const useNavItems = () => {
  const pathname = usePathname()
  const locale = localeOf(pathname)
  const { home: homeLabel, nav, tagline } = content[locale]
  const home = pathname === '/' || locale === 'ge'
  const items = home ? nav : [{ label: homeLabel, href: '/' }, ...nav.map(item => ({ ...item, href: `/${item.href}` }))]

  return { home, items, locale, tagline }
}
