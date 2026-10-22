import { useSyncExternalStore, type MouseEvent } from 'react'
import { reducedMotion } from 'src/lib/intro'
import { applyTheme, getTheme, subscribeTheme, type Theme } from 'src/lib/theme'

const getServerTheme = (): Theme => 'light'

export const useTheme = () => {
  const theme = useSyncExternalStore(subscribeTheme, getTheme, getServerTheme)

  const toggle = (event: MouseEvent<HTMLButtonElement>) => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'

    if (!document.startViewTransition || window.matchMedia(reducedMotion).matches) {
      applyTheme(next)
      return
    }

    const { left, top, width, height } = event.currentTarget.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))

    const transition = document.startViewTransition(() => applyTheme(next))

    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 900, easing: 'cubic-bezier(0.76, 0, 0.24, 1)', pseudoElement: '::view-transition-new(root)' }
      )
    }).catch(() => null)
  }

  return { theme, toggle }
}
