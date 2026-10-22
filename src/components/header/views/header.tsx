'use client'

import { useHeader } from 'src/components/header/hooks/useHeader'
import { navItems } from 'src/components/header/helpers'
import { Chars } from 'src/components/header/views/chars'

export const Header = () => {
  const { container } = useHeader()

  return (
    <header ref={container} className='absolute inset-x-0 top-0 z-20 w-full px-6 py-6'>
      <nav className='mx-auto max-w-5xl'>
        <ul className='flex flex-wrap justify-center gap-x-10 gap-y-3 md:justify-between'>
          {navItems.map(({ label, href }) => (
            <li key={href} className='nav-item invisible'>
              <a
                href={href}
                aria-label={label}
                className='nav-link relative block pb-1 text-sm font-medium uppercase tracking-[0.2em] text-primary outline-none'
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
    </header>
  )
}
