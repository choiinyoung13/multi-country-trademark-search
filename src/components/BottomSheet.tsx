import { useEffect, type ReactNode } from 'react'

interface BottomSheetProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export function BottomSheet({ isOpen, onClose, children }: BottomSheetProps) {
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

      <div className="fixed inset-x-0 bottom-0 z-50 w-[97.5%] mx-auto bg-white rounded-t-3xl shadow-xl animate-slide-up">
        <div className="w-full p-5 min-[390px]:p-8">
          {children}

          <button
            onClick={onClose}
            className="w-full mt-6 min-[390px]:mt-8 py-3.5 min-[390px]:py-4 bg-[#3b9bff] text-white text-sm min-[390px]:text-base font-semibold rounded-xl cursor-pointer hover:bg-[#2e86e4] transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </>
  )
}
