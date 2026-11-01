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
      onPointerEnter={onCtaEnter}
      onPointerMove={onCtaMove}
      onPointerLeave={onCtaLeave}
      onFocus={onCtaEnter}
      onBlur={onCtaLeave}
      className='gallery-cta group/cta invisible relative mx-auto mt-16 flex w-fit items-center gap-4 rounded-full border border-primary/20 bg-background/50 p-2 text-primary shadow-[0_24px_60px_-30px_color-mix(in_oklab,var(--primary)_70%,transparent)] outline-none backdrop-blur-sm transition-colors duration-500 hover:text-primary-foreground focus-visible:text-primary-foreground focus-visible:ring-3 focus-visible:ring-ring/50 md:mt-20 md:gap-6'
    >
      <span aria-hidden className='cta-fill absolute inset-0 rounded-full bg-primary' style={{ clipPath: 'circle(0% at 92% 50%)' }} />

      <span aria-hidden className='relative flex pl-1'>
        {preview.map((image, i) => (
          <span
            key={image.src}
            style={{ zIndex: preview.length - i }}
            className='cta-thumb relative -ml-3 size-10 overflow-hidden rounded-full ring-2 ring-secondary transition-shadow duration-500 first:ml-0 group-hover/cta:ring-primary md:size-12'
          >
            <Image src={image} alt={`Preview ${i + 1} from the GAREMO photo gallery`} fill sizes='48px' placeholder='blur' className='object-cover' />
          </span>
        ))}
      </span>

      <span className='relative flex flex-col pr-1'>
        <span className='sr-only'>{`${cta}, ${photos(total)}`}</span>
        <span aria-hidden className='relative block overflow-hidden text-xs font-medium uppercase tracking-[0.25em] md:text-sm'>
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
        <span aria-hidden className='cta-count mt-1 text-[10px] uppercase tracking-[0.3em] opacity-60 md:text-[11px]'>
          {photos(total)}
        </span>
      </span>

      <span aria-hidden className='cta-arrow-box relative size-11 shrink-0 md:size-13'>
        <span className='absolute inset-0 rounded-full bg-primary/50 transition-opacity duration-500 motion-safe:animate-pulse-ring group-hover/cta:opacity-0' />
        <span className='relative flex size-full items-center justify-center overflow-hidden rounded-full bg-primary text-primary-foreground transition-colors duration-500 group-hover/cta:bg-primary-foreground group-hover/cta:text-primary group-focus-visible/cta:bg-primary-foreground group-focus-visible/cta:text-primary'>
          <ArrowRight className='cta-arrow relative size-5' strokeWidth={1.75} />
          <ArrowRight className='cta-arrow-next absolute size-5' strokeWidth={1.75} style={{ transform: 'translateX(-220%)' }} />
        </span>
      </span>
    </Link>
  )
}
