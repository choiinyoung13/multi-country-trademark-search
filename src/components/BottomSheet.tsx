import { useEffect, type ReactNode } from 'react'

interface BottomSheetProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  onReset?: () => void
  onComplete?: () => void
}

export function BottomSheet({
  isOpen,
  onClose,
  children,
  onReset,
  onComplete,
}: BottomSheetProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 z-40 transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-x-0 bottom-0 z-50 w-[97.5%] mx-auto bg-white rounded-t-3xl shadow-xl animate-slide-up max-h-[95vh] flex flex-col">
        <div className="flex-1 overflow-hidden w-full p-5 min-[390px]:p-8">
          {children}
        </div>

        <div className="shrink-0 px-5 min-[390px]:px-8 pb-5 min-[390px]:pb-8 pt-0">
          <div className="flex gap-3 justify-end">
            {onComplete ? (
              <>
                {onReset && (
                  <button
                    onClick={onReset}
                    className="flex items-center justify-center gap-2 px-4 py-3.5 min-[390px]:py-4 text-sm min-[390px]:text-base font-semibold text-gray-700 bg-white border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors flex-none min-w-[100px]"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    <span className="hidden min-[390px]:block">초기화</span>
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 px-4 py-3.5 min-[390px]:py-4 text-sm min-[390px]:text-base font-semibold text-gray-700 bg-white border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors flex-none min-w-[100px]"
                >
                  취소
                </button>
                <button
                  onClick={onComplete}
                  className="flex items-center justify-center gap-2 px-4 py-3.5 min-[390px]:py-4 text-sm min-[390px]:text-base font-semibold bg-markcloud-blue text-white rounded-xl cursor-pointer hover:bg-[#2e86e4] transition-colors flex-none min-w-[100px]"
                >
                  완료
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={onClose}
                  className={`${
                    onReset ? 'flex-1' : 'w-full'
                  } py-3.5 min-[390px]:py-4 bg-markcloud-blue text-white text-sm min-[390px]:text-base font-semibold rounded-xl cursor-pointer hover:bg-[#2e86e4] transition-colors`}
                >
                  닫기
                </button>
                {onReset && (
                  <button
                    onClick={onReset}
                    className="flex items-center justify-center gap-2 px-4 py-3.5 min-[390px]:py-4 text-sm min-[390px]:text-base font-semibold text-gray-700 bg-white border border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    <span className="hidden min-[390px]:block">초기화</span>
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
