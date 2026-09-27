import { TrendingUp, TrendingDown, Star } from 'lucide-react'
import { NumberTicker } from '@/components/ui/NumberTicker'
import { SpotlightCard } from '@/components/ui/SpotlightCard'
import { TiltCard } from '@/components/ui/TiltCard'
import { BorderBeam } from '@/components/ui/BorderBeam'
import { cn } from '@/utils/cn'
import type { TrendingCoin } from '@/types/coin'

interface TrendingCoinCardProps {
  coin: TrendingCoin
}

export function TrendingCoinCard({ coin }: TrendingCoinCardProps) {
  const change = coin.item.data.price_change_percentage_24h?.usd ?? 0
  const isPositive = change >= 0
  const price = coin.item.data.price ?? 0
  const priceChange = (price * change) / 100

  const spotlightColor = isPositive
    ? 'rgba(34, 197, 94, 0.12)'
    : 'rgba(239, 68, 68, 0.12)'

  return (
    <TiltCard maxTilt={4} className="h-full">
      <BorderBeam thickness={1.5} duration={8} className="rounded-2xl">
        <SpotlightCard
          spotlightColor={spotlightColor}
          className={cn(
            'group border-border/50 bg-surface/40 relative h-full overflow-hidden rounded-2xl border backdrop-blur-xl',
            'transition-colors hover:border-border',
          )}
        >
          <div className="relative z-10 p-5">
            {/* ─── Header: Rank + Star ─── */}
            <div className="mb-4 flex items-start justify-between">
              <div className="border-border/50 bg-elevated/60 text-text-secondary rounded-md border px-2 py-0.5 font-mono text-[10px]">
                #{coin.item.market_cap_rank}
              </div>
              <button
                className="text-text-secondary hover:text-primary transition-colors"
                aria-label="Add to watchlist"
              >
                <Star className="h-4 w-4" />
              </button>
            </div>

            {/* ─── Coin Info (افقی) ─── */}
            <div className="mb-4 flex items-center gap-3">
              <div className="relative shrink-0">
                <div className="bg-primary/20 absolute inset-0 rounded-full blur-md" />
                <img
                  src={coin.item.large}
                  alt={coin.item.name}
                  className="relative h-10 w-10 rounded-full"
                />
              </div>
              <div className="min-w-0">
                <p className="text-text truncate text-sm font-semibold">
                  {coin.item.name}
                </p>
                <p className="text-text-secondary font-mono text-[10px] uppercase">
                  {coin.item.symbol}
                </p>
              </div>
            </div>

            {/* ─── Price ─── */}
            <p className="text-text font-mono text-2xl font-bold tabular-nums">
              $
              <NumberTicker
                value={price}
                decimals={price < 1 ? 4 : 2}
              />
            </p>

            {/* ─── Change (دلاری + درصدی) ─── */}
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
                {Math.abs(priceChange).toLocaleString('en-US', {
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>

            {/* ─── Sparkline ─── */}
            <div className="mt-4 h-10">
              <svg
                viewBox="0 0 100 40"
                className="h-full w-full"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id={`grad-${coin.item.id}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor={isPositive ? 'var(--color-success)' : 'var(--color-error)'}
                      stopOpacity="0.3"
                    />
                    <stop
                      offset="100%"
                      stopColor={isPositive ? 'var(--color-success)' : 'var(--color-error)'}
                      stopOpacity="0"
                    />
                  </linearGradient>
                </defs>
                <path
                  d="M0,30 L10,28 L20,32 L30,25 L40,27 L50,20 L60,22 L70,15 L80,18 L90,10 L100,12 L100,40 L0,40 Z"
                  fill={`url(#grad-${coin.item.id})`}
                />
                <path
                  d="M0,30 L10,28 L20,32 L30,25 L40,27 L50,20 L60,22 L70,15 L80,18 L90,10 L100,12"
                  fill="none"
                  stroke={isPositive ? 'var(--color-success)' : 'var(--color-error)'}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* ─── Footer: MCap + Volume ─── */}
            <div className="border-border/40 mt-3 flex items-center justify-between border-t pt-3 font-mono text-[10px]">
              <div>
                <p className="text-text-secondary">MCap</p>
                <p className="text-text font-medium">
                  {coin.item.data.market_cap}
                </p>
              </div>
              <div className="text-right">
                <p className="text-text-secondary">24h Vol</p>
                <p className="text-text font-medium">
                  {coin.item.data.total_volume}
                </p>
              </div>
            </div>
          </div>
        </SpotlightCard>
      </BorderBeam>
    </TiltCard>
  )
}