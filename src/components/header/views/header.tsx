'use client'

import { useHeader } from 'src/components/header/hooks/useHeader'
import { useNavItems } from 'src/components/header/hooks/useNavItems'
import { Chars } from 'src/components/header/views/chars'
import { Menu } from 'src/components/header/views/menu'
import { NavAnchor } from 'src/components/header/views/navAnchor'
import { Wordmark } from 'src/components/header/views/wordmark'
import { LanguageSwitcher } from 'src/components/language/views/languageSwitcher'
import { ThemeToggle } from 'src/components/theme/views/themeToggle'
import { siteConfig } from 'src/lib/site'

const ease = 'ease-[cubic-bezier(0.16,1,0.3,1)]'
const bar = 'pointer-events-none absolute inset-y-1.5 -z-10 overflow-hidden rounded-full border border-white/60 bg-secondary/90 opacity-0 shadow-[inset_0_0.0625rem_0_rgb(255_255_255/0.6),0_0.25rem_0.75rem_rgb(0_0_0/0.18),0_1.25rem_3rem_-0.5rem_rgb(0_0_0/0.55)] backdrop-blur-xl backdrop-saturate-150 group-data-scrolled/header:opacity-100 dark:border-white/10 dark:bg-secondary/85 dark:shadow-[inset_0_0.0625rem_0_rgb(255_255_255/0.08),0_0.25rem_0.75rem_rgb(0_0_0/0.4),0_1.25rem_3rem_-0.5rem_rgb(0_0_0/0.9)]'

export const Header = () => {
  const { home, items } = useNavItems()
  const { container } = useHeader(home)

  return (
    <header
      ref={container}
      className={`group/header fixed inset-x-0 top-0 z-20 flex w-full items-center gap-6 px-5 lg:justify-center data-scrolled:py-3 md:px-8 md:py-3 md:data-scrolled:py-2.5 lg:gap-10 ${ease}`}
    >
      <div aria-hidden className={`header-bar ${bar}`}>
        <span className='header-sheen absolute inset-y-0 left-0 w-1/4 -skew-x-12 bg-linear-to-r from-transparent via-white/45 to-transparent opacity-0' />
      </div>
      <div aria-hidden className={`header-bar-side hidden lg:block ${bar}`} />
      <a
        href='#'
        aria-label={siteConfig.legalName}
        className={`ml-1 w-28 text-primary outline-none transition-[opacity,translate,visibility] duration-700 group-data-scrolled/header:visible group-data-scrolled/header:translate-x-0 group-data-scrolled/header:opacity-100 lg:hidden dark:drop-shadow-[0_0.0625rem_0.625rem_rgb(0_0_0/0.65)] ${ease}`}
      >
        <Wordmark className='h-auto w-full' />
      </a>
      <div className='header-content hidden grid-cols-[1fr_auto_1fr] items-center gap-x-10 lg:grid xl:gap-x-16 2xl:gap-x-28'>
        <span aria-hidden />
        <nav aria-label='Main' className='dark:drop-shadow-[0_0.0625rem_0.625rem_rgb(0_0_0/0.65)]'>
          <ul className='flex justify-center gap-x-5 xl:gap-x-7 2xl:gap-x-10'>
            {items.map(({ label, href }) => (
              <li key={href} className='nav-item invisible'>
                <NavAnchor
                  href={href}
                  aria-label={label}
                  className='nav-link relative block whitespace-nowrap py-1 text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-primary outline-none'
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
        <div className='-my-2.5 flex items-center justify-self-start gap-2 dark:drop-shadow-[0_0.0625rem_0.625rem_rgb(0_0_0/0.65)]'>
          <LanguageSwitcher className='nav-item invisible' />
          <ThemeToggle className='nav-item invisible [&_svg]:size-4.5' />
        </div>
      </div>
      <Menu />
    </header>
  )
}
