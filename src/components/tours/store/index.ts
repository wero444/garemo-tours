import { type Dispatch, useReducer } from 'react'

export interface ToursStore {
  readonly open: boolean
  readonly active: number
  readonly asking: boolean
}

export type OPEN_TOUR = 'OPEN_TOUR'
export type CLOSE_TOUR = 'CLOSE_TOUR'
export type ASK_ABOUT_TOUR = 'ASK_ABOUT_TOUR'
export type DONE_ASKING = 'DONE_ASKING'

export type ToursAction =
  | { type: OPEN_TOUR, index: number }
  | { type: CLOSE_TOUR }
  | { type: ASK_ABOUT_TOUR }
  | { type: DONE_ASKING }

const initialTours: ToursStore = {
  open: false,
  active: 0,
  asking: false
}

export const useToursReducer = (): [ToursStore, Dispatch<ToursAction>] => {
  return useReducer(toursReducer, initialTours)
}

export const toursReducer = (state: ToursStore, action: ToursAction): ToursStore => {
  switch (action.type) {
  case 'OPEN_TOUR':
    return { ...state, open: true, active: action.index }
  case 'CLOSE_TOUR':
    return { ...state, open: false }
  case 'ASK_ABOUT_TOUR':
    return { ...state, open: false, asking: true }
  case 'DONE_ASKING':
    return { ...state, asking: false }
  default:
    return state
  }
}
