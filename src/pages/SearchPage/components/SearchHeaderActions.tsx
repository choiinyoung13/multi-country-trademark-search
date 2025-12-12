import { Button } from '../../../components/Button'
import { useViewSettingBottomSheet } from '../hooks/useViewSettingBottomSheet.tsx'

export function SearchHeaderActions() {
  const { open, viewSettingBottomSheet } = useViewSettingBottomSheet()

  return (
    <div className="hidden min-[585px]:flex items-center gap-3.5 pl-3">
      {/* 날짜 버튼 - 태블릿 (585px 이상, 840px 미만) */}
      <div className="block min-[840px]:hidden">
        <Button onClick={open} height="44px" noBg pointer>
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

      {/* 보기설정 버튼 - 데스크톱 */}
      <Button onClick={open} pointer fontSize="15px" noBg>
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
          <span className="hidden lg:block">보기설정</span>
        </div>
      </Button>

      {viewSettingBottomSheet}
    </div>
  )
}
