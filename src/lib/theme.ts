export type Theme = 'light' | 'dark'

const storageKey = 'theme'
const listeners = new Set<() => void>()

export const getTheme = (): Theme =>
  document.documentElement.classList.contains('dark') ? 'dark' : 'light'

export const subscribeTheme = (listener: () => void) => {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export const applyTheme = (theme: Theme) => {
  const root = document.documentElement

  root.classList.toggle('dark', theme === 'dark')
  root.style.colorScheme = theme

  try {
    localStorage.setItem(storageKey, theme)
  } catch {
    // Storage can be unavailable (private mode, blocked cookies)
  }

  listeners.forEach(listener => listener())
}

// Runs before first paint so a stored dark theme never flashes light
export const themeScript = `(() => {
  try {
    if (localStorage.getItem('${storageKey}') === 'dark') {
      document.documentElement.classList.add('dark')
      document.documentElement.style.colorScheme = 'dark'
    }
  } catch {}
})()`
