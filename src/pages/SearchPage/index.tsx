import { KR } from 'country-flag-icons/react/3x2'
import { Button } from '../../components/Button'
import { SearchInput } from '../../components/SearchInput'
import { useViewSettingBottomSheet } from './hooks/useViewSettingBottomSheet.tsx'
import { useDateSettingBottomSheet } from './hooks/useDateSettingBottomSheet.tsx'
import { TrademarkList } from './components/TrademarkList.tsx'

export function SearchPage() {
  const { open: openViewSetting, viewSettingBottomSheet } =
    useViewSettingBottomSheet()

  const { open: openDateSetting, dateSettingBottomSheet } =
    useDateSettingBottomSheet()

  return (
    <section className="bg-gray-50 h-[calc(100vh-60px)]">
      <header className="max-w-[1300px] m-auto flex flex-col items-start justify-center px-[26px] pt-[40px]">
        <h1 className="text-[50px] leading-[1.1] tracking-[-1px] mb-[14px] font-black text-transparent bg-clip-text bg-linear-to-r from-markcloud-blue to-[#15aabf]">
          Discover Trademarks.
        </h1>
        <p className="text-[16px] text-gray-500">
          Discover the latest trademarks{` `}
          <span className="font-bold">in the market.</span>
        </p>
        <div className="flex justify-between items-center w-full mt-[38px]">
          <div className="flex items-center gap-3">
            <div className="hidden min-[360px]:block">
              <Button width="58px" height="44px" shadow>
                <KR
                  title="Korea"
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[42px]"
                />
              </Button>
            </div>
            <div className="hidden min-[725px]:block">
              <Button
                onClick={openDateSetting}
                height="44px"
                pointer
                shadow
                hover
              >
                <div className="flex items-center gap-3 ml-4 mr-5">
                  <svg
                    className="w-4 h-4 min-[390px]:w-5 min-[390px]:h-5 transition-colors text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                  <span className="text-[16.5px] text-gray-500 font-medium tracking-[1.1px] whitespace-nowrap">
                    2025.09.25 - 2026.09.24
                  </span>
                </div>
              </Button>
            </div>
            <SearchInput />
          </div>

          <div className="flex items-center gap-3.5 pl-3">
            <div className="block min-[725px]:hidden">
              <Button onClick={openDateSetting} height="44px" noBg pointer>
                <svg
                  className="w-4 h-4 min-[390px]:w-5 min-[390px]:h-5 transition-colors text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
              </Button>
            </div>

            <Button onClick={openViewSetting} pointer fontSize="15px" noBg>
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 min-[390px]:w-5 min-[390px]:h-5 transition-colors text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                  ></path>
                </svg>
                <span className="hidden lg:block">보기설정</span>
              </div>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-[1300px] m-auto pt-[32px] px-[26px]">
        <TrademarkList />
      </main>
      {viewSettingBottomSheet}
      {dateSettingBottomSheet}
    </section>
  )
}
