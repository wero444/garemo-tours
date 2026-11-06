import { useRef } from 'react'
import { gsap, useGSAP } from 'src/lib/gsap'
import { reducedMotion } from 'src/lib/intro'
import { titleIntro } from 'src/components/gallery/helpers/titleIntro'

export const useGallery = () => {
  const container = useRef<HTMLElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add(reducedMotion, () => {
      gsap.set('.gallery-title, .gallery-cta', { autoAlpha: 1 }).then()
    })

    mm.add(`not all and ${reducedMotion}`, () => {
      const tl = titleIntro('gallery', gsap.timeline({
        defaults: { ease: 'expo.out' },
        scrollTrigger: { trigger: container.current, start: 'top 75%', once: true }
      }))

      tl.fromTo('.gallery-tab', { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08 }, 0.8)
        .set('.gallery-cta', { autoAlpha: 1 }, 1.3)
        .fromTo('.gallery-cta',
          { y: 40, scale: 0.85, rotate: -4 },
          { y: 0, scale: 1, rotate: 0, duration: 1.4 }, 1.3)
        .fromTo('.cta-thumb',
          { scale: 0, rotate: -90 },
          { scale: 1, rotate: 0, duration: 1, stagger: 0.07, ease: 'back.out(2)' }, 1.45)
        .fromTo('.cta-in', { yPercent: 110 }, { yPercent: 0, duration: 0.9, stagger: 0.02 }, 1.55)
        .fromTo('.cta-count', { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.9 }, 1.75)
        .fromTo('.cta-arrow-box', { scale: 0, rotate: -180 }, { scale: 1, rotate: 0, duration: 1.2, ease: 'back.out(1.8)' }, 1.6).then()
    })

    return () => mm.revert()
  }, { scope: container })

  return { container }
}
