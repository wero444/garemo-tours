'use client'

import Image from 'next/image'
import { useFounders } from 'src/components/founders/hooks/useFounders'
import { founders, label, portrait } from 'src/components/founders/helpers'
import { ArchFrame } from 'src/components/ui/archFrame'
import { pressDent, pressDown, pressUp } from 'src/lib/press'
import { useLocale } from 'src/lib/useLocale'

export const Founders = () => {
  const { container, onPointerEnter, onPointerMove, onPointerLeave } = useFounders()
  const locale = useLocale()

  return (
    <div ref={container} className='mx-auto max-w-3xl'>
      <ul aria-label={label[locale]} className='grid grid-cols-1 justify-items-center gap-16 sm:grid-cols-2 sm:gap-10 md:gap-16'>
        {founders.map(({ name: names, image, position }) => {
          const name = names[locale]

          return (
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
                      alt={portrait[locale](name)}
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

              <div className='mt-6 overflow-hidden md:mt-7'>
                <h3 className='founder-name text-xl font-medium text-primary md:text-2xl'>{name}</h3>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
