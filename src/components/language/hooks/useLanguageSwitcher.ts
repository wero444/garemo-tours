import { useEffect } from 'react'
import {
  type LanguageSwitcherStore,
  useLanguageSwitcherReducer
} from 'src/components/language/store/languageSwitcher'

interface UseLanguageSwitcherOptions {
  onSelect?: () => void
}

interface UseLanguageSwitcher {
  state: LanguageSwitcherStore
  setOpen: (open: boolean) => void
  close: () => void
  handleSelect: () => void
}

export const useLanguageSwitcher = ({ onSelect }: UseLanguageSwitcherOptions): UseLanguageSwitcher => {
  const [state, dispatch] = useLanguageSwitcherReducer()

  const setOpen = (open: boolean) =>
    dispatch({ type: 'SET_LANGUAGE_SWITCHER_OPEN', payload: open })

  const close = () => dispatch({ type: 'CLOSE_LANGUAGE_SWITCHER' })

  useEffect(() => {
    if (!state.open) return

    const handleScroll = () => dispatch({ type: 'CLOSE_LANGUAGE_SWITCHER' })

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [state.open, dispatch])

  const handleSelect = () => {
    close()
    onSelect?.()
  }

  return { state, setOpen, close, handleSelect }
}
