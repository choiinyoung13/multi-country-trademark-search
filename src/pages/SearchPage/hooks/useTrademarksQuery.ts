import { useQuery } from '@tanstack/react-query'
import { getTrademarks } from '../../../services/trademarkApi'
import { buildQueryParams } from '../../../utils/queryParams'
import { dateSortToSortOption } from '../../../utils/sortTrademarks'
import { sortTrademarks } from '../../../utils/sortTrademarks'
import { filterFavorites } from '../../../utils/favorites'
import { useFilterStore } from '../../../stores/filterStore'
import { useViewSettingStore } from '../../../stores/viewSettingStore'
import type { StandardTrademark } from '../../../types/trademark'

/**
 * 상표 목록 조회 훅
 * filterStore와 viewSettingStore의 상태를 기반으로 데이터를 조회합니다.
 */
export function useTrademarksQuery() {
  const { selectedCountry, searchQuery, inputMode, dateRange } =
    useFilterStore()

  const { status, dateSort, favoriteSort } = useViewSettingStore()

  // 쿼리 파라미터 생성 (favoriteOnly는 제외하고 생성)
  const queryParams = buildQueryParams(
    selectedCountry,
    searchQuery,
    inputMode,
    dateRange,
    status,
    favoriteSort
  )

  // React Query로 데이터 조회
  const {
    data: rawData,
    isLoading,
    isError,
    error,
  } = useQuery<StandardTrademark[]>({
    queryKey: ['trademarks', queryParams],
    queryFn: () => getTrademarks(queryParams),
  })

  // 즐겨찾기 필터링 적용
  const favoriteOnly = favoriteSort === '즐겨찾기'
  const filteredData = rawData
    ? filterFavorites(rawData, favoriteOnly)
    : undefined

  // 정렬 적용
  const sortOption = dateSortToSortOption(dateSort)
  const sortedData = filteredData
    ? sortTrademarks(filteredData, sortOption)
    : undefined

  return {
    data: sortedData,
    isLoading,
    isError,
    error,
  }
}
