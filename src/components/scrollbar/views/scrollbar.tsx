'use client'

import { useScrollbar } from 'src/components/scrollbar/hooks/useScrollbar'

export const Scrollbar = () => {
  const { thumb, visible, onPointerDown, onPointerMove, onPointerUp } = useScrollbar()

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-y-2 right-0 z-50 w-4 transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div
        ref={thumb}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className={`group/thumb absolute top-0 right-0 flex w-4 touch-none justify-center will-change-transform ${visible ? 'pointer-events-auto cursor-grab active:cursor-grabbing' : ''}`}
      >
        <span className='block h-full w-0.5 rounded-full bg-linear-to-b from-primary to-[color-mix(in_oklab,var(--primary)_35%,var(--secondary))] opacity-50 transition-[width,opacity,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/thumb:w-1.5 group-hover/thumb:opacity-100 group-data-active/thumb:w-1 group-data-active/thumb:opacity-100 group-data-active/thumb:shadow-[0_0_14px_var(--primary)]' />
      </div>
    </div>
  )
}
