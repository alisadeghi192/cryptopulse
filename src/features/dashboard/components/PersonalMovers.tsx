import { Link } from 'react-router'
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react'
import { BlurFade } from '@/components/ui/BlurFade'
import { cn } from '@/utils/cn'

interface Mover {
  coinId: string
  symbol: string
  image: string
  change: number
  value: number
}

interface PersonalMoversProps {
  gainers: Mover[]
  losers: Mover[]
}

export function PersonalMovers({ gainers, losers }: PersonalMoversProps) {
  const isEmpty = gainers.length === 0 && losers.length === 0

  return (
    <BlurFade delay={0.1}>
      <div className="border-border/40 bg-surface/40 relative h-full overflow-hidden rounded-3xl border shadow-xl backdrop-blur-3xl">
        <div className="border-border/40 flex items-center justify-between border-b px-5 py-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="text-primary size-4" />
            <span className="text-text font-mono text-xs font-semibold tracking-widest uppercase">
              Your Movers
            </span>
          </div>
          <span className="text-text/60 font-mono text-[10px] tracking-widest uppercase">
            24h
          </span>
        </div>

        {isEmpty ? (
          <div className="p-8 text-center">
            <p className="text-text/60 font-mono text-xs">
              No holdings to track yet
            </p>
          </div>
        ) : (
          <div className="p-3">
            {gainers.length > 0 && (
              <div className="mb-2">
                <p className="text-text/50 mb-1 px-2 font-mono text-[10px] tracking-widest uppercase">
                  Gainers
                </p>
                <div className="flex flex-col gap-0.5">
                  {gainers.map((m) => (
                    <MoverRow key={m.coinId} mover={m} variant="up" />
                  ))}
                </div>
              </div>
            )}

            {losers.length > 0 && (
              <div>
                <p className="text-text/50 mb-1 px-2 font-mono text-[10px] tracking-widest uppercase">
                  Losers
                </p>
                <div className="flex flex-col gap-0.5">
                  {losers.map((m) => (
                    <MoverRow key={m.coinId} mover={m} variant="down" />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </BlurFade>
  )
}

function MoverRow({
  mover,
  variant,
}: {
  mover: Mover
  variant: 'up' | 'down'
}) {
  const isUp = variant === 'up'
  return (
    <Link
      to={`/coin/${mover.coinId}`}
      className="hover:bg-elevated/40 group flex items-center justify-between gap-3 rounded-lg px-2 py-2 transition-colors"
    >
      <div className="flex min-w-0 items-center gap-2.5">
        <img
          src={mover.image}
          alt={mover.symbol}
          className="size-6 shrink-0 rounded-full"
        />
        <span className="text-text truncate font-mono text-xs font-medium">
          {mover.symbol}
        </span>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <span
          className={cn(
            'flex items-center gap-0.5 font-mono text-xs font-semibold tabular-nums',
            isUp ? 'text-success' : 'text-error',
          )}
        >
          {isUp ? (
            <TrendingUp className="size-3" />
          ) : (
            <TrendingDown className="size-3" />
          )}
          {isUp ? '+' : ''}
          {mover.change.toFixed(2)}%
        </span>
        <ArrowRight className="text-text/30 group-hover:text-text/60 size-3 transition-colors" />
      </div>
    </Link>
  )
}