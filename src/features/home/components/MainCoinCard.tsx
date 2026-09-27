import { useState } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { NumberTicker } from '@/components/ui/NumberTicker'
import { PriceChart } from '@/components/ui/PriceChart'
import { StatsGrid } from './StatsGrid'
import { useCoinChart } from '@/hooks/useCoinChart'
import { cn } from '@/utils/cn'
import type { Coin, TimeRange } from '@/types/coin'

interface MainCoinCardProps {
  bitcoin?: Coin
  isPositive: boolean
}

const TIME_RANGES: TimeRange[] = ['24H', '7D', '1M', '1Y']

export function MainCoinCard({ bitcoin, isPositive }: MainCoinCardProps) {
  const [range, setRange] = useState<TimeRange>('24H')
  const { data: chartData, isLoading: chartLoading } = useCoinChart(
    bitcoin?.id,
    range
  )

  return (
    <>
      <div className="xs:p-3 p-2 sm:p-4 md:p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <img
              src={bitcoin?.image}
              alt={bitcoin?.name ?? 'Bitcoin'}
              className="h-12 w-12 rounded-full"
            />
            <div>
              <p className="text-text font-medium">
                {bitcoin?.name ?? 'Bitcoin'}
              </p>
              <p className="text-text-secondary font-mono text-xs uppercase">
                {bitcoin?.symbol ?? 'btc'}/USD
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-text font-mono text-3xl font-bold tabular-nums">
              $<NumberTicker value={bitcoin?.current_price ?? 0} />
            </p>
            <p
              className={cn(
                'flex items-center justify-end gap-1 font-mono text-sm',
                isPositive ? 'text-success' : 'text-error',
              )}
            >
              {isPositive ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {isPositive ? '+' : ''}
              {bitcoin?.price_change_percentage_24h?.toFixed(2) ?? '0.00'}
              %
            </p>
          </div>
        </div>

        {/* Chart */}
        <div className="mt-4 h-50">
          {chartLoading || !chartData ? (
            <div className="bg-elevated h-full w-full animate-pulse rounded-lg" />
          ) : (
            <PriceChart data={chartData} isPositive={isPositive} height={200} />
          )}
        </div>

        {/* Time Range Tabs */}
        <div className="mt-4 flex items-center gap-1">
          {TIME_RANGES.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={cn(
                'rounded-md px-2.5 py-1 font-mono text-xs transition-colors',
                range === r
                  ? 'bg-primary/20 text-primary'
                  : 'text-text-secondary hover:bg-elevated hover:text-text',
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <StatsGrid bitcoin={bitcoin} />
    </>
  )
}