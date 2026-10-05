import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { Star } from 'lucide-react'
import { BlurFade } from '@/components/ui/BlurFade'
import { FlashValue } from '@/components/ui/FlashValue'
import { MiniSparkline } from '@/components/ui/MiniSparkline'
import { SpotlightCard } from '@/components/ui/SpotlightCard'
import { TiltCard } from '@/components/ui/TiltCard'
import { cn } from '@/utils/cn'
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
            <CoinGridCard coin={coin} />
          </BlurFade>
        ))}
      </div>

      {/* Sentinel */}
      <div ref={sentinelRef} className="h-10" />

      {isFetchingNextPage && (
        <div className="text-text-secondary py-4 text-center font-mono text-xs">
          Loading more...
        </div>
      )}
    </>
  )
}

// ─── Coin Grid Card ───
function CoinGridCard({ coin }: { coin: Coin }) {
  const change24h = coin.price_change_percentage_24h ?? 0
  const isPositive = change24h >= 0
  const sparklineData = coin.sparkline_in_7d?.price ?? []
  const sparklinePositive =
    (coin.price_change_percentage_7d_in_currency ?? 0) >= 0

  const spotlightColor = isPositive
    ? 'rgba(34, 197, 94, 0.10)'
    : 'rgba(239, 68, 68, 0.10)'

  return (
    <TiltCard maxTilt={3} className="h-full">
      <SpotlightCard
        spotlightColor={spotlightColor}
        className="border-border bg-surface hover:border-border-strong h-full overflow-hidden rounded-2xl border shadow-lg transition-colors"
      >
        <Link to={`/coin/${coin.id}`} className="block p-5">
          {/* ─── Header: Rank + Star ─── */}
          <div className="mb-4 flex items-start justify-between">
            <div className="border-border bg-elevated/60 text-text-secondary rounded-md border px-2 py-0.5 font-mono text-[10px]">
              #{coin.market_cap_rank}
            </div>
            <button
              type="button"
              aria-label="Add to watchlist"
              onClick={(e) => e.preventDefault()}
              className="text-text-secondary hover:text-primary transition-colors"
            >
              <Star className="h-4 w-4" />
            </button>
          </div>

          {/* ─── Coin info ─── */}
          <div className="mb-4 flex items-center gap-3">
            <div className="relative shrink-0">
              <div className="bg-primary/20 absolute inset-0 rounded-full blur-md" />
              <img
                src={coin.image}
                alt={coin.name}
                className="relative h-10 w-10 rounded-full"
              />
            </div>
            <div className="min-w-0">
              <p className="text-text truncate text-sm font-semibold">
                {coin.name}
              </p>
              <p className="text-text-secondary font-mono text-[10px] uppercase">
                {coin.symbol}
              </p>
            </div>
          </div>

          {/* ─── Price ─── */}
          <p className="text-text font-mono text-2xl font-bold tabular-nums">
            $
            <FlashValue
              value={coin.current_price}
              decimals={coin.current_price < 1 ? 4 : 2}
            />
          </p>

          {/* ─── Change ─── */}
          <div className="mt-1 flex items-center gap-2">
            <span
              className={cn(
                'rounded-md px-1.5 py-0.5 font-mono text-[10px] font-medium',
                isPositive
                  ? 'bg-success/10 text-success'
                  : 'bg-error/10 text-error',
              )}
            >
              {isPositive ? '+' : ''}
              {change24h.toFixed(2)}%
            </span>
            <span className="text-text-secondary font-mono text-[10px]">
              24h
            </span>
          </div>

          {/* ─── Sparkline ─── */}
          {sparklineData.length > 1 && (
            <div className="mt-4 h-10 w-full">
              <MiniSparkline
                data={sparklineData}
                isPositive={sparklinePositive}
                width={220}
                height={40}
                className="w-full"
              />
            </div>
          )}

          {/* ─── Footer: MCap + Vol ─── */}
          <div className="border-border/40 mt-3 flex items-center justify-between border-t pt-3 font-mono text-[10px]">
            <div>
              <p className="text-text-secondary">MCap</p>
              <p className="text-text font-medium">
                ${(coin.market_cap / 1_000_000_000).toFixed(1)}B
              </p>
            </div>
            <div className="text-right">
              <p className="text-text-secondary">24h Vol</p>
              <p className="text-text font-medium">
                ${(coin.total_volume / 1_000_000_000).toFixed(1)}B
              </p>
            </div>
          </div>
        </Link>
      </SpotlightCard>
    </TiltCard>
  )
}
