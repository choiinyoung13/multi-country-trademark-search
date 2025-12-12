# MarkCloud 프론트엔드 과제 구현 계획서

## 📋 현재 상태 분석

### 완료된 부분
- ✅ UI 컴포넌트 구조 (SearchHeader, TrademarkList, BottomSheet 등)
- ✅ Zustand 상태 관리 구조 (filterStore, viewSettingStore)
- ✅ 기본 타입 정의 (KrTrademark, UsTrademark, StandardTrademark)
- ✅ 데이터 변환 유틸리티 일부 구현
- ✅ MSW 설정 (handlers.ts는 비어있음)

### 미완성 부분
- ❌ MSW 핸들러 구현
- ❌ API 서비스 레이어
- ❌ React Query 연동
- ❌ 실제 검색/필터링 로직 적용
- ❌ 정렬 기능 구현
- ❌ 즐겨찾기 기능 (localStorage)
- ❌ UI 상태 처리 (로딩/에러/빈결과)
- ❌ 상세 정보 BottomSheet 국가별 스키마 차이 처리

---

## 🎯 구현 계획

### Phase 1: 데이터 레이어 구축

#### 1.1 타입 정의 보완
**파일**: `src/types/trademark.ts`
- `TrademarkQueryParams` 타입 추가
  - country: 'KR' | 'US'
  - query?: string (상표명 검색어)
  - applicationNumber?: string (출원번호 정확 매칭)
  - status?: string (등록 상태 필터)
  - startDate?: string (YYYYMMDD)
  - endDate?: string (YYYYMMDD)
  - favoriteOnly?: boolean
- `SortOption` 타입 추가
  - field: 'applicationDate' | 'trademarkName'
  - order: 'asc' | 'desc'

#### 1.2 MSW 핸들러 구현
**파일**: `src/mocks/handlers.ts`
- `/api/trademarks/kr` - 한국 데이터 반환
- `/api/trademarks/us` - 미국 데이터 반환
- JSON 파일을 직접 import하여 반환

#### 1.3 API 서비스 레이어
**파일**: `src/services/trademarkApi.ts` (신규 생성)
- `fetchKrTrademarks()`: 한국 데이터 fetch
- `fetchUsTrademarks()`: 미국 데이터 fetch
- `getTrademarks(params)`: 필터링된 데이터 반환
  - 국가별 데이터 로드
  - 필터링 적용
  - StandardTrademark로 변환

#### 1.4 데이터 변환 유틸리티 개선
**파일**: `src/mocks/utils/trademark.ts`
- 등록 상태 매핑 개선
  - 한국: 등록 → REGISTERED, 출원 → PENDING, 거절 → REJECTED
  - 미국: LIVE → REGISTERED, DEAD → EXPIRED
- 필터링 로직 개선
  - 검색 모드에 따른 처리 (name/number)
  - 등록 상태 필터 개선
  - 날짜 범위 필터 개선
- 정렬 함수 추가
  - `sortTrademarks(data, sortOption)`: 정렬 로직

---

### Phase 2: React Query 연동

#### 2.1 QueryClient 설정
**파일**: `src/main.tsx` 수정
- QueryClient 생성 및 설정
- QueryClientProvider로 App 감싸기
- 기본 옵션: staleTime, cacheTime 설정

#### 2.2 커스텀 훅 생성
**파일**: `src/hooks/useTrademarksQuery.ts` (신규 생성)
- `useTrademarksQuery(params)` 훅
  - filterStore, viewSettingStore 상태를 쿼리 파라미터로 변환
  - React Query의 useQuery 사용
  - 자동 재요청 (필터 변경 시)

---

### Phase 3: 검색/필터링 로직 구현

#### 3.1 필터 파라미터 변환
**파일**: `src/utils/queryParams.ts` (신규 생성)
- `buildQueryParams()` 함수
  - filterStore → TrademarkQueryParams 변환
  - inputMode에 따라 query 또는 applicationNumber 설정
  - 등록 상태 매핑 (한국/미국)
  - 날짜 범위 변환 (ISO → YYYYMMDD)

#### 3.2 정렬 로직
**파일**: `src/utils/sortTrademarks.ts` (신규 생성)
- `sortTrademarks(data, sortOption)` 함수
  - applicationDate 기준 정렬
  - trademarkName 기준 정렬
  - 오름차순/내림차순

---

### Phase 4: UI 컴포넌트 개선

#### 4.1 UI 상태 컴포넌트
**파일**: `src/components/` (신규 생성)
- `LoadingSpinner.tsx`: 로딩 인디케이터
- `ErrorMessage.tsx`: 에러 메시지 표시
- `EmptyState.tsx`: 빈 결과 표시

#### 4.2 TrademarkList 컴포넌트 개선
**파일**: `src/pages/SearchPage/components/TrademarkList.tsx`
- React Query 훅 사용
- 필터/정렬 적용
- 로딩/에러/빈결과 상태 처리
- 즐겨찾기 필터 적용

#### 4.3 TrademarkListItem 컴포넌트 개선
**파일**: `src/pages/SearchPage/components/TrademarkListItem.tsx`
- StandardTrademark 타입 사용
- 즐겨찾기 localStorage 연동
- 국가별 플래그 표시

---

### Phase 5: 즐겨찾기 기능

#### 5.1 즐겨찾기 유틸리티
**파일**: `src/utils/favorites.ts` (신규 생성)
- `getFavoriteIds()`: localStorage에서 즐겨찾기 ID 목록 조회
- `toggleFavorite(countryCode, applicationNumber)`: 즐겨찾기 토글
- `isFavorite(countryCode, applicationNumber)`: 즐겨찾기 여부 확인
- 키 형식: `favorite_${countryCode}_${applicationNumber}`

#### 5.2 즐겨찾기 필터 적용
- viewSettingStore의 favoriteSort에 따라 필터링
- '전체보기': 모든 데이터
- '즐겨찾기': 즐겨찾기만 표시

---

### Phase 6: 상세 정보 BottomSheet 개선

#### 6.1 국가별 스키마 차이 처리
**파일**: `src/pages/SearchPage/hooks/useDetailTramdemarkBottomSheet.tsx`
- StandardTrademark 타입 사용
- countryCode에 따라 다른 필드 표시
  - 한국: publicationNumber, registrationPubNumber 등
  - 미국: usClassCodeList (한국의 asignProductSubCodeList 대신)
- 공통 필드와 국가별 필드 구분

---

### Phase 7: 검색 기능 연동

#### 7.1 SearchInput 컴포넌트 개선
**파일**: `src/pages/SearchPage/components/SearchInput.tsx`
- 검색 버튼 클릭 시 filterStore 업데이트
- Enter 키 처리 (이미 구현됨)
- 검색 실행 시 자동으로 React Query 재요청

---

### Phase 8: README 작성

#### 8.1 README.md 내용
- 프로젝트 소개
- 실행 방법
- 주요 기능 설명
- 폴더/컴포넌트 구조
- 기술적 의사결정
  - Zustand 선택 이유
  - 다국가 데이터 처리 방법
  - 공통 컴포넌트 설계
  - 문제 해결 과정
- 개선하고 싶은 부분

---

## 🏗️ 아키텍처 설계

### 레이어 구조
```
src/
├── components/          # 재사용 가능한 UI 컴포넌트
├── pages/              # 페이지 컴포넌트
├── services/           # API 서비스 레이어 (신규)
├── hooks/             # 커스텀 훅 (신규)
├── utils/              # 유틸리티 함수 (신규)
├── stores/             # Zustand 상태 관리
├── types/              # TypeScript 타입 정의
└── mocks/              # MSW 모킹
```

### 데이터 흐름
```
User Input → filterStore/viewSettingStore 
  → buildQueryParams() 
  → useTrademarksQuery() 
  → trademarkApi.getTrademarks() 
  → filterKrTrademarks/filterUsTrademarks() 
  → transformKrToStandard/transformUsToStandard() 
  → sortTrademarks() 
  → UI 렌더링
```

### 확장성 고려사항
- **다국가 지원**: StandardTrademark 인터페이스로 통합
- **국가별 스키마**: detailData에 원본 데이터 보관, UI에서 조건부 렌더링
- **필터 확장**: TrademarkQueryParams에 필드 추가만 하면 됨
- **정렬 확장**: SortOption에 필드 추가

---

## 🔧 기술적 의사결정

### 1. 상태 관리: Zustand
**이유**:
- 프로젝트 규모에 적합 (가벼움)
- Redux보다 간단한 API
- TypeScript 지원 우수
- 필터/뷰 설정 같은 단순한 전역 상태에 적합

### 2. 서버 상태: React Query
**이유**:
- 캐싱 자동 관리
- 로딩/에러 상태 자동 처리
- 필터 변경 시 자동 재요청
- 서버 상태와 클라이언트 상태 분리

### 3. 다국가 데이터 처리: StandardTrademark
**이유**:
- 공통 인터페이스로 UI 컴포넌트 재사용
- 국가별 차이는 detailData에 보관
- 향후 일본, 중국 등 추가 시 확장 용이

### 4. 즐겨찾기: localStorage
**이유**:
- 서버 없이도 영구 저장 가능
- 간단한 구현
- 향후 서버 연동 시 쉽게 마이그레이션 가능

---

## 📝 구현 체크리스트

### Phase 1: 데이터 레이어
- [ ] 타입 정의 보완
- [ ] MSW 핸들러 구현
- [ ] API 서비스 레이어 생성
- [ ] 데이터 변환 유틸리티 개선

### Phase 2: React Query
- [ ] QueryClient 설정
- [ ] useTrademarksQuery 훅 생성

### Phase 3: 검색/필터링
- [ ] 필터 파라미터 변환 함수
- [ ] 정렬 로직 구현

### Phase 4: UI 컴포넌트
- [ ] UI 상태 컴포넌트 (로딩/에러/빈결과)
- [ ] TrademarkList 개선
- [ ] TrademarkListItem 개선

### Phase 5: 즐겨찾기
- [ ] 즐겨찾기 유틸리티
- [ ] 즐겨찾기 필터 적용

### Phase 6: 상세 정보
- [ ] BottomSheet 국가별 스키마 처리

### Phase 7: 검색 연동
- [ ] SearchInput 검색 기능 연동

### Phase 8: 문서화
- [ ] README.md 작성

---

## ⚠️ 주의사항

1. **등록 상태 매핑**: 한국과 미국의 상태 값이 다르므로 정확한 매핑 필요
2. **날짜 형식**: YYYYMMDD 형식으로 통일하여 비교
3. **검색 모드**: name 모드일 때는 query 사용, number 모드일 때는 applicationNumber 사용
4. **성능**: 대량 데이터 필터링 시 메모이제이션 고려
5. **타입 안정성**: 모든 데이터 변환 시 타입 체크

---

## 🎨 UI/UX 개선사항

1. **로딩 상태**: 스켈레톤 UI 또는 스피너
2. **에러 상태**: 사용자 친화적인 에러 메시지
3. **빈 결과**: 검색 결과가 없을 때 안내 메시지
4. **즐겨찾기**: 하트 아이콘으로 직관적 표시
5. **반응형**: 이미 구현되어 있으나 추가 검증 필요

---

이 계획서로 진행해도 될지 검토 부탁드립니다! 🙏

