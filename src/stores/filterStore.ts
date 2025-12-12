import { create } from 'zustand'

export type CountryCode = 'KR' | 'US'

export type DateRange = {
  startDate: string // ISO 형식: "2025-09-25"
  endDate: string // ISO 형식: "2025-11-24"
}

export type InputMode = 'name' | 'number'

interface FilterState {
  selectedCountry: CountryCode
  dateRange: DateRange | null
  inputValue: string
  inputMode: InputMode
  setSelectedCountry: (country: CountryCode) => void
  setDateRange: (range: DateRange | null) => void
  setInputValue: (value: string) => void
  setInputMode: (mode: InputMode) => void
  reset: () => void
}

const defaultState = {
  selectedCountry: 'KR' as CountryCode,
  dateRange: null as DateRange | null,
  inputValue: '',
  inputMode: 'name' as InputMode,
}

export const useFilterStore = create<FilterState>(set => ({
  ...defaultState,
  setSelectedCountry: (country: CountryCode) =>
    set({ selectedCountry: country }),
  setDateRange: (range: DateRange | null) => set({ dateRange: range }),
  setInputValue: (value: string) => set({ inputValue: value }),
  setInputMode: (mode: InputMode) => set({ inputMode: mode }),
  reset: () => set(defaultState),
}))
