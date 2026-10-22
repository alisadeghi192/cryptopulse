import { BlurFade } from '@/components/ui/BlurFade'
import { WatchlistRow } from './WatchlistRow'
import type { Coin } from '@/types/coin'

export function WatchlistRows({ coins }: { coins: Coin[] }) {
  return (
    <div className="flex flex-col gap-2">
      {coins.map((coin, i) => (
        <BlurFade key={coin.id} delay={0.02 + (i % 8) * 0.03}>
          <WatchlistRow coin={coin} />
        </BlurFade>
      ))}
    </div>
  )
}