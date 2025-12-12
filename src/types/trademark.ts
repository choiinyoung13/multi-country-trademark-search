/**
 * 한국 상표 데이터 원본 타입
 */
export type KrTrademark = {
  productName: string
  productNameEng?: string
  applicationNumber: string
  applicationDate: string
  registerStatus: string
  publicationNumber?: string | null
  publicationDate?: string | null
  registrationNumber?: string[] | null
  registrationDate?: string[] | null
  registrationPubNumber?: string | null
  registrationPubDate?: string | null
  internationalRegNumbers?: string[] | null
  internationalRegDate?: string | null
  priorityClaimNumList?: string[] | null
  priorityClaimDateList?: string[] | null
  asignProductMainCodeList?: string[] | null
  asignProductSubCodeList?: string[] | null
  viennaCodeList?: string[] | null
}

/**
 * 미국 상표 데이터 원본 타입
 */
export type UsTrademark = {
  productName: string
  applicationNumber: string
  applicationDate: string
  registerStatus: string
  publicationDate?: string | null
  registrationNumber?: string[] | null
  registrationDate?: string[] | null
  internationalRegNumbers?: string[] | null
  internationalRegDate?: string | null
  priorityClaimNumList?: string[] | null
  priorityClaimDateList?: string[] | null
  asignProductMainCodeList?: string[] | null
  usClassCodeList?: string[] | null
  viennaCodeList?: string[] | null
}

/**
 * 표준 상표 인터페이스 (Standard Trademark Interface)
 * 프론트엔드에서 일관되게 사용할 수 있는 통합 데이터 구조
 */
export type StandardTrademark = {
  countryCode: 'KR' | 'US'
  id: string
  trademarkName: string
  applicationNumber: string
  applicationDate: string
  status: string
  detailData: KrTrademark | UsTrademark
}
