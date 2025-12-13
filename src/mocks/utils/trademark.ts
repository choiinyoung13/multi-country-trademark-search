import type {
  KrTrademark,
  UsTrademark,
  StandardTrademark,
  TrademarkQueryParams,
} from '../../types/trademark'

/**
 * 한국 등록 상태를 표준 상태로 변환
 */
export function normalizeKrStatus(status: string): string {
  const statusMap: Record<string, string> = {
    등록: 'REGISTERED',
    거절: 'REJECTED',
    실효: 'EXPIRED',
  }
  return statusMap[status] || status.toUpperCase()
}

/**
 * 미국 등록 상태를 표준 상태로 변환
 */
export function normalizeUsStatus(status: string): string {
  const statusMap: Record<string, string> = {
    LIVE: 'REGISTERED',
    DEAD: 'EXPIRED',
  }
  return statusMap[status] || status.toUpperCase()
}

/**
 * 한국 데이터를 표준 인터페이스로 변환
 */
export function transformKrToStandard(krData: KrTrademark): StandardTrademark {
  return {
    countryCode: 'KR',
    id: krData.applicationNumber,
    trademarkName: krData.productName || krData.productNameEng || '',
    applicationNumber: krData.applicationNumber,
    applicationDate: krData.applicationDate,
    status: normalizeKrStatus(krData.registerStatus),
    detailData: krData,
  }
}

/**
 * 미국 데이터를 표준 인터페이스로 변환
 */
export function transformUsToStandard(usData: UsTrademark): StandardTrademark {
  return {
    countryCode: 'US',
    id: usData.applicationNumber,
    trademarkName: usData.productName,
    applicationNumber: usData.applicationNumber,
    applicationDate: usData.applicationDate,
    status: normalizeUsStatus(usData.registerStatus),
    detailData: usData,
  }
}

/**
 * 한국 데이터 필터링
 */
export function filterKrTrademarks(
  data: KrTrademark[],
  params: TrademarkQueryParams
): KrTrademark[] {
  return data.filter(item => {
    if (params.query) {
      const query = params.query.toLowerCase()
      const matchesName =
        item.productName?.toLowerCase().includes(query) ||
        item.productNameEng?.toLowerCase().includes(query)
      if (!matchesName) return false
    }

    if (params.applicationNumber) {
      if (item.applicationNumber !== params.applicationNumber) return false
    }

    if (params.status) {
      // 한국은 원본 상태값과 직접 비교
      if (item.registerStatus !== params.status) {
        return false
      }
    }

    if (params.startDate || params.endDate) {
      const appDate = item.applicationDate
      if (params.startDate && appDate < params.startDate) return false
      if (params.endDate && appDate > params.endDate) return false
    }

    return true
  })
}

/**
 * 미국 데이터 필터링
 */
export function filterUsTrademarks(
  data: UsTrademark[],
  params: TrademarkQueryParams
): UsTrademark[] {
  return data.filter(item => {
    if (params.query) {
      const query = params.query.toLowerCase()
      if (!item.productName?.toLowerCase().includes(query)) return false
    }

    if (params.applicationNumber) {
      if (item.applicationNumber !== params.applicationNumber) return false
    }

    if (params.status) {
      // 미국은 원본 상태값과 직접 비교
      if (item.registerStatus !== params.status) {
        return false
      }
    }

    if (params.startDate || params.endDate) {
      const appDate = item.applicationDate
      if (params.startDate && appDate < params.startDate) return false
      if (params.endDate && appDate > params.endDate) return false
    }

    return true
  })
}
