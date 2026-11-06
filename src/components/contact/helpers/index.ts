import type { ComponentType } from 'react'
import { Mail, PhoneCall } from 'lucide-react'
import { Instagram } from 'src/components/contact/views/instagram'
import type { Locale } from 'src/lib/i18n'
import { siteConfig } from 'src/lib/site'

interface Channel {
  label: string
  value: string
  href: string
  icon: ComponentType<{ className?: string, strokeWidth?: number }>
  external?: boolean
}

export const brand = 'Garemo Tours'

const email = { value: siteConfig.email, href: `mailto:${siteConfig.email}`, icon: Mail }
const phone = { value: '+995 557 996 876', href: `tel:${siteConfig.phone}`, icon: PhoneCall }
const instagram = { value: '@garemotours', href: siteConfig.instagram, icon: Instagram, external: true }

export const content: Record<Locale, { title: string, lead: string, location: string, channels: Array<Channel> }> = {
  en: {
    title: 'Write to us',
    lead: 'Planning a group? Tell us your dates, how many people, and what they hope to see.',
    location: 'Tbilisi, Georgia',
    channels: [{ label: 'Email', ...email }, { label: 'Phone', ...phone }, { label: 'Instagram', ...instagram }]
  }
}
