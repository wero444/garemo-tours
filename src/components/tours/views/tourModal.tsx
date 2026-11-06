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
    <div ref={container} className='relative px-5 pt-10 pb-10 sm:px-8 md:px-[2.65rem] md:pt-10 md:pb-[2.65rem]'>
      <Dialog.Close
        aria-label={close}
        className={`absolute top-3 right-3 flex size-9 items-center justify-center text-primary outline-none transition-[opacity,rotate] duration-500 hover:rotate-90 hover:opacity-70 focus-visible:ring-2 focus-visible:ring-primary/50 md:top-[0.85rem] md:right-[0.85rem] ${ease}`}
      >
        <X className='size-4.5' strokeWidth={1.5} />
      </Dialog.Close>

      <Dialog.Title className='moment-heading text-center text-3xl font-light text-primary md:text-[2.125rem]'>
        {tour.title}
      </Dialog.Title>
      <Dialog.Description className='sr-only'>{tour.text}</Dialog.Description>

      <ul className='mt-6 grid grid-cols-3 gap-x-3 gap-y-6 sm:grid-cols-6 md:mt-5 md:gap-x-[1.3rem]'>
        {tour.moments.map(({ label, image }) => (
          <li key={label} className='moment group/item flex min-w-0 flex-col items-center'>
            <ArchFrame className='moment-frame aspect-4/5 w-full rounded-b-none bg-primary/10'>
              <Image
                src={image}
                alt=''
                fill
                placeholder='blur'
                sizes='(min-width: 640px) 160px, 30vw'
                className={`moment-image object-cover transition-[scale] duration-1000 group-hover/item:scale-105 ${ease}`}
              />
            </ArchFrame>
            <span className='mt-2.5 max-w-full truncate text-[0.5625rem] font-medium uppercase tracking-[0.2em] text-primary sm:text-[0.625rem]'>
              {label}
            </span>
          </li>
        ))}
      </ul>

      <div className='mt-8 flex justify-center'>
        <a
          href='#contact'
          onClick={onAsk}
          className={`moment-ask group/ask inline-flex items-center gap-3 rounded-full bg-[#b9532f] py-4 pr-[1.4rem] pl-[1.55rem] text-[0.6875rem] leading-none font-semibold uppercase tracking-[0.18em] text-[#f6ede4] outline-none transition-[translate,background-color] duration-500 hover:-translate-y-0.5 hover:bg-[#a6461f] focus-visible:ring-3 focus-visible:ring-primary/40 ${ease}`}
        >
          {ask}
          <ArrowRight aria-hidden className={`size-4.5 transition-transform duration-500 group-hover/ask:translate-x-1 ${ease}`} strokeWidth={1.5} />
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
      <Dialog.Backdrop className='fixed inset-0 z-50 bg-black/35 transition-opacity duration-500 data-ending-style:opacity-0' />
      <Dialog.Viewport className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-3 md:p-6'>
        <Dialog.Popup
          className={`relative my-auto w-full max-w-231 bg-[#e1dcd3] shadow-[0_2rem_5rem_-1.5rem_rgb(0_0_0/0.5)] outline-none transition-[opacity,translate,scale] duration-700 data-ending-style:translate-y-4 data-ending-style:scale-[0.98] data-ending-style:opacity-0 data-ending-style:duration-400 data-starting-style:translate-y-8 data-starting-style:scale-[0.96] data-starting-style:opacity-0 motion-reduce:transition-opacity ${ease}`}
        >
          <Moments {...props} />
        </Dialog.Popup>
      </Dialog.Viewport>
    </Dialog.Portal>
  </Dialog.Root>
)
