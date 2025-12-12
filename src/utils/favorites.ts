import type { CountryCode } from '../stores/filterStore'

const FAVORITE_STORAGE_KEY = 'markcloud_favorites'

/**
 * 즐겨찾기 ID 형식: `${countryCode}_${applicationNumber}`
 */
type FavoriteId = string

/**
 * localStorage에서 모든 즐겨찾기 ID 목록 조회
 */
export function getFavoriteIds(): Set<FavoriteId> {
  try {
    const stored = localStorage.getItem(FAVORITE_STORAGE_KEY)
    if (!stored) return new Set()
    const ids = JSON.parse(stored) as FavoriteId[]
    return new Set(ids)
  } catch {
    return new Set()
  }
}

/**
 * 즐겨찾기 ID 생성
 */
function createFavoriteId(
  countryCode: CountryCode,
  applicationNumber: string
): FavoriteId {
  return `${countryCode}_${applicationNumber}`
}

/**
 * 즐겨찾기 여부 확인
 */
export function isFavorite(
  countryCode: CountryCode,
  applicationNumber: string
): boolean {
  const favoriteIds = getFavoriteIds()
  const id = createFavoriteId(countryCode, applicationNumber)
  return favoriteIds.has(id)
}

/**
 * 즐겨찾기 토글
 */
export function toggleFavorite(
  countryCode: CountryCode,
  applicationNumber: string
): boolean {
  const favoriteIds = getFavoriteIds()
  const id = createFavoriteId(countryCode, applicationNumber)

  if (favoriteIds.has(id)) {
    // 제거
    favoriteIds.delete(id)
  } else {
    // 추가
    favoriteIds.add(id)
  }

  // localStorage에 저장
  try {
    const idsArray = Array.from(favoriteIds)
    localStorage.setItem(FAVORITE_STORAGE_KEY, JSON.stringify(idsArray))
    return favoriteIds.has(id) // 현재 상태 반환
  } catch {
    return false
  }
}

/**
 * 즐겨찾기 필터링
 */
export function filterFavorites<
  T extends { countryCode: CountryCode; applicationNumber: string }
>(items: T[], favoriteOnly: boolean): T[] {
  if (!favoriteOnly) return items

  const favoriteIds = getFavoriteIds()
  return items.filter(item => {
    const id = createFavoriteId(item.countryCode, item.applicationNumber)
    return favoriteIds.has(id)
  })
}
