'use client'

import Link from 'next/link'
import { Menu } from '@base-ui/react/menu'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from 'cn'
import { Flag } from 'src/components/language/views/flag'
import { languages } from 'src/lib/i18n'
import { useLocale } from 'src/lib/useLocale'

const text = {
  en: { label: 'Language', soon: 'Soon' },
  ge: { label: 'ენა', soon: 'მალე' }
}

const ease = 'ease-[cubic-bezier(0.16,1,0.3,1)]'
const row = 'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-secondary-foreground outline-none transition-colors duration-200 select-none'

interface Props {
  className?: string
  onSelect?: () => void
  side?: 'top' | 'bottom'
}

export const LanguageSwitcher = ({ className, onSelect, side = 'bottom' }: Props) => {
  const locale = useLocale()
  const current = languages.find(({ code }) => code === locale) ?? languages[0]
  const { label, soon } = text[locale]

  return (
    <Menu.Root modal={false}>
      <Menu.Trigger
        aria-label={`${label}: ${current.name}`}
        className={cn(
          'group flex h-9 cursor-pointer items-center gap-2 rounded-full border border-primary/20 pr-2.5 pl-3 text-xs font-medium tracking-[0.12em] text-primary outline-none transition-[background-color,border-color] duration-300 hover:border-primary/40 hover:bg-primary/5 focus-visible:ring-2 focus-visible:ring-primary/50 data-popup-open:border-primary/40 data-popup-open:bg-primary/5',
          className
        )}
      >
        <Flag code={current.code} />
        {current.label}
        <ChevronDown aria-hidden className={`size-3.5 opacity-70 transition-transform duration-500 group-data-popup-open:rotate-180 ${ease}`} strokeWidth={2} />
      </Menu.Trigger>

      <Menu.Portal>
        <Menu.Positioner side={side} align='end' sideOffset={10} className='z-50'>
          <Menu.Popup
            className={`min-w-48 origin-(--transform-origin) rounded-2xl border border-white/50 bg-secondary/85 p-1.5 shadow-[0_18px_50px_-18px_rgb(0_0_0/0.4)] outline-none backdrop-blur-2xl backdrop-saturate-125 transition-[opacity,scale] duration-300 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 dark:border-white/15 dark:bg-[rgb(62_50_43/0.9)] ${ease}`}
          >
            {languages.map(({ code, label: short, name, href, lang }) => {
              const active = code === locale

              // Languages without a translation yet are listed but cannot be chosen
              if (!href) {
                return (
                  <Menu.Item key={code} disabled className={cn(row, 'cursor-not-allowed opacity-45')}>
                    <Flag code={code} />
                    <span lang={lang} className='flex-1'>{name}</span>
                    <span className='rounded-full border border-primary/30 px-2 py-0.5 text-[10px] font-medium tracking-[0.1em] text-primary'>{soon}</span>
                  </Menu.Item>
                )
              }

              return (
                <Menu.LinkItem
                  key={code}
                  render={<Link href={href} hrefLang={lang} />}
                  onClick={onSelect}
                  aria-current={active ? 'true' : undefined}
                  className={cn(row, 'cursor-pointer data-highlighted:bg-primary/8', active && 'text-primary')}
                >
                  <Flag code={code} />
                  <span lang={lang} className='flex-1'>{name}</span>
                  <span className='text-[11px] font-medium tracking-[0.12em] opacity-50'>{short}</span>
                  <Check aria-hidden className={cn('size-3.5 shrink-0 text-primary', !active && 'invisible')} strokeWidth={2.25} />
                </Menu.LinkItem>
              )
            })}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  )
}
