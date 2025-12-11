import { http, HttpResponse } from 'msw'

export const handlers = [
    http.get('/food', () => {
        return HttpResponse.text('food is good')
    }),
]
