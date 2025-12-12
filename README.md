# MarkCloud - 다국가 상표 검색 서비스

마크클라우드 프론트엔드 개발자 채용 과제로 제작된 다국가 상표 검색 SPA입니다.

## 🚀 프로젝트 실행 방법

### 요구사항

- Node.js 18.x 이상
- npm 또는 yarn

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

개발 서버는 기본적으로 `http://localhost:5173`에서 실행됩니다.

## 📋 주요 기능

### 1. 다국가 상표 검색

- 🇰🇷 한국 / 🇺🇸 미국 상표 데이터 통합 검색
- 국가별 탭 전환으로 손쉬운 데이터 필터링
- 실시간 검색 결과 반영

### 2. 다양한 검색 조건

- **상표명 검색**: 한글, 영문 상표명으로 검색
- **출원번호 검색**: 정확한 출원번호로 검색
- **등록 상태 필터**: 등록/실효/거절/출원 등 상태별 필터링
- **출원일 기간 검색**: 시작일~종료일 범위로 필터링
- **복합 검색**: 여러 조건을 조합한 검색 지원

### 3. 정렬 및 뷰 옵션

- 출원일 기준 오름차순/내림차순 정렬
- 즐겨찾기한 상표 우선 정렬
- 즐겨찾기 전용 뷰 제공

### 4. 상세 정보 보기

- BottomSheet 방식의 모달로 상세 정보 표시
- 아코디언 형태로 정보 구조화
  - 기본 정보 (출원번호, 출원일, 공고 정보)
  - 등록 정보 (등록번호, 등록일, 국제등록 정보)
  - 우선권 주장 정보
  - 지정상품 정보 (상품분류 코드)
  - 기타 정보 (비엔나 코드)

### 5. 즐겨찾기 기능

- LocalStorage 기반 즐겨찾기 관리
- 국가별, 출원번호별 고유 식별
- 즐겨찾기 상태 실시간 동기화

### 6. 무한 스크롤

- 초기 15개 항목 표시 후 스크롤 시 자동 로드
- 부드러운 스크롤 경험
- 로딩 인디케이터 제공

### 7. 반응형 디자인

- 모바일(360px~) / 태블릿 / 데스크톱 완벽 지원
- 각 화면 크기에 최적화된 레이아웃
- 터치 친화적인 UI 요소

## 📁 프로젝트 구조

```
src/
├── components/          # 공통 컴포넌트
│   ├── BottomSheet.tsx           # 모달 바텀시트
│   ├── EmptyState.tsx            # 빈 결과 상태
│   ├── ErrorMessage.tsx          # 에러 메시지
│   └── NavigationBar.tsx         # 하단 네비게이션
│
├── pages/              # 페이지 컴포넌트
│   ├── SearchPage/              # 검색 페이지
│   │   ├── components/
│   │   │   ├── CountrySelector.tsx      # 국가 선택 탭
│   │   │   ├── SearchInput.tsx          # 검색 입력
│   │   │   ├── FilterBar.tsx            # 필터 바
│   │   │   ├── ViewSettings.tsx         # 뷰 설정 (정렬/상태)
│   │   │   ├── TrademarkList.tsx        # 상표 리스트
│   │   │   ├── TrademarkListItem.tsx    # 상표 항목
│   │   │   └── TrademarkListItemSkeleton.tsx  # 스켈레톤 UI
│   │   ├── hooks/
│   │   │   └── useDetailTramdemarkBottomSheet.tsx  # 상세 모달 훅
│   │   └── SearchPage.tsx
│   ├── PageLayout.tsx           # 페이지 레이아웃
│   └── Routes.tsx               # 라우팅 설정
│
├── hooks/              # 커스텀 훅
│   └── useTrademarksQuery.ts    # 상표 데이터 쿼리 훅
│
├── stores/             # 전역 상태 관리
│   ├── filterStore.ts           # 검색 필터 상태
│   └── viewSettingStore.ts      # 뷰 설정 상태
│
├── services/           # API 서비스
│   └── trademarkApi.ts          # 상표 API
│
├── mocks/              # 목 데이터
│   ├── data/                    # JSON 파일
│   └── utils/
│       └── trademark.ts         # 데이터 변환 유틸
│
├── types/              # TypeScript 타입 정의
│   └── trademark.ts             # 상표 타입
│
└── utils/              # 유틸리티 함수
    └── favorites.ts             # 즐겨찾기 관리

```

## 🛠 기술 스택

### Core

- **React 18** - UI 라이브러리
- **TypeScript** - 타입 안정성
- **Vite** - 빠른 개발 환경

### 상태 관리

- **Zustand** - 클라이언트 상태 관리
- **TanStack Query (React Query)** - 서버 상태 관리

### 스타일링

- **Tailwind CSS** - 유틸리티 퍼스트 CSS 프레임워크
- **clsx** - 조건부 클래스 관리

### 라우팅

- **React Router v6** - SPA 라우팅

## 💡 주요 기술적 의사결정

### 1. 상태 관리: Zustand + React Query 조합

**선택 이유:**

#### Zustand (클라이언트 상태)

- **가벼움과 단순함**: Redux에 비해 보일러플레이트가 적고 학습 곡선이 낮음
- **TypeScript 지원**: 타입 안정성이 우수하여 개발 경험 향상
- **프로젝트 규모에 적합**: 필터/뷰 설정 같은 단순한 전역 상태 관리에 최적화
- **성능**: 필요한 컴포넌트만 리렌더링되는 효율적인 구독 메커니즘

**사용 위치:**

- `filterStore`: 검색 필터 상태 (국가, 날짜 범위, 입력값, 입력 모드)
- `viewSettingStore`: 뷰 설정 상태 (등록 상태 필터, 정렬 옵션)

#### React Query (서버 상태)

- **자동 캐싱**: 동일한 검색 조건에 대한 불필요한 API 호출 방지
- **로딩/에러 상태 자동 관리**: 코드 간소화 및 사용자 경험 향상
- **자동 재요청**: 필터 변경 시 쿼리 키 기반 자동 재요청
- **서버/클라이언트 상태 분리**: 명확한 관심사 분리로 유지보수성 향상

**구현 방식:**

```typescript
// useTrademarksQuery 훅에서 filterStore와 viewSettingStore 구독
// 쿼리 키에 모든 필터 조건 포함하여 변경 시 자동 재요청
const queryKey = ['trademarks', selectedCountry, inputValue, dateRange, ...]
```

### 2. 다국가 데이터 처리: StandardTrademark 인터페이스

**설계 철학:**

한국과 미국의 상표 데이터 스키마가 다르지만, 프론트엔드에서는 일관된 인터페이스로 처리하여 코드 재사용성을 극대화했습니다.

**구현 전략:**

#### (1) 표준 인터페이스 정의

```typescript
type StandardTrademark = {
  countryCode: 'KR' | 'US' // 국가 구분
  id: string // 고유 ID
  trademarkName: string // 표준화된 상표명
  applicationNumber: string // 출원번호
  applicationDate: string // 출원일
  status: string // 표준화된 상태
  detailData: KrTrademark | UsTrademark // 원본 데이터 보관
}
```

#### (2) 데이터 변환 함수

- `transformKrToStandard()`: 한국 데이터 → 표준 형식
- `transformUsToStandard()`: 미국 데이터 → 표준 형식
- 국가별 등록 상태를 표준 형식으로 정규화
  - 한국: "등록" → "registered", "실효" → "expired"
  - 미국: "LIVE" → "registered", "DEAD" → "expired"

#### (3) UI에서의 처리

- **공통 필드**: `trademarkName`, `applicationNumber` 등은 직접 사용
- **국가별 상이 필드**: `detailData`를 타입 가드로 접근
  ```typescript
  if (trademark.countryCode === 'KR') {
    const krData = trademark.detailData as KrTrademark
    // 한국 전용 필드 사용 (productNameEng, publicationNumber 등)
  }
  ```

**장점:**

- 공통 컴포넌트 재사용 가능 (TrademarkList, TrademarkListItem)
- 새로운 국가 추가 시 변환 함수만 작성하면 됨
- 타입 안정성 확보로 런타임 에러 방지

### 3. 공통 컴포넌트 설계

**확장 가능한 구조:**

#### (1) 컴포넌트 계층 구조

```
SearchPage (페이지)
  ├─ CountrySelector (국가 전환)
  ├─ SearchInput (검색)
  ├─ FilterBar (날짜 필터)
  ├─ ViewSettings (정렬/상태)
  └─ TrademarkList (리스트)
       └─ TrademarkListItem (항목)
            └─ DetailBottomSheet (상세)
```

#### (2) 재사용 가능한 공통 컴포넌트

- **BottomSheet**: 모달 컨테이너 (다른 용도로도 활용 가능)
- **EmptyState**: 빈 결과 상태 표시
- **ErrorMessage**: 에러 메시지 표시
- **NavigationBar**: 하단 네비게이션

#### (3) 확장성 고려

```typescript
// 국가 추가 시 필요한 작업:
// 1. 타입 정의에 국가 코드 추가
type CountryCode = 'KR' | 'US' | 'JP' | 'CN' // 일본, 중국 추가 예시

// 2. 변환 함수 작성
export function transformJpToStandard(jpData: JpTrademark): StandardTrademark

// 3. API 서비스에 fetch 함수 추가
export async function fetchJpTrademarks(): Promise<JpTrademark[]>

// 4. UI 컴포넌트는 수정 불필요 (StandardTrademark 인터페이스 사용)
```

### 4. 반응형 디자인

**Mobile-First 접근:**

- 기본 모바일 레이아웃 작성 후 큰 화면으로 확장
- Tailwind의 브레이크포인트 활용
  ```
  min-[360px]:  - 작은 모바일
  min-[480px]:  - 중간 모바일
  sm: (640px)   - 큰 모바일/작은 태블릿
  md: (768px)   - 태블릿
  lg: (1024px)  - 데스크톱
  ```

**터치 친화적 디자인:**

- 충분한 터치 영역 (최소 44x44px)
- 스와이프 가능한 BottomSheet
- 호버 대신 탭 인터랙션 중심

## 🤔 문제 해결 과정에서 고민했던 점

### 1. 한국/미국 데이터 스키마 차이 처리

**문제:**

- 한국은 한글/영문 상표명이 분리, 미국은 영문만
- 한국은 공고번호 존재, 미국은 null
- 상품분류 코드 구조 차이

**해결:**

- StandardTrademark 인터페이스로 공통 필드 추출
- `detailData`에 원본 데이터 보관하여 국가별 특수 필드 접근
- UI에서 조건부 렌더링으로 국가별 차이 처리
- 타입 가드로 타입 안정성 확보

### 2. 검색 조건에 따른 데이터 필터링

**문제:**

- 상표명/출원번호 두 가지 검색 모드
- 여러 필터 조건의 조합
- 검색 입력 시마다 API 호출하면 비효율적

**해결:**

- React Query의 쿼리 키에 모든 필터 조건 포함
- 조건 변경 시 자동 재요청 및 캐싱
- 프론트엔드에서 필터링 수행 (현재 데이터 규모 적합)
  ```typescript
  // 쿼리 키에 의존성 명시
  queryKey: ['trademarks', country, input, dateRange, status, ...]
  ```

### 3. 즐겨찾기 상태 동기화

**문제:**

- LocalStorage 변경이 React 상태에 반영되지 않음
- 여러 컴포넌트에서 즐겨찾기 상태 공유 필요

**해결:**

- 즐겨찾기 토글 시 React Query 캐시 무효화
  ```typescript
  toggleFavorite(countryCode, applicationNumber)
  queryClient.invalidateQueries({ queryKey: ['trademarks'] })
  ```
- 컴포넌트마다 useEffect로 상태 동기화

### 4. 무한 스크롤 성능 최적화

**문제:**

- 1,500개 전체 항목을 한 번에 렌더링하면 성능 저하

**해결:**

- 초기 15개 항목만 렌더링
- 스크롤 하단 근접 시 15개씩 추가 로드
- `isLoadingMoreRef`로 중복 로드 방지
- 검색 조건 변경 시 자동으로 상단으로 스크롤 및 초기화

### 5. 날짜 형식 처리

**문제:**

- 서버 데이터는 "YYYYMMDD" 형식
- 사용자에게는 "YYYY.MM.DD" 형식으로 표시

**해결:**

- `formatDate()` 유틸 함수로 일관된 변환
- 날짜 필터는 ISO 형식 사용하여 비교 용이

## 🔧 개선하고 싶은 부분

### 1. 데이터 처리 방식 개선

**현재 방식:**

- 전체 데이터(~1,500건)를 한 번에 불러온 후 프론트엔드에서 필터링, 정렬, 검색 처리
- 데이터 규모가 작아서 현재는 문제없지만 확장성 제한

**개선 방안:**

```typescript
// 현재: 클라이언트 사이드 필터링
const filteredData = allData
  .filter(item => item.country === selectedCountry)
  .filter(item => item.name.includes(searchTerm))
  .filter(item => item.status === selectedStatus)
  .sort(...)

// 개선: 서버 사이드 필터링 + 클라이언트 정렬
// API: /api/trademarks?country=KR&search=apple&status=registered
// 서버에서 필터링된 결과만 받아서 프론트에서 정렬만 처리
```

**장점:**

- 대용량 데이터(10,000건 이상) 대응 가능
- 네트워크 전송량 감소
- 초기 로딩 속도 향상
- 서버 사이드 페이지네이션 구현 가능

**구현 계획:**

- 필터링: 국가, 검색어, 등록 상태 → 서버 처리
- 정렬: 출원일순, 즐겨찾기 우선 → 클라이언트 처리
- 캐싱: React Query로 검색 조건별 캐시 관리

### 2. 가상 스크롤 도입

**문제:**

- 무한 스크롤로 수천 개 항목 렌더링 시 DOM 노드 증가로 성능 저하

**개선:**

- `react-window` 또는 `react-virtual` 라이브러리 사용
- 화면에 보이는 항목만 렌더링하여 성능 최적화

### 3. 검색 성능 개선

**현재:**

- 입력 즉시 필터링 수행

**개선:**

- Debounce 적용하여 입력 중 불필요한 연산 방지
- Web Worker로 필터링 로직 오프로드

### 4. 접근성(a11y) 향상

**개선 사항:**

- ARIA 레이블 추가
- 키보드 네비게이션 개선
- 스크린 리더 지원 강화
- 고대비 모드 지원

### 5. 테스트 코드 작성

**현재 상태:**

- 테스트 코드 미작성

**개선:**

- 단위 테스트: 유틸 함수, 커스텀 훅
- 통합 테스트: 검색 플로우, 필터링 로직
- E2E 테스트: 주요 사용자 시나리오

### 6. 상태 URL 동기화

**개선:**

- 검색 조건을 URL 쿼리 파라미터에 저장
- 뒤로가기/앞으로가기 지원
- 검색 결과 URL 공유 가능

## 📝 기타 고려사항

### 코드 품질

- **TypeScript 엄격 모드**: 타입 안정성 최대화
- **일관된 네이밍**: camelCase, PascalCase 규칙 준수
- **컴포넌트 분리**: 단일 책임 원칙 적용
- **주석**: 복잡한 로직에 명확한 주석 작성

### 사용자 경험

- **즉각적인 피드백**: 로딩, 에러, 성공 상태 표시
- **자연스러운 애니메이션**: 부드러운 전환 효과
- **직관적인 UI**: 최소한의 학습으로 사용 가능
- **모바일 최적화**: 터치 인터랙션 중심 설계

---

**제작자**: [Your Name]  
**제작 기간**: 2025.12.08 - 2025.12.13  
**문의**: jmhwang@markcloud.co.kr
