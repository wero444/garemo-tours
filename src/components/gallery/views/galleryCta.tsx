'use client'

import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { content } from 'src/components/gallery/helpers'
import { useGalleryCta } from 'src/components/gallery/hooks/useGalleryCta'
import { useLocale } from 'src/lib/useLocale'

export const GalleryCta = ({ preview, total }: { preview: Array<StaticImageData>, total: number }) => {
  const { onCtaEnter, onCtaMove, onCtaLeave } = useGalleryCta()
  const { cta, photos } = content[useLocale()]

  return (
    <Link
      href='/gallery'
      data-avoid-back-to-top
      onPointerEnter={onCtaEnter}
      onPointerMove={onCtaMove}
      onPointerLeave={onCtaLeave}
      onFocus={onCtaEnter}
      onBlur={onCtaLeave}
      className='gallery-cta group/cta invisible relative mx-auto mt-10 flex w-fit items-center gap-3 rounded-full border border-primary/20 bg-background/50 p-1.5 text-primary shadow-[0_1.5rem_3.75rem_-1.875rem_color-mix(in_oklab,var(--primary)_70%,transparent)] outline-none backdrop-blur-sm transition-colors duration-500 hover:text-primary-foreground focus-visible:ring-3 focus-visible:ring-ring/50 md:mt-[2.6rem] md:gap-4'
    >
      <span aria-hidden className='cta-fill absolute inset-0 rounded-full bg-primary' style={{ clipPath: 'circle(0% at 92% 50%)' }} />

      <span aria-hidden className='relative flex pl-1'>
        {preview.map((image, i) => (
          <span
            key={image.src}
            style={{ zIndex: preview.length - i }}
            className='cta-thumb relative -ml-2.5 size-8 overflow-hidden rounded-full ring-2 ring-secondary transition-shadow duration-500 group-hover/cta:ring-primary md:size-9'
          >
            <Image src={image} alt={`Preview ${i + 1} from the GAREMO photo gallery`} fill sizes='36px' placeholder='blur' className='object-cover' />
          </span>
        ))}
      </span>

      <span className='relative flex flex-col pr-1'>
        <span className='sr-only'>{`${cta}, ${photos(total)}`}</span>
        <span aria-hidden className='relative block overflow-hidden text-[0.6875rem] font-medium uppercase tracking-[0.22em] md:text-xs'>
          <span className='block'>
            {cta.split('').map((char, i) => (
              <span key={i} className='cta-char cta-in inline-block whitespace-pre'>{char}</span>
            ))}
          </span>
          <span className='absolute inset-0 block translate-y-full'>
            {cta.split('').map((char, i) => (
              <span key={i} className='cta-char inline-block whitespace-pre'>{char}</span>
            ))}
          </span>
        </span>
        <span aria-hidden className='cta-count mt-0.5 text-[0.5625rem] uppercase tracking-[0.25em] opacity-60 md:text-[0.625rem]'>
          {photos(total)}
        </span>
      </span>

      <span aria-hidden className='cta-arrow-box relative size-9 shrink-0 md:size-10'>
        <span className='absolute inset-0 rounded-full bg-primary/50 transition-opacity duration-500 motion-safe:animate-pulse-ring group-hover/cta:opacity-0' />
        <span className='relative flex size-full items-center justify-center overflow-hidden rounded-full bg-primary text-primary-foreground transition-colors duration-500 group-hover/cta:bg-primary-foreground group-hover/cta:text-primary'>
          <ArrowRight className='cta-arrow relative size-4' strokeWidth={1.75} />
          <ArrowRight className='cta-arrow-next absolute size-4' strokeWidth={1.75} style={{ transform: 'translateX(-220%)' }} />
        </span>
      </span>
    </Link>
  )
}
