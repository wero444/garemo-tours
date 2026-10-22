'use client'

import Image from 'next/image'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { quality, type Tile } from 'src/components/gallery/helpers'
import { fit, useLightboxMotion } from 'src/components/gallery/hooks/useLightboxMotion'

interface Props {
  tile: Tile
  origin: HTMLElement
  onClosed: () => void
}

export const Lightbox = ({ tile, origin, onClosed }: Props) => {
  const { root, frame, closeButton, close } = useLightboxMotion(tile, origin, onClosed)
  const [sizes] = useState(() => `${Math.ceil(fit(tile).width)}px`)

  return createPortal(
    <div
      ref={root}
      role='dialog'
      aria-modal='true'
      aria-label={tile.alt}
      onClick={close}
      className='fixed inset-0 z-50 cursor-zoom-out'
    >
      <div aria-hidden className='lightbox-backdrop absolute inset-0 bg-[rgb(18_14_12/0.92)] backdrop-blur-xl' />

      <div
        ref={frame}
        onClick={event => event.stopPropagation()}
        className='fixed cursor-default overflow-hidden bg-black/30 shadow-[0_40px_120px_-40px_rgb(0_0_0/0.9)]'
      >
        <Image
          src={tile.image}
          alt={tile.alt}
          fill
          quality={quality}
          sizes={sizes}
          placeholder='blur'
          preload
          className='object-cover'
        />
      </div>

      <button
        ref={closeButton}
        type='button'
        aria-label='Close'
        onClick={close}
        className='lightbox-close absolute top-5 right-5 flex size-12 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 text-white outline-none backdrop-blur-md transition-[rotate,background-color,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:rotate-90 hover:border-white/40 hover:bg-white/20 focus-visible:ring-3 focus-visible:ring-white/50 md:top-7 md:right-8 md:size-14'
      >
        <X className='size-5 md:size-6' strokeWidth={1.5} />
      </button>
    </div>,
    document.body
  )
}
