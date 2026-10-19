import { Link } from 'react-router'
import { Flame, ArrowRight } from 'lucide-react'
import { AmbientLights } from '@/components/ui/AmbientLights'
import { BlurFade } from '@/components/ui/BlurFade'
import { FlashValue } from '@/components/ui/FlashValue'
import { cn } from '@/utils/cn'
import type { Coin } from '@/types/coin'

interface TrendingNowProps {
  coins: Coin[]
}

export function TrendingNow({ coins }: TrendingNowProps) {
  if (coins.length === 0) return null

  const top = coins.slice(0, 5)

  return (
    <BlurFade delay={0.2}>
      <div className="border-border/40 bg-surface/40 relative h-full overflow-hidden rounded-3xl border shadow-xl backdrop-blur-3xl">
        <div className="pointer-events-none absolute inset-0">
          <AmbientLights variant="purple" intensity="subtle" />
        </div>
        <div className="relative border-border/40 flex items-center justify-between border-b px-5 py-4">
          <div className="flex items-center gap-2">
            <Flame className="text-primary size-4" />
            <span className="text-text font-mono text-xs font-semibold tracking-widest uppercase">
              Trending
            </span>
          </div>
          <Link
            to="/markets"
            className="text-text/60 hover:text-primary group flex items-center gap-1 font-mono text-[10px] tracking-widest uppercase transition-colors"
          >
            Markets
            <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="relative divide-border/30 divide-y">
          {top.map((coin) => {
            const change = coin.price_change_percentage_24h ?? 0
            const isPositive = change >= 0
            return (
              <Link
                key={coin.id}
                to={`/coin/${coin.id}`}
                className="hover:bg-elevated/30 flex items-center justify-between gap-3 px-5 py-3 transition-colors"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="size-7 shrink-0 rounded-full"
                  />
                  <div className="min-w-0">
                    <p className="text-text truncate text-sm font-medium">
                      {coin.name}
                    </p>
                    <p className="text-text/60 font-mono text-[10px] uppercase">
                      {coin.symbol}
                    </p>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-text font-mono text-sm tabular-nums">
                    $
                    <FlashValue
                      value={coin.current_price}
                      decimals={coin.current_price < 1 ? 4 : 2}
                    />
                  </p>
                  <p
                    className={cn(
                      'font-mono text-[10px] tabular-nums',
                      isPositive ? 'text-success' : 'text-error',
                    )}
                  >
                    {isPositive ? '+' : ''}
                    {change.toFixed(2)}%
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </BlurFade>
  )
}