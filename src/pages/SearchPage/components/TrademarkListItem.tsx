import { useDetailTramdemarkBottomSheet } from '../hooks/useDetailTramdemarkBottomSheet'

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

// 상태에 따른 아이콘 및 색상
const getStatusIcon = (status: string) => {
  if (status === '등록') {
    return (
      <svg
        className="w-4 h-4 min-[360px]:w-5 min-[360px]:h-5 min-[480px]:w-6 min-[480px]:h-6 text-markcloud-blue"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
    )
  } else if (status === '실효') {
    return (
      <svg
        className="w-4 h-4 min-[360px]:w-5 min-[360px]:h-5 min-[480px]:w-6 min-[480px]:h-6 text-rose-500"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clipRule="evenodd"
        />
      </svg>
    )
  } else {
    return (
      <svg
        className="w-4 h-4 min-[360px]:w-5 min-[360px]:h-5 min-[480px]:w-6 min-[480px]:h-6 text-gray-400"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
          clipRule="evenodd"
        />
      </svg>
    )
  }
}

export function TrademarkListItem({ trademark }: TrademarkListItemProps) {
  const { open: openDetailTramdemark, detailTramdemarkBottomSheet } =
    useDetailTramdemarkBottomSheet()

  return (
    <>
      {detailTramdemarkBottomSheet}

      <div
        onClick={() => openDetailTramdemark(trademark)}
        className="flex items-center pr-2 min-[360px]:pr-3 min-[480px]:pr-4 sm:pr-6 py-2 min-[360px]:py-2.5 min-[480px]:py-3.5 bg-white shadow-[0_4px_15px_rgba(0,0,0,0.07)] rounded-xl hover:bg-gray-100/50 transition-colors active:bg-gray-100 relative cursor-pointer"
      >
        {/* 왼쪽: 상태 아이콘 */}
        <div className="absolute left-2 min-[360px]:left-2.5 min-[480px]:left-3.5 top-1/2 -translate-y-1/2">
          {getStatusIcon(trademark.registerStatus)}
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-center gap-0.5 pl-8 min-[360px]:pl-9.5 min-[480px]:pl-12 sm:pl-13">
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
            <span className="whitespace-nowrap">
              {trademark.registerStatus}
            </span>
            <span className="text-gray-500 mx-0.5">·</span>
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

        <div>
          <svg
            className="w-4 h-4 min-[360px]:w-4.5 min-[360px]:h-4.5 text-gray-400 shrink-0"
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
        </div>
      </div>
    </>
  )
}
