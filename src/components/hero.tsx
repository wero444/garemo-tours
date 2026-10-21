'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from 'src/lib/gsap'
import { Button } from 'src/components/ui/button'

export const Hero = () => {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.from('.hero-item', { y: 24, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' })
  }, { scope: container })

  return (
    <div ref={container} className='flex flex-col items-center gap-6 text-center'>
      <h1 className='hero-item text-4xl font-semibold tracking-tight'>Garemo Tours</h1>
      <p className='hero-item text-muted-foreground'>Next.js · TypeScript · Tailwind · shadcn/ui · GSAP</p>
      <Button className='hero-item'>Get started</Button>
    </div>
  )
}
