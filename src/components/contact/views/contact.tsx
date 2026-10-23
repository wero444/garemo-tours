'use client'

import { ArrowUpRight } from 'lucide-react'
import { useContact } from 'src/components/contact/hooks/useContact'
import { brand, channels, lead, location, motto, title } from 'src/components/contact/helpers'
import { Words } from 'src/components/ui/words'

export const Contact = () => {
  const { container } = useContact()

  return (
    <section
      ref={container}
      id='contact'
      aria-labelledby='contact-title'
      className='overflow-hidden bg-secondary px-6 pt-20 pb-8 md:px-10 md:pt-24 lg:px-16'
    >
      <div className='mx-auto max-w-6xl'>
        <div className='grid gap-12 md:grid-cols-[1.1fr_1fr] md:items-end md:gap-16'>
          <div>
            <h2 id='contact-title' className='text-5xl font-light leading-[1.05] tracking-tight text-primary md:text-6xl lg:text-7xl'>
              <span className='sr-only'>{title}</span>
              <Words text={title} className='contact-char' chars />
            </h2>
            <p className='mt-5 max-w-sm text-base leading-[1.75] text-secondary-foreground/75 md:mt-6 md:text-lg'>
              <span className='sr-only'>{lead}</span>
              <Words text={lead} className='contact-word' />
            </p>
          </div>

          <ul className='flex flex-col'>
            {channels.map(({ label, value, href, icon: Icon }) => (
              <li key={label} className='contact-row relative'>
                <a href={href} className='group flex items-center gap-4 py-5 outline-none md:gap-5'>
                  <span className='contact-icon flex size-11 shrink-0 items-center justify-center rounded-full border border-primary/25 text-primary transition-colors duration-500 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground group-focus-visible:ring-3 group-focus-visible:ring-ring/50 md:size-12'>
                    <Icon className='size-4.5' strokeWidth={1.75} />
                  </span>
                  <span className='flex min-w-0 flex-col gap-1 overflow-hidden'>
                    <span className='contact-in text-[11px] font-medium uppercase tracking-[0.3em] text-secondary-foreground/55'>{label}</span>
                    <span className='contact-in truncate text-base text-primary md:text-lg'>{value}</span>
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    className='contact-in ml-auto size-5 shrink-0 text-primary/50 transition-[translate,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary'
                    strokeWidth={1.5}
                  />
                </a>
                <span aria-hidden className='contact-line absolute inset-x-0 bottom-0 h-px origin-left bg-primary/20' />
              </li>
            ))}
          </ul>
        </div>

        <div className='relative mt-16 flex flex-col gap-4 pt-6 text-[11px] font-medium uppercase tracking-[0.3em] text-secondary-foreground/60 md:mt-20 md:flex-row md:items-center md:justify-between'>
          <span aria-hidden className='contact-rule absolute inset-x-0 top-0 h-px bg-primary/20' />
          <p className='contact-foot'>{`© ${brand}`}</p>
          <p className='contact-foot flex items-center gap-3'>
            <span aria-hidden className='relative flex size-2'>
              <span className='absolute inset-0 rounded-full bg-primary motion-safe:animate-pulse-ring' />
              <span className='relative size-2 rounded-full bg-primary' />
            </span>
            {location}
          </p>
          <p className='contact-foot text-primary'>{motto}</p>
        </div>
      </div>
    </section>
  )
}
