import { useState } from 'react'
import { useWalletStore } from '@/stores/useWalletStore'
import { useDashboardData } from '@/features/dashboard/hooks/useDashboardData'
import {
  WelcomeCard,
  AllocationDonut,
  PersonalMovers,
  QuickActions,
  TrendingNow,
  RecentTransactions,
} from '@/features/dashboard/components'
import { DepositModal } from '@/features/wallet/components/DepositModal'
import { WithdrawModal } from '@/features/wallet/components/WithdrawModal'
import { cn } from '@/utils/cn'
import { Head } from '@/components/ui/Head'

export function Dashboard() {
  const isLoaded = useWalletStore((s) => s.isLoaded)
  const {
    displayName,
    initial,
    avatarUrl,
    totalPortfolio,
    cashBalance,
    holdingsValue,
    dailyPnl,
    allocation,
    holdingsWithPrice,
    personalMovers,
    trending,
    recentTransactions,
    allTransactions,
    coinImages,
  } = useDashboardData()

  const [depositOpen, setDepositOpen] = useState(false)
  const [withdrawOpen, setWithdrawOpen] = useState(false)

  return (
    <main className="relative min-h-full">
      <Head
        title="Dashboard"
        description="Your personal portfolio dashboard."
        url="/dashboard"
        noIndex
      />
      <div
        className={cn(
          'relative z-10 mx-auto max-w-6xl space-y-6 transition-all duration-500',
          !isLoaded && 'loading-fade-active',
        )}
      >
        <WelcomeCard
          displayName={displayName}
          initial={initial}
          avatarUrl={avatarUrl}
          totalPortfolio={totalPortfolio}
          holdingsValue={holdingsValue}
          holdingsCount={holdingsWithPrice.length}
          dailyPnl={dailyPnl}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <AllocationDonut slices={allocation} total={totalPortfolio} />
          <PersonalMovers
            gainers={personalMovers.gainers}
            losers={personalMovers.losers}
          />
        </div>

        <QuickActions
          onDeposit={() => setDepositOpen(true)}
          onWithdraw={() => setWithdrawOpen(true)}
        />

        <TrendingNow coins={trending} />

        <RecentTransactions
          transactions={recentTransactions}
          allTransactions={allTransactions}
          coinImages={coinImages}
        />
      </div>

      <DepositModal
        open={depositOpen}
        onClose={() => setDepositOpen(false)}
        currentBalance={cashBalance}
      />
      <WithdrawModal
        open={withdrawOpen}
        onClose={() => setWithdrawOpen(false)}
        currentBalance={cashBalance}
      />
    </main>
  )
}
