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

/**
 * 검색 쿼리 파라미터
 */
export type TrademarkQueryParams = {
  country: 'KR' | 'US'
  query?: string // 상표명 검색어
  applicationNumber?: string // 출원번호 (정확한 매칭)
  status?: string // 등록 상태 필터
  startDate?: string // 출원일 시작 (YYYYMMDD)
  endDate?: string // 출원일 종료 (YYYYMMDD)
  favoriteOnly?: boolean // 즐겨찾기만 보기
}

/**
 * 정렬 옵션
 */
export type SortOption = {
  field: 'applicationDate' | 'trademarkName'
  order: 'asc' | 'desc'
}