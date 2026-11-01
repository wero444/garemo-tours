import { useId } from 'react'

const crosses = [[65, 40], [235, 40], [65, 160], [235, 160]]

const UnitedKingdom = () => {
  const id = useId().replace(/[^\w-]/g, '')

  return (
    <svg viewBox='0 0 60 30' preserveAspectRatio='xMidYMid slice' className='size-full'>
      <clipPath id={`uk-${id}`}>
        <path d='M30 15h30v15zv15H0zH0V0zV0h30z' />
      </clipPath>
      <rect width='60' height='30' fill='#012169' />
      <path d='M0 0l60 30m0-30L0 30' stroke='#fff' strokeWidth='6' />
      <path d='M0 0l60 30m0-30L0 30' clipPath={`url(#uk-${id})`} stroke='#c8102e' strokeWidth='4' />
      <path d='M30 0v30M0 15h60' stroke='#fff' strokeWidth='10' />
      <path d='M30 0v30M0 15h60' stroke='#c8102e' strokeWidth='6' />
    </svg>
  )
}

const Poland = () => (
  <svg viewBox='0 0 8 5' preserveAspectRatio='none' className='size-full'>
    <rect width='8' height='5' fill='#dc143c' />
    <rect width='8' height='2.5' fill='#fff' />
  </svg>
)

const Georgia = () => (
  <svg viewBox='0 0 300 200' preserveAspectRatio='none' className='size-full'>
    <rect width='300' height='200' fill='#fff' />
    <path d='M130 0h40v200h-40zM0 80h300v40H0z' fill='#ff0000' />
    {crosses.map(([x, y]) => (
      <path key={`${x}-${y}`} d={`M${x - 5} ${y - 20}h10v15h15v10h-15v15h-10v-15h-15v-10h15z`} fill='#ff0000' />
    ))}
  </svg>
)

const flags = { en: UnitedKingdom, pl: Poland, ge: Georgia }

export const Flag = ({ code }: { code: keyof typeof flags }) => {
  const Icon = flags[code]

  return (
    <span aria-hidden className='block h-3 w-4.5 shrink-0 overflow-hidden rounded-[2px] ring-1 ring-black/15'>
      <Icon />
    </span>
  )
}
