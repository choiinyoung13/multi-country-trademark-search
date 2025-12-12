import { KR, US } from 'country-flag-icons/react/3x2'
import { Button } from '../../../components/Button'
import { SearchInput } from './SearchInput.tsx'
import { useDateSettingBottomSheet } from '../hooks/useDateSettingBottomSheet.tsx'
import { useCountrySelectionBottomSheet } from '../hooks/useCountrySelectionBottomSheet.tsx'
import { useFilterStore } from '../../../stores/filterStore'

export function SearchHeaderFilters() {
  const { selectedCountry, dateRange } = useFilterStore()

  const { open: openDateSetting, dateSettingBottomSheet } =
    useDateSettingBottomSheet()

  const { open: openCountrySelection, countrySelectionBottomSheet } =
    useCountrySelectionBottomSheet()

  const FlagIcon = selectedCountry === 'KR' ? KR : US

  // 날짜 포맷팅 (ISO 형식 -> 표시 형식)
  const formatDateForDisplay = (isoDate: string) => {
    return isoDate.replace(/-/g, '.')
  }

  const dateDisplay = dateRange
    ? dateRange.startDate === dateRange.endDate
      ? formatDateForDisplay(dateRange.startDate)
      : `${formatDateForDisplay(dateRange.startDate)} - ${formatDateForDisplay(
          dateRange.endDate
        )}`
    : '출원일 기간을 선택해주세요.'

  return (
    <div className="flex justify-between items-center gap-3 flex-wrap w-full min-[585px]:w-auto min-[585px]:flex-1">
      {/* 국가 선택 버튼 */}
      <div className="w-[48px] min-[360px]:w-[52px] min-[390px]:w-[58px] h-[36px] min-[360px]:h-[40px] min-[390px]:h-[44px] shrink-0">
        <Button
          width="100%"
          height="100%"
          shadow
          pointer
          onClick={openCountrySelection}
        >
          <FlagIcon
            title={selectedCountry === 'KR' ? 'Korea' : 'United States'}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[36px] min-[360px]:w-[38px] min-[390px]:w-[42px]"
          />
        </Button>
      </div>

      {/* 날짜 및 보기설정 버튼 (모바일) */}
      <div className="flex items-center gap-3">
        {/* 날짜 버튼 - 데스크톱 (840px 이상) */}
        <div className="hidden min-[840px]:block">
          <Button onClick={openDateSetting} height="44px" pointer shadow hover>
            <div className="flex items-center gap-3 ml-4 mr-5">
              <svg
                className="w-4 h-4 min-[390px]:w-5 min-[390px]:h-5 transition-colors text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
              <span className="text-[16.5px] text-gray-500 font-medium tracking-[1.1px] whitespace-nowrap">
                {dateDisplay}
              </span>
            </div>
          </Button>
        </div>

        {/* 날짜 버튼 - 모바일/태블릿 (585px 미만) */}
        <div className="block min-[585px]:hidden">
          <Button onClick={openDateSetting} height="44px" noBg pointer>
            <svg
              className="w-4 h-4 min-[390px]:w-5 min-[390px]:h-5 transition-colors text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
          </Button>
        </div>

        {/* 날짜 버튼 - 모바일/태블릿 (585px 미만) */}
        <div className="block min-[585px]:hidden">
          <Button onClick={openDateSetting} pointer fontSize="15px" noBg>
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 min-[390px]:w-5 min-[390px]:h-5 transition-colors text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                ></path>
              </svg>
            </div>
          </Button>
        </div>
      </div>

      {/* 검색 입력 */}
      <div className="w-full min-[585px]:w-auto min-[585px]:flex-1 min-[585px]:order-last">
        <SearchInput />
      </div>

      {dateSettingBottomSheet}
      {countrySelectionBottomSheet}
    </div>
  )
}
