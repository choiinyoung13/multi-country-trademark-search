import { useState, useMemo, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { BottomSheet } from '../../../components/BottomSheet'
import { useViewSettingStore } from '../../../stores/viewSettingStore'

interface SortButtonProps {
  label: string
  active: boolean
  onClick: () => void
  className?: string
}

export function SortButton({
  label,
  active,
  onClick,
  className = '',
}: SortButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
       flex-1 px-2 min-[390px]:px-4 py-2.5 text-sm min-[390px]:text-base font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${active ? 'bg-white' : 'bg-[#f2f4f6] text-gray-500 hover:bg-white'
        } ${className}`}
    >
      {label}
    </button>
  )
}

export function useViewSettingBottomSheet() {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  const viewSettingBottomSheet = useMemo(
    () =>
      isOpen
        ? createPortal(
          <ViewSettingBottomSheet isOpen={isOpen} onClose={close} />,
          document.body
        )
        : null,
    [isOpen, close]
  )

  return {
    open,
    close,
    viewSettingBottomSheet,
  }
}

function ViewSettingBottomSheet({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const { status, dateSort, favoriteSort, setStatus, setDateSort, setFavoriteSort, reset } =
    useViewSettingStore()

  const handleReset = () => {
    reset()
  }

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} onReset={handleReset}>
      <div className="space-y-6 min-[390px]:space-y-8">

        <div>
          <h3 className="text-sm min-[390px]:text-[1.1rem] font-semibold text-gray-800 mb-3 min-[390px]:mb-4">
            등록 상태
          </h3>
          <div className="flex gap-2 bg-[#f2f4f6] p-1 rounded-lg">
            <SortButton
              label="등록"
              active={status === '등록'}
              onClick={() => setStatus('등록')}
            />
            <SortButton
              label="출원"
              active={status === '출원'}
              onClick={() => setStatus('출원')}
            />
            <SortButton
              label="거절"
              active={status === '거절'}
              onClick={() => setStatus('거절')}
            />
          </div>
        </div>


        <div>
          <h3 className="text-sm min-[390px]:text-[1.1rem] font-semibold text-gray-800 mb-3 min-[390px]:mb-4">
            출원일
          </h3>
          <div className="flex gap-2 bg-[#f2f4f6] p-1 rounded-lg">
            <SortButton
              label="최신순"
              active={dateSort === '최신순'}
              onClick={() => setDateSort('최신순')}
            />
            <SortButton
              label="오래된순"
              active={dateSort === '오래된순'}
              onClick={() => setDateSort('오래된순')}
            />
          </div>
        </div>

        <div>
          <h3 className="text-sm min-[390px]:text-[1.1rem] font-semibold text-gray-800 mb-3 min-[390px]:mb-4">
            출원일
          </h3>
          <div className="flex gap-2 bg-[#f2f4f6] p-1 rounded-lg">
            <SortButton
              label="전체보기"
              active={favoriteSort === '전체보기'}
              onClick={() => setFavoriteSort('전체보기')}
            />
            <SortButton
              label="즐겨찾기"
              active={favoriteSort === '즐겨찾기'}
              onClick={() => setFavoriteSort('즐겨찾기')}
            />
          </div>
        </div>
      </div>
    </BottomSheet>
  )
}
