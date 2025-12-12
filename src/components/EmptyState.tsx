interface EmptyStateProps {
  message?: string
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 min-[360px]:py-16 min-[480px]:py-20 px-4">
      <div className="flex flex-col items-center gap-4 max-w-md">
        <div className="text-center">
          <h3 className="text-base min-[360px]:text-lg font-semibold text-gray-900 mb-2">
            {message || '검색 결과가 없습니다'}
          </h3>
          <p className="text-sm min-[360px]:text-base text-gray-500">
            다른 검색어나 필터를 시도해보세요
          </p>
        </div>
      </div>
    </div>
  )
}
