import { HeroSection } from '@/features/home/components/HeroSection'
import { TopMovers } from '@/features/home/components/TopMovers'
import { GlobalStats } from '@/features/home/components/GlobalStats'
import { TrendingCoins } from '@/features/home/components/TrendingCoins'
import { MarketsPreview } from '@/features/home/components/MarketsPreview'
import { CTASection } from '@/features/home/components/CTASection'
import { useHomeData } from '@/features/home/hooks/useHomeData'
import { useTrending } from '@/hooks/useTrending'
import { AmbientLights } from '@/components/ui/AmbientLights'
import { PageLoader } from '@/components/ui/PageLoader'
import { Head } from '@/components/ui/Head'

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
  const { data: trending, isLoading: trendingLoading } = useTrending()
  const pageLoading = isLoading || trendingLoading

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

  if (pageLoading) {
    return <PageLoader />
  }

  return (
    <main className="animate-[fade-in_0.4s_ease-out]">
      <Head
        fullTitle="CryptoPulse — Real-Time Crypto Tracker"
        description="Track 5,000+ cryptocurrencies with live prices, charts, and a free $1,000 simulated wallet."
        url="/"
      />
      <HeroSection coins={top10} bitcoin={bitcoin} isPositive={isPositive} />

      <div className="mx-auto">
        <div className="relative">
          <AmbientLights variant="home" intensity="subtle" />
          <div className="relative z-10">
            <TopMovers gainers={topGainers} losers={topLosers} />
            {globalStats && <GlobalStats stats={globalStats} />}
            {trending && <TrendingCoins />}
            <MarketsPreview />
          </div>
        </div>
        <CTASection />
      </div>
    </main>
  )
}
