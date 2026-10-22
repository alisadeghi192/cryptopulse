import { BlurFade } from '@/components/ui/BlurFade'
import type { CoinDetail } from '@/types/coin'
import { formatCompactNumber, formatCompactUsd } from '@/utils/format'

interface CoinStatsGridProps {
  marketData: CoinDetail['market_data']
}


export function CoinStatsGrid({ marketData }: CoinStatsGridProps) {
  const stats = [
    { label: 'Market Cap', value: formatCompactUsd(marketData.market_cap.usd) },
    { label: '24h Volume', value: formatCompactUsd(marketData.total_volume.usd) },
    { label: '24h High', value: formatCompactUsd(marketData.high_24h.usd) },
    { label: '24h Low', value: formatCompactUsd(marketData.low_24h.usd) },
    { label: 'Circulating', value: formatCompactNumber(marketData.circulating_supply) },
    { label: 'Total Supply', value: formatCompactNumber(marketData.total_supply) },
    { label: 'Max Supply', value: formatCompactNumber(marketData.max_supply) },
    { label: 'All-Time High', value: formatCompactUsd(marketData.ath.usd) },
  ]

  return (
    <BlurFade delay={0.2}>
      <div className="border-border bg-surface/30 overflow-hidden rounded-2xl border shadow-lg">
        <div className="divide-border/40 grid grid-cols-2 divide-x divide-y md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="hover:bg-primary/3 p-4 transition-colors duration-300 md:p-5"
            >
              <p className="text-text-secondary font-mono text-[10px] tracking-wider uppercase">
                {stat.label}
              </p>
              <p className="text-text mt-1.5 font-mono text-sm font-semibold tabular-nums md:text-base">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </BlurFade>
  )
}