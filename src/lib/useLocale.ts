import { usePathname } from 'next/navigation'
import { localeOf } from 'src/lib/i18n'

export const useLocale = () => localeOf(usePathname())
