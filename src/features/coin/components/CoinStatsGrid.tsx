import { BlurFade } from '@/components/ui/BlurFade'
import type { CoinDetail } from '@/types/coin'

interface CoinStatsGridProps {
  marketData: CoinDetail['market_data']
}

function formatUSD(value: number) {
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(2)}B`
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`
  return `$${value.toLocaleString()}`
}

function formatNumber(value: number | null) {
  if (!value) return '—'
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(2)}B`
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}M`
  if (value >= 1_000) return `${(value / 1_000).toFixed(2)}K`
  return value.toLocaleString()
}

export function CoinStatsGrid({ marketData }: CoinStatsGridProps) {
  const stats = [
    { label: 'Market Cap', value: formatUSD(marketData.market_cap.usd) },
    { label: '24h Volume', value: formatUSD(marketData.total_volume.usd) },
    { label: '24h High', value: formatUSD(marketData.high_24h.usd) },
    { label: '24h Low', value: formatUSD(marketData.low_24h.usd) },
    { label: 'Circulating', value: formatNumber(marketData.circulating_supply) },
    { label: 'Total Supply', value: formatNumber(marketData.total_supply) },
    { label: 'Max Supply', value: formatNumber(marketData.max_supply) },
    { label: 'All-Time High', value: formatUSD(marketData.ath.usd) },
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