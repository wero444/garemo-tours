'use client'

import { useFloatingBack } from 'src/components/gallery/hooks/useFloatingBack'
import { BackButton } from 'src/components/gallery/views/backButton'

const ease = 'ease-[cubic-bezier(0.16,1,0.3,1)]'

export const FloatingBack = () => {
  const { wrapper } = useFloatingBack()

  return (
    <div
      ref={wrapper}
      className={`invisible fixed top-20 left-4 z-30 transition-[translate] duration-700 md:top-24 md:left-6 [body:has(header[data-hidden]:not(:focus-within))_&]:-translate-y-16 md:[body:has(header[data-hidden]:not(:focus-within))_&]:-translate-y-18 ${ease}`}
    >
      <BackButton compact />
    </div>
  )
}
