'use client'

import { useTravel } from 'src/components/travel/hooks/useTravel'
import { title, ways } from 'src/components/travel/helpers'
import { Sun } from 'src/components/travel/views/sun'
import { Puri } from 'src/components/travel/views/puri'
import { Bottle } from 'src/components/travel/views/bottle'
import { Words } from 'src/components/ui/words'

const icons = { sun: Sun, puri: Puri, bottle: Bottle }

export const Travel = () => {
  const { container, onWayEnter, onWayLeave } = useTravel()

  return (
    <section
      ref={container}
      id='how-we-travel'
      aria-labelledby='travel-title'
      className='bg-secondary/70 px-6 py-20 md:py-24 lg:py-28'
    >
      <div className='mx-auto max-w-5xl'>
        <h2 id='travel-title' className='text-center text-4xl font-light tracking-tight text-primary md:text-5xl lg:text-6xl'>
          <span className='sr-only'>{title}</span>
          <Words text={title} className='travel-title-char' chars />
        </h2>
        <span aria-hidden className='travel-rule mx-auto mt-6 block h-px w-16 bg-primary/40 md:mt-8' />

        <ul className='mt-14 grid grid-cols-1 gap-14 sm:grid-cols-3 sm:gap-8 md:mt-20 md:gap-12'>
          {ways.map(({ icon, label, text }, i) => {
            const Icon = icons[icon]

            return (
              <li
                key={label}
                onPointerEnter={() => onWayEnter(i)}
                onPointerLeave={() => onWayLeave(i)}
                className='travel-way invisible flex flex-col items-center text-center'
              >
                <div className='travel-icon flex h-20 items-end justify-center text-primary md:h-24'>
                  <Icon className={`h-full w-auto overflow-visible travel-${icon}`} />
                </div>

                <h3 className='mt-6 text-xl text-primary md:mt-8 md:text-2xl'>
                  <span className='sr-only'>{label}</span>
                  <Words text={label} className='travel-label' chars />
                </h3>

                <p className='mt-2 max-w-64 text-[15px] leading-[1.7] text-secondary-foreground/70 md:mt-3 md:text-base'>
                  <Words text={text} className='travel-word' />
                </p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
