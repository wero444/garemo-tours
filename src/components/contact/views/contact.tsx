'use client'

import { ArrowUpRight } from 'lucide-react'
import { useContact } from 'src/components/contact/hooks/useContact'
import { brand, content } from 'src/components/contact/helpers'
import { ContactTitle } from 'src/components/contact/views/contactTitle'
import { Words } from 'src/components/ui/words'
import { useLocale } from 'src/lib/useLocale'

const external = { target: '_blank', rel: 'noopener noreferrer' }

export const Contact = () => {
  const { container } = useContact()
  const { title, lead, location, channels } = content[useLocale()]

  return (
    <section
      ref={container}
      id='contact'
      aria-labelledby='contact-title'
      className='flex min-h-svh -scroll-mt-20 flex-col overflow-hidden bg-secondary px-6 pt-24 pb-8 md:px-10 md:pt-24 md:pb-6 lg:px-16'
    >
      <div className='mx-auto flex w-full max-w-6xl flex-1 flex-col'>
        <div className='grid flex-1 content-center gap-12 md:grid-cols-[1fr_1fr] md:items-center md:gap-16'>
          <div>
            <h2 id='contact-title' className='w-[min(80vw,19rem)] text-primary md:w-88 lg:w-100'>
              <span className='sr-only'>{title}</span>
              <ContactTitle className='contact-title invisible h-auto w-full overflow-visible' />
            </h2>
            <p className='mt-6 max-w-sm text-base leading-[1.85] text-secondary-foreground/75 md:mt-8 md:text-[1.0625rem]'>
              <Words text={lead} className='contact-word' />
            </p>
          </div>

          <ul className='flex flex-col'>
            {channels.map(({ label, value, href, icon: Icon, external: outside }) => (
              <li key={label} className='contact-row relative'>
                <a href={href} {...(outside ? external : {})} className='group flex items-center gap-6 py-6 outline-none md:gap-7'>
                  <span className='contact-icon flex size-10 shrink-0 items-center justify-center text-primary transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-focus-visible:ring-3 group-focus-visible:ring-ring/50'>
                    <Icon className='size-8' strokeWidth={1.4} />
                  </span>
                  <span className='flex min-w-0 flex-col gap-1.5 overflow-hidden'>
                    <span className='contact-in text-[0.625rem] font-medium uppercase tracking-[0.3em] text-secondary-foreground/60'>{label}</span>
                    <span className='contact-in truncate text-lg text-primary md:text-xl'>{value}</span>
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    className='contact-in mb-auto ml-auto size-4 shrink-0 text-primary/60 transition-[translate,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary'
                    strokeWidth={1.5}
                  />
                </a>
                <span aria-hidden className='contact-line absolute inset-x-0 bottom-0 h-px origin-left bg-primary/25' />
              </li>
            ))}
          </ul>
        </div>

        <div className='relative mt-16 grid gap-4 pt-6 text-[0.625rem] font-medium uppercase tracking-[0.3em] text-secondary-foreground/65 md:grid-cols-2 md:items-center'>
          <span aria-hidden className='contact-rule absolute inset-x-0 top-0 h-px bg-primary/25' />
          <p className='contact-foot'>{`© ${brand}`}</p>
          <p className='contact-foot flex items-center gap-3 md:justify-self-end'>
            <span aria-hidden className='relative flex size-1.5'>
              <span className='absolute inset-0 rounded-full bg-primary motion-safe:animate-pulse-ring' />
              <span className='relative size-1.5 rounded-full bg-primary' />
            </span>
            {location}
          </p>
        </div>
      </div>
    </section>
  )
}
