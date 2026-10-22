import { BlurFade } from '@/components/ui/BlurFade'
import { CoinCard } from '@/features/coin/components/CoinCard'
import type { Coin } from '@/types/coin'

export function WatchlistGrid({ coins }: { coins: Coin[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {coins.map((coin, i) => (
        <BlurFade key={coin.id} delay={0.02 + (i % 8) * 0.03}>
          <CoinCard coin={coin} size="default" />
        </BlurFade>
      ))}
    </div>
  )
}