'use client'

import { Fragment } from 'react'
import Link from 'next/link'
import { cn } from 'cn'
import { languages } from 'src/lib/i18n'
import { useLocale } from 'src/lib/useLocale'

const text = {
  en: { label: 'Language', soon: 'Coming soon' }
}

const ease = 'ease-[cubic-bezier(0.16,1,0.3,1)]'
const item = 'relative py-1 text-[0.6875rem] font-medium tracking-[0.14em] outline-none transition-colors duration-300'

interface Props {
  className?: string
  onSelect?: () => void
}

export const LanguageSwitcher = ({ className, onSelect }: Props) => {
  const locale = useLocale()
  const { label, soon } = text[locale]

  return (
    <nav aria-label={label} className={cn('flex items-center gap-2', className)}>
      {languages.map(({ code, label: short, name, href, lang }, index) => {
        const active = code === locale

        return (
          <Fragment key={code}>
            {index > 0 && <span aria-hidden className='text-[0.6875rem] text-primary/30'>/</span>}
            {/* Languages without a translation yet are listed but cannot be chosen */}
            {href ? (
              <Link
                href={href}
                hrefLang={lang}
                lang={lang}
                aria-label={name}
                aria-current={active ? 'true' : undefined}
                onClick={onSelect}
                className={cn(item, 'group focus-visible:text-primary', active ? 'text-primary' : 'text-primary/45 hover:text-primary')}
              >
                {short}
                <span
                  aria-hidden
                  className={cn(
                    `absolute inset-x-0 bottom-0 h-px origin-left bg-primary transition-transform duration-500 ${ease}`,
                    active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100'
                  )}
                />
              </Link>
            ) : (
              <span lang={lang} aria-disabled title={`${name} — ${soon}`} className={cn(item, 'cursor-not-allowed text-primary/30')}>
                {short}
              </span>
            )}
          </Fragment>
        )
      })}
    </nav>
  )
}
