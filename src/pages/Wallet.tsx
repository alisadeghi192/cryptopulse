import { useState } from 'react'
import { useWalletStore } from '@/stores/useWalletStore'
import { useHoldingsWithPrice } from '@/features/wallet/hooks/useHoldingsWithPrice'
import { WalletHeader } from '@/features/wallet/components/WalletHeader'
import { PortfolioSummary } from '@/features/wallet/components/PortfolioSummary'
import { HoldingsGrid } from '@/features/wallet/components/HoldingsGrid'
import { TransactionsPreview } from '@/features/wallet/components/TransactionsPreview'
import { DepositModal } from '@/features/wallet/components/DepositModal'
import { WithdrawModal } from '@/features/wallet/components/WithdrawModal'
import { ErrorState } from '@/components/ui/ErrorState'
import { cn } from '@/utils/cn'

export function Wallet() {
  const wallet = useWalletStore((s) => s.wallet)
  const isLoaded = useWalletStore((s) => s.isLoaded)
  const isLoading = useWalletStore((s) => s.isLoading)
  const error = useWalletStore((s) => s.error)
  const { holdingsWithPrice, holdingsValue, totalPnl } = useHoldingsWithPrice()

  const [depositOpen, setDepositOpen] = useState(false)
  const [withdrawOpen, setWithdrawOpen] = useState(false)

  const cashBalance = wallet?.cash_balance ?? 0
  const totalPortfolio = cashBalance + holdingsValue

  // Show error state if initial load failed
  if (error && !isLoaded) {
    return (
      <main className="relative min-h-full bg-background p-6">
        <div className="mx-auto max-w-6xl">
          <ErrorState
            title="Failed to load wallet"
            message="We couldn't connect to the database. Please refresh the page."
            onRetry={() => window.location.reload()}
          />
        </div>
      </main>
    )
  }

  return (
    <main className="relative min-h-full bg-background">
      <div
        className={cn(
          'mx-auto max-w-6xl transition-all duration-500',
          (!isLoaded || isLoading) && 'loading-fade-active',
        )}
      >
        <WalletHeader />
        <PortfolioSummary
          totalPortfolio={totalPortfolio}
          cashBalance={cashBalance}
          holdingsValue={holdingsValue}
          totalPnl={totalPnl}
          onDeposit={() => setDepositOpen(true)}
          onWithdraw={() => setWithdrawOpen(true)}
        />
        <HoldingsGrid holdings={holdingsWithPrice} />
        <TransactionsPreview />
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