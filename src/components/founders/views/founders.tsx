'use client'

import Image from 'next/image'
import { useFounders } from 'src/components/founders/hooks/useFounders'
import { founders, languages } from 'src/components/founders/helpers'
import { ArchFrame } from 'src/components/ui/archFrame'
import { pressDent, pressDown, pressUp } from 'src/lib/press'


export const Founders = () => {
  const { container, onPointerEnter, onPointerMove, onPointerLeave } = useFounders()

  return (
    <section aria-label='Founders' className='bg-secondary px-6 pt-20 pb-16 md:pt-28 md:pb-20 lg:pb-24'>
      <div ref={container} className='mx-auto max-w-3xl'>
        <ul className='grid grid-cols-1 justify-items-center gap-16 sm:grid-cols-2 sm:gap-10 md:gap-16'>
          {founders.map(({ name, role, image, position }) => (
            <li key={name} className='founder invisible flex w-full max-w-72 flex-col items-center text-center sm:max-w-none'>
              <div
                onPointerEnter={onPointerEnter}
                onPointerMove={onPointerMove}
                onPointerLeave={onPointerLeave}
                onPointerDown={pressDown}
                onPointerUp={pressUp}
                className='group relative aspect-4/5 w-full cursor-pointer transition-[translate] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] perspective-[900px] hover:-translate-y-2'
              >
                <span aria-hidden className='founder-ground absolute inset-x-[12%] -bottom-7 h-8 rounded-[50%] bg-black/25 blur-xl' />
                <div className='press-tilt absolute inset-0'>
                  <span aria-hidden className='founder-glow absolute inset-0 rounded-t-full rounded-b-md shadow-[0_40px_80px_-36px_color-mix(in_oklab,var(--primary)_55%,transparent)]' />
                  <span aria-hidden className='absolute inset-0 rounded-t-full rounded-b-md opacity-0 shadow-[0_50px_100px_-30px_color-mix(in_oklab,var(--primary)_60%,transparent)] transition-opacity duration-700 group-hover:opacity-100' />

                  <ArchFrame className='founder-frame absolute! inset-0 border border-primary/25 bg-[color-mix(in_oklab,var(--secondary),var(--foreground)_6%)]'>
                    <Image
                      src={image}
                      alt={`Portrait of ${name}`}
                      fill
                      placeholder='blur'
                      sizes='(min-width: 640px) 360px, 288px'
                      className={`founder-image object-cover ${position}`}
                    />
                    <span aria-hidden className='absolute inset-0 bg-linear-to-b from-white/10 via-transparent to-black/25 opacity-70 transition-opacity duration-700 group-hover:opacity-100' />
                    <span aria-hidden className={pressDent} />
                  </ArchFrame>
                </div>
              </div>

              <div className='mt-8 overflow-hidden'>
                <h3 className='founder-name text-xl font-medium text-primary md:text-2xl'>{name}</h3>
              </div>
              <p className='founder-role mt-1.5 text-sm text-secondary-foreground/65 md:text-base'>{role}</p>
            </li>
          ))}
        </ul>

        <p className='founders-languages invisible mt-16 flex items-center justify-center gap-4 text-xs font-medium uppercase tracking-[0.3em] text-secondary-foreground/70 md:mt-20 md:text-sm'>
          <span>{languages[0]}</span>
          <span aria-hidden className='relative flex size-2'>
            <span className='absolute inset-0 rounded-full bg-primary motion-safe:animate-pulse-ring' />
            <span className='absolute inset-0 rounded-full bg-primary [animation-delay:1.2s] motion-safe:animate-pulse-ring' />
            <span className='relative size-2 rounded-full bg-primary' />
          </span>
          <span>{languages[1]}</span>
        </p>
      </div>
    </section>
  )
}
