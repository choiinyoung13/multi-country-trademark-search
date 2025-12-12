import { useState, useMemo, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { KR, US } from 'country-flag-icons/react/3x2'
import clsx from 'clsx'
import { BottomSheet } from '../../../components/BottomSheet'
import { useFilterStore, type CountryCode } from '../../../stores/filterStore'

interface Country {
  code: CountryCode
  name: string
  flag: typeof KR
}

const COUNTRIES: Country[] = [
  { code: 'KR', name: '한국', flag: KR },
  { code: 'US', name: '미국', flag: US },
  // 향후 확장 가능: JP, CN, EU 등
]

interface CountryButtonProps {
  country: Country
  isSelected: boolean
  onClick: () => void
}

function CountryButton({ country, isSelected, onClick }: CountryButtonProps) {
  const FlagIcon = country.flag

  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'flex items-center justify-center gap-2 px-2 min-[390px]:px-4 py-2.5 text-sm min-[390px]:text-base font-medium rounded-lg transition-colors cursor-pointer',
        {
          'bg-white': isSelected,
          'bg-[#f2f4f6] text-gray-500 hover:bg-white': !isSelected,
        }
      )}
    >
      <FlagIcon className="w-5 h-5 min-[390px]:w-6 min-[390px]:h-6 shrink-0" />
      <span>{country.name}</span>
    </button>
  )
}

export function useCountrySelectionBottomSheet() {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  const countrySelectionBottomSheet = useMemo(
    () =>
      isOpen
        ? createPortal(
            <CountrySelectionBottomSheet isOpen={isOpen} onClose={close} />,
            document.body
          )
        : null,
    [isOpen, close]
  )

  return {
    open,
    close,
    countrySelectionBottomSheet,
  }
}

function CountrySelectionBottomSheet({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const { selectedCountry, setSelectedCountry } = useFilterStore()

  const handleCountrySelect = (country: CountryCode) => {
    setSelectedCountry(country) // 선택 즉시 변경
    // 바텀시트는 사용자가 직접 닫도록 함
  }

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="space-y-6 min-[390px]:space-y-8">
        <h3 className="text-sm min-[390px]:text-[1.1rem] font-semibold text-gray-800 mb-3 min-[390px]:mb-4">
          국가 선택
        </h3>

        <div className="grid grid-cols-2 gap-2 bg-[#f2f4f6] p-1 rounded-lg">
          {COUNTRIES.map(country => (
            <CountryButton
              key={country.code}
              country={country}
              isSelected={selectedCountry === country.code}
              onClick={() => handleCountrySelect(country.code)}
            />
          ))}
        </div>
      </div>
    </BottomSheet>
  )
}
