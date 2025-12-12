interface ErrorMessageProps {
  message?: string
  onRetry?: () => void
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 min-[360px]:py-16 min-[480px]:py-20 px-4">
      <div className="flex flex-col items-center gap-4 max-w-md">
        <div className="w-16 h-16 min-[360px]:w-20 min-[360px]:h-20 rounded-full bg-red-100 flex items-center justify-center">
          <svg
            className="w-8 h-8 min-[360px]:w-10 min-[360px]:h-10 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="text-center">
          <h3 className="text-base min-[360px]:text-lg font-semibold text-gray-900 mb-2">
            데이터를 불러오는데 실패했습니다
          </h3>
          {message && (
            <p className="text-sm min-[360px]:text-base text-gray-500 mb-4">
              {message}
            </p>
          )}
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-4 py-2 bg-markcloud-blue text-white rounded-lg font-medium hover:bg-[#2e86e4] transition-colors"
            >
              다시 시도
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

