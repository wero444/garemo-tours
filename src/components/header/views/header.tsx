'use client'

import { useEffect } from 'react'
import { useHeader } from 'src/components/header/hooks/useHeader'
import { useNavItems } from 'src/components/header/hooks/useNavItems'
import { Chars } from 'src/components/header/views/chars'
import { Menu } from 'src/components/header/views/menu'
import { NavAnchor } from 'src/components/header/views/navAnchor'
import { Wordmark } from 'src/components/header/views/wordmark'
import { LanguageSwitcher } from 'src/components/language/views/languageSwitcher'
import { ThemeToggle } from 'src/components/theme/views/themeToggle'
import { htmlLang } from 'src/lib/i18n'
import { siteConfig } from 'src/lib/site'

const ease = 'ease-[cubic-bezier(0.16,1,0.3,1)]'

export const Header = () => {
  const { home, items, locale } = useNavItems()
  const { container } = useHeader(home)

  useEffect(() => {
    document.documentElement.lang = htmlLang[locale]
  }, [locale])

  return (
    <header
      ref={container}
      className={`group/header fixed inset-x-0 top-0 z-20 flex w-full items-center gap-6 px-5 py-4 transition-[padding,translate] duration-700 data-scrolled:py-3 data-hidden:not-focus-within:-translate-y-[calc(100%+2rem)] md:px-8 md:py-6 md:data-scrolled:py-3.5 lg:gap-10 ${ease}`}
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-2 inset-y-1.5 -z-10 scale-x-[0.97] overflow-hidden rounded-full border border-white/50 bg-secondary/75 opacity-0 shadow-[0_10px_40px_-16px_rgb(0_0_0/0.35)] backdrop-blur-2xl backdrop-saturate-125 transition-[opacity,scale] duration-700 group-data-scrolled/header:scale-x-100 group-data-scrolled/header:opacity-100 md:inset-x-3 dark:border-white/15 dark:bg-[rgb(62_50_43/0.8)] dark:shadow-[0_10px_40px_-12px_rgb(0_0_0/0.7)] ${ease}`}
      >
        <span className='header-sheen absolute inset-y-0 left-0 w-1/4 -skew-x-12 bg-linear-to-r from-transparent via-white/45 to-transparent opacity-0 dark:via-white/10' />
      </div>
      <a
        href='#'
        aria-label={siteConfig.legalName}
        className={`invisible ml-1 w-28 -translate-x-2 text-primary opacity-0 outline-none transition-[opacity,translate,visibility] duration-700 group-data-scrolled/header:visible group-data-scrolled/header:translate-x-0 group-data-scrolled/header:opacity-100 md:hidden dark:drop-shadow-[0_1px_10px_rgb(0_0_0/0.65)] ${ease}`}
      >
        <Wordmark className='h-auto w-full' />
      </a>
      <nav aria-label='Main' className='mx-auto hidden max-w-5xl flex-1 md:block dark:drop-shadow-[0_1px_10px_rgb(0_0_0/0.65)]'>
        <ul className='flex justify-between gap-x-4 lg:gap-x-6'>
          {items.map(({ label, href }) => (
            <li key={href} className='nav-item invisible'>
              <NavAnchor
                href={href}
                aria-label={label}
                className='nav-link relative block whitespace-nowrap py-1 text-xs font-medium uppercase tracking-[0.12em] text-primary outline-none lg:text-sm lg:tracking-[0.15em] xl:text-base xl:tracking-[0.2em]'
              >
                <span aria-hidden className='block leading-[1.3]'><Chars text={label} /></span>
                <span
                  aria-hidden
                  className='nav-line absolute inset-x-0 bottom-0 block h-px bg-primary'
                  style={{ transform: 'scaleX(0)' }}
                />
              </NavAnchor>
            </li>
          ))}
        </ul>
      </nav>
      <div className='-my-2.5 hidden items-center gap-3 md:flex lg:gap-4 dark:drop-shadow-[0_1px_10px_rgb(0_0_0/0.65)]'>
        <LanguageSwitcher className='nav-item invisible' />
        <ThemeToggle className='nav-item invisible' />
      </div>
      <Menu />
    </header>
  )
}
