'use client'

import Image from 'next/image'
import { Dialog } from '@base-ui/react/dialog'
import { ArrowRight, X } from 'lucide-react'
import type { MouseEvent } from 'react'
import type { Tour } from 'src/components/tours/helpers'
import { useTourModal } from 'src/components/tours/hooks/useTourModal'
import { ArchFrame } from 'src/components/ui/archFrame'

interface Props {
  tour: Tour
  ask: string
  close: string
  onAsk: (event: MouseEvent<HTMLAnchorElement>) => void
}

const ease = 'ease-[cubic-bezier(0.16,1,0.3,1)]'

const Moments = ({ tour, ask, close, onAsk }: Props) => {
  const { container } = useTourModal()

  return (
    <div ref={container} className='relative px-5 pt-14 pb-10 sm:px-8 md:px-12 md:pt-16 md:pb-12'>
      <Dialog.Close
        aria-label={close}
        className={`absolute top-4 right-4 flex size-10 items-center justify-center rounded-full text-primary/70 outline-none transition-[color,background-color,rotate] duration-500 hover:rotate-90 hover:bg-primary/10 hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/50 md:top-5 md:right-5 ${ease}`}
      >
        <X className='size-5' strokeWidth={1.5} />
      </Dialog.Close>

      <div className='flex flex-col items-center text-center'>
        <Dialog.Title className='moment-heading text-4xl font-light tracking-tight text-primary md:text-5xl'>
          {tour.title}
        </Dialog.Title>
        <Dialog.Description className='moment-heading mt-3 max-w-md text-sm leading-[1.7] text-secondary-foreground/70 md:text-[0.9375rem]'>
          {tour.text}
        </Dialog.Description>
      </div>

      <ul className='group/row -mx-5 mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 scrollbar-none sm:-mx-8 sm:px-8 md:mx-0 md:mt-12 md:h-[min(17rem,38dvh)] md:overflow-visible md:px-0 md:pb-0 lg:gap-4'>
        {tour.moments.map(({ label, image }) => (
          <li
            key={label}
            className={`moment group/item flex w-[38vw] max-w-40 shrink-0 snap-start flex-col transition-[flex-grow,opacity] duration-800 sm:w-[30vw] md:w-auto md:max-w-none md:shrink md:grow md:basis-0 md:hover:grow-[2.6] md:group-hover/row:opacity-60 md:hover:opacity-100! ${ease}`}
          >
            <ArchFrame className='moment-frame aspect-3/4 w-full bg-primary/10 shadow-[0_1.25rem_2.5rem_-1.5rem_rgb(0_0_0/0.5)] md:aspect-auto md:min-h-0 md:flex-1'>
              <Image
                src={image}
                alt=''
                fill
                placeholder='blur'
                sizes='(min-width: 768px) 360px, 45vw'
                className={`moment-image object-cover transition-[scale] duration-1000 group-hover/item:scale-105 ${ease}`}
              />
              <span aria-hidden className='pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-white/20 ring-inset' />
            </ArchFrame>
            <div className='moment-label mt-4 flex justify-center overflow-hidden whitespace-nowrap'>
              <span className='truncate text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-primary md:text-xs'>
                {label}
              </span>
            </div>
            <span aria-hidden className={`mt-2.5 block h-px w-full origin-left scale-x-0 bg-primary/40 transition-transform duration-800 group-hover/item:scale-x-100 ${ease}`} />
          </li>
        ))}
      </ul>

      <div className='mt-10 flex justify-center md:mt-12'>
        <a
          href='#contact'
          onClick={onAsk}
          className={`moment-ask group/ask inline-flex items-center gap-3.5 rounded-full bg-primary py-4 pr-6 pl-7 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground shadow-[0_0.75rem_2rem_-0.75rem_rgb(0_0_0/0.5)] outline-none transition-[translate,box-shadow,background-color] duration-500 hover:-translate-y-0.5 hover:shadow-[0_1.25rem_2.5rem_-0.75rem_rgb(0_0_0/0.55)] focus-visible:ring-3 focus-visible:ring-primary/40 md:text-[0.8125rem] ${ease}`}
        >
          {ask}
          <ArrowRight aria-hidden className={`size-4.5 transition-transform duration-500 group-hover/ask:translate-x-1 ${ease}`} strokeWidth={1.75} />
        </a>
      </div>
    </div>
  )
}

export const TourModal = ({ open, onOpenChange, onOpenChangeComplete, ...props }: Props & {
  open: boolean
  onOpenChange: (open: boolean) => void
  onOpenChangeComplete: (open: boolean) => void
}) => (
  <Dialog.Root open={open} onOpenChange={onOpenChange} onOpenChangeComplete={onOpenChangeComplete}>
    <Dialog.Portal>
      <Dialog.Backdrop className='fixed inset-0 z-50 bg-black/45 backdrop-blur-md transition-opacity duration-500 data-ending-style:opacity-0' />
      <Dialog.Viewport className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-3 md:p-6'>
        <Dialog.Popup
          className={`relative my-auto w-full max-w-6xl rounded-[1.75rem] border border-white/50 bg-secondary shadow-[0_2rem_5rem_-1.5rem_rgb(0_0_0/0.6),inset_0_0.0625rem_0_rgb(255_255_255/0.5)] outline-none transition-[opacity,translate,scale] duration-700 data-ending-style:translate-y-4 data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-ending-style:duration-400 data-starting-style:translate-y-8 data-starting-style:scale-[0.96] data-starting-style:opacity-0 motion-reduce:transition-opacity ${ease}`}
        >
          <Moments {...props} />
        </Dialog.Popup>
      </Dialog.Viewport>
    </Dialog.Portal>
  </Dialog.Root>
)
