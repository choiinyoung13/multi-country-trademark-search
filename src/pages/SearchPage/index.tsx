import { SearchHeader } from './components/SearchHeader.tsx'
import { TrademarkList } from './components/TrademarkList.tsx'

export function SearchPage() {
  return (
    <section className="bg-gray-50 min-h-[calc(100vh-60px)]">
      <SearchHeader />

      <main className="max-w-[1300px] m-auto pt-[32px] px-[26px]">
        <TrademarkList />
      </main>
    </section>
  )
}
