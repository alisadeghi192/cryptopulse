import { NumberTicker } from '@/components/ui/NumberTicker'
import { SpotlightCard } from '@/components/ui/SpotlightCard'
import { TiltCard } from '@/components/ui/TiltCard'
import { cn } from '@/utils/cn'
import type { Coin } from '@/types/coin'

interface TopMoversCardProps {
  title: string
  icon: React.ReactNode
  variant: 'success' | 'error'
  coins: Coin[]
}

export function TopMoversCard({
  title,
  icon,
  variant,
  coins,
}: TopMoversCardProps) {
  const spotlightColor =
    variant === 'success'
      ? 'rgba(34, 197, 94, 0.15)'  
      : 'rgba(239, 68, 68, 0.15)'  

  return (
    <TiltCard maxTilt={3}>
      <SpotlightCard
        spotlightColor={spotlightColor}
        className="border-border bg-surface border shadow-lg backdrop-blur-xl"
      >
        {/* Header */}
        <div
          className={cn(
            'flex items-center gap-2 border-b border-border px-5 py-4',
            variant === 'success' ? 'text-success' : 'text-error',
          )}
        >
          {icon}
          <h3 className="font-mono text-sm font-semibold uppercase tracking-wider">
            {title}
          </h3>
        </div>

        {/* List */}
        <div className="divide-border/30 divide-y">
          {coins.map((coin) => (
            <div
              key={coin.id}
              className="hover:bg-elevated/40 flex items-center justify-between px-5 py-3 transition-colors"
            >
              <div className="flex items-center gap-3">
                <img
                  src={coin.image}
                  alt={coin.name}
                  className="h-8 w-8 rounded-full"
                />
                <div>
                  <p className="text-text text-sm font-medium">{coin.name}</p>
                  <p className="text-text-secondary font-mono text-xs uppercase">
                    {coin.symbol}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-text font-mono text-sm tabular-nums">
                  $
                  {coin.current_price.toLocaleString('en-US', {
                    maximumFractionDigits: coin.current_price < 1 ? 4 : 2,
                  })}
                </p>
                <p
                  className={cn(
                    'font-mono text-xs tabular-nums',
                    variant === 'success' ? 'text-success' : 'text-error',
                  )}
                >
                  {(coin.price_change_percentage_24h ?? 0) >= 0 ? '+' : ''}
                  <NumberTicker
                    value={Math.abs(coin.price_change_percentage_24h ?? 0)}
                    decimals={2}
                  />
                  %
                </p>
              </div>
            </div>
          ))}
        </div>
      </SpotlightCard>
    </TiltCard>
  )
}