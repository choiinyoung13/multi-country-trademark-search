import { useState, useMemo, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { BottomSheet } from '../../../components/BottomSheet'
import { SortButton } from '../../../components/SortButton'

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

  return useMemo(
    () => ({
      open,
      close,
      viewSettingBottomSheet,
    }),
    [open, close, viewSettingBottomSheet]
  )
}

function ViewSettingBottomSheet({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [settings, setSettings] = useState({
    grouping: '등록',
    sorting: '최신순',
  })

  const handleGroupingChange = (value: string) => {
    const newSettings = { ...settings, grouping: value }
    setSettings(newSettings)
  }

  const handleSortingChange = (value: string) => {
    const newSettings = { ...settings, sorting: value }
    setSettings(newSettings)
  }

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="space-y-6 min-[390px]:space-y-8">
        {/* 등록 상태 필터 */}
        <div>
          <h3 className="text-sm min-[390px]:text-[1.1rem] font-semibold text-gray-800 mb-3 min-[390px]:mb-4">
            등록 상태
          </h3>
          <div className="flex gap-2 bg-[#f2f4f6] p-1 rounded-lg">
            <SortButton
              label="등록"
              active={settings.grouping === '등록'}
              onClick={() => handleGroupingChange('등록')}
            />
            <SortButton
              label="출원"
              active={settings.grouping === '출원'}
              onClick={() => handleGroupingChange('출원')}
            />
            <SortButton
              label="거절"
              active={settings.grouping === '거절'}
              onClick={() => handleGroupingChange('거절')}
            />
          </div>
        </div>

        {/* 정렬 설정 */}
        <div>
          <h3 className="text-sm min-[390px]:text-[1.1rem] font-semibold text-gray-800 mb-3 min-[390px]:mb-4">
            정렬
          </h3>
          <div className="flex gap-2 bg-[#f2f4f6] p-1 rounded-lg">
            <SortButton
              label="최신순"
              active={settings.sorting === '최신순'}
              onClick={() => handleSortingChange('최신순')}
            />
            <SortButton
              label="금액 높은순"
              active={settings.sorting === '금액높은순'}
              onClick={() => handleSortingChange('금액높은순')}
            />
          </div>
        </div>
      </div>
    </BottomSheet>
  )
}
