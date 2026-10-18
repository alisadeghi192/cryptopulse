import { AmbientLights } from '@/components/ui/AmbientLights'
import { useDashboardData } from '@/features/dashboard/hooks/useDashboardData'
import { DashboardHeader } from '@/features/dashboard/components/DashboardHeader'
import { PortfolioCard } from '@/features/dashboard/components/PortfolioCard'
import { WatchlistPreview } from '@/features/dashboard/components/WatchlistPreview'
import { RecentActivity } from '@/features/dashboard/components/RecentActivity'

export function Dashboard() {
  const {
    displayName,
    initial,
    totalPortfolio,
    cashBalance,
    holdingsValue,
    totalPnl,
    holdingsWithPrice,
    recentTransactions,
    watchlistPreview,
    watchlistCount,
  } = useDashboardData()

  return (
    <main className="relative min-h-full">
      <AmbientLights variant="home" intensity="subtle" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <DashboardHeader displayName={displayName} initial={initial} />

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <PortfolioCard
            totalPortfolio={totalPortfolio}
            cashBalance={cashBalance}
            holdingsValue={holdingsValue}
            totalPnl={totalPnl}
            holdingsCount={holdingsWithPrice.length}
          />
          <WatchlistPreview
            coins={watchlistPreview}
            totalCount={watchlistCount}
          />
        </div>

        <RecentActivity transactions={recentTransactions} />
      </div>
    </main>
  )
}