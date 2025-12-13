import type {
  KrTrademark,
  UsTrademark,
  StandardTrademark,
  TrademarkQueryParams,
} from '../types/trademark'
import {
  transformKrToStandard,
  transformUsToStandard,
  filterKrTrademarks,
  filterUsTrademarks,
} from '../mocks/utils/trademark'

/**
 * 한국 상표 데이터 로드
 */
export async function fetchKrTrademarks(): Promise<KrTrademark[]> {
  const response = await fetch('/api/trademarks/kr')
  if (!response.ok) {
    throw new Error('한국 상표 데이터를 불러오는데 실패했습니다')
  }
  return response.json()
}

/**
 * 미국 상표 데이터 로드
 */
export async function fetchUsTrademarks(): Promise<UsTrademark[]> {
  const response = await fetch('/api/trademarks/us')
  if (!response.ok) {
    throw new Error('미국 상표 데이터를 불러오는데 실패했습니다')
  }
  return response.json()
}

/**
 * 필터링 및 변환된 상표 목록 조회
 */
export async function getTrademarks(
  params: TrademarkQueryParams
): Promise<StandardTrademark[]> {
  let rawData: (KrTrademark | UsTrademark)[]
  let filteredData: (KrTrademark | UsTrademark)[]

  // 국가별 데이터 로드
  if (params.country === 'KR') {
    rawData = await fetchKrTrademarks()
    filteredData = filterKrTrademarks(rawData as KrTrademark[], params)
    return filteredData.map(transformKrToStandard)
  } else {
    rawData = await fetchUsTrademarks()
    filteredData = filterUsTrademarks(rawData as UsTrademark[], params)
    return filteredData.map(transformUsToStandard)
  }
}
