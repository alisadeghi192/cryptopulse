// src/pages/Home.tsx
import { HeroSection } from '@/features/home/components/HeroSection'
import { HeroSkeleton } from '@/features/home/components/HeroSkeleton'
import { TopMovers } from '@/features/home/components/TopMovers'
import { GlobalStats } from '@/features/home/components/GlobalStats'
import { TrendingCoins } from '@/features/home/components/TrendingCoins'
import { MarketsPreview } from '@/features/home/components/MarketsPreview'
import { CTASection } from '@/features/home/components/CTASection'
import { useHomeData } from '@/features/home/hooks/useHomeData'
import { useTrending } from '@/hooks/useTrending'
import { AmbientLights } from '@/components/ui/AmbientLights'

export function Home() {
  const {
    bitcoin,
    isPositive,
    globalStats,
    topGainers,
    topLosers,
    top10,
    isLoading,
    error,
  } = useHomeData()
  const { data: trending } = useTrending()

  if (isLoading) return <HeroSkeleton />

  if (error) {
    return (
      <main className="container mx-auto px-6 py-12 lg:px-8">
        <div className="flex h-96 flex-col items-center justify-center gap-4">
          <p className="text-error font-mono text-sm">
            Failed to load market data.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="text-primary hover:text-primary-hover font-mono text-xs underline-offset-4 hover:underline"
          >
            Try again
          </button>
        </div>
      </main>
    )
  }

  return (
    <main>
      <HeroSection coins={top10} bitcoin={bitcoin} isPositive={isPositive} />
      <div className="mx-auto">
        <div className="relative">
          <AmbientLights variant="home" intensity="subtle" />

          <div className="relative z-10">
            <TopMovers gainers={topGainers} losers={topLosers} />
            {globalStats && <GlobalStats stats={globalStats} />}
            {trending && <TrendingCoins coins={trending} />}
            <MarketsPreview />
          </div>
        </div>
        <CTASection />
      </div>
    </main>
  )
}
