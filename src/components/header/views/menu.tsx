import { useMenu } from 'src/components/header/hooks/useMenu'
import { useNavItems } from 'src/components/header/hooks/useNavItems'
import { Burger } from 'src/components/header/views/burger'
import { Chars } from 'src/components/header/views/chars'
import { NavAnchor } from 'src/components/header/views/navAnchor'
import { Logo } from 'src/components/hero/views/logo'
import { ThemeToggle } from 'src/components/theme/views/themeToggle'
import { siteConfig } from 'src/lib/site'

export const Menu = () => {
  const { home, items } = useNavItems()
  const { container, open, toggle, close } = useMenu(home)

  return (
    <div ref={container} className='ml-auto md:hidden'>
      <div className='relative z-10 flex justify-end dark:drop-shadow-[0_1px_10px_rgb(0_0_0/0.65)]'>
        <Burger open={open} onClick={toggle} />
      </div>

      <div
        id='mobile-menu'
        inert={!open}
        className='menu-panel invisible fixed inset-0 flex flex-col overflow-y-auto bg-secondary px-6 pt-40 pb-8'
      >
        <a href='#' onClick={close} aria-label={siteConfig.legalName} className='menu-meta absolute top-5 left-6 w-28 text-primary outline-none'>
          <Logo className='h-auto w-full' />
        </a>

        <nav aria-label='Mobile'>
          <ul className='flex flex-col'>
            {items.map(({ label, href }) => (
              <li key={href} className='relative'>
                <NavAnchor
                  href={href}
                  onClick={close}
                  aria-label={label}
                  className='menu-link block overflow-hidden py-3 text-[clamp(1.375rem,min(7vw,5svh),2.25rem)] font-medium uppercase leading-none tracking-[0.1em] text-primary outline-none'
                >
                  <span aria-hidden className='block'><Chars text={label} /></span>
                </NavAnchor>
                <span aria-hidden className='menu-rule absolute inset-x-0 bottom-0 block h-px bg-primary/20' />
              </li>
            ))}
          </ul>
        </nav>

        <div className='mt-auto flex items-end justify-between gap-6 pt-10'>
          <p className='menu-meta max-w-56 text-xs uppercase leading-relaxed tracking-[0.2em] text-secondary-foreground/70'>
            {siteConfig.tagline}
          </p>
          <ThemeToggle className='menu-meta -mr-2.5 -mb-2.5 shrink-0' />
        </div>
      </div>
    </div>
  )
}
