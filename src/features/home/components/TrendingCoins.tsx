import { useState } from 'react'
import { Flame, ChevronDown } from 'lucide-react'
import { BlurFade } from '@/components/ui/BlurFade'
import { CoinCard } from '@/features/coin/components/CoinCard'
import { useTrending } from '@/hooks/useTrending'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const MOBILE_INITIAL = 4
const MOBILE_STEP = 4

export function TrendingCoins() {
  const { data: coins, isLoading } = useTrending()
  const isMobile = useMediaQuery('(max-width: 767px)')
  const [visibleCount, setVisibleCount] = useState(MOBILE_INITIAL)

  if (isLoading || !coins || coins.length === 0) return null

  const visibleCoins = isMobile ? coins.slice(0, visibleCount) : coins
  const hasMore = isMobile && visibleCount < coins.length

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

      <div className="grid grid-cols-1 gap-3 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
        {visibleCoins.map((coin, i) => (
          <BlurFade key={coin.id} delay={0.1 + i * 0.05}>
            <CoinCard coin={coin} size="compact" />
          </BlurFade>
        ))}
      </div>

      {hasMore && (
        <div className="mt-6 flex justify-center md:hidden">
          <button
            type="button"
            onClick={() => setVisibleCount((c) => c + MOBILE_STEP)}
            className="group border-border bg-surface/60 hover:border-primary/40 hover:bg-elevated flex cursor-pointer items-center gap-2 rounded-lg border px-5 py-2.5 font-mono text-xs font-medium transition-colors"
          >
            Show more
            <ChevronDown className="text-text-secondary group-hover:text-primary size-3.5 transition-transform group-hover:translate-y-0.5" />
          </button>
        </div>
      )}
    </section>
  )
}