import { TrendingUp, TrendingDown } from 'lucide-react'
import { BlurFade } from '@/components/ui/BlurFade'
import { TopMoversCard } from './TopMoversCard'
import type { Coin } from '@/types/coin'

interface TopMoversProps {
  coins: Coin[]
}

export function TopMovers({ coins }: TopMoversProps) {
  const sorted = [...coins].sort(
    (a, b) =>
      (b.price_change_percentage_24h ?? 0) -
      (a.price_change_percentage_24h ?? 0)
  )

  const gainers = sorted.slice(0, 5)
  const losers = sorted.slice(-5).reverse()

  return (
    <section className="py-12 md:py-16">
      <BlurFade delay={0.1}>
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              Top Movers
            </h2>
            <p className="text-text-secondary mt-1 text-sm">
              Biggest gainers and losers in the last 24 hours
            </p>
          </div>
        </div>
      </BlurFade>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <BlurFade delay={0.2}>
          <TopMoversCard
            title="Top Gainers"
            icon={<TrendingUp className="h-4 w-4" />}
            variant="success"
            coins={gainers}
          />
        </BlurFade>
        <BlurFade delay={0.3}>
          <TopMoversCard
            title="Top Losers"
            icon={<TrendingDown className="h-4 w-4" />}
            variant="error"
            coins={losers}
          />
        </BlurFade>
      </div>
    </section>
  )
}