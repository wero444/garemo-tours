import { usePathname } from 'next/navigation'
import { content } from 'src/components/header/helpers'
import { useLocale } from 'src/lib/useLocale'

export const useNavItems = () => {
  const pathname = usePathname()
  const locale = useLocale()
  const { home: homeLabel, nav, tagline } = content[locale]
  const home = pathname === '/'
  const items = home ? [{ label: homeLabel, href: '#' }, ...nav] : [{ label: homeLabel, href: '/' }, ...nav.map(item => ({ ...item, href: `/${item.href}` }))]

  return { home, items, locale, tagline }
}
