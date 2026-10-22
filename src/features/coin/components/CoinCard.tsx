import { Link } from 'react-router'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { NumberTicker } from '@/components/ui/NumberTicker'
import { FlashValue } from '@/components/ui/FlashValue'
import { MiniSparkline } from '@/components/ui/MiniSparkline'
import { SpotlightCard } from '@/components/ui/SpotlightCard'
import { TiltCard } from '@/components/ui/TiltCard'
import { BorderBeam } from '@/components/ui/BorderBeam'
import { WatchlistButton } from '@/components/ui/WatchlistButton'
import { cn } from '@/utils/cn'
import type { Coin } from '@/types/coin'

// ─── CVA Variants ───
const coinCardVariants = cva(
  'group border-border bg-surface/40 relative overflow-hidden rounded-2xl border backdrop-blur-xl transition-colors hover:border-border shadow-md',
  {
    variants: {
      size: {
        compact: 'p-4',
        default: 'p-5',
      },
    },
    defaultVariants: { size: 'default' },
  },
)

const headerVariants = cva('flex items-start justify-between', {
  variants: {
    size: { compact: 'mb-3', default: 'mb-4' },
  },
  defaultVariants: { size: 'default' },
})

const coinInfoVariants = cva('flex items-center gap-3', {
  variants: {
    size: { compact: 'mb-3', default: 'mb-4' },
  },
  defaultVariants: { size: 'default' },
})

const logoVariants = cva('relative rounded-full', {
  variants: {
    size: { compact: 'h-9 w-9', default: 'h-10 w-10' },
  },
  defaultVariants: { size: 'default' },
})

const priceVariants = cva('text-text font-mono font-bold tabular-nums', {
  variants: {
    size: { compact: 'text-lg', default: 'text-2xl' },
  },
  defaultVariants: { size: 'default' },
})

const sparkVariants = cva('mt-3 w-full', {
  variants: {
    size: { compact: 'h-10', default: 'h-14' },
  },
  defaultVariants: { size: 'default' },
})

const footerVariants = cva(
  'border-border/40 flex items-center justify-between border-t font-mono text-[10px]',
  {
    variants: {
      size: { compact: 'mt-2 pt-2', default: 'mt-3 pt-3' },
    },
    defaultVariants: { size: 'default' },
  },
)

// ─── Props ───
export interface CoinCardProps extends VariantProps<typeof coinCardVariants> {
  coin: Coin
}

// ─── Coin Card ───
export function CoinCard({ coin, size }: CoinCardProps) {
  const change = coin.price_change_percentage_24h ?? 0
  const isPositive = change >= 0
  const price = coin.current_price

  const sparklineData = coin.sparkline_in_7d?.price ?? []
  const sparklinePositive =
    sparklineData.length > 1
      ? sparklineData[sparklineData.length - 1] >= sparklineData[0]
      : isPositive

  const spotlightColor = isPositive
    ? 'rgba(34, 197, 94, 0.12)'
    : 'rgba(239, 68, 68, 0.12)'

  const sparkHeight = size === 'compact' ? 40 : 56

  return (
    <div className="relative h-full">
      <Link to={`/coin/${coin.id}`} className="block h-full">
        <TiltCard maxTilt={4} className="h-full">
          <BorderBeam thickness={1.5} duration={8} className="rounded-2xl">
            <SpotlightCard
              spotlightColor={spotlightColor}
              className={cn(coinCardVariants({ size }))}
            >
              <div className="relative z-10">
                {/* Header (without watchlist button) */}
                <div className={cn(headerVariants({ size }))}>
                  <div className="border-border bg-elevated/60 text-text-secondary rounded-md border px-2 py-0.5 font-mono text-[10px]">
                    #{coin.market_cap_rank}
                  </div>
                </div>

                {/* Coin */}
                <div className={cn(coinInfoVariants({ size }))}>
                  <div className="relative shrink-0">
                    <div className="bg-primary/20 absolute inset-0 rounded-full blur-md" />
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className={cn(logoVariants({ size }))}
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
                <p className={cn(priceVariants({ size }))}>
                  $<NumberTicker value={price} decimals={price < 1 ? 4 : 2} />
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

                {/* Sparkline */}
                {sparklineData.length > 1 && (
                  <div className={cn(sparkVariants({ size }))}>
                    <MiniSparkline
                      data={sparklineData}
                      isPositive={sparklinePositive}
                      width={200}
                      height={sparkHeight}
                      fluid
                    />
                  </div>
                )}

                {/* Footer */}
                <div className={cn(footerVariants({ size }))}>
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

      {/* Watchlist button as sibling of the link */}
      <div className="absolute top-3 right-3 z-20">
        <WatchlistButton coinId={coin.id} size="sm" />
      </div>
    </div>
  )
}

// ─── Coin Row ───
export function CoinRow({ coin }: { coin: Coin }) {
  const isPositive = (coin.price_change_percentage_24h ?? 0) >= 0
  const sparklineData = coin.sparkline_in_7d?.price ?? []
  const sparklinePositive =
    sparklineData.length > 1
      ? sparklineData[sparklineData.length - 1] >= sparklineData[0]
      : isPositive

  return (
    <Link
      to={`/coin/${coin.id}`}
      className="group hover:bg-elevated/40  grid grid-cols-[1fr_90px_80px] items-center px-4 py-3 transition-colors md:grid-cols-[60px_1fr_130px_110px_120px_100px]"
    >
      <span className="text-text-secondary hidden font-mono text-sm md:block">
        {coin.market_cap_rank}
      </span>

      <div className="flex min-w-0 items-center gap-3">
        <img
          src={coin.image}
          alt={coin.name}
          className="h-7 w-7 shrink-0 rounded-full"
        />
        <div className="min-w-0">
          <p className="text-text truncate text-sm font-medium">{coin.name}</p>
          <p className="text-text-secondary font-mono text-xs uppercase">
            {coin.symbol}
          </p>
        </div>
      </div>

      <p className="text-text text-center font-mono text-sm tabular-nums">
        $
        <FlashValue
          value={coin.current_price}
          decimals={coin.current_price < 1 ? 4 : 2}
        />
      </p>

      <p
        className={cn(
          'text-center font-mono text-sm tabular-nums',
          isPositive ? 'text-success' : 'text-error',
        )}
      >
        {isPositive ? '+' : ''}
        {(coin.price_change_percentage_24h ?? 0).toFixed(2)}%
      </p>

      {/* Sparkline — wrapped in a div */}
      <div className="hidden justify-center md:flex">
        <MiniSparkline
          data={sparklineData}
          isPositive={sparklinePositive}
          width={90}
          height={32}
        />
      </div>

      <p className="text-text-secondary hidden text-center font-mono text-sm tabular-nums md:block">
        ${(coin.market_cap / 1_000_000_000).toFixed(1)}B
      </p>
    </Link>
  )
}
