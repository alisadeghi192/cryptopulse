import { useState } from 'react'
import { Link } from 'react-router'
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react'
import { NumberTicker } from '@/components/ui/NumberTicker'
import { PriceChart } from '@/components/ui/PriceChart'
import { StatsGrid } from './StatsGrid'
import { useCoinChart } from '@/hooks/useCoinChart'
import { cn } from '@/utils/cn'
import type { Coin, TimeRange } from '@/types/coin'
import { coinImageUrl } from '@/utils/image'

interface MainCoinCardProps {
  bitcoin?: Coin
  isPositive: boolean
}

const TIME_RANGES: TimeRange[] = ['24H', '7D', '1M', '1Y']

export function MainCoinCard({ bitcoin, isPositive }: MainCoinCardProps) {
  const [range, setRange] = useState<TimeRange>('24H')
  const {
    data: chartData,
    isLoading: chartLoading,
    isError: chartError,
  } = useCoinChart(bitcoin?.id, range)

  return (
    <>
      <Link to="/coin/bitcoin" className="block group">
        <div className="xs:p-3 p-2 sm:p-4 md:p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <img
                src={coinImageUrl(bitcoin?.image)}
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
                {bitcoin?.price_change_percentage_24h?.toFixed(2) ?? '0.00'}%
              </p>
            </div>
          </div>

          {/* Chart */}
          <div className="mt-4 h-50">
            {chartLoading ? (
              <div className="bg-elevated h-full w-full animate-pulse rounded-lg" />
            ) : chartError || !chartData ? (
              <div className="flex h-full flex-col items-center justify-center gap-2">
                <AlertCircle className="text-text-secondary size-6" />
                <p className="text-text-secondary font-mono text-xs">
                  Chart unavailable
                </p>
              </div>
            ) : (
              <PriceChart
                data={chartData}
                isPositive={isPositive}
                height={200}
              />
            )}
          </div>
        </div>
      </Link>

      {/* Time Range Tabs — OUTSIDE the Link */}
      <div className="flex items-center gap-1 px-2 pb-2 xs:px-3 xs:pb-3 sm:px-4 sm:pb-4 md:px-6 md:pb-6">
        {TIME_RANGES.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRange(r)}
            className={cn(
              'rounded-md px-2.5 py-1 cursor-pointer font-mono text-xs transition-colors',
              range === r
                ? 'bg-primary/20 text-primary'
                : 'text-text-secondary hover:bg-elevated hover:text-text',
            )}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Stats Grid — inside its own link */}
      <Link to="/coin/bitcoin" className="block group">
        <StatsGrid bitcoin={bitcoin} />
      </Link>
    </>
  )
}