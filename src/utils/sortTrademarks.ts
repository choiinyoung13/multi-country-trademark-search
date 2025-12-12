import type { StandardTrademark, SortOption } from '../types/trademark'
import type { DateSortOrder } from '../stores/viewSettingStore'

/**
 * viewSettingStore의 dateSort를 SortOption으로 변환
 */
export function dateSortToSortOption(dateSort: DateSortOrder): SortOption {
  return {
    field: 'applicationDate',
    order: dateSort === '최신순' ? 'desc' : 'asc',
  }
}

/**
 * 상표 목록 정렬
 */
export function sortTrademarks(
  data: StandardTrademark[],
  sortOption: SortOption
): StandardTrademark[] {
  const sorted = [...data]

  sorted.sort((a, b) => {
    if (sortOption.field === 'applicationDate') {
      // YYYYMMDD 형식이므로 문자열 비교로 정렬 가능
      const comparison = a.applicationDate.localeCompare(b.applicationDate)
      return sortOption.order === 'asc' ? comparison : -comparison
    } else if (sortOption.field === 'trademarkName') {
      // 상표명 정렬 (한글/영문 혼합)
      const comparison = a.trademarkName.localeCompare(b.trademarkName, 'ko', {
        numeric: true,
        sensitivity: 'base',
      })
      return sortOption.order === 'asc' ? comparison : -comparison
    }
    return 0
  })

  return sorted
}
