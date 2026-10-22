'use client'

import { useAbout } from 'src/components/about/hooks/useAbout'
import { paragraphs } from 'src/components/about/helpers'
import { AboutTitle } from 'src/components/about/views/aboutTitle'
import { Tree } from 'src/components/about/views/tree'

export const About = () => {
  const { container } = useAbout()

  return (
    <section
      ref={container}
      id='about'
      aria-labelledby='about-title'
      className='relative overflow-hidden bg-secondary px-6 pt-24 pb-20 md:pt-32 md:pb-28 lg:pt-40 lg:pb-32'
    >
      <div className='relative mx-auto max-w-4xl'>
        <div aria-hidden className='about-trees pointer-events-none absolute -top-10 left-0 text-primary sm:top-0 md:-left-4 lg:-left-16'>
          <Tree className='about-tree invisible absolute top-10 left-0 w-9 -rotate-6 sm:top-12 sm:w-12 md:w-14' />
          <Tree className='about-tree invisible absolute top-0 left-10 w-6 rotate-6 sm:left-14 sm:w-8 md:left-16 md:w-10' />
        </div>

        <h2 id='about-title' className='mx-auto w-[min(56vw,240px)] text-primary md:w-75'>
          <AboutTitle className='about-title invisible h-auto w-full overflow-visible' />
        </h2>

        <div className='mx-auto mt-10 max-w-2xl space-y-6 text-center text-[15px] leading-[1.8] text-secondary-foreground/85 md:mt-14 md:space-y-8 md:text-lg'>
          {paragraphs.map((paragraph, i) => (
            <p key={i} className='about-paragraph'>
              <span className='sr-only'>{paragraph}</span>
              <span aria-hidden>
                {paragraph.split(' ').map((word, j) => (
                  <span key={j} className='inline-block overflow-hidden pb-0.5 align-bottom'>
                    <span className='about-word invisible inline-block'>{word}&nbsp;</span>
                  </span>
                ))}
              </span>
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
