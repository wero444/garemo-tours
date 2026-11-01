import { useId } from 'react'

// Instagram glyph painted with the brand's radial gradient, shared by every shape so the colours flow across it
export const Instagram = ({ className }: { className?: string }) => {
  const id = `instagram-${useId().replace(/[^\w-]/g, '')}`

  return (
    <svg viewBox='0 0 24 24' fill='none' stroke={`url(#${id})`} strokeWidth='1.75' strokeLinecap='round' strokeLinejoin='round' className={className} aria-hidden>
      <defs>
        <radialGradient id={id} cx='6.5' cy='25' r='30' gradientUnits='userSpaceOnUse'>
          <stop offset='0' stopColor='#fdf497' />
          <stop offset='0.1' stopColor='#fdf497' />
          <stop offset='0.4' stopColor='#fd5949' />
          <stop offset='0.6' stopColor='#d6249f' />
          <stop offset='0.85' stopColor='#285aeb' />
        </radialGradient>
      </defs>
      <rect x='2.5' y='2.5' width='19' height='19' rx='5.5' />
      <circle cx='12' cy='12' r='4.25' />
      <circle cx='17.4' cy='6.6' r='0.6' fill={`url(#${id})`} />
    </svg>
  )
}
