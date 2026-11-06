import { type Dispatch, useReducer } from 'react'
import { themeIds, type ThemeId } from 'src/components/gallery/helpers/photos'

export interface GalleryStore {
  readonly active: ThemeId
  readonly shown: ThemeId
  readonly slide: number
}

export type SELECT_TAB = 'SELECT_TAB'
export type SHOW_TAB = 'SHOW_TAB'
export type SLIDE = 'SLIDE'

export type GalleryAction =
  | { type: SELECT_TAB, tab: ThemeId }
  | { type: SHOW_TAB }
  | { type: SLIDE, index: number }

const initialGallery: GalleryStore = {
  active: themeIds[0],
  shown: themeIds[0],
  slide: 0
}

export const useGalleryReducer = (): [GalleryStore, Dispatch<GalleryAction>] => {
  return useReducer(galleryReducer, initialGallery)
}

export const galleryReducer = (state: GalleryStore, action: GalleryAction): GalleryStore => {
  switch (action.type) {
  case 'SELECT_TAB':
    return { ...state, active: action.tab }
  case 'SHOW_TAB':
    return { ...state, shown: state.active, slide: 0 }
  case 'SLIDE':
    return { ...state, slide: action.index }
  default:
    return state
  }
}
