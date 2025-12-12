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
import krData from '../mocks/data/trademarks_kr_trademarks.json'
import usData from '../mocks/data/trademarks_us_trademarks.json'

/**
 * 한국 상표 데이터 로드
 * JSON 파일을 직접 import하여 사용 (fetch처럼 보이도록 Promise로 래핑)
 */
export async function fetchKrTrademarks(): Promise<KrTrademark[]> {
  // 실제로는 import된 데이터를 반환하지만, API 호출처럼 보이도록 Promise로 래핑
  return Promise.resolve(krData as KrTrademark[])
}

/**
 * 미국 상표 데이터 로드
 * JSON 파일을 직접 import하여 사용 (fetch처럼 보이도록 Promise로 래핑)
 */
export async function fetchUsTrademarks(): Promise<UsTrademark[]> {
  // 실제로는 import된 데이터를 반환하지만, API 호출처럼 보이도록 Promise로 래핑
  return Promise.resolve(usData as UsTrademark[])
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
