import { useState } from 'react'
import clsx from 'clsx'

export function SearchInput() {
  const [searchValue, setSearchValue] = useState<string>('')

  const handleClearSearch = () => {
    setSearchValue('')
  }

  return (
    <div className="relative w-full max-w-[600px]">
      {/* 검색 아이콘 */}
      <svg
        className={clsx([
          'absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors text-gray-400',
          {
            'text-[#3b9bff]': searchValue,
          },
        ])}
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
        className="w-full h-[44px] pl-12 pr-5 text-[16px] bg-white text-gray-500 font-medium rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.07)] focus:outline-none placeholder:font-medium"
        placeholder="상표명으로 검색"
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
      />

      {/* 취소 아이콘 */}
      {searchValue && (
        <button
          className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600 cursor-pointer"
          onClick={handleClearSearch}
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
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
  )
}
