import { cn } from '@/utils/cn'
import type { CoinDetail, TimeRange } from '@/types/coin'

interface PerformanceTabsProps {
  coin: CoinDetail
  activeRange: TimeRange
  onChange: (range: TimeRange) => void
}

interface Perf {
  label: string
  value: number
  range: TimeRange
}

export function PerformanceTabs({
  coin,
  activeRange,
  onChange,
}: PerformanceTabsProps) {
  const md = coin.market_data

  const perfs: Perf[] = [
    { label: '1h', value: 0, range: '24H' },
    { label: '24h', value: md.price_change_percentage_24h ?? 0, range: '24H' },
    { label: '7d', value: md.price_change_percentage_7d ?? 0, range: '7D' },
    { label: '30d', value: md.price_change_percentage_30d ?? 0, range: '1M' },
    { label: '1y', value: 0, range: '1Y' },
  ]

  return (
    <div className="border-border bg-surface/40 grid grid-cols-5 divide-x divide-border/40 overflow-hidden rounded-xl border">
      {perfs.map((perf) => {
        const isActive = perf.range === activeRange
        const isPositive = perf.value >= 0

        return (
          <button
            key={perf.label}
            type="button"
            onClick={() => onChange(perf.range)}
            className={cn(
              'group relative flex flex-col items-center gap-1 py-3 transition-colors',
              isActive ? 'bg-elevated/60' : 'hover:bg-elevated/30',
            )}
          >
            <span className="text-text-secondary font-mono text-[10px] tracking-wider uppercase">
              {perf.label}
            </span>
            <span
              className={cn(
                'font-mono text-xs font-semibold tabular-nums',
                isPositive ? 'text-success' : 'text-error',
              )}
            >
              {isPositive ? '+' : ''}
              {perf.value.toFixed(2)}%
            </span>
            {isActive && (
              <div className="bg-primary absolute bottom-0 left-0 h-0.5 w-full" />
            )}
          </button>
        )
      })}
    </div>
  )
}