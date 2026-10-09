import { BlurFade } from '@/components/ui/BlurFade'
import { useCoinChart } from '@/hooks/useCoinChart'
import { cn } from '@/utils/cn'

interface PriceChangeHeatmapProps {
  coinId: string
}

export function PriceChangeHeatmap({ coinId }: PriceChangeHeatmapProps) {
  const { data, isLoading } = useCoinChart(coinId, '1M')

  if (isLoading || !data || data.length === 0) {
    return (
      <BlurFade delay={0.4}>
        <div className="border-border bg-surface/30 rounded-2xl border p-5 md:p-6">
          <h3 className="font-display text-text mb-4 text-sm font-bold">
            30-Day Heatmap
          </h3>
          <div className="bg-elevated/40 h-16 animate-pulse rounded-lg" />
        </div>
      </BlurFade>
    )
  }

  // Group data by day
  const dailyData = new Map<string, number[]>()
  data.forEach((point) => {
    const ts =
      typeof point.time === 'number'
        ? point.time
        : new Date(point.time as string).getTime() / 1000
    const day = new Date(ts * 1000).toISOString().slice(0, 10)
    if (!dailyData.has(day)) dailyData.set(day, [])
    dailyData.get(day)!.push(point.value)
  })

  // Compute daily changes
  const days = Array.from(dailyData.entries()).map(([day, prices]) => {
    const open = prices[0]
    const close = prices[prices.length - 1]
    const change = open > 0 ? ((close - open) / open) * 100 : 0
    return { day, change }
  })

  const maxAbs = Math.max(...days.map((d) => Math.abs(d.change)), 1)

  return (
    <BlurFade delay={0.4}>
      <div className="border-border shadow-lg bg-surface/30 rounded-2xl border p-5 md:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-text text-sm font-bold">
            30-Day Heatmap
          </h3>
          <span className="text-text-secondary font-mono text-[10px] tracking-wider uppercase">
            Daily change
          </span>
        </div>

        <div className="flex flex-wrap gap-1">
          {days.map(({ day, change }) => {
            const isPositive = change >= 0
            const intensity = Math.min(Math.abs(change) / maxAbs, 1)
            const color = isPositive
              ? `rgba(34, 197, 94, ${0.15 + intensity * 0.85})`
              : `rgba(239, 68, 68, ${0.15 + intensity * 0.85})`

            return (
              <div key={day} className="group relative">
                <div
                  className="hover:ring-primary/40 size-5 cursor-help rounded-sm transition-all hover:scale-125 hover:ring-1"
                  style={{ background: color }}
                />

                {/* Custom tooltip */}
                <div className="bg-background border-border pointer-events-none invisible absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 rounded-lg border p-2 text-center opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:-translate-y-1 group-hover:opacity-100">
                  <p className="text-text-secondary font-mono text-[9px] whitespace-nowrap">
                    {day}
                  </p>
                  <p
                    className={cn(
                      'font-mono text-[10px] font-semibold whitespace-nowrap',
                      isPositive ? 'text-success' : 'text-error',
                    )}
                  >
                    {isPositive ? '+' : ''}
                    {change.toFixed(2)}%
                  </p>
                  {/* Arrow */}
                  <div className="bg-background border-border absolute top-full left-1/2 size-2 -translate-x-1/2 -translate-y-1 rotate-45 border-r border-b" />
                </div>
              </div>
            )
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center justify-end gap-2 font-mono text-[10px]">
          <span className="text-text-secondary">-{maxAbs.toFixed(1)}%</span>
          <div className="flex gap-0.5">
            {[0.2, 0.4, 0.6, 0.8, 1].map((i) => (
              <div
                key={i}
                className="size-2 rounded-sm"
                style={{ background: `rgba(239, 68, 68, ${i})` }}
              />
            ))}
            {[0.2, 0.4, 0.6, 0.8, 1].map((i) => (
              <div
                key={i}
                className="size-2 rounded-sm"
                style={{ background: `rgba(34, 197, 94, ${i})` }}
              />
            ))}
          </div>
          <span className="text-text-secondary">+{maxAbs.toFixed(1)}%</span>
        </div>
      </div>
    </BlurFade>
  )
}