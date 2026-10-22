export const Burger = ({ open, onClick }: { open: boolean, onClick: () => void }) => (
  <button
    type='button'
    onClick={onClick}
    aria-expanded={open}
    aria-controls='mobile-menu'
    aria-label={open ? 'Close menu' : 'Open menu'}
    className='nav-item group invisible relative z-10 -mr-2.5 flex size-11 cursor-pointer flex-col items-end justify-center gap-1.25 rounded-full px-2.5 text-primary outline-none focus-visible:ring-2 focus-visible:ring-primary/50'
  >
    <span aria-hidden className='burger-top block h-0.5 w-6 rounded-full bg-current' />
    <span aria-hidden className='burger-mid block h-0.5 w-4 origin-right rounded-full bg-current transition-[width] duration-300 group-hover:w-6' />
    <span aria-hidden className='burger-bottom block h-0.5 w-6 rounded-full bg-current' />
  </button>
)
