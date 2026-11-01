'use client'

import { useAbout } from 'src/components/about/hooks/useAbout'
import { content } from 'src/components/about/helpers'
import { AboutTitle } from 'src/components/about/views/aboutTitle'
import { Tree } from 'src/components/about/views/tree'
import { Divider } from 'src/components/divider/views/divider'
import { Founders } from 'src/components/founders/views/founders'
import { Words } from 'src/components/ui/words'
import { useLocale } from 'src/lib/useLocale'

export const About = () => {
  const { container } = useAbout()
  const { title, heading, paragraphs } = content[useLocale()]

  return (
    <section
      ref={container}
      id='about'
      aria-labelledby='about-title'
      className='relative overflow-hidden bg-secondary pt-24 pb-20 md:pt-32 md:pb-24 lg:pt-40 lg:pb-28'
    >
      <div className='relative mx-auto max-w-4xl px-6'>
        <div aria-hidden className='about-trees pointer-events-none absolute -top-10 left-6 text-primary sm:top-0 md:left-2 lg:-left-10'>
          <Tree className='about-tree invisible absolute top-10 left-0 w-9 -rotate-6 sm:top-12 sm:w-12 md:w-14' />
          <Tree className='about-tree invisible absolute top-0 left-10 w-6 rotate-6 sm:left-14 sm:w-8 md:left-16 md:w-10' />
        </div>

        <h2 id='about-title' className='mx-auto w-[min(56vw,240px)] text-primary md:w-75'>
          <span className='sr-only'>{title}</span>
          <AboutTitle className='about-title invisible h-auto w-full overflow-visible' />
        </h2>
      </div>

      <div className='mt-12 px-6 md:mt-16'>
        <Founders />
      </div>

      <div className='mt-14 md:mt-16'>
        <Divider />
      </div>

      <div className='mx-auto mt-10 max-w-2xl px-6 text-center md:mt-12'>
        <h3 className='text-3xl font-light tracking-tight text-primary md:text-4xl'>
          <span className='sr-only'>{heading}</span>
          <Words text={heading} className='about-heading-char' chars />
        </h3>

        <div className='mt-6 space-y-5 text-[15px] leading-[1.8] text-secondary-foreground/85 md:mt-8 md:space-y-6 md:text-lg'>
          {paragraphs.map((paragraph, i) => (
            <p key={i} className='about-paragraph'>
              <Words text={paragraph} className='about-word invisible' />
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
