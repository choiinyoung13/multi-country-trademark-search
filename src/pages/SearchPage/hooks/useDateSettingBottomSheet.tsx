import { useState, useMemo, useCallback } from 'react'
import { createPortal } from 'react-dom'
import clsx from 'clsx'
import { BottomSheet } from '../../../components/BottomSheet'

export function useDateSettingBottomSheet() {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  const dateSettingBottomSheet = useMemo(
    () =>
      isOpen
        ? createPortal(
            <DateSettingBottomSheet isOpen={isOpen} onClose={close} />,
            document.body
          )
        : null,
    [isOpen, close]
  )

  return {
    open,
    close,
    dateSettingBottomSheet,
  }
}

// 요일 이름 배열
const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']

function DateSettingBottomSheet({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  // 선택된 시작 날짜와 끝 날짜 (예: "2025-09-25")
  const [tempStartDate, setTempStartDate] = useState<string>('2025-09-25')
  const [tempEndDate, setTempEndDate] = useState<string>('2025-11-24')

  // 시작 기간과 끝 기간의 연도와 월 (화면에 표시할 달력)
  const [startYear, setStartYear] = useState<number>(2025)
  const [startMonth, setStartMonth] = useState<number>(9)
  const [endYear, setEndYear] = useState<number>(2025)
  const [endMonth, setEndMonth] = useState<number>(11)

  // 모바일에서 활성화된 탭 ('start' | 'end')
  const [activeTab, setActiveTab] = useState<'start' | 'end'>('start')

  // 각 달력의 모드 ('calendar' | 'year')
  const [startMode, setStartMode] = useState<'calendar' | 'year'>('calendar')
  const [endMode, setEndMode] = useState<'calendar' | 'year'>('calendar')

  // 각 달력의 선택된 10년대 (년도 선택 모드에서 사용)
  const [startSelectedDecade, setStartSelectedDecade] = useState<number | null>(
    null
  )
  const [endSelectedDecade, setEndSelectedDecade] = useState<number | null>(
    null
  )

  // 해당 월의 일 수 구하기
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate()
  }

  // 초기화 버튼 클릭
  const handleReset = () => {
    setTempStartDate('2025-09-25')
    setTempEndDate('2025-11-24')
    setStartYear(2025)
    setStartMonth(9)
    setEndYear(2025)
    setEndMonth(11)
    setStartMode('calendar')
    setEndMode('calendar')
    setStartSelectedDecade(null)
    setEndSelectedDecade(null)
  }

  // 년도 선택 렌더링
  const renderYearPicker = (type: 'start' | 'end') => {
    const year = type === 'start' ? startYear : endYear
    const setYear = type === 'start' ? setStartYear : setEndYear
    const setMode = type === 'start' ? setStartMode : setEndMode
    const selectedDecade =
      type === 'start' ? startSelectedDecade : endSelectedDecade
    const setSelectedDecade =
      type === 'start' ? setStartSelectedDecade : setEndSelectedDecade

    // 1950년부터 현재 년도까지의 10년대 생성
    const currentYear = new Date().getFullYear()
    const currentDecade = Math.floor(currentYear / 10) * 10
    const startDecade = 1950
    const decades = Array.from(
      { length: (currentDecade - startDecade) / 10 + 1 },
      (_, i) => startDecade + i * 10
    )

    // 선택된 10년대의 개별 년도들
    const getYearsInDecade = (decade: number) => {
      const endYearInDecade = Math.min(decade + 9, currentYear)
      return Array.from(
        { length: endYearInDecade - decade + 1 },
        (_, i) => decade + i
      )
    }

    const handleDecadeClick = (decade: number) => {
      setSelectedDecade(decade)
    }

    const handleYearClick = (selectedYear: number) => {
      setYear(selectedYear)
      setMode('calendar')
      setSelectedDecade(null)
    }

    const handleBackToDecades = () => {
      setSelectedDecade(null)
    }

    return (
      <div className="flex-1 min-w-[280px] max-w-[780px] min-h-[294px] min-[390px]:min-h-[406px] mx-auto">
        {/* 탭 */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setMode('year')}
            className={clsx(
              'px-3 py-1.5 text-xs min-[390px]:text-sm font-semibold rounded-lg transition-colors cursor-pointer',
              {
                'bg-markcloud-blue text-white': true,
                'bg-gray-100 text-gray-600': false,
              }
            )}
          >
            년도 선택
          </button>
          <button
            onClick={() => setMode('calendar')}
            className={clsx(
              'px-3 py-1.5 text-xs min-[390px]:text-sm font-semibold rounded-lg transition-colors cursor-pointer',
              {
                'bg-gray-100 text-gray-600': true,
                'bg-markcloud-blue text-white': false,
              }
            )}
          >
            달력
          </button>
        </div>

        {/* 10년대 선택 또는 개별 년도 선택 */}
        {selectedDecade === null ? (
          <>
            {/* 10년대 선택 */}
            <div className="mb-4">
              <div className="grid grid-cols-3 gap-2">
                {decades.map(decade => {
                  const decadeEnd = Math.min(decade + 9, currentYear)
                  return (
                    <button
                      key={decade}
                      onClick={() => handleDecadeClick(decade)}
                      className="py-2.5 min-[390px]:py-3 px-2 min-[360px]:px-3 text-[10px] min-[360px]:text-xs min-[390px]:text-sm font-medium rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 transition-all border border-gray-200 hover:border-markcloud-blue cursor-pointer"
                    >
                      <div className="font-semibold whitespace-nowrap truncate">
                        {decade}년대
                      </div>
                      <div className="text-[9px] min-[360px]:text-[10px] min-[390px]:text-xs text-gray-500 mt-0.5 whitespace-nowrap truncate">
                        {decade} - {decadeEnd}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* 개별 년도 선택 */}
            <div className="mb-4">
              <button
                onClick={handleBackToDecades}
                className="flex items-center gap-1.5 mb-3 text-xs min-[390px]:text-sm text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <span>돌아가기</span>
              </button>

              <div className="grid grid-cols-4 min-[390px]:grid-cols-5 gap-2">
                {getYearsInDecade(selectedDecade).map(y => (
                  <button
                    key={y}
                    onClick={() => handleYearClick(y)}
                    className={clsx(
                      'py-3 min-[390px]:py-4 text-xs min-[390px]:text-base font-medium rounded-lg transition-all cursor-pointer',
                      {
                        'bg-markcloud-blue text-white hover:bg-[#2e86e4]':
                          y === year,
                        'bg-gray-50 text-gray-700 hover:bg-gray-100':
                          y !== year,
                      }
                    )}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    )
  }

  // 달력 렌더링
  const renderCalendar = (type: 'start' | 'end') => {
    const year = type === 'start' ? startYear : endYear
    const month = type === 'start' ? startMonth : endMonth
    const setYear = type === 'start' ? setStartYear : setEndYear
    const setMonth = type === 'start' ? setStartMonth : setEndMonth
    const mode = type === 'start' ? startMode : endMode
    const setMode = type === 'start' ? setStartMode : setEndMode

    // 년도 선택 모드면 년도 선택 UI 표시
    if (mode === 'year') {
      return renderYearPicker(type)
    }

    const daysInMonth = getDaysInMonth(year, month)
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

    const handleDayClick = (day: number) => {
      const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(
        day
      ).padStart(2, '0')}`

      if (type === 'start') {
        setTempStartDate(dateStr)
        // 시작 날짜가 끝 날짜보다 늦으면 끝 날짜도 같이 변경
        if (tempEndDate && dateStr > tempEndDate) {
          setTempEndDate(dateStr)
        }
      } else {
        setTempEndDate(dateStr)
      }
    }

    const isSelected = (day: number) => {
      const selectedDate = type === 'start' ? tempStartDate : tempEndDate
      const [selectedY, selectedM, selectedD] = selectedDate
        .split('-')
        .map(Number)
      return selectedY === year && selectedM === month && selectedD === day
    }

    const isInRange = (day: number) => {
      if (!tempStartDate || !tempEndDate) return false
      const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(
        day
      ).padStart(2, '0')}`
      const [startY, startM, startD] = tempStartDate.split('-').map(Number)
      const [endY, endM, endD] = tempEndDate.split('-').map(Number)
      const startDateStr = `${startY}-${String(startM).padStart(
        2,
        '0'
      )}-${String(startD).padStart(2, '0')}`
      const endDateStr = `${endY}-${String(endM).padStart(2, '0')}-${String(
        endD
      ).padStart(2, '0')}`

      // 시작일과 끝일 사이에 있는지 확인 (시작일과 끝일 제외)
      return dateStr > startDateStr && dateStr < endDateStr
    }

    const isDisabled = (day: number) => {
      const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(
        day
      ).padStart(2, '0')}`
      if (type === 'start') {
        return tempEndDate ? dateStr > tempEndDate : false
      } else {
        return dateStr < tempStartDate
      }
    }

    return (
      <div className="flex-1 min-w-[280px] max-w-[780px] min-h-[294px] min-[390px]:min-h-[406px] mx-auto">
        {/* 탭 */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setMode('year')}
            className={clsx(
              'px-3 py-1.5 text-xs min-[390px]:text-sm font-semibold rounded-lg transition-colors cursor-pointer',
              {
                'bg-gray-100 text-gray-600': true,
                'bg-markcloud-blue text-white': false,
              }
            )}
          >
            년도 선택
          </button>
          <button
            onClick={() => setMode('calendar')}
            className={clsx(
              'px-3 py-1.5 text-xs min-[390px]:text-sm font-semibold rounded-lg transition-colors cursor-pointer',
              {
                'bg-markcloud-blue text-white': true,
                'bg-gray-100 text-gray-600': false,
              }
            )}
          >
            달력
          </button>
        </div>

        {/* 월/연도 네비게이션 */}
        <div className="flex items-center justify-between mb-7">
          <button
            onClick={() => {
              if (month === 1) {
                setYear(year - 1)
                setMonth(12)
              } else {
                setMonth(month - 1)
              }
            }}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h3 className="text-base min-[390px]:text-lg font-semibold text-gray-800">
            {year}년 {month}월
          </h3>
          <button
            onClick={() => {
              if (month === 12) {
                setYear(year + 1)
                setMonth(1)
              } else {
                setMonth(month + 1)
              }
            }}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* 요일 헤더 */}
        <div className="grid grid-cols-7 mb-2">
          {WEEKDAYS.map(day => (
            <div
              key={day}
              className="text-center text-xs min-[390px]:text-lg font-medium text-gray-500 py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* 일 그리드 */}
        <div className="grid grid-cols-7 gap-0.5">
          {/* 첫 번째 날짜의 요일에 맞춰 빈 칸 추가 */}
          {(() => {
            const firstDay = new Date(year, month - 1, 1).getDay()
            const emptyDays = Array.from({ length: firstDay }, (_, i) => (
              <div key={`empty-${type}-${i}`} />
            ))
            return emptyDays
          })()}
          {days.map(day => {
            const selected = isSelected(day)
            const inRange = isInRange(day)
            const disabled = isDisabled(day)

            return (
              <button
                key={day}
                onClick={() => !disabled && handleDayClick(day)}
                disabled={disabled}
                className={clsx(
                  'w-full h-8 min-[390px]:h-12 text-xs min-[390px]:text-lg font-medium rounded transition-all',
                  'flex items-center justify-center',
                  {
                    'text-gray-300 bg-gray-50 cursor-not-allowed': disabled,
                    'bg-markcloud-blue text-white hover:bg-[#2e86e4] cursor-pointer':
                      selected && !disabled,
                    'bg-markcloud-blue/20 text-markcloud-blue cursor-pointer':
                      inRange && !disabled && !selected,
                    'text-gray-600 hover:bg-gray-100 cursor-pointer':
                      !selected && !inRange && !disabled,
                  }
                )}
              >
                {day}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} onReset={handleReset}>
      <div className="space-y-6 min-[390px]:space-y-8">
        {/* 모바일 탭 (767px 이하) */}
        <div className="md:hidden flex gap-2 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('start')}
            className={clsx(
              'flex-1 py-3 text-sm font-semibold transition-colors cursor-pointer',
              'border-b-2',
              {
                'text-markcloud-blue border-markcloud-blue':
                  activeTab === 'start',
                'text-gray-500 border-transparent': activeTab !== 'start',
              }
            )}
          >
            시작 기간
          </button>
          <button
            onClick={() => setActiveTab('end')}
            className={clsx(
              'flex-1 py-3 text-sm font-semibold transition-colors cursor-pointer',
              'border-b-2',
              {
                'text-markcloud-blue border-markcloud-blue':
                  activeTab === 'end',
                'text-gray-500 border-transparent': activeTab !== 'end',
              }
            )}
          >
            끝 기간
          </button>
        </div>

        {/* 시작 기간과 끝 기간 */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-10 mb-3">
          {/* 시작 기간 - 모바일에서는 탭에 따라 표시 */}
          <div
            className={clsx('flex-1', {
              'hidden md:block': activeTab === 'end',
            })}
          >
            <h3 className="hidden md:block text-sm min-[390px]:text-[1.1rem] font-semibold text-gray-800 mb-3 min-[390px]:mb-8">
              시작 기간
            </h3>
            <div className="flex justify-center">{renderCalendar('start')}</div>
          </div>

          <div className="hidden md:block w-px bg-gray-300"></div>

          {/* 끝 기간 - 모바일에서는 탭에 따라 표시 */}
          <div
            className={clsx('flex-1', {
              'hidden md:block': activeTab === 'start',
            })}
          >
            <h3 className="hidden md:block text-sm min-[390px]:text-[1.1rem] font-semibold text-gray-800 mb-3 min-[390px]:mb-8">
              끝 기간
            </h3>
            <div className="flex justify-center">{renderCalendar('end')}</div>
          </div>
        </div>
      </div>
    </BottomSheet>
  )
}
