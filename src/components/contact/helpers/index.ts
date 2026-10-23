import { Mail, Phone, type LucideIcon } from 'lucide-react'

interface Channel {
  label: string
  value: string
  href: string
  icon: LucideIcon
}

export const title = 'Write to us'
export const lead = 'Tell us when you\'d like to come and what you hope to see.'
export const brand = 'Garemo Tours'
export const location = 'Tbilisi, Georgia'
export const motto = 'Georgia the way we know it'

export const channels: Array<Channel> = [
  { label: 'Email', value: 'sh.tsereteli@garemotours.com', href: 'mailto:sh.tsereteli@garemotours.com', icon: Mail },
  { label: 'Phone', value: '+995 557 996 876', href: 'tel:+995557996876', icon: Phone }
]
