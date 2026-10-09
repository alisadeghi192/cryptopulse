import { Link } from 'react-router'
import { TrendingUp, TrendingDown, Star } from 'lucide-react'
import { NumberTicker } from '@/components/ui/NumberTicker'
import { PriceChart } from '@/components/ui/PriceChart'
import { SpotlightCard } from '@/components/ui/SpotlightCard'
import { TiltCard } from '@/components/ui/TiltCard'
import { BorderBeam } from '@/components/ui/BorderBeam'
import { cn } from '@/utils/cn'
import type { Coin } from '@/types/coin'

interface CoinCardProps {
  coin: Coin
  size?: 'compact' | 'default'
}

export function CoinCard({ coin, size = 'default' }: CoinCardProps) {
  const isCompact = size === 'compact'
  const change = coin.price_change_percentage_24h ?? 0
  const isPositive = change >= 0
  const price = coin.current_price

  // Real sparkline from /coins/markets (sparkline_in_7d.price)
  const sparklineData = coin.sparkline_in_7d?.price ?? []
  const chartData = sparklineData.map((value, i) => ({
    time: i as any,
    value,
  }))

  const spotlightColor = isPositive
    ? 'rgba(34, 197, 94, 0.12)'
    : 'rgba(239, 68, 68, 0.12)'

  const padding = isCompact ? 'p-4' : 'p-5'
  const logoSize = isCompact ? 'h-9 w-9' : 'h-10 w-10'
  const priceSize = isCompact ? 'text-lg' : 'text-2xl'
  const sparkHeight = isCompact ? 40 : 56

  return (
    <Link to={`/coin/${coin.id}`}>
      <TiltCard maxTilt={4} className="h-full">
        <BorderBeam thickness={1.5} duration={8} className="rounded-2xl">
          <SpotlightCard
            spotlightColor={spotlightColor}
            className={cn(
              'group border-border bg-surface/40 relative h-full overflow-hidden rounded-2xl border backdrop-blur-xl',
              'transition-colors hover:border-border',
            )}
          >
            <div className={cn('relative z-10', padding)}>
              {/* Header */}
              <div
                className={cn(
                  'flex items-start justify-between',
                  isCompact ? 'mb-3' : 'mb-4',
                )}
              >
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

              {/* Coin */}
              <div
                className={cn(
                  'flex items-center gap-3',
                  isCompact ? 'mb-3' : 'mb-4',
                )}
              >
                <div className="relative shrink-0">
                  <div className="bg-primary/20 absolute inset-0 rounded-full blur-md" />
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className={cn('relative rounded-full', logoSize)}
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

              {/* Price */}
              <p
                className={cn(
                  'text-text font-mono font-bold tabular-nums',
                  priceSize,
                )}
              >
                $
                <NumberTicker value={price} decimals={price < 1 ? 4 : 2} />
              </p>

              {/* Change */}
              <div className="mt-1 flex items-center gap-2">
                <span
                  className={cn(
                    'flex items-center gap-1 rounded-md px-1.5 py-0.5 font-mono text-[10px] font-medium',
                    isPositive
                      ? 'bg-success/10 text-success'
                      : 'bg-error/10 text-error',
                  )}
                >
                  {isPositive ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {isPositive ? '+' : ''}
                  {change.toFixed(2)}%
                </span>
                <span
                  className={cn(
                    'font-mono text-[10px]',
                    isPositive ? 'text-success' : 'text-error',
                  )}
                >
                  {isPositive ? '+' : ''}$
                  {Math.abs((price * change) / 100).toLocaleString('en-US', {
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>

              {/* Sparkline — real data */}
              {chartData.length > 1 && (
                <div
                  className={cn('mt-3 w-full', isCompact ? 'h-10' : 'h-14')}
                >
                  <PriceChart
                    data={chartData}
                    isPositive={isPositive}
                    height={sparkHeight}
                    variant="sparkline"
                  />
                </div>
              )}

              {/* Footer */}
              <div
                className={cn(
                  'border-border/40 flex items-center justify-between border-t font-mono text-[10px]',
                  isCompact ? 'mt-2 pt-2' : 'mt-3 pt-3',
                )}
              >
                <div>
                  <p className="text-text-secondary">MCap</p>
                  <p className="text-text font-medium">
                    ${(coin.market_cap / 1_000_000_000).toFixed(2)}B
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-text-secondary">24h Vol</p>
                  <p className="text-text font-medium">
                    ${(coin.total_volume / 1_000_000_000).toFixed(2)}B
                  </p>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </BorderBeam>
      </TiltCard>
    </Link>
  )
}   