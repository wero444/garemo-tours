import { Mail, Phone, type LucideIcon } from 'lucide-react'
import type { Locale } from 'src/lib/i18n'
import { siteConfig } from 'src/lib/site'

interface Channel {
  label: string
  value: string
  href: string
  icon: LucideIcon
}

export const brand = 'Garemo Tours'

const email = { value: siteConfig.email, href: `mailto:${siteConfig.email}`, icon: Mail }
const phone = { value: '+995 557 996 876', href: `tel:${siteConfig.phone}`, icon: Phone }

export const content: Record<Locale, { title: string, lead: string, location: string, motto: string, channels: Array<Channel> }> = {
  en: {
    title: 'Write to us',
    lead: 'Tell us when you\'d like to come and what you hope to see.',
    location: 'Tbilisi, Georgia',
    motto: 'Georgia, the way we know it',
    channels: [{ label: 'Email', ...email }, { label: 'Phone', ...phone }]
  }
}
