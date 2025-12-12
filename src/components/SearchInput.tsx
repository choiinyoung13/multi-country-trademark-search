import { useState } from 'react'
import clsx from 'clsx'

type SearchMode = 'name' | 'number'

export function SearchInput() {
  const [searchValue, setSearchValue] = useState<string>('')
  const [searchMode, setSearchMode] = useState<SearchMode>('name')

  const handleClearSearch = () => {
    setSearchValue('')
  }

  const toggleSearchMode = () => {
    setSearchMode(prev => (prev === 'name' ? 'number' : 'name'))
    setSearchValue('')
  }

  const placeholder =
    searchMode === 'name' ? '상표명으로 검색' : '출원번호로 검색'

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
      <div className="relative flex-1">
        {/* 검색 아이콘 */}
        <svg
          className={clsx(
            'absolute left-3 min-[360px]:left-3.5 min-[390px]:left-4 top-1/2 -translate-y-1/2 w-4 h-4 min-[360px]:w-4.5 min-[360px]:h-4.5 min-[390px]:w-5 min-[390px]:h-5 transition-colors',
            {
              'text-gray-400': !searchValue,
              'text-markcloud-blue': searchValue,
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
          className="w-full h-10 min-[360px]:h-11 min-[390px]:h-[44px] pl-10 min-[360px]:pl-11 min-[390px]:pl-12 pr-4 min-[360px]:pr-4.5 min-[390px]:pr-5 text-sm min-[360px]:text-[15px] min-[390px]:text-[16px] bg-white text-gray-500 font-medium rounded-tr-xl rounded-br-xl rounded-tl-none rounded-bl-none border border-gray-200 shadow-[0_4px_15px_rgba(0,0,0,0.07)] focus:outline-none placeholder:font-medium"
          placeholder={placeholder}
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
        />

        {/* 취소 아이콘 */}
        {searchValue && (
          <button
            className="absolute right-2 min-[360px]:right-2.5 min-[390px]:right-3 top-1/2 -translate-y-1/2 w-5 h-5 min-[360px]:w-5.5 min-[360px]:h-5.5 min-[390px]:w-6 min-[390px]:h-6 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600 cursor-pointer"
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
      </div>
    </div>
  )
}
