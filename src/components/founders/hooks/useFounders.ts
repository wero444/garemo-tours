import { useRef, type PointerEvent } from 'react'
import { gsap, useGSAP } from 'src/lib/gsap'
import { reducedMotion } from 'src/lib/intro'

export const useFounders = () => {
  const container = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add(reducedMotion, () => {
      gsap.set('.founder, .founders-languages', { autoAlpha: 1 }).then()
    })

    mm.add(`not all and ${reducedMotion}`, () => {
      // Each arch rises out of the ground, then its details, light and shadow settle in
      gsap.utils.toArray<HTMLElement>('.founder').forEach((founder, i) => {
        const q = gsap.utils.selector(founder)

        gsap.timeline({
          delay: i * 0.18,
          defaults: { ease: 'expo.out' },
          scrollTrigger: { trigger: founder, start: 'top 85%', once: true }
        })
          .set(founder, { autoAlpha: 1 })
          .fromTo(q('.founder-frame'),
            { clipPath: 'inset(100% 0% 0% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.5, ease: 'expo.inOut' }, 0)
          .fromTo(q('.founder-ground'), { scaleX: 0.2, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 1.4 }, 0.5)
          .fromTo(q('.founder-glow'), { opacity: 0 }, { opacity: 1, duration: 1.6, ease: 'power2.out' }, 0.9)
          .fromTo(q('.founder-line'), { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 1.2 }, 1)
          .fromTo(q('.founder-name'), { yPercent: 110 }, { yPercent: 0, duration: 1.1 }, 1.1)
          .fromTo(q('.founder-role'), { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 1 }, 1.25).then()
      })

      gsap.fromTo('.founders-languages',
        { autoAlpha: 0, y: 16 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.2,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.founders-languages', start: 'top 92%', once: true }
        }
      ).then()
    })

    return () => mm.revert()
  }, { scope: container })

  const pointer = (event: PointerEvent<HTMLDivElement>) => {
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - left
    const y = event.clientY - top

    return { x, y, px: x / width - 0.5, py: y / height - 0.5 }
  }

  const tilt = (event: PointerEvent<HTMLDivElement>) =>
    event.currentTarget.querySelector('.founder-tilt')

  const still = () => window.matchMedia(reducedMotion).matches

  const onPointerEnter = (event: PointerEvent<HTMLDivElement>) => {
    const { x, y } = pointer(event)
    gsap.set(event.currentTarget, { '--x': `${x}px`, '--y': `${y}px` }).then()
  }

  // The spot under the cursor sinks away from the viewer, like pressing into the frame
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const { x, y, px, py } = pointer(event)
    const ease = { duration: 0.6, ease: 'power3.out', overwrite: 'auto' as const }

    gsap.to(event.currentTarget, { '--x': `${x}px`, '--y': `${y}px`, ...ease }).then()

    if (still()) return

    gsap.to(tilt(event), { rotateY: px * 10, rotateX: py * -10, scale: 0.985, ...ease }).then()
  }

  const onPointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    gsap.to(tilt(event), { rotateY: 0, rotateX: 0, scale: 1, duration: 1.2, ease: 'elastic.out(1, 0.5)', overwrite: 'auto' }).then()
  }

  return { container, onPointerEnter, onPointerMove, onPointerLeave }
}
