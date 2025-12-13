import { useState, useEffect, useRef } from 'react'
import { useTrademarksQuery } from '../hooks/useTrademarksQuery'
import { useFilterStore } from '../../../stores/filterStore'
import { useViewSettingStore } from '../../../stores/viewSettingStore'
import { TrademarkListItem } from './TrademarkListItem'
import { TrademarkListItemSkeleton } from './TrademarkListItemSkeleton'
import { ErrorMessage } from '../../../components/ErrorMessage'
import { EmptyState } from '../../../components/EmptyState'

const ITEMS_PER_PAGE = 15
const SCROLL_THRESHOLD = 200 // 하단 200px 전에 미리 로드

export function TrademarkList() {
  const { data: trademarks, isLoading, isError } = useTrademarksQuery()
  const [displayedCount, setDisplayedCount] = useState(ITEMS_PER_PAGE)
  const isLoadingMoreRef = useRef(false)

  // 검색 조건 구독
  const { selectedCountry, searchQuery, inputMode, dateRange } =
    useFilterStore()
  const { status, dateSort, favoriteSort } = useViewSettingStore()

  // 검색 조건이 변경되면 표시 개수 초기화
  useEffect(() => {
    setDisplayedCount(ITEMS_PER_PAGE)
    isLoadingMoreRef.current = false
    // 스크롤을 최상단으로 이동
    window.scrollTo(0, 0)
  }, [
    selectedCountry,
    searchQuery,
    inputMode,
    dateRange,
    status,
    dateSort,
    favoriteSort,
  ])

  // 무한 스크롤 구현 (window scroll 사용)
  useEffect(() => {
    if (!trademarks || trademarks.length === 0) return
    if (displayedCount >= trademarks.length) return

    const handleScroll = () => {
      // 이미 로딩 중이면 무시
      if (isLoadingMoreRef.current) return
      if (displayedCount >= trademarks.length) return

      const scrollTop = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight

      // 하단 근접 시 다음 페이지 로드
      if (scrollTop + windowHeight >= documentHeight - SCROLL_THRESHOLD) {
        isLoadingMoreRef.current = true
        setDisplayedCount(prev => {
          const next = Math.min(prev + ITEMS_PER_PAGE, trademarks.length)
          // 상태 업데이트 후 플래그 리셋
          setTimeout(() => {
            isLoadingMoreRef.current = false
          }, 300)
          return next
        })
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [trademarks, displayedCount])

  // 로딩 상태
  if (isLoading) {
    return <TrademarkListItemSkeleton />
  }

  // 에러 상태
  if (isError) {
    return <ErrorMessage onRetry={() => window.location.reload()} />
  }

  // 빈 결과
  if (!trademarks || trademarks.length === 0) {
    return <EmptyState message="검색 결과가 없습니다" />
  }

  const displayedTrademarks = trademarks.slice(0, displayedCount)
  const hasMore = displayedCount < trademarks.length

  // 결과 표시
  return (
    <>
      <div className="flex flex-col gap-3">
        {displayedTrademarks.map(trademark => (
          <TrademarkListItem
            key={`${trademark.countryCode}_${trademark.applicationNumber}`}
            trademark={trademark}
          />
        ))}
      </div>
      {/* 로딩 인디케이터 */}
      {hasMore && (
        <div className="h-20 flex items-center justify-center py-8">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-markcloud-blue rounded-full animate-bounce [animation-delay:0ms]"></div>
            <div className="w-2 h-2 bg-markcloud-blue rounded-full animate-bounce [animation-delay:150ms]"></div>
            <div className="w-2 h-2 bg-markcloud-blue rounded-full animate-bounce [animation-delay:300ms]"></div>
          </div>
        </div>
      )}
    </>
  )
}
