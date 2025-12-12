import clsx from 'clsx'
import { useFilterStore } from '../../../stores/filterStore'

export function SearchInput() {
  const { inputValue, inputMode, setInputValue, setInputMode } =
    useFilterStore()

  const handleClearSearch = () => {
    setInputValue('')
  }

  const handleSearch = () => {
    // inputValue가 이미 filterStore에 저장되어 있으므로
    // React Query가 자동으로 재요청됩니다.
    // 검색 실행을 명시적으로 표시하기 위해 빈 함수로 유지
  }

  const toggleSearchMode = () => {
    setInputMode(inputMode === 'name' ? 'number' : 'name')
    setInputValue('')
  }

  const placeholder =
    inputMode === 'name' ? '상표명으로 검색' : '출원번호로 검색'

  return (
    <div className="relative w-full max-w-[657px] flex items-center">
      {/* 모드 전환 버튼 */}
      <button
        type="button"
        onClick={toggleSearchMode}
        className="flex items-center justify-center w-9 h-10 min-[360px]:h-11 min-[390px]:h-[44px] rounded-tl-xl rounded-bl-xl bg-gray-100 border border-r-0 border-gray-200 hover:bg-gray-200 transition-colors text-gray-500 cursor-pointer shrink-0"
      >
        <svg
          className="w-3 h-3 min-[360px]:w-3.5 min-[360px]:h-3.5 min-[390px]:w-4 min-[390px]:h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </button>

      {/* Input 컨테이너 */}
      <div className="relative flex-1 flex items-center">
        {/* 검색 아이콘 */}
        <svg
          className={clsx(
            'absolute left-3 min-[360px]:left-3.5 min-[390px]:left-4 w-4 h-4 min-[360px]:w-4.5 min-[360px]:h-4.5 min-[390px]:w-5 min-[390px]:h-5 transition-colors z-10',
            {
              'text-gray-400': !inputValue,
              'text-markcloud-blue': inputValue,
            }
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>

        <input
          type="text"
          className="w-full h-10 min-[360px]:h-11 min-[390px]:h-[44px] pl-10 min-[360px]:pl-11 min-[390px]:pl-12 pr-12 min-[360px]:pr-14 min-[390px]:pr-12 text-sm min-[360px]:text-[15px] min-[390px]:text-[16px] bg-white text-gray-500 font-medium rounded-none border border-l-0 border-gray-200 shadow-[0_4px_15px_rgba(0,0,0,0.07)] focus:outline-none placeholder:font-medium"
          placeholder={placeholder}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              handleSearch()
            }
          }}
        />

        {/* 취소 아이콘 */}
        {inputValue && (
          <button
            className="absolute right-12 min-[360px]:right-14 min-[390px]:right-16 top-1/2 -translate-y-1/2 w-5 h-5 min-[360px]:w-5.5 min-[360px]:h-5.5 min-[390px]:w-6 min-[390px]:h-6 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600 cursor-pointer z-10"
            onClick={handleClearSearch}
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 h-3.5 min-[360px]:w-4 min-[360px]:h-4 min-[390px]:w-4 min-[390px]:h-4"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 4 4 12"></path>
              <path d="m4 4 8 8"></path>
            </svg>
          </button>
        )}

        {/* 검색 버튼 */}
        <button
          type="button"
          onClick={handleSearch}
          className="flex items-center justify-center px-2 min-[360px]:px-2.5 min-[390px]:px-3 h-10 min-[360px]:h-11 min-[390px]:h-[44px] rounded-tr-xl rounded-br-xl bg-gray-100 border border-l-0 border-gray-200 hover:bg-gray-200 transition-colors text-gray-500 cursor-pointer shrink-0"
        >
          <span className="text-[10px] min-[360px]:text-xs min-[390px]:text-sm font-medium whitespace-nowrap">
            검색
          </span>
        </button>
      </div>
    </div>
  )
}
