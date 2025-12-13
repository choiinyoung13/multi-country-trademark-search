# MarkCloud - 다국가 상표 검색 서비스

마크클라우드 프론트엔드 개발자 채용 과제로 제작된 다국가 상표 검색 SPA입니다.

<br/>

## ✔ 프로젝트 실행 방법

### 요구사항

- Node.js 18.x 이상
- npm 또는 yarn
- node_modules 폴더는 제거한 상태로 첨부하였으니, 프로젝트 확인 시 의존성 설치(npm install)부터 진행해 주시기 바랍니다.

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

<br/>

## 📋 주요 기능

### 1. 다국가 상표 검색

- 🇰🇷 한국 / 🇺🇸 미국 상표 데이터 통합 검색
- 국가별 탭 전환으로 손쉬운 데이터 필터링

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

<br/>

## 📁 컴포넌트 구조 설명

```
src/
├── components/          # 재사용 가능한 공통 컴포넌트
├── pages/              # 페이지 단위 컴포넌트
│   └── SearchPage/     # 검색 페이지 (components, hooks 포함)
├── stores/             # Zustand 전역 상태 관리
├── services/           # API 호출 로직
├── mocks/              # MSW 모킹 설정 및 데이터
├── types/              # TypeScript 타입 정의
└── utils/              # 공통 유틸리티 함수
```

**구조 설계 원칙:**

- **컴포넌트 분리**: 공통 컴포넌트(`components/`)와 페이지 전용 컴포넌트(`pages/SearchPage/components/`) 분리
- **Custom Hook 활용**: 비즈니스 로직과 UI를 분리하여 재사용성과 테스트 용이성 확보
- **상태 관리 계층화**: 클라이언트 상태(Zustand)와 서버 상태(React Query) 명확히 분리
- **타입 안정성**: 모든 데이터 구조에 대한 TypeScript 타입 정의로 런타임 에러 방지

<br/>

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

### API 모킹

- **MSW (Mock Service Worker)** - Service Worker 기반 API 모킹

<br/>

## 💡 주요 기술적 의사결정

### 1. 상태 관리: Zustand + React Query 조합

**선택 이유:**

#### Zustand (클라이언트 상태)

- **프로젝트 규모에 적합**: 필터/뷰 설정 같은 단순한 전역 상태 관리에 최적화
- **성능**: 필요한 컴포넌트만 리렌더링되는 효율적인 구독 메커니즘

**사용 위치:**

- `filterStore`: 검색 필터 상태 (국가, 날짜 범위, 입력값, 입력 모드)
- `viewSettingStore`: 뷰 설정 상태 (등록 상태 필터, 정렬 옵션)

**store를 분리한 이유:**

프로젝트 규모가 커질 경우, 검색 조건은 클라이언트 상태가 아니라 서버 쿼리 파라미터로 관리하는 것이 더 적절하다고 판단했습니다.
그래서 데이터 조회에 직접 영향을 주는 검색 필터 상태(filterStore) 와,
순수하게 화면 표현에만 영향을 주는 뷰 설정 상태(viewSettingStore) 를 분리했습니다.
이렇게 하면 이후 서버 사이드 필터링으로 전환할 때 구조 변경을 최소화할 수 있습니다.

#### React Query (서버 상태)

- **자동 캐싱**: 동일한 검색 조건에 대한 불필요한 API 호출 방지
- **로딩/에러 상태 자동 관리**: 코드 간소화 및 사용자 경험 향상
- **자동 재요청**: 필터 변경 시 쿼리 키 기반 자동 재요청
- **서버/클라이언트 상태 분리**: 서버에서 가져온 데이터를 서버 상태로 분리 관리 유지보수성 향상

**구현 방식:**

```typescript
// useTrademarksQuery 훅에서 filterStore와 viewSettingStore 구독
// 쿼리 키에 모든 필터 조건 포함하여 변경 시 자동 재요청
const queryKey = ['trademarks', selectedCountry, inputValue, dateRange, ...]
```

<br/>

### 2. API 모킹: MSW (Mock Service Worker)

**선택 이유:**

- **실제 HTTP 요청 인터셉트**: Service Worker를 사용해 네트워크 레벨에서 요청을 가로채므로 실제 API와 동일한 방식으로 개발 가능
- **로딩 상태 테스트**: `delay()` 함수로 네트워크 지연을 시뮬레이션하여 로딩 UI를 자연스럽게 확인 가능
- **코드 변경 최소화**: 실제 백엔드 API로 전환 시 엔드포인트만 변경하면 되므로 마이그레이션이 쉬움
- **개발 환경 독립성**: 백엔드 API 없이도 독립적으로 프론트엔드 개발 가능

**구현 방식:**

```typescript
// handlers.ts - API 엔드포인트 정의
export const handlers = [
  http.get('/api/trademarks/kr', async () => {
    await delay(1000) // 로딩 상태 확인을 위한 1초 딜레이
    return HttpResponse.json(krData)
  }),
]

// trademarkApi.ts - 실제 API 호출과 동일한 방식
export async function fetchKrTrademarks(): Promise<KrTrademark[]> {
  const response = await fetch('/api/trademarks/kr')
  return response.json()
}
```

<br/>

### 3. 다국가 데이터 처리: StandardTrademark 인터페이스

**설계 의도:**

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

<br/>

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

<br/>

## 🤔 문제 해결 과정에서 고민했던 점

**문제:**

한국과 미국의 원본 데이터 구조가 달라서 하나의 UI로 처리하기 어려움:

```typescript
// 한국 데이터
{
  productName: "프레스카",           // 한글 상표명
  productNameEng: "FRESCA",         // 영문 상표명 (별도 필드)
  registerStatus: "등록",            // 한글 상태
  publicationNumber: "4019970001364", // 공고번호 존재
  asignProductSubCodeList: [...]    // 한국식 상품분류
}

// 미국 데이터
{
  productName: "FRESCA",             // 영문만 (한글 없음)
  registerStatus: "LIVE",            // 영문 상태
  publicationDate: "20120101",       // 공고번호 없고 날짜만
  usClassCodeList: [...]             // 미국식 상품분류
}
```

**해결 1: 표준 인터페이스 정의**

공통 필드만 추출한 `StandardTrademark` 인터페이스 설계:

```typescript
type StandardTrademark = {
  countryCode: 'KR' | 'US' // 국가 구분
  id: string // 고유 ID
  trademarkName: string // 표준화된 상표명
  applicationNumber: string // 출원번호
  applicationDate: string // 출원일
  status: string // 표준화된 상태
  detailData: KrTrademark | UsTrademark // ⭐ 원본 데이터 전체 보관
}
```

**해결 2: 데이터 변환 함수**

국가별 원본 데이터를 표준 형식으로 변환:

```typescript
// 한국 데이터 → 표준 형식
export function transformKrToStandard(krData: KrTrademark): StandardTrademark {
  return {
    countryCode: 'KR',
    id: krData.applicationNumber,
    trademarkName: krData.productName || krData.productNameEng || '',
    applicationNumber: krData.applicationNumber,
    applicationDate: krData.applicationDate,
    status: normalizeKrStatus(krData.registerStatus), // 상태 정규화
    detailData: krData, // ⭐ 원본 데이터 보관
  }
}

// 한국 상태 정규화: "등록" → "REGISTERED"
function normalizeKrStatus(status: string): string {
  const statusMap = {
    등록: 'REGISTERED',
    거절: 'REJECTED',
    실효: 'EXPIRED',
  }
  return statusMap[status] || status.toUpperCase()
}

// 미국 상태 정규화: "LIVE" → "REGISTERED"
function normalizeUsStatus(status: string): string {
  const statusMap = {
    LIVE: 'REGISTERED',
    DEAD: 'EXPIRED',
  }
  return statusMap[status] || status.toUpperCase()
}
```

**참고: 상태 정규화의 활용**

현재는 국가별 탭이 분리되어 있어 원본 상태값을 그대로 사용하지만, `status` 필드는 **향후 확장성**을 위해 포함되었습니다:

```typescript
// 🔮 미래 확장 시나리오 1: 전체 국가 통합 검색
// "등록 상태만 보기" 필터 → 한국 "등록" + 미국 "LIVE" 모두 표시
const registeredTrademarks = allTrademarks.filter(
  tm => tm.status === 'REGISTERED'
)

// 🔮 미래 확장 시나리오 2: 국가 간 상태 비교
// 같은 상표가 한국과 미국에서 어떤 상태인지 비교
const compareStatus = (krTrademark, usTrademark) => {
  return krTrademark.status === usTrademark.status // 둘 다 "REGISTERED"
}

// 🔮 미래 확장 시나리오 3: 다국어 UI
// 사용자 언어에 관계없이 통일된 필터링
if (userLanguage === 'en') {
  showStatus(trademark.status) // "REGISTERED"
} else if (userLanguage === 'ko') {
  showStatus(getLocalizedStatus(trademark)) // "등록"
}
```

**해결 3: UI에서 국가별 데이터 접근**

공통 필드는 직접 사용, 국가별 특수 필드는 `detailData`에서 접근:

```typescript
function TrademarkListItem({ trademark }: { trademark: StandardTrademark }) {
  // ✅ 공통 필드는 바로 사용 (모든 국가 동일)
  const { trademarkName, applicationNumber, applicationDate } = trademark

  // ✅ 국가별 특수 필드는 detailData + 타입 단언(as)으로 접근
  if (trademark.countryCode === 'KR') {
    const krData = trademark.detailData as KrTrademark

    return (
      <div>
        <h3>
          {krData.productName} ({krData.productNameEng})
        </h3>{' '}
        {/* 한글+영문 */}
        <p>공고번호: {krData.publicationNumber}</p> {/* 한국 전용 */}
      </div>
    )
  } else {
    const usData = trademark.detailData as UsTrademark

    return (
      <div>
        <h3>{usData.productName}</h3> {/* 영문만 */}
        <p>클래스: {usData.usClassCodeList?.join(', ')}</p> {/* 미국 전용 */}
      </div>
    )
  }
}
```

**해결 4: 원본 상태값 표시**

UI에서는 정규화된 상태가 아닌 원본 상태를 표시:

```typescript
// 원본 상태값 가져오기
const getOriginalStatus = (trademark: StandardTrademark): string => {
  if (trademark.countryCode === 'KR') {
    return (trademark.detailData as KrTrademark).registerStatus // "등록"
  } else {
    return (trademark.detailData as UsTrademark).registerStatus // "LIVE"
  }
}

// 상태에 따른 색상 적용
const statusColor = getStatusColor(originalStatus, trademark.countryCode)
```

<br/>

### 2. 즐겨찾기 상태 동기화: 로컬 상태와 서버 캐시 분리 문제 해결

**문제:**

즐겨찾기 상태는 서버에서 관리하지 않고 localStorage에만 저장하고 있었기 때문에,
즐겨찾기 버튼 클릭 후 invalidateQueries(['trademarks'])를 호출해도
서버에서 내려오는 상표 데이터(JSON)는 변경되지 않음

이로 인해 React Query의 refetch 결과가 이전 데이터와 동일하게 유지되었고,
structural sharing에 의해 캐시 참조가 변경되지 않아
상표 리스트 컴포넌트가 재렌더링되지 않는 문제가 발생

**해결:**

서버 데이터를 다시 요청하는 방식 대신,
React Query의 setQueriesData를 사용해 클라이언트 캐시에 저장된 데이터를 직접 수정하도록 변경

즐겨찾기 버튼 클릭 시 localStorage에 즐겨찾기 상태를 저장하고
React Query 캐시에 저장된 상표 목록 중 해당 아이템만 업데이트하여
캐시 참조를 변경함으로써 구독 중인 리스트 컴포넌트가 즉시 재렌더링되도록 처리

이 방식은 서버 요청 없이도 UI를 즉시 동기화할 수 있으며,
고정된 JSON 데이터를 사용하는 현재 구조에 적합한 해결방법이라고 생각해서 이런 방식으로 해결 했습니다.

<br/>

## 🔧 개선하고 싶은 부분

### 1. 데이터 처리 방식 개선

**현재 방식:**

전체 데이터를 한 번에 로드 후 프론트엔드에서 필터링 수행:

```typescript
// 1. JSON 파일에서 전체 데이터 로드 (~1,500건)
rawData = await fetchKrTrademarks()

// 2. 프론트엔드에서 필터링
filteredData = filterKrTrademarks(rawData, {
  query: searchTerm,
  status: selectedStatus,
  startDate: startDate,
  endDate: endDate,
})

// 3. 변환 및 정렬
const standardData = filteredData.map(transformKrToStandard)
const sortedData = sortTrademarks(standardData, sortOption)
```

- 데이터 규모가 작아서 현재는 문제없지만 확장성 제한
- 매번 전체 데이터를 로드해야 함

**개선 방안:**

서버 사이드 API로 전환하여 필터링된 결과만 받기:

```typescript
// API: /api/trademarks?country=KR&search=apple&status=등록&startDate=20200101
// 서버에서 이미 필터링된 결과만 받음
const filteredData = await fetch('/api/trademarks', { params })

// 프론트엔드에서는 정렬과 UI 표시에만 집중
const sortedData = sortTrademarks(filteredData, sortOption)
```

**장점:**

- 대용량 데이터(10,000건 이상) 대응 가능
- 네트워크 전송량 감소
- 초기 로딩 속도 향상
- 서버 사이드 페이지네이션 구현 가능

**구체적 계획:**

- 필터링: 국가, 검색어, 등록 상태 → 서버 처리
- 정렬: 출원일순, 즐겨찾기 우선 → 클라이언트 처리
- 캐싱: React Query로 검색 조건별 캐시 관리
