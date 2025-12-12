import { Button } from './Button'

export function NavigationBar() {
  return (
    <header className="w-full h-[50px] min-[360px]:h-[60px] flex justify-center items-center bg-[rgba(255,255,255,0.8)] backdrop-blur-md border-b border-gray-200">
      <div className="max-w-[1300px] w-full m-auto flex justify-between items-center px-3 min-[360px]:px-4 min-[390px]:px-[26px]">
        <h3 className="text-base min-[360px]:text-lg min-[390px]:text-[22px] font-bold">
          MarkCloud
        </h3>

        <div className="flex items-center gap-1.5 min-[725px]:gap-2">
          {/* 390px 미만 */}
          <div className="flex items-center gap-0.5 min-[390px]:hidden">
            <Button width="28px" height="28px" fontSize="12px" noBg pointer>
              <span className="text-xs font-medium">KR</span>
            </Button>
            <Button width="28px" height="28px" fontSize="12px" noBg pointer>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"></path>
              </svg>
            </Button>
          </div>

          {/* 390px 이상 725px 이하 */}
          <div className="hidden min-[390px]:flex min-[725px]:hidden items-center gap-0.5">
            <Button width="32px" height="32px" fontSize="14px" noBg pointer>
              <span className="text-sm font-medium">KR</span>
            </Button>
            <Button width="32px" height="32px" fontSize="14px" noBg pointer>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"></path>
              </svg>
            </Button>
          </div>

          {/* 725px 이상 */}
          <div className="hidden min-[725px]:flex items-center gap-2">
            <Button width="34px" border hover pointer>
              <span className="text-[14px] font-medium">KR</span>
            </Button>
            <Button width="34px" border hover pointer>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"></path>
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
