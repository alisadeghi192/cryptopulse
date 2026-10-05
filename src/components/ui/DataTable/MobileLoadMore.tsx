import { useEffect, useRef } from 'react'

interface MobileLoadMoreProps {
  onLoadMore?: () => void
  hasNextPage?: boolean
  isFetchingNextPage?: boolean
}

export function MobileLoadMore({
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
}: MobileLoadMoreProps) {
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel || !onLoadMore || !hasNextPage || isFetchingNextPage) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) onLoadMore()
      },
      { rootMargin: '400px' },
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [onLoadMore, hasNextPage, isFetchingNextPage])

  return (
    <>
      <div ref={sentinelRef} className="h-1" />
      {isFetchingNextPage && (
        <div className="text-text-secondary py-4 text-center font-mono text-xs">
          Loading more...
        </div>
      )}
    </>
  )
}