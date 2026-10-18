import { useMemo } from 'react'
import { useAuthStore } from '@/stores/useAuthStore'
import { useWalletStore } from '@/stores/useWalletStore'
import { useWatchlistStore } from '@/stores/useWatchlistStore'
import { useHoldingsWithPrice } from '@/features/wallet/hooks/useHoldingsWithPrice'
import { useCoins } from '@/hooks/useCoins'
import type { Coin } from '@/types/coin'

export function useDashboardData() {
  const user = useAuthStore((s) => s.user)
  const cashBalance = useWalletStore((s) => s.wallet?.cash_balance ?? 0)
  const transactions = useWalletStore((s) => s.transactions)
  const coinIds = useWatchlistStore((s) => s.coinIds)
  const isWatchlistLoaded = useWatchlistStore((s) => s.isLoaded)

  const { holdingsWithPrice, holdingsValue, totalPnl } = useHoldingsWithPrice()

  const ids = useMemo(() => [...coinIds].sort().join(','), [coinIds])

  const { data: watchlistCoins } = useCoins(
    { ids },
    isWatchlistLoaded && coinIds.length > 0,
  )

  const watchlistPreview: Coin[] = useMemo(() => {
    if (!watchlistCoins) return []
    const byId = new Map(watchlistCoins.map((c) => [c.id, c]))
    return coinIds
      .map((id) => byId.get(id))
      .filter((c): c is Coin => !!c)
      .slice(0, 5)
  }, [watchlistCoins, coinIds])

  const totalPortfolio = cashBalance + holdingsValue
  const recentTransactions = transactions.slice(0, 5)

  const displayName =
    (user?.user_metadata?.full_name as string) ??
    user?.email?.split('@')[0] ??
    'User'
  const initial = displayName[0]?.toUpperCase() ?? 'U'

  return {
    displayName,
    initial,
    totalPortfolio,
    cashBalance,
    holdingsValue,
    totalPnl,
    holdingsWithPrice,
    recentTransactions,
    watchlistPreview,
    watchlistCount: coinIds.length,
  }
}