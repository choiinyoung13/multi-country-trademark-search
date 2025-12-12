import { SearchHeaderTitle } from './SearchHeaderTitle.tsx'
import { SearchHeaderFilters } from './SearchHeaderFilters.tsx'
import { SearchHeaderActions } from './SearchHeaderActions.tsx'

export function SearchHeader() {
  return (
    <>
      <header className="max-w-[1300px] m-auto flex flex-col items-start justify-center px-3 min-[360px]:px-4 min-[390px]:px-5 min-[480px]:px-[26px] pt-6 min-[360px]:pt-8 min-[390px]:pt-10 min-[480px]:pt-[40px]">
        <SearchHeaderTitle />
        <div className="flex flex-col min-[585px]:flex-row min-[585px]:justify-between min-[585px]:items-center w-full mt-4 min-[360px]:mt-6 min-[390px]:mt-8 min-[480px]:mt-[38px] gap-3">
          <SearchHeaderFilters />
          <SearchHeaderActions />
        </div>
      </header>
      \
    </>
  )
}
