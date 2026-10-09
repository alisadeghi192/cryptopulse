import { BlurFade } from '@/components/ui/BlurFade'
import { useCoinChart } from '@/hooks/useCoinChart'
import { cn } from '@/utils/cn'

interface HistoricalPriceTableProps {
  coinId: string
  currentPrice: number
}

export function HistoricalPriceTable({ coinId, currentPrice }: HistoricalPriceTableProps) {
  const { data, isLoading } = useCoinChart(coinId, '1M')

  if (isLoading || !data || data.length === 0) {
    return (
      <BlurFade delay={0.35}>
        <div className="border-border bg-surface/30 rounded-2xl border p-5 md:p-6">
          <h3 className="font-display text-text mb-4 text-sm font-bold">
            Price History
          </h3>
          <div className="bg-elevated/40 h-40 animate-pulse rounded-lg" />
        </div>
      </BlurFade>
    )
  }

  const getPriceAt = (targetTs: number): number | null => {
    let closest = data[0]
    let minDiff = Math.abs(targetTs - (closest.time as number))

    for (const point of data) {
      const ts =
        typeof point.time === 'number'
          ? point.time
          : new Date(point.time as string).getTime() / 1000
      const diff = Math.abs(targetTs - ts)
      if (diff < minDiff) {
        minDiff = diff
        closest = point
      }
    }
    return closest.value
  }

  const now = Math.floor(Date.now() / 1000)

  const periods = [
    { label: 'Today', target: now - 60 * 60 * 24 },
    { label: 'Yesterday', target: now - 60 * 60 * 24 * 2 },
    { label: '7 days ago', target: now - 60 * 60 * 24 * 7 },
    { label: '14 days ago', target: now - 60 * 60 * 24 * 14 },
    { label: '30 days ago', target: now - 60 * 60 * 24 * 30 },
  ]

  return (
    <BlurFade delay={0.35}>
      <div className="border-border shadow-lg bg-surface/30 h-full rounded-2xl border p-5 md:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-text text-sm font-bold">
            Price History
          </h3>
          <span className="text-text-secondary font-mono text-[10px] tracking-wider uppercase">
            Last 30 days
          </span>
        </div>

        <div className="divide-border/40 border-border/40 divide-y overflow-hidden rounded-xl border">
          {periods.map((period) => {
            const price = getPriceAt(period.target)
            if (price === null) return null

            const change =
              period.target !== now - 60 * 60 * 24
                ? ((currentPrice - price) / price) * 100
                : null

            const isPositive = (change ?? 0) >= 0

            return (
              <div
                key={period.label}
                className="hover:bg-elevated/20 flex items-center justify-between px-4 py-3 transition-colors"
              >
                <span className="text-text-secondary font-mono text-xs">
                  {period.label}
                </span>

                <div className="flex items-center gap-4">
                  <span className="text-text font-mono text-sm tabular-nums">
                    ${price.toLocaleString('en-US', {
                      maximumFractionDigits: price < 1 ? 6 : 2,
                    })}
                  </span>

                  {change !== null && (
                    <span
                      className={cn(
                        'w-16 text-right font-mono text-xs font-semibold tabular-nums',
                        isPositive ? 'text-success' : 'text-error',
                      )}
                    >
                      {isPositive ? '+' : ''}
                      {change.toFixed(2)}%
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </BlurFade>
  )
}