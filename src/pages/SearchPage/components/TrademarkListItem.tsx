import { useState, useEffect } from 'react'
import { useDetailTramdemarkBottomSheet } from '../hooks/useDetailTramdemarkBottomSheet'
import { isFavorite, toggleFavorite } from '../../../utils/favorites'
import { useQueryClient } from '@tanstack/react-query'
import clsx from 'clsx'
import type { StandardTrademark } from '../../../types/trademark'
import type { KrTrademark, UsTrademark } from '../../../types/trademark'

interface TrademarkListItemProps {
  trademark: StandardTrademark
}

// 날짜 포맷팅 (예: "19951117" -> "1995.11.17")
const formatDate = (dateStr: string) => {
  if (!dateStr || dateStr.length !== 8) return dateStr
  const year = dateStr.substring(0, 4)
  const month = dateStr.substring(4, 6)
  const day = dateStr.substring(6, 8)
  return `${year}.${month}.${day}`
}

// 상태에 따른 색상 (원본 상태값 기준)
const getStatusColor = (status: string, countryCode: 'KR' | 'US') => {
  if (countryCode === 'KR') {
    if (status === '등록') {
      return 'text-markcloud-blue'
    } else if (status === '실효') {
      return 'text-rose-500'
    } else {
      return 'text-gray-400'
    }
  } else {
    // 미국
    if (status === 'LIVE') {
      return 'text-markcloud-blue'
    } else if (status === 'DEAD') {
      return 'text-rose-500'
    } else {
      return 'text-gray-400'
    }
  }
}

// 원본 상태값 가져오기
const getOriginalStatus = (trademark: StandardTrademark): string => {
  if (trademark.countryCode === 'KR') {
    return (trademark.detailData as KrTrademark).registerStatus
  } else {
    return (trademark.detailData as UsTrademark).registerStatus
  }
}

// 상표명 표시 (한국은 한글+영문, 미국은 영문만)
const getTrademarkDisplayName = (trademark: StandardTrademark): string => {
  if (trademark.countryCode === 'KR') {
    const krData = trademark.detailData as KrTrademark
    if (krData.productName && krData.productNameEng) {
      return `${krData.productName} ( ${krData.productNameEng} )`
    } else if (krData.productName) {
      return krData.productName
    } else if (krData.productNameEng) {
      return krData.productNameEng
    }
  } else {
    const usData = trademark.detailData as UsTrademark
    return usData.productName || '-'
  }
  return '-'
}

export function TrademarkListItem({ trademark }: TrademarkListItemProps) {
  const { open: openDetailTramdemark, detailTramdemarkBottomSheet } =
    useDetailTramdemarkBottomSheet()
  const queryClient = useQueryClient()
  const [favorite, setFavorite] = useState(() =>
    isFavorite(trademark.countryCode, trademark.applicationNumber)
  )

  // 즐겨찾기 상태 동기화
  useEffect(() => {
    setFavorite(isFavorite(trademark.countryCode, trademark.applicationNumber))
  }, [trademark.countryCode, trademark.applicationNumber])

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()

    const newFavorite = toggleFavorite(
      trademark.countryCode,
      trademark.applicationNumber
    )

    // 1️⃣ ListItem 자체 상태 업데이트
    setFavorite(newFavorite)

    // 2️⃣ React Query 캐시 직접 수정
    queryClient.setQueriesData<StandardTrademark[]>(
      { queryKey: ['trademarks'] },
      old => {
        if (!old) return old

        return old.map(item => {
          if (
            item.countryCode === trademark.countryCode &&
            item.applicationNumber === trademark.applicationNumber
          ) {
            return {
              ...item,
              // 서버에는 없지만 프론트 캐시 확장
              isFavorite: newFavorite,
            }
          }
          return item
        })
      }
    )
  }

  const originalStatus = getOriginalStatus(trademark)
  const displayName = getTrademarkDisplayName(trademark)

  return (
    <>
      {detailTramdemarkBottomSheet}

      <div
        onClick={() => openDetailTramdemark(trademark)}
        className="flex items-center gap-2 min-[360px]:gap-2.5 min-[480px]:gap-3 pr-2 min-[360px]:pr-3 min-[480px]:pr-4 sm:pr-6 pl-2 min-[360px]:pl-2.5 min-[480px]:pl-3.5 py-2 min-[360px]:py-2.5 min-[480px]:py-3.5 bg-white shadow-[0_4px_15px_rgba(0,0,0,0.07)] rounded-xl transition-colors cursor-pointer group relative hover:[&:not(:has(button:hover))]:bg-gray-100/50 active:[&:not(:has(button:hover))]:bg-gray-100"
      >
        {/* 왼쪽: 상태 뱃지 */}
        <div className="shrink-0">
          <span
            className={clsx(
              'text-[10px] min-[360px]:text-xs min-[390px]:text-sm font-semibold px-2 min-[360px]:px-2.5 py-0.5 min-[360px]:py-1 rounded-md bg-gray-50',
              getStatusColor(originalStatus, trademark.countryCode)
            )}
          >
            {originalStatus}
          </span>
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-center gap-0.5">
          <div className="flex items-center justify-between gap-1 min-[360px]:gap-1.5 min-[480px]:gap-2 mb-0.5 min-[360px]:mb-1">
            <h3 className="text-xs min-[360px]:text-sm min-[480px]:text-base sm:text-md font-bold text-gray-900 truncate">
              {displayName}
            </h3>
          </div>
          <div className="flex items-center gap-1 min-[360px]:gap-1.5 min-[480px]:gap-2 text-[9px] min-[360px]:text-[10px] min-[480px]:text-xs text-gray-500">
            <span className="text-gray-400 whitespace-nowrap">출원번호</span>
            <span className="font-mono truncate max-w-[60px] min-[360px]:max-w-[80px] min-[480px]:max-w-[100px] sm:max-w-[120px]">
              {trademark.applicationNumber}
            </span>
            <span className="text-gray-500 mx-0.5">·</span>
            <span className="text-gray-400 whitespace-nowrap">출원일</span>
            <span className="whitespace-nowrap">
              {formatDate(trademark.applicationDate)}
            </span>
          </div>
        </div>

        <div className="shrink-0 pl-1">
          <button
            onClick={handleToggleFavorite}
            className={clsx(
              'p-2 rounded-full transition-all duration-200 active:scale-90 cursor-pointer',
              favorite ? 'text-yellow-400' : 'text-gray-300 hover:text-gray-400'
            )}
          >
            <svg
              className="w-5 h-5 min-[360px]:w-6 min-[360px]:h-6"
              fill={favorite ? 'currentColor' : 'none'}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={favorite ? 0 : 1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 3h14v18l-7-6-7 6V3z"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  )
}
