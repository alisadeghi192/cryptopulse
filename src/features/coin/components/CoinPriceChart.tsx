import { useState } from 'react'
import { Command, ZoomIn } from 'lucide-react'
import { BlurFade } from '@/components/ui/BlurFade'
import { PriceChart } from '@/components/ui/PriceChart'
import { useCoinChart } from '@/hooks/useCoinChart'
import { cn } from '@/utils/cn'
import type { TimeRange } from '@/types/coin'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const RANGES: TimeRange[] = ['24H', '7D', '1M', '1Y']

interface CoinPriceChartProps {
  coinId: string
  isPositive: boolean
}

export function CoinPriceChart({ coinId, isPositive }: CoinPriceChartProps) {
  const [range, setRange] = useState<TimeRange>('24H')
  const { data, isLoading } = useCoinChart(coinId, range)
  const isDesktop = useMediaQuery('(min-width: 768px)')
  return (
    <BlurFade delay={0.15}>
      <div className="border-border shadow-lg bg-surface/40 rounded-2xl border p-2 backdrop-blur-xl md:p-3">
        {/* Header: Tabs + Hint */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          {/* Range tabs */}
          <div className="border-border bg-surface/60 inline-flex items-center gap-1 rounded-lg border p-1">
            {RANGES.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRange(r)}
                className={cn(
                  'rounded-md px-3 py-1.5 font-mono text-xs font-medium transition-all duration-200',
                  range === r
                    ? 'bg-primary text-background shadow-sm'
                    : 'text-text-secondary hover:bg-elevated hover:text-text',
                )}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Hint — Desktop */}
          <div className="text-primary hidden items-center gap-2 font-mono text-[10px] tracking-wider uppercase md:flex">
            <ZoomIn className="size-3" /> :
            <span className="border-border bg-elevated/60 text-primary inline-flex h-5 items-center gap-0.5 rounded border px-1.5">
              <Command className="size-2.5" />
              <span className="text-[9px]">/Ctrl</span>
            </span>
            <span>+ Scroll</span>
          </div>

          {/* Hint — Mobile */}
          <div className="text-primary flex items-center gap-1.5 font-mono text-[10px] tracking-wider uppercase md:hidden">
            <ZoomIn className="size-3.5" />
            <span>Pinch to zoom</span>
          </div>
        </div>

        {/* Chart */}
        <div className="h-64 md:h-80">
          {isLoading || !data ? (
            <div className="bg-elevated/40 h-full w-full animate-pulse rounded-lg" />
          ) : (
            <PriceChart
              data={data}
              isPositive={isPositive}
              height={isDesktop ? 330 : 256}
              variant="full"
            />
          )}
        </div>
      </div>
    </BlurFade>
  )
}
