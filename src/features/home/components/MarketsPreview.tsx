import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { BlurFade } from '@/components/ui/BlurFade'
import { FlashValue } from '@/components/ui/FlashValue'
import { MiniSparkline } from '@/components/ui/MiniSparkline'
import { useCoins } from '@/hooks/useCoins'
import { cn } from '@/utils/cn'

export function MarketsPreview() {
  const { data: coins, isLoading } = useCoins({ perPage: 10, sparkline: true })

  if (isLoading || !coins) {
    return (
      <section className="container pt-12 md:pt-16">
        <div className="mb-8">
          <div className="bg-elevated mb-2 h-4 w-32 animate-pulse rounded" />
          <div className="bg-elevated h-10 w-40 animate-pulse rounded" />
        </div>
        <div className="border-border bg-surface h-96 animate-pulse rounded-2xl border" />
      </section>
    )
  }

  return (
    <section className="container pt-12 md:pt-16">
      <BlurFade delay={0.1}>
        <div className="mb-8 flex items-end justify-between">
          <div>
            <div className="text-text-secondary mb-2 flex items-center gap-2 font-mono text-xs tracking-widest uppercase">
              <span className="relative flex h-1.5 w-1.5">
                <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
                <span className="bg-primary relative inline-flex h-1.5 w-1.5 rounded-full" />
              </span>
              Top 10 by Market Cap
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              Markets
            </h2>
          </div>
          <Link
            to="/markets"
            className="text-primary hover:text-primary-hover group flex items-center gap-1 font-mono text-xs transition-colors"
          >
            View All
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </BlurFade>

      <BlurFade delay={0.2}>
        <div className="border-border bg-surface overflow-hidden rounded-2xl border shadow-lg backdrop-blur-xl">
          {/* Header */}
          <div className="border-border text-text-secondary grid grid-cols-[1fr_90px_80px] items-center border-b px-4 py-3 font-mono text-xs tracking-wider uppercase md:grid-cols-[60px_1fr_130px_110px_120px_100px]">
            <span className="md:hidden">Coin</span>
            <span className="hidden md:block">#</span>
            <span className="hidden md:block">Coin</span>
            <span className="text-center">Price</span>
            <span className="text-center">24h %</span>
            <span className="hidden text-center md:block">7d</span>
            <span className="hidden text-center md:block">Market Cap</span>
          </div>

          {/* Rows */}
          <div className="divide-border/30 divide-y">
            {coins.map((coin, i) => {
              const isPositive = (coin.price_change_percentage_24h ?? 0) >= 0
              const sparklineData = coin.sparkline_in_7d?.price ?? []
              const sparklinePositive =
                sparklineData.length > 1
                  ? sparklineData[sparklineData.length - 1] >= sparklineData[0]
                  : isPositive

              return (
                <BlurFade key={coin.id} delay={0.3 + i * 0.03}>
                  <Link
                    to={`/coin/${coin.id}`}
                    className="group hover:bg-elevated/40 grid grid-cols-[1fr_90px_80px] items-center px-4 py-3 transition-colors md:grid-cols-[60px_1fr_130px_110px_120px_100px]"
                  >
                    {/* Rank */}
                    <span className="text-text-secondary hidden font-mono text-sm md:block">
                      {coin.market_cap_rank}
                    </span>

                    {/* Coin */}
                    <div className="flex min-w-0 items-center gap-3">
                      <img
                        src={coin.image}
                        alt={coin.name}
                        className="h-7 w-7 shrink-0 rounded-full"
                      />
                      <div className="min-w-0">
                        <p className="text-text truncate text-sm font-medium">
                          {coin.name}
                        </p>
                        <p className="text-text-secondary font-mono text-xs uppercase">
                          {coin.symbol}
                        </p>
                      </div>
                    </div>

                    {/* Price */}
                    <p className="text-text text-center font-mono text-sm tabular-nums">
                      $
                      <FlashValue
                        value={coin.current_price}
                        decimals={coin.current_price < 1 ? 4 : 2}
                      />
                    </p>

                    {/* 24h */}
                    <p
                      className={cn(
                        'text-center font-mono text-sm tabular-nums',
                        isPositive ? 'text-success' : 'text-error',
                      )}
                    >
                      {isPositive ? '+' : ''}
                      {(coin.price_change_percentage_24h ?? 0).toFixed(2)}%
                    </p>

                    {/* Sparkline */}
                    <MiniSparkline
                      data={sparklineData}
                      isPositive={sparklinePositive}
                      width={90}
                      height={32}
                      className="mx-auto hidden! md:block!"
                    />

                    {/* Market Cap */}
                    <p className="text-text-secondary hidden text-center font-mono text-sm tabular-nums md:block">
                      ${(coin.market_cap / 1_000_000_000).toFixed(1)}B
                    </p>
                  </Link>
                </BlurFade>
              )
            })}
          </div>
        </div>
      </BlurFade>
    </section>
  )
}
