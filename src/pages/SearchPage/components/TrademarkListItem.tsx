import { useState } from 'react'
import { useDetailTramdemarkBottomSheet } from '../hooks/useDetailTramdemarkBottomSheet'
import clsx from 'clsx'

interface Trademark {
  productName: string | null
  productNameEng: string | null
  applicationNumber: string
  applicationDate: string
  registerStatus: string
  publicationNumber?: string | null
  publicationDate?: string | null
  registrationNumber?: string[] | null
  registrationDate?: string[] | null
  registrationPubNumber?: string | null
  registrationPubDate?: string | null
  internationalRegDate?: string | null
  internationalRegNumbers?: string | null
  priorityClaimNumList?: string[] | null
  priorityClaimDateList?: string[] | null
  asignProductMainCodeList?: string[] | null
  asignProductSubCodeList?: string[] | null
  viennaCodeList?: string[] | null
}

interface TrademarkListItemProps {
  trademark: Trademark
}

// 날짜 포맷팅 (예: "19951117" -> "1995.11.17")
const formatDate = (dateStr: string) => {
  if (!dateStr || dateStr.length !== 8) return dateStr
  const year = dateStr.substring(0, 4)
  const month = dateStr.substring(4, 6)
  const day = dateStr.substring(6, 8)
  return `${year}.${month}.${day}`
}

// 상태에 따른 색상
const getStatusColor = (status: string) => {
  if (status === '등록') {
    return 'text-markcloud-blue'
  } else if (status === '실효') {
    return 'text-rose-500'
  } else {
    return 'text-gray-400'
  }
}

export function TrademarkListItem({ trademark }: TrademarkListItemProps) {
  const { open: openDetailTramdemark, detailTramdemarkBottomSheet } =
    useDetailTramdemarkBottomSheet()
  const [isFavorite, setIsFavorite] = useState(false)


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
              getStatusColor(trademark.registerStatus)
            )}
          >
            {trademark.registerStatus}
          </span>
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-center gap-0.5">
          <div className="flex items-center justify-between gap-1 min-[360px]:gap-1.5 min-[480px]:gap-2 mb-0.5 min-[360px]:mb-1">
            <h3 className="text-xs min-[360px]:text-sm min-[480px]:text-base sm:text-md font-bold text-gray-900 truncate">
              {trademark.productName && trademark.productNameEng ? (
                <>
                  {trademark.productName}
                  <span className="font-normal text-gray-600">
                    {' '}
                    ( {trademark.productNameEng} )
                  </span>
                </>
              ) : trademark.productName ? (
                trademark.productName
              ) : trademark.productNameEng ? (
                trademark.productNameEng
              ) : (
                '-'
              )}
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

            onClick={(e) => {
              e.stopPropagation()
              setIsFavorite(!isFavorite)
            }}
            className={clsx(
              'p-2 rounded-full transition-all duration-200 active:scale-90 cursor-pointer',
              isFavorite ? 'text-yellow-400' : 'text-gray-300 hover:text-gray-400'
            )}
          >
            <svg
              className="w-5 h-5 min-[360px]:w-6 min-[360px]:h-6"
              fill={isFavorite ? 'currentColor' : 'none'}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={isFavorite ? 0 : 1.5}
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
