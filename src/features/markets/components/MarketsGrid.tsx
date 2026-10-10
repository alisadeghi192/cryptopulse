import { useEffect, useRef } from 'react'
import { BlurFade } from '@/components/ui/BlurFade'
import { CoinCard } from '@/features/coin/components/CoinCard'
import type { Coin } from '@/types/coin'

interface MarketsGridProps {
  coins: Coin[]
  onLoadMore?: () => void
  hasNextPage?: boolean
  isFetchingNextPage?: boolean
}

export function MarketsGrid({
  coins,
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
}: MarketsGridProps) {
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {coins.map((coin, i) => (
          <BlurFade key={coin.id} delay={0.02 + (i % 8) * 0.02}>
            <CoinCard coin={coin} size="default" />
          </BlurFade>
        ))}
      </div>

      <div ref={sentinelRef} className="h-10" />

      {isFetchingNextPage && (
        <div className="text-text-secondary py-4 text-center font-mono text-xs">
          Loading more...
        </div>
      )}
    </>
  )
}