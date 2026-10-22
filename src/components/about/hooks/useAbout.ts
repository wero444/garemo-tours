import { useRef } from 'react'
import { gsap, useGSAP, ScrollTrigger } from 'src/lib/gsap'
import { reducedMotion } from 'src/lib/intro'

export const useAbout = () => {
  const container = useRef<HTMLElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add(reducedMotion, () => {
      gsap.set('.about-tree, .about-title, .about-word', { autoAlpha: 1 }).then()
    })

    mm.add(`not all and ${reducedMotion}`, () => {
      const trees = gsap.utils.toArray<SVGSVGElement>('.about-tree')

      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        scrollTrigger: { trigger: container.current, start: 'top 70%', once: true }
      })

      tl.set('.about-tree, .about-title', { autoAlpha: 1 })
        .set('.about-tree path, .about-letter', { stroke: 'currentColor', strokeWidth: 0.35, fillOpacity: 0 }).then()

      trees.forEach((tree, i) => {
        const at = i * 0.35
        const leaves = tree.querySelectorAll<SVGPathElement>('.tree-leaf')

        leaves.forEach(leaf => gsap.set(leaf, { transformOrigin: leaf.dataset.origin }).then())

        tl.fromTo(tree,
          { y: 24, scale: 0.6, transformOrigin: '50% 100%' },
          { y: 0, scale: 1, duration: 1.2, ease: 'back.out(2)' }, at)
          .fromTo(tree.querySelector('.tree-trunk'), { drawSVG: '0%' }, { drawSVG: '100%', duration: 0.9 }, at)
          .fromTo(leaves,
            { drawSVG: '0%', scale: 0, rotate: (j: number) => [0, -40, 40][j] },
            {
              drawSVG: '100%',
              scale: 1,
              rotate: 0,
              duration: 1.1,
              stagger: 0.12,
              ease: 'elastic.out(1, 0.5)'
            }, at + 0.5)
          .to(tree.querySelectorAll('path'), { fillOpacity: 1, strokeOpacity: 0, duration: 0.6, ease: 'power2.out' }, at + 1.3).then()

        tl.call(() => leaves.forEach((leaf, j) => {
          gsap.to(leaf, {
            rotate: [6, -8, 8][j],
            duration: 1.4 + j * 0.35 + i * 0.2,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: j * 0.2
          }).then()
        }), [], at + 1.9).then()
      })

      tl.fromTo('.about-letter',
        { drawSVG: '0%', y: 6 },
        { drawSVG: '100%', y: 0, duration: 1, stagger: 0.1 }, 0.3)
        .to('.about-letter', { fillOpacity: 1, strokeOpacity: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out' }, 1.1).then()

      gsap.utils.toArray<HTMLElement>('.about-paragraph').forEach(paragraph => {
        gsap.fromTo(paragraph.querySelectorAll('.about-word'),
          { autoAlpha: 0, yPercent: 100 },
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 0.9,
            stagger: 0.015,
            ease: 'expo.out',
            scrollTrigger: { trigger: paragraph, start: 'top 85%', once: true }
          }
        ).then()
      })

      gsap.to('.about-trees', {
        yPercent: -40,
        ease: 'none',
        scrollTrigger: { trigger: container.current, start: 'top bottom', end: 'bottom top', scrub: true }
      }).then()

      const crowns = gsap.utils.toArray<SVGGElement>('.tree-crown')
      gsap.set(crowns, { transformOrigin: '50% 100%' }).then()

      ScrollTrigger.create({
        trigger: container.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: self => {
          const lean = gsap.utils.clamp(-14, 14, self.getVelocity() / -120)

          gsap.to(crowns, {
            rotate: lean,
            duration: 0.35,
            ease: 'power2.out',
            overwrite: true,
            onComplete: () => {
              gsap.to(crowns, { rotate: 0, duration: 1.8, ease: 'elastic.out(1, 0.3)' }).then()
            }
          }).then()
        }
      })

      trees.forEach((tree, i) => {
        gsap.fromTo(tree, { rotate: i ? 4 : -4 }, {
          rotate: i ? -4 : 4,
          duration: 2.8 + i * 0.6,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          transformOrigin: '50% 100%',
          delay: 2
        }).then()
      })
    })

    return () => mm.revert()
  }, { scope: container })

  return { container }
}
