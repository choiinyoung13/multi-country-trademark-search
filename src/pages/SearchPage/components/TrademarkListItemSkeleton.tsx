export function TrademarkListItemSkeleton() {
  // 타이틀 너비를 랜덤하게 생성 (40% ~ 60%)
  const titleWidths = [
    'w-[45%]',
    'w-[52%]',
    'w-[38%]',
    'w-[58%]',
    'w-[42%]',
    'w-[55%]',
    'w-[48%]',
    'w-[50%]',
  ]

  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-2 min-[360px]:gap-2.5 min-[480px]:gap-3 pr-2 min-[360px]:pr-3 min-[480px]:pr-4 sm:pr-6 pl-2 min-[360px]:pl-2.5 min-[480px]:pl-3.5 py-2 min-[360px]:py-2.5 min-[480px]:py-3.5 bg-white shadow-[0_4px_15px_rgba(0,0,0,0.07)] rounded-xl"
        >
          {/* 왼쪽: 상태 뱃지 스켈레톤 */}
          <div className="shrink-0">
            <div className="inline-block text-[10px] min-[360px]:text-xs min-[390px]:text-sm font-semibold px-2 min-[360px]:px-2.5 py-0.5 min-[360px]:py-1 rounded-md bg-gray-100 animate-pulse">
              <span className="invisible">등록</span>
            </div>
          </div>

          <div className="flex-1 min-w-0 flex flex-col justify-center gap-0.5">
            {/* 상표명 스켈레톤 - 랜덤 너비 */}
            <div className="flex items-center justify-between gap-1 min-[360px]:gap-1.5 min-[480px]:gap-2 mb-0.5 min-[360px]:mb-1">
              <div
                className={`h-3.5 min-[360px]:h-4 min-[480px]:h-5 ${titleWidths[index]} rounded bg-gray-100 animate-pulse`}
              ></div>
            </div>
            {/* 출원번호/출원일 스켈레톤 */}
            <div className="flex items-center gap-1 min-[360px]:gap-1.5 min-[480px]:gap-2">
              <div className="h-2.5 min-[360px]:h-3 min-[480px]:h-3.5 w-24 min-[360px]:w-32 min-[480px]:w-40 rounded bg-gray-100 animate-pulse"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
