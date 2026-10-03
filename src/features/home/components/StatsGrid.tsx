import { NumberTicker } from '@/components/ui/NumberTicker'
import { cn } from '@/utils/cn'
import type { Coin } from '@/types/coin'

interface StatsGridProps {
  bitcoin?: Coin
}

export function StatsGrid({ bitcoin }: StatsGridProps) {
  const stats = [
    {
      label: '24h Volume',
      value: (bitcoin?.total_volume ?? 0) / 1_000_000_000,
      prefix: '$',
      suffix: 'B',
      decimals: 1,
    },
    {
      label: 'Market Cap',
      value: (bitcoin?.market_cap ?? 0) / 1_000_000_000,
      prefix: '$',
      suffix: 'B',
      decimals: 1,
    },
    {
      label: 'Rank',
      value: bitcoin?.market_cap_rank ?? 0,
      suffix: '',
      decimals: 0,
    },
  ]

  return (
    <div className="border-border grid grid-cols-3 border-t">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={cn(
            'p-4 text-center',
            i !== 2 && 'border-border border-r',
          )}
        >
          <p className="text-text-secondary font-mono text-xs">
            {stat.label}
          </p>
          <p className="text-text mt-1 font-mono text-sm font-bold">
            <NumberTicker
              value={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
              decimals={stat.decimals}
            />
          </p>
        </div>
      ))}
    </div>
  )
}