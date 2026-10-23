'use client'

import { useDivider } from 'src/components/divider/hooks/useDivider'
import { Tree } from 'src/components/about/views/tree'
import { Puri } from 'src/components/travel/views/puri'

const icons = { tree: Tree, puri: Puri }

export const Divider = ({ icon = 'tree' }: { icon?: keyof typeof icons }) => {
  const { container } = useDivider()
  const Icon = icons[icon]

  return (
    <div ref={container} aria-hidden className='bg-secondary px-6'>
      <div className='mx-auto flex max-w-3xl items-center gap-5 md:gap-7'>
        <span className='divider-line relative h-px flex-1 origin-right bg-linear-to-l from-primary/45 to-transparent'>
          <span className='divider-glint absolute top-1/2 right-0 size-1 -translate-y-1/2 rounded-full bg-primary opacity-0 shadow-[0_0_10px_var(--primary)]' />
        </span>
        <Icon className='divider-icon invisible w-6 overflow-visible text-primary md:w-7' />
        <span className='divider-line relative h-px flex-1 origin-left bg-linear-to-r from-primary/45 to-transparent'>
          <span className='divider-glint absolute top-1/2 left-0 size-1 -translate-y-1/2 rounded-full bg-primary opacity-0 shadow-[0_0_10px_var(--primary)]' />
        </span>
      </div>
    </div>
  )
}
