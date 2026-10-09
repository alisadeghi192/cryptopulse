import { BlurFade } from '@/components/ui/BlurFade'
import { CoinCard } from '@/features/coin/components/CoinCard'
import { useRelatedCoins } from '@/features/coin/hooks/useRelatedCoins'
import type { CoinDetail } from '@/types/coin'

interface RelatedCoinsProps {
  coin: CoinDetail
}

export function RelatedCoins({ coin }: RelatedCoinsProps) {
  const { data, isLoading } = useRelatedCoins(coin.market_cap_rank, coin.id)

  if (isLoading || !data || data.length === 0) return null

  return (
    <BlurFade delay={0.55}>
      <div className="border-border bg-surface/30 rounded-2xl border p-5 md:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-text text-sm font-bold">
            Similar Coins
          </h3>
          <span className="text-text-secondary font-mono text-[10px] tracking-wider uppercase">
            Nearby by rank
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {data.map((related) => (
            <CoinCard key={related.id} coin={related} size="compact" />
          ))}
        </div>
      </div>
    </BlurFade>
  )
}