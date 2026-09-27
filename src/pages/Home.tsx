import { HeroSection } from '@/features/home/components/HeroSection'
import { HeroSkeleton } from '@/features/home/components/HeroSkeleton'
import { TopMovers } from '@/features/home/components/TopMovers'
import { GlobalStats } from '@/features/home/components/GlobalStats'
import { TrendingCoins } from '@/features/home/components/TrendingCoins'
import { useHomeData } from '@/features/home/hooks/useHomeData'
import { useTrending } from '@/hooks/useTrending'
import { CTASection } from '@/features/home/components/CTASection'
export function Home() {
  const { coins, bitcoin, isPositive, globalStats, isLoading, error } =
    useHomeData()
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
      {/* ─── Hero ───────────────────────────── */}
      <HeroSection coins={coins} bitcoin={bitcoin} isPositive={isPositive} />

      {/* ─── Sections ────────────────────────── */}
      <div className="mx-auto sm:px-2 md:px-4 lg:px-6 xl:px-10">
        {/* Top Movers */}
        <TopMovers coins={coins} />

        {/* Global Stats */}
        {globalStats && <GlobalStats stats={globalStats} />}

        {/* Trending */}
        {trending && <TrendingCoins coins={trending} />}

        {/* CTA actions */}
        <CTASection />
      </div>
    </main>
  )
}