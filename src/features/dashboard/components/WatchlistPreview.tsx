import { Link } from 'react-router'
import { Star, ArrowRight, Compass } from 'lucide-react'
import { BlurFade } from '@/components/ui/BlurFade'
import { FlashValue } from '@/components/ui/FlashValue'
import { cn } from '@/utils/cn'
import type { Coin } from '@/types/coin'

interface WatchlistPreviewProps {
  coins: Coin[]
  totalCount: number
}

export function WatchlistPreview({ coins, totalCount }: WatchlistPreviewProps) {
  return (
    <BlurFade delay={0.1}>
      <div className="border-border/40 bg-surface/40 relative h-full overflow-hidden rounded-3xl border shadow-xl backdrop-blur-3xl">
        <div className="flex items-center justify-between border-b border-border/40 px-5 py-4">
          <div className="flex items-center gap-2">
            <Star className="text-primary size-4" />
            <span className="text-text font-mono text-xs font-semibold tracking-widest uppercase">
              Watchlist
            </span>
            {totalCount > 0 && (
              <span className="border-border/60 bg-background/60 text-text/70 rounded border px-1.5 py-0.5 font-mono text-[10px] tabular-nums">
                {totalCount}
              </span>
            )}
          </div>
          <Link
            to="/watchlist"
            className="text-text/60 hover:text-primary group flex items-center gap-1 font-mono text-[10px] tracking-widest uppercase transition-colors"
          >
            View all
            <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {coins.length === 0 ? (
          <div className="flex flex-col items-center gap-3 p-8 text-center">
            <div className="border-border/40 bg-elevated/40 flex size-12 items-center justify-center rounded-xl border">
              <Star className="text-text/40 size-5" />
            </div>
            <div>
              <p className="text-text font-mono text-sm font-medium">
                Watchlist is empty
              </p>
              <p className="text-text/60 mt-1 font-mono text-xs">
                Add coins to track them here
              </p>
            </div>
            <Link
              to="/markets"
              className="border-border/40 bg-surface/40 hover:border-primary/40 hover:text-primary text-text/70 mt-1 flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-xs transition-colors"
            >
              <Compass className="size-3.5" />
              Explore
            </Link>
          </div>
        ) : (
          <div className="divide-border/30 divide-y">
            {coins.map((coin) => {
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
                      className="h-7 w-7 shrink-0 rounded-full"
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
        )}
      </div>
    </BlurFade>
  )
}