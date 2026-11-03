import { type Dispatch, useReducer } from 'react'

export interface LanguageSwitcherStore {
  readonly open: boolean
}

export type SET_LANGUAGE_SWITCHER_OPEN = 'SET_LANGUAGE_SWITCHER_OPEN'
export type CLOSE_LANGUAGE_SWITCHER = 'CLOSE_LANGUAGE_SWITCHER'

export type LanguageSwitcherAction =
  | { type: SET_LANGUAGE_SWITCHER_OPEN, readonly payload: boolean }
  | { type: CLOSE_LANGUAGE_SWITCHER }

export const useLanguageSwitcherReducer = (): [LanguageSwitcherStore, Dispatch<LanguageSwitcherAction>] => {
  const initialLanguageSwitcher: LanguageSwitcherStore = {
    open: false
  }

  return useReducer(languageSwitcherReducer, initialLanguageSwitcher)
}

const languageSwitcherReducer = (
  state: LanguageSwitcherStore,
  action: LanguageSwitcherAction
): LanguageSwitcherStore => {
  switch (action.type) {
  case 'SET_LANGUAGE_SWITCHER_OPEN':
    return {
      ...state,
      open: action.payload
    }
  case 'CLOSE_LANGUAGE_SWITCHER':
    return state.open ? { ...state, open: false } : state
  default:
    return state
  }
}
