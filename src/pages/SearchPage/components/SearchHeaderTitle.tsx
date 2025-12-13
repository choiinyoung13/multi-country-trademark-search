import { useTrademarksQuery } from '../hooks/useTrademarksQuery'

export function SearchHeaderTitle() {
  const { data: trademarks, isLoading } = useTrademarksQuery()

  const count = trademarks?.length || 0
  const displayText = isLoading
    ? '최신 상표 정보를'
    : count > 0
    ? `총 ${count.toLocaleString()}개의 상표가 존재합니다.`
    : '최신 상표 정보를'

  return (
    <>
      <h1 className="text-[28px] min-[360px]:text-[30px] min-[390px]:text-[36px] min-[480px]:text-[42px] min-[640px]:text-[50px] leading-[1.1] tracking-[-1px] mb-2 min-[360px]:mb-2.5 min-[390px]:mb-3 min-[480px]:mb-[14px] font-black text-transparent bg-clip-text bg-linear-to-r from-markcloud-blue to-[#15aabf] whitespace-nowrap">
        상표를 찾아보세요
      </h1>
      <p className="text-xs min-[360px]:text-sm min-[390px]:text-[15px] min-[480px]:text-[16px] text-gray-500 wrap-break-word">
        {count > 0 ? (
          displayText
        ) : (
          <>
            {displayText}
            {` `}
            <span className="font-bold">확인하세요.</span>
          </>
        )}
      </p>
    </>
  )
}
