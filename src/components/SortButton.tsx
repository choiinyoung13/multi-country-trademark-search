interface SortButtonProps {
  label: string
  active: boolean
  onClick: () => void
  flex?: boolean
  className?: string
}

export function SortButton({
  label,
  active,
  onClick,

  className = '',
}: SortButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
       flex-1 px-2 min-[390px]:px-4 py-2.5 text-sm min-[390px]:text-base font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
         active ? 'bg-white' : 'bg-[#f2f4f6] text-gray-500 hover:bg-white'
       } ${className}`}
    >
      {label}
    </button>
  )
}
