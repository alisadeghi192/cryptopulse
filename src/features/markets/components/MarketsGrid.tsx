import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { LayoutList } from 'lucide-react'
import { BlurFade } from '@/components/ui/BlurFade'
import { buttonVariants } from '@/components/ui/Button'
import { CoinCard } from '@/features/coin/components/CoinCard'
import { cn } from '@/utils/cn'
import type { Coin } from '@/types/coin'

const MAX_GRID_ITEMS = 100

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
  const isAtLimit = coins.length >= MAX_GRID_ITEMS
  const visibleCoins = coins.slice(0, MAX_GRID_ITEMS)

  useEffect(() => {
    if (isAtLimit) return

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
  }, [onLoadMore, hasNextPage, isFetchingNextPage, isAtLimit])

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visibleCoins.map((coin, i) => (
          <BlurFade key={coin.id} delay={0.02 + (i % 8) * 0.02}>
            <CoinCard coin={coin} size="default" />
          </BlurFade>
        ))}
      </div>

      {isAtLimit ? (
        <div className="border-border bg-surface/30 mt-8 flex flex-col items-center gap-4 rounded-2xl border p-6 text-center">
          <div className="border-border bg-elevated/60 text-text-secondary flex size-12 items-center justify-center rounded-xl border">
            <LayoutList className="size-5" />
          </div>

          <div>
            <p className="text-text font-mono text-sm font-medium">
              Showing first {MAX_GRID_ITEMS} coins
            </p>
            <p className="text-text-secondary mt-1 font-mono text-xs">
              Grid view is limited for performance. Switch to table view to
              browse all.
            </p>
          </div>

          <Link
            to="?view=table"
            className={cn(
              buttonVariants({ variant: 'primary', size: 'sm' }),
              'font-mono text-xs',
            )}
          >
            Switch to table view
          </Link>
        </div>
      ) : (
        <div ref={sentinelRef} className="h-10" />
      )}

      {isFetchingNextPage && !isAtLimit && (
        <div className="text-text-secondary py-4 text-center font-mono text-xs">
          Loading more...
        </div>
      )}
    </>
  )
}