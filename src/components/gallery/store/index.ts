import { type Dispatch, useReducer } from 'react'
import { themeIds, type ThemeId } from 'src/components/gallery/helpers/photos'

export interface GalleryStore {
  readonly active: ThemeId
  readonly shown: ThemeId
}

export type SELECT_TAB = 'SELECT_TAB'
export type SHOW_TAB = 'SHOW_TAB'

export type GalleryAction =
  | { type: SELECT_TAB, tab: ThemeId }
  | { type: SHOW_TAB }

const initialGallery: GalleryStore = {
  active: themeIds[0],
  shown: themeIds[0]
}

export const useGalleryReducer = (): [GalleryStore, Dispatch<GalleryAction>] => {
  return useReducer(galleryReducer, initialGallery)
}

export const galleryReducer = (state: GalleryStore, action: GalleryAction): GalleryStore => {
  switch (action.type) {
  case 'SELECT_TAB':
    return { ...state, active: action.tab }
  case 'SHOW_TAB':
    return { ...state, shown: state.active }
  default:
    return state
  }
}
