import { useState } from 'react'
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

export function Dashboard() {
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
      <div className="relative z-10 mx-auto max-w-6xl space-y-6">
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