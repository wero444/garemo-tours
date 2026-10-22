'use client'

import { useHeader } from 'src/components/header/hooks/useHeader'
import { navItems } from 'src/components/header/helpers'
import { Chars } from 'src/components/header/views/chars'
import { Menu } from 'src/components/header/views/menu'
import { ThemeToggle } from 'src/components/theme/views/themeToggle'

export const Header = () => {
  const { container } = useHeader()

  return (
    <header ref={container} className='absolute inset-x-0 top-0 z-20 flex w-full items-center gap-6 px-5 py-4 md:px-8 md:py-6 lg:gap-10'>
      <nav aria-label='Main' className='mx-auto hidden max-w-5xl flex-1 md:block dark:drop-shadow-[0_1px_10px_rgb(0_0_0/0.65)]'>
        <ul className='flex justify-between gap-x-6'>
          {navItems.map(({ label, href }) => (
            <li key={href} className='nav-item invisible'>
              <a
                href={href}
                aria-label={label}
                className='nav-link relative block pb-1 text-sm font-medium uppercase tracking-[0.15em] text-primary outline-none lg:text-base lg:tracking-[0.2em]'
              >
                <span aria-hidden className='block leading-[1.3]'><Chars text={label} /></span>
                <span
                  aria-hidden
                  className='nav-line absolute inset-x-0 bottom-0 block h-px bg-primary'
                  style={{ transform: 'scaleX(0)' }}
                />
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className='-my-2.5 -mr-2.5 hidden md:block dark:drop-shadow-[0_1px_10px_rgb(0_0_0/0.65)]'>
        <ThemeToggle className='nav-item invisible' />
      </div>
      <Menu />
    </header>
  )
}
