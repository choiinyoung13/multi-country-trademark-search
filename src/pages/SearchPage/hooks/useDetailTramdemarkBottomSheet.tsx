import { useState, useMemo, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { BottomSheet } from '../../../components/BottomSheet'
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

export function useDetailTramdemarkBottomSheet() {
  const [isOpen, setIsOpen] = useState(false)
  const [trademark, setTrademark] = useState<Trademark | null>(null)

  const open = useCallback((trademarkData: Trademark) => {
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
        'flex items-start gap-1.5 min-[360px]:gap-2 min-[800px]:gap-3',
        className
      )}
    >
      <div className="text-[10px] min-[360px]:text-xs min-[800px]:text-base text-gray-500 font-medium whitespace-nowrap shrink-0 w-16 min-[360px]:w-20 min-[800px]:w-28">
        {label}
      </div>
      <div className="text-xs min-[360px]:text-sm min-[800px]:text-lg text-gray-900 wrap-break-word flex-1">
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
        className="w-full flex items-center justify-between py-2 min-[360px]:py-2.5 min-[390px]:py-3 text-left"
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
        <div className="pb-2 min-[360px]:pb-2.5 min-[390px]:pb-3">
          {children}
        </div>
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
  trademark: Trademark
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

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="space-y-0">
        {/* 헤더: 상표명 */}
        <div className="flex pb-2 min-[360px]:pb-2.5 border-b border-gray-200">
          <h2 className=" text-sm min-[360px]:text-base min-[390px]:text-lg font-bold text-gray-900 leading-tight">
            {trademark.productName && trademark.productNameEng ? (
              <div className="flex items-center gap-0.5">
                {trademark.productName}
                <span className="font-normal text-gray-600 text-xs min-[360px]:text-sm min-[390px]:text-base ml-1">
                  ( {trademark.productNameEng} )
                </span>
              </div>
            ) : trademark.productName ? (
              trademark.productName
            ) : trademark.productNameEng ? (
              trademark.productNameEng
            ) : (
              '-'
            )}
          </h2>
          <span
            className={clsx(
              'text-[10px] min-[360px]:text-xs min-[390px]:text-sm font-semibold px-2 min-[360px]:px-2.5 py-0.5 min-[360px]:py-1 rounded-md bg-gray-50',
              getStatusColor(trademark.registerStatus)
            )}
          >
            {trademark.registerStatus}
          </span>
        </div>

        {/* 기본 정보 */}
        <AccordionSection
          title="기본 정보"
          isOpen={openSections.has('basic')}
          onToggle={() => toggleSection('basic')}
        >
          <div className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-x-4 min-[480px]:gap-x-6 gap-y-1.5 min-[360px]:gap-y-2">
            <InfoRow label="출원번호" value={trademark.applicationNumber} />
            <InfoRow
              label="출원일"
              value={formatDate(trademark.applicationDate)}
            />
            <InfoRow label="공고번호" value={trademark.publicationNumber} />
            <InfoRow
              label="공고일"
              value={formatDate(trademark.publicationDate)}
            />
          </div>
        </AccordionSection>

        {/* 등록 정보 */}
        <AccordionSection
          title="등록 정보"
          isOpen={openSections.has('registration')}
          onToggle={() => toggleSection('registration')}
        >
          <div className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-x-4 min-[480px]:gap-x-6 gap-y-1.5 min-[360px]:gap-y-2">
            <InfoRow label="등록번호" value={trademark.registrationNumber} />
            <InfoRow
              label="등록일"
              value={
                trademark.registrationDate
                  ? trademark.registrationDate.map(formatDate)
                  : null
              }
            />
            <InfoRow
              label="등록공고번호"
              value={trademark.registrationPubNumber}
            />
            <InfoRow
              label="등록공고일"
              value={formatDate(trademark.registrationPubDate)}
            />
            <InfoRow
              label="국제등록일"
              value={formatDate(trademark.internationalRegDate)}
            />
            <InfoRow
              label="국제등록번호"
              value={trademark.internationalRegNumbers}
            />
          </div>
        </AccordionSection>

        {/* 우선권 주장 정보 */}
        <AccordionSection
          title="우선권 주장 정보"
          isOpen={openSections.has('priority')}
          onToggle={() => toggleSection('priority')}
        >
          <div className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-x-4 min-[480px]:gap-x-6 gap-y-1.5 min-[360px]:gap-y-2">
            <InfoRow
              label="우선권 주장 번호"
              value={trademark.priorityClaimNumList}
            />
            <InfoRow
              label="우선권 주장 일자"
              value={
                trademark.priorityClaimDateList
                  ? trademark.priorityClaimDateList.map(formatDate)
                  : null
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
          <div className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-x-4 min-[480px]:gap-x-6 gap-y-1.5 min-[360px]:gap-y-2">
            <InfoRow
              label="대분류 코드"
              value={trademark.asignProductMainCodeList}
            />
            <InfoRow
              label="소분류 코드"
              value={trademark.asignProductSubCodeList}
            />
          </div>
        </AccordionSection>

        {/* 비엔나 코드 */}
        <AccordionSection
          title="기타"
          isOpen={openSections.has('etc')}
          onToggle={() => toggleSection('etc')}
        >
          <div className="grid grid-cols-1 min-[480px]:grid-cols-2 gap-x-4 min-[480px]:gap-x-6 gap-y-1.5 min-[360px]:gap-y-2">
            <InfoRow label="비엔나 코드" value={trademark.viennaCodeList} />
          </div>
        </AccordionSection>
      </div>
    </BottomSheet>
  )
}
