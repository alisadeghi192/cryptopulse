import { Flame } from 'lucide-react'
import { BlurFade } from '@/components/ui/BlurFade'
import { CoinCard } from '@/features/coin/components/CoinCard'
import { useTrending } from '@/hooks/useTrending'

export function TrendingCoins() {
  const { data: coins, isLoading } = useTrending()

  if (isLoading || !coins || coins.length === 0) return null

  return (
    <section className="container py-12 md:py-16">
      <BlurFade delay={0.1}>
        <div className="mb-8 flex items-end justify-between">
          <div>
            <div className="text-text-secondary mb-2 flex items-center gap-2 font-mono text-xs tracking-widest uppercase">
              <Flame className="text-primary h-3.5 w-3.5" />
              Hot Right Now
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              Trending
            </h2>
          </div>
          <p className="text-text-secondary hidden font-mono text-xs md:block">
            Most searched in 24h
          </p>
        </div>
      </BlurFade>

      <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
        {coins.map((coin, i) => (
          <BlurFade key={coin.id} delay={0.1 + i * 0.05}>
            <CoinCard coin={coin} size="compact" />
          </BlurFade>
        ))}
      </div>
    </section>
  )
}