import Image from 'next/image'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import type { PointerEvent, RefObject } from 'react'
import { content, type Region } from 'src/components/destinations/helpers'

const offset = (index: number, slide: number, count: number) => ((index - slide) % count + count + Math.floor(count / 2)) % count - Math.floor(count / 2)
import { useLocale } from 'src/lib/useLocale'

interface Props {
  ref: RefObject<HTMLDivElement | null>
  region: Region
  slide: number
  onClose: () => void
  onSlide: (index: number) => void
  onSlideDown: (event: PointerEvent<HTMLElement>) => void
  onSlideUp: (event: PointerEvent<HTMLElement>) => void
}

const ease = 'ease-[cubic-bezier(0.16,1,0.3,1)]'
const control = `flex size-9 items-center justify-center rounded-full border border-primary/25 text-primary outline-none transition-[scale,background-color,border-color,color] duration-500 hover:scale-105 hover:border-primary hover:bg-primary hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-primary/50 ${ease}`

export const RegionPanel = ({ ref, region, slide, onClose, onSlide, onSlideDown, onSlideUp }: Props) => {
  const { ask, close, previous, next, photo } = content[useLocale()]
  const { name, text, places, images } = region

  return (
    <div
      ref={ref}
      role='region'
      aria-labelledby='destination-name'
      className='relative z-30 mt-8 w-full overflow-hidden rounded-3xl border border-white/60 bg-[color-mix(in_oklab,var(--secondary),white_55%)] shadow-[0_2rem_4rem_-1.5rem_rgb(0_0_0/0.45)] lg:absolute lg:mt-0 lg:w-md xl:w-136 2xl:w-xl'
    >
      <button
        type='button'
        aria-label={close}
        onClick={onClose}
        className={`absolute top-3 right-3 z-10 flex size-9 items-center justify-center rounded-full text-primary/70 outline-none transition-[rotate,color,background-color] duration-500 hover:rotate-90 hover:bg-primary/10 hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/50 ${ease}`}
      >
        <X className='size-4.5' strokeWidth={1.5} />
      </button>

      <div className='px-7 pt-6 pb-4 text-center'>
        <h3 id='destination-name' className='panel-in font-hand text-4xl leading-tight text-primary'>{name}</h3>
        <p className='panel-in mt-2 text-[0.9375rem] leading-[1.65] text-secondary-foreground/75'>{text}</p>
        <p className='panel-in mt-3 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-primary'>{places.join(' · ')}</p>
      </div>

      <div className='panel-in px-4'>
        <div
          onPointerDown={onSlideDown}
          onPointerUp={onSlideUp}
          className='relative aspect-2/1 touch-pan-y select-none perspective-[1400px]'
        >
          {images.map((image, i) => {
            const d = offset(i, slide, images.length)
            const a = Math.abs(d)

            return (
              <button
                key={image.src}
                type='button'
                tabIndex={a === 0 ? -1 : 0}
                aria-hidden={a > 1}
                aria-label={photo(name, i, images.length)}
                onClick={() => onSlide(i)}
                style={{
                  transform: `translateX(${d * 96}%) translateZ(${-a * 110}px) rotateY(${-Math.max(-1.5, Math.min(1.5, d)) * 30}deg)`,
                  opacity: a > 1.2 ? 0 : 1,
                  zIndex: 10 - a,
                  pointerEvents: a > 1.2 ? 'none' : 'auto'
                }}
                className={`absolute inset-y-0 left-[31%] w-[38%] overflow-hidden rounded-2xl bg-primary/10 shadow-[0_1.25rem_2rem_-1rem_rgb(0_0_0/0.5)] outline-none transition-[transform,opacity] duration-900 backface-hidden focus-visible:ring-2 focus-visible:ring-primary/50 ${a === 0 ? 'cursor-default' : ''} ${ease}`}
              >
                <Image
                  src={image}
                  alt={photo(name, i, images.length)}
                  fill
                  draggable={false}
                  placeholder='blur'
                  sizes='(min-width: 1280px) 220px, (min-width: 1024px) 180px, 40vw'
                  className='slide-image object-cover'
                />
                <span aria-hidden className='pointer-events-none absolute inset-0 rounded-[inherit] bg-linear-to-br from-white/12 via-transparent to-black/15 ring-1 ring-white/20 ring-inset' />
              </button>
            )
          })}
        </div>

        <div className='mt-4 flex items-center justify-between gap-4 px-1'>
          <span className='text-[0.6875rem] font-medium tabular-nums tracking-[0.2em] text-secondary-foreground/60'>
            {`${String(slide + 1).padStart(2, '0')} / ${String(images.length).padStart(2, '0')}`}
          </span>
          <div className='flex gap-1.5'>
            {images.map((image, i) => (
              <button
                key={image.src}
                type='button'
                aria-label={photo(name, i, images.length)}
                aria-current={i === slide}
                onClick={() => onSlide(i)}
                className={`h-1 w-3 rounded-full bg-primary/25 outline-none transition-[width,background-color] duration-500 hover:bg-primary/50 focus-visible:ring-2 focus-visible:ring-primary/50 ${ease}`}
              />
            ))}
          </div>
          <div className='flex gap-2'>
            <button type='button' aria-label={previous} onClick={() => onSlide(slide - 1)} className={control}>
              <ArrowLeft className='size-4' strokeWidth={1.75} />
            </button>
            <button type='button' aria-label={next} onClick={() => onSlide(slide + 1)} className={control}>
              <ArrowRight className='size-4' strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </div>

      <div className='panel-in mt-4 flex justify-center border-t border-primary/15 px-5 py-4'>
        <a
          href='#contact'
          onClick={onClose}
          className={`group/ask inline-flex items-center gap-3 rounded-full bg-primary py-3 pr-5 pl-6 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-primary-foreground shadow-[0_0.75rem_1.75rem_-0.75rem_rgb(0_0_0/0.5)] outline-none transition-[translate,box-shadow] duration-500 hover:-translate-y-0.5 hover:shadow-[0_1.25rem_2.25rem_-0.75rem_rgb(0_0_0/0.55)] focus-visible:ring-3 focus-visible:ring-primary/40 ${ease}`}
        >
          {ask}
          <ArrowRight aria-hidden className={`size-4 transition-transform duration-500 group-hover/ask:translate-x-1 ${ease}`} strokeWidth={1.75} />
        </a>
      </div>
    </div>
  )
}
