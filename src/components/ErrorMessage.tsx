interface ErrorMessageProps {
  onRetry?: () => void
}

export function ErrorMessage({ onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 min-[360px]:py-16 min-[480px]:py-20 px-4">
      <div className="flex flex-col items-center gap-4 max-w-md">
        <div className="text-center">
          <h3 className="text-base min-[360px]:text-lg font-semibold text-gray-900 mb-3">
            데이터를 불러오는데 실패했습니다
          </h3>

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
