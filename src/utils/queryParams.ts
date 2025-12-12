import type { TrademarkQueryParams } from '../types/trademark'
import type { CountryCode, DateRange, InputMode } from '../stores/filterStore'
import type {
  RegisterStatus,
  FavoriteSortOrder,
} from '../stores/viewSettingStore'

/**
 * ISO 날짜 형식 (YYYY-MM-DD)을 YYYYMMDD 형식으로 변환
 */
function isoToYYYYMMDD(isoDate: string): string {
  return isoDate.replace(/-/g, '')
}

/**
 * 등록 상태를 국가별 원본 형식으로 변환
 * 한국: 등록, 출원, 거절
 * 미국: LIVE, DEAD 등
 */
function mapStatusToOriginal(
  status: RegisterStatus | null,
  country: CountryCode
): string | undefined {
  if (!status) return undefined

  if (country === 'KR') {
    // 한국은 그대로 반환
    return status
  } else {
    // 미국은 영어 상태로 변환
    const statusMap: Record<RegisterStatus, string> = {
      등록: 'LIVE',
      출원: 'LIVE', // 출원도 LIVE로 처리
      거절: 'DEAD',
    }
    return statusMap[status] || status
  }
}

/**
 * filterStore와 viewSettingStore의 상태를 TrademarkQueryParams로 변환
 */
export function buildQueryParams(
  country: CountryCode,
  inputValue: string,
  inputMode: InputMode,
  dateRange: DateRange | null,
  status: RegisterStatus | null,
  favoriteSort: FavoriteSortOrder
): TrademarkQueryParams {
  const params: TrademarkQueryParams = {
    country,
  }

  // 검색어 설정
  if (inputValue.trim()) {
    if (inputMode === 'name') {
      params.query = inputValue.trim()
    } else {
      params.applicationNumber = inputValue.trim()
    }
  }

  // 날짜 범위 설정
  if (dateRange) {
    params.startDate = isoToYYYYMMDD(dateRange.startDate)
    params.endDate = isoToYYYYMMDD(dateRange.endDate)
  }

  // 등록 상태 필터
  const mappedStatus = mapStatusToOriginal(status, country)
  if (mappedStatus) {
    params.status = mappedStatus
  }

  // 즐겨찾기 필터
  if (favoriteSort === '즐겨찾기') {
    params.favoriteOnly = true
  }

  return params
}
