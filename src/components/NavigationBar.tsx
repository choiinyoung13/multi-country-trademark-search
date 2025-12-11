import { Button } from './Button'

export function NavigationBar() {
  return (
    <header className="w-full h-[60px] flex justify-center items-center bg-[rgba(255,255,255,0.8)] backdrop-blur-md border-b border-gray-200">
      <div className="max-w-[1300px] w-full m-auto flex justify-between items-center px-[26px]">
        <h3 className="text-[22px] font-bold">MarkCloud</h3>

        <div className="flex items-center gap-2">
          <Button width="34px" border hover pointer>
            <span className="text-[16px] font-medium">KR</span>
          </Button>
          <Button width="34px" border hover pointer>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
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
    </header>
  )
}
