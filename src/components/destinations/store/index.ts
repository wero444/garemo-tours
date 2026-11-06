import { type Dispatch, useReducer } from 'react'

export interface DestinationsStore {
  readonly active: string | null
  readonly shown: string | null
  readonly hovered: string | null
  readonly slide: number
}

export type SELECT_REGION = 'SELECT_REGION'
export type CLOSE_REGION = 'CLOSE_REGION'
export type SHOW_REGION = 'SHOW_REGION'
export type HOVER_REGION = 'HOVER_REGION'
export type SLIDE_TO = 'SLIDE_TO'

export type DestinationsAction =
  | { type: SELECT_REGION, id: string }
  | { type: CLOSE_REGION }
  | { type: SHOW_REGION }
  | { type: HOVER_REGION, id: string | null }
  | { type: SLIDE_TO, index: number }

const initialDestinations: DestinationsStore = {
  active: null,
  shown: null,
  hovered: null,
  slide: 0
}

export const useDestinationsReducer = (): [DestinationsStore, Dispatch<DestinationsAction>] => {
  return useReducer(destinationsReducer, initialDestinations)
}

export const destinationsReducer = (state: DestinationsStore, action: DestinationsAction): DestinationsStore => {
  switch (action.type) {
  case 'SELECT_REGION':
    return { ...state, active: action.id }
  case 'CLOSE_REGION':
    return { ...state, active: null }
  case 'SHOW_REGION':
    return { ...state, shown: state.active, slide: 0 }
  case 'HOVER_REGION':
    return { ...state, hovered: action.id }
  case 'SLIDE_TO':
    return { ...state, slide: action.index }
  default:
    return state
  }
}
