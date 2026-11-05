'use client'

import { useAbout } from 'src/components/about/hooks/useAbout'
import { content } from 'src/components/about/helpers'
import { AboutTitle } from 'src/components/about/views/aboutTitle'
import { Tree } from 'src/components/about/views/tree'
import { Founders } from 'src/components/founders/views/founders'
import { Words } from 'src/components/ui/words'
import { useLocale } from 'src/lib/useLocale'

export const About = () => {
  const { container } = useAbout()
  const { title, paragraphs } = content[useLocale()]

  return (
    // Fills the screen like the hero; the negative scroll margin cancels the page's scroll padding so the nav link lands on its top edge
    <section
      ref={container}
      id='about'
      aria-labelledby='about-title'
      className='relative flex min-h-dvh -scroll-mt-20 flex-col justify-center overflow-hidden bg-secondary px-6 py-20 md:py-16'
    >
      <div aria-hidden className='about-trees pointer-events-none absolute inset-0 text-primary'>
        <Tree className='about-tree invisible absolute top-[14%] left-[6%] w-7 -rotate-6 md:w-8 lg:top-[42%] lg:left-[9%]' />
        <Tree className='about-tree invisible absolute right-[8%] bottom-[4%] w-9 rotate-3 md:w-12' />
      </div>

      <h2 id='about-title' className='mx-auto w-[min(40vw,10rem)] text-primary'>
        <span className='sr-only'>{title}</span>
        <AboutTitle className='about-title invisible h-auto w-full overflow-visible' />
      </h2>

      <div className='mt-8 md:mt-10'>
        <Founders />
      </div>

      <div className='mx-auto mt-8 max-w-[42rem] space-y-2.5 text-center text-sm leading-[1.7] text-secondary-foreground/85 md:mt-10 md:text-[0.9375rem]'>
        {paragraphs.map((paragraph, i) => (
          <p key={i} className='about-paragraph'>
            <Words text={paragraph} className='about-word invisible' />
          </p>
        ))}
      </div>
    </section>
  )
}
