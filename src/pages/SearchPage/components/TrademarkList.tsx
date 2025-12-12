import trademarksData from '../../../../trademarks_kr_trademarks.json'
import { TrademarkListItem } from './TrademarkListItem'

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

export function TrademarkList() {
  const trademarks = trademarksData as Trademark[]

  if (trademarks.length === 0) {
    return (
      <div className="p-6 min-[360px]:p-8 min-[480px]:p-10 text-center">
        <div className="text-gray-400 text-xs min-[360px]:text-sm min-[480px]:text-base">
          상표 내역이 없습니다.
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {trademarks.map((trademark, index) => (
        <TrademarkListItem
          key={`${trademark.applicationNumber}-${index}`}
          trademark={trademark}
        />
      ))}
    </div>
  )
}
