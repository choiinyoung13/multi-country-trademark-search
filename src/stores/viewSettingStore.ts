import { create } from 'zustand'

export type RegisterStatus = '등록' | '출원' | '거절'
export type DateSortOrder = '최신순' | '오래된순'
export type FavoriteSortOrder = '전체보기' | '즐겨찾기'

interface ViewSettingState {
  status: RegisterStatus | null
  dateSort: DateSortOrder
  favoriteSort: FavoriteSortOrder
  setStatus: (status: RegisterStatus | null) => void
  setDateSort: (dateSort: DateSortOrder) => void
  setFavoriteSort: (favoriteSort: FavoriteSortOrder) => void
  reset: () => void
}

const defaultState = {
  status: null as RegisterStatus | null,
  dateSort: '최신순' as DateSortOrder,
  favoriteSort: '전체보기' as FavoriteSortOrder,
}

export const useViewSettingStore = create<ViewSettingState>(set => ({
  ...defaultState,
  setStatus: (status: RegisterStatus | null) => set({ status }),
  setDateSort: (dateSort: DateSortOrder) => set({ dateSort }),
  setFavoriteSort: (favoriteSort: FavoriteSortOrder) => set({ favoriteSort }),
  reset: () => set(defaultState),
}))
