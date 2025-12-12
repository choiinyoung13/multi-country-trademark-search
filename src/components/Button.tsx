import clsx from 'clsx'

interface ButtonProps {
  children: React.ReactNode
  width?: string
  height?: string
  fontSize?: string
  border?: boolean
  shadow?: boolean
  hover?: boolean
  pointer?: boolean
  noBg?: boolean
  onClick?: () => void
}

export function Button({
  children,
  width,
  height = '34px',
  fontSize = '16px',
  border = false,
  shadow = false,
  hover = false,
  pointer = false,
  noBg = false,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'rounded-xl',
        'flex items-center justify-center',
        'text-gray-500',
        'overflow-hidden relative',
        'shrink-0',
        'transition-colors duration-200',
        'cursor-default',

        {
          // 조건부 적용된 클래스
          'bg-white': !noBg,
          'bg-transparent': noBg,
          'border border-gray-300': border,
          'shadow-[0_4px_15px_rgba(0,0,0,0.07)]': shadow,
          'cursor-pointer': pointer,
          'hover:bg-gray-100': hover && !noBg,
        }
      )}
      style={{ ...(width && { width }), height, fontSize }}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
