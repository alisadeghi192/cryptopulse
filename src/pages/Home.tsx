import { HeroSection } from '@/features/home/components/HeroSection'
import { HeroSkeleton } from '@/features/home/components/HeroSkeleton'
import { useHomeData } from '@/features/home/hooks/useHomeData'

export function Home() {
  const { coins, bitcoin, isPositive, isLoading, error } = useHomeData()

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
      <HeroSection coins={coins} bitcoin={bitcoin} isPositive={isPositive} />
    </main>
  )
}
