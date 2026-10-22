import { usePathname } from 'next/navigation'
import { homeItem, navItems } from 'src/components/header/helpers'

export const useNavItems = () => {
  const home = usePathname() === '/'
  const items = home ? navItems : [homeItem, ...navItems.map(item => ({ ...item, href: `/${item.href}` }))]

  return { home, items }
}
