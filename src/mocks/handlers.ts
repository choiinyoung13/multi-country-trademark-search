import { http, HttpResponse } from 'msw'
import krData from './data/trademarks_kr_trademarks.json'
import usData from './data/trademarks_us_trademarks.json'

export const handlers = [
  // 한국 상표 데이터 API
  http.get('/api/trademarks/kr', () => {
    return HttpResponse.json(krData)
  }),

  // 미국 상표 데이터 API
  http.get('/api/trademarks/us', () => {
    return HttpResponse.json(usData)
  }),

  // 통합 검색 API (선택사항)
  http.get('/api/trademarks', async ({ request }) => {
    const url = new URL(request.url)
    const country = url.searchParams.get('country') || 'KR'

    if (country === 'KR') {
      return HttpResponse.json(krData)
    } else {
      return HttpResponse.json(usData)
    }
  }),
]
