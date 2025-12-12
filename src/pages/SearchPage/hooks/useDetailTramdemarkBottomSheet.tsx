import { useState, useMemo, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { BottomSheet } from '../../../components/BottomSheet'
import clsx from 'clsx'
import type { StandardTrademark } from '../../../types/trademark'
import type { KrTrademark, UsTrademark } from '../../../types/trademark'

export function useDetailTramdemarkBottomSheet() {
  const [isOpen, setIsOpen] = useState(false)
  const [trademark, setTrademark] = useState<StandardTrademark | null>(null)

  const open = useCallback((trademarkData: StandardTrademark) => {
    setTrademark(trademarkData)
    setIsOpen(true)
  }, [])
  const close = useCallback(() => {
    setIsOpen(false)
    setTrademark(null)
  }, [])

  const detailTramdemarkBottomSheet = useMemo(
    () =>
      isOpen && trademark
        ? createPortal(
            <DetailTramdemarkBottomSheet
              isOpen={isOpen}
              onClose={close}
              trademark={trademark}
            />,
            document.body
          )
        : null,
    [isOpen, close, trademark]
  )

  return {
    open,
    close,
    detailTramdemarkBottomSheet,
  }
}

// 날짜 포맷팅 (예: "19951117" -> "1995.11.17")
const formatDate = (dateStr: string | null | undefined) => {
  if (!dateStr || dateStr.length !== 8) return dateStr || '-'
  const year = dateStr.substring(0, 4)
  const month = dateStr.substring(4, 6)
  const day = dateStr.substring(6, 8)
  return `${year}.${month}.${day}`
}

// 상태에 따른 색상 (원본 상태값 기준)
const getStatusColor = (status: string, countryCode: 'KR' | 'US') => {
  if (countryCode === 'KR') {
    if (status === '등록') {
      return 'text-markcloud-blue bg-blue-50'
    } else if (status === '실효') {
      return 'text-red-600 bg-red-50'
    } else {
      return 'text-gray-400 bg-gray-100'
    }
  } else {
    // 미국
    if (status === 'LIVE') {
      return 'text-markcloud-blue bg-blue-50'
    } else if (status === 'DEAD') {
      return 'text-red-600 bg-red-50'
    } else {
      return 'text-gray-400 bg-gray-100'
    }
  }
}

// 상표명 표시
const getTrademarkDisplayName = (
  trademark: StandardTrademark
): React.ReactNode => {
  if (trademark.countryCode === 'KR') {
    const krData = trademark.detailData as KrTrademark
    if (krData.productName && krData.productNameEng) {
      return (
        <div className="flex items-center gap-0.5">
          {krData.productName}
          <span className="font-normal text-gray-600 text-xs min-[360px]:text-sm min-[390px]:text-base ml-1">
            ( {krData.productNameEng} )
          </span>
        </div>
      )
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

// 정보 항목 컴포넌트 (null 값도 "-"로 표시)
function InfoRow({
  label,
  value,
  className = '',
}: {
  label: string
  value: string | string[] | null | undefined
  className?: string
}) {
  let displayValue: string = '-'

  if (value !== null && value !== undefined) {
    if (Array.isArray(value)) {
      displayValue = value.length > 0 ? value.join(', ') : '-'
    } else {
      displayValue = value
    }
  }

  return (
    <div
      className={clsx(
        'flex items-start gap-1.5 min-[360px]:gap-2 min-[800px]:gap-3 py-1',
        className
      )}
    >
      <div className="text-[10px] min-[360px]:text-xs min-[800px]:text-sm text-gray-500 font-medium whitespace-nowrap shrink-0 w-16 min-[360px]:w-20 min-[800px]:w-24">
        {label}
      </div>
      <div className="text-xs min-[360px]:text-sm min-[800px]:text-base text-gray-900 wrap-break-word flex-1">
        {displayValue}
      </div>
    </div>
  )
}

// 아코디언 섹션 컴포넌트
function AccordionSection({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string
  isOpen: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-2.5 min-[360px]:py-3 text-left hover:bg-gray-50/50 transition-colors rounded-lg -mx-1 px-1"
      >
        <h3 className="text-xs min-[360px]:text-sm min-[390px]:text-base font-semibold text-gray-800">
          {title}
        </h3>
        <svg
          className={clsx(
            'w-4 h-4 min-[360px]:w-5 min-[360px]:h-5 text-gray-400 transition-transform duration-200 shrink-0',
            isOpen && 'rotate-180'
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="pb-2.5 min-[360px]:pb-3 pt-0.5">{children}</div>
      )}
    </div>
  )
}

function DetailTramdemarkBottomSheet({
  isOpen,
  onClose,
  trademark,
}: {
  isOpen: boolean
  onClose: () => void
  trademark: StandardTrademark
}) {
  const [openSections, setOpenSections] = useState<Set<string>>(
    new Set(['basic', 'registration', 'priority', 'product', 'etc'])
  )

  const toggleSection = (section: string) => {
    setOpenSections(prev => {
      const next = new Set(prev)
      if (next.has(section)) {
        next.delete(section)
      } else {
        next.add(section)
      }
      return next
    })
  }

  const isKr = trademark.countryCode === 'KR'
  const krData = isKr ? (trademark.detailData as KrTrademark) : null
  const usData = !isKr ? (trademark.detailData as UsTrademark) : null
  const originalStatus = isKr ? krData!.registerStatus : usData!.registerStatus

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="space-y-0">
        {/* 헤더: 상표명 */}
        <div className="flex items-center gap-2 pb-2.5 min-[360px]:pb-3 mb-0.5 border-b border-gray-200">
          <h2 className="text-base min-[360px]:text-lg min-[390px]:text-xl font-bold text-gray-900 leading-normal">
            {getTrademarkDisplayName(trademark)}
          </h2>
          <span
            className={clsx(
              'text-[10px] min-[360px]:text-xs min-[390px]:text-sm font-semibold px-2 min-[360px]:px-2.5 py-0.5 min-[360px]:py-1 rounded shrink-0 self-center',
              getStatusColor(originalStatus, trademark.countryCode)
            )}
          >
            {originalStatus}
          </span>
        </div>

        {/* 기본 정보 */}
        <AccordionSection
          title="기본 정보"
          isOpen={openSections.has('basic')}
          onToggle={() => toggleSection('basic')}
        >
          <div className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-x-4 min-[480px]:gap-x-6 gap-y-0">
            <InfoRow label="출원번호" value={trademark.applicationNumber} />
            <InfoRow
              label="출원일"
              value={formatDate(trademark.applicationDate)}
            />
            {/* 한국만 공고번호 표시 */}
            {isKr && krData && (
              <>
                <InfoRow label="공고번호" value={krData.publicationNumber} />
                <InfoRow
                  label="공고일"
                  value={formatDate(krData.publicationDate)}
                />
              </>
            )}
            {/* 미국은 공고일만 표시 */}
            {!isKr && usData && (
              <InfoRow
                label="공고일"
                value={formatDate(usData.publicationDate)}
              />
            )}
          </div>
        </AccordionSection>

        {/* 등록 정보 */}
        <AccordionSection
          title="등록 정보"
          isOpen={openSections.has('registration')}
          onToggle={() => toggleSection('registration')}
        >
          <div className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-x-4 min-[480px]:gap-x-6 gap-y-0">
            {isKr && krData && (
              <>
                <InfoRow label="등록번호" value={krData.registrationNumber} />
                <InfoRow
                  label="등록일"
                  value={
                    krData.registrationDate
                      ? krData.registrationDate.map(formatDate)
                      : null
                  }
                />
                <InfoRow
                  label="등록공고번호"
                  value={krData.registrationPubNumber}
                />
                <InfoRow
                  label="등록공고일"
                  value={formatDate(krData.registrationPubDate)}
                />
              </>
            )}
            {!isKr && usData && (
              <>
                <InfoRow label="등록번호" value={usData.registrationNumber} />
                <InfoRow
                  label="등록일"
                  value={
                    usData.registrationDate
                      ? usData.registrationDate.map(formatDate)
                      : null
                  }
                />
              </>
            )}
            {/* 공통 필드 */}
            <InfoRow
              label="국제등록일"
              value={formatDate(
                isKr
                  ? krData?.internationalRegDate
                  : usData?.internationalRegDate
              )}
            />
            <InfoRow
              label="국제등록번호"
              value={
                isKr
                  ? krData?.internationalRegNumbers
                  : usData?.internationalRegNumbers
              }
            />
          </div>
        </AccordionSection>

        {/* 우선권 주장 정보 */}
        <AccordionSection
          title="우선권 주장 정보"
          isOpen={openSections.has('priority')}
          onToggle={() => toggleSection('priority')}
        >
          <div className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-x-4 min-[480px]:gap-x-6 gap-y-0">
            <InfoRow
              label="우선권 주장 번호"
              value={
                isKr
                  ? krData?.priorityClaimNumList
                  : usData?.priorityClaimNumList
              }
            />
            <InfoRow
              label="우선권 주장 일자"
              value={
                isKr
                  ? krData?.priorityClaimDateList?.map(formatDate)
                  : usData?.priorityClaimDateList?.map(formatDate)
              }
            />
          </div>
        </AccordionSection>

        {/* 지정상품 정보 */}
        <AccordionSection
          title="지정상품 정보"
          isOpen={openSections.has('product')}
          onToggle={() => toggleSection('product')}
        >
          <div className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-x-4 min-[480px]:gap-x-6 gap-y-0">
            <InfoRow
              label="대분류 코드"
              value={
                isKr
                  ? krData?.asignProductMainCodeList
                  : usData?.asignProductMainCodeList
              }
            />
            {/* 한국: 소분류 코드, 미국: US 코드 */}
            {isKr && (
              <InfoRow
                label="소분류 코드"
                value={krData?.asignProductSubCodeList}
              />
            )}
            {!isKr && (
              <InfoRow label="US 코드" value={usData?.usClassCodeList} />
            )}
          </div>
        </AccordionSection>

        {/* 기타 */}
        <AccordionSection
          title="기타"
          isOpen={openSections.has('etc')}
          onToggle={() => toggleSection('etc')}
        >
          <div className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-x-4 min-[480px]:gap-x-6 gap-y-0">
            <InfoRow
              label="비엔나 코드"
              value={isKr ? krData?.viennaCodeList : usData?.viennaCodeList}
            />
          </div>
        </AccordionSection>
      </div>
    </BottomSheet>
  )
}
