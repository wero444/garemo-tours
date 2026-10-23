import { gsap } from 'src/lib/gsap'

export const titleIntro = (prefix: string, tl: gsap.core.Timeline) => {
  const letters = `.${prefix}-title path`
  const count = gsap.utils.toArray(`.${prefix}-count`)

  tl.set(`.${prefix}-title`, { autoAlpha: 1 }, 0)
    .set(letters, { stroke: 'currentColor', strokeWidth: 0.35, fillOpacity: 0 }, 0)
    .fromTo(letters,
      { drawSVG: '0%', y: 8 },
      { drawSVG: '100%', y: 0, duration: 1.4, stagger: 0.09, ease: 'power2.inOut' }, 0)
    .to(letters, { fillOpacity: 1, strokeOpacity: 0, duration: 0.7, stagger: 0.07, ease: 'power2.out' }, 1)
    .fromTo(`.${prefix}-rule`, { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'expo.inOut' }, 0.4)
    .fromTo(`.${prefix}-word`, { yPercent: 100, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1, stagger: 0.04 }, 0.6).then()

  if (count.length) tl.fromTo(count, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.9 }, 1.2).then()

  return tl
}
