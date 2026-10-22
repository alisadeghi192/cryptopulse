import { useMemo } from 'react'
import { useAuthStore } from '@/stores/useAuthStore'
import { useWalletStore } from '@/stores/useWalletStore'
import { useWatchlistStore } from '@/stores/useWatchlistStore'
import { useHoldingsWithPrice } from '@/features/wallet/hooks/useHoldingsWithPrice'
import { useCoinImages } from '@/hooks/useCoinImages'
import { useTrending } from '@/hooks/useTrending'

export interface AllocationSlice {
  label: string
  value: number
  color: string
  coinId?: string
}

const HOLDING_COLORS = [
  '#F7931A',
  '#627EEA',
  '#14F195',
  '#8247E5',
  '#2775CA',
  '#E6007A',
  '#00A3FF',
]

export function useDashboardData() {
  const user = useAuthStore((s) => s.user)
  const cashBalance = useWalletStore((s) => s.wallet?.cash_balance ?? 0)
  const transactions = useWalletStore((s) => s.transactions)
  const coinIds = useWatchlistStore((s) => s.coinIds)

  const { holdingsWithPrice, holdingsValue, totalPnl } = useHoldingsWithPrice()
  const { data: trending } = useTrending()
  const coinImages = useCoinImages(transactions)

  // Daily P&L: reconstruct 24h-ago value from each holding's 24h change.
  const dailyPnl = useMemo(() => {
    let currentValue = 0
    let previousValue = 0
    for (const h of holdingsWithPrice) {
      if (h.current_price <= 0 || h.amount <= 0) continue
      const change24h = h.change24h ?? 0
      const current = h.amount * h.current_price
      const prev =
        change24h === -100
          ? 0
          : h.amount * (h.current_price / (1 + change24h / 100))
      currentValue += current
      previousValue += prev
    }
    const value = currentValue - previousValue
    const percent = previousValue > 0 ? (value / previousValue) * 100 : 0
    return { value, percent, previousValue }
  }, [holdingsWithPrice])

  // Allocation slices: cash + each holding, sorted by value desc.
  const allocation = useMemo<AllocationSlice[]>(() => {
    const slices: AllocationSlice[] = []

    if (cashBalance > 0) {
      slices.push({
        label: 'Cash',
        value: cashBalance,
        color: '#22C55E',
      })
    }

    const sortedHoldings = [...holdingsWithPrice].sort(
      (a, b) => b.current_value - a.current_value,
    )

    sortedHoldings.forEach((h, i) => {
      if (h.current_value <= 0) return
      slices.push({
        label: h.coin_symbol,
        value: h.current_value,
        color: HOLDING_COLORS[i % HOLDING_COLORS.length],
        coinId: h.coin_id,
      })
    })

    return slices
  }, [cashBalance, holdingsWithPrice])

  // Personal movers: biggest 24h changes among holdings.
  const personalMovers = useMemo(() => {
    const withChange = holdingsWithPrice
      .filter((h) => h.change24h !== undefined)
      .map((h) => ({
        coinId: h.coin_id,
        symbol: h.coin_symbol,
        image: h.image,
        change: h.change24h as number,
        value: h.current_value,
      }))

    const gainers = [...withChange]
      .filter((c) => c.change > 0)
      .sort((a, b) => b.change - a.change)
      .slice(0, 3)

    const losers = [...withChange]
      .filter((c) => c.change < 0)
      .sort((a, b) => a.change - b.change)
      .slice(0, 3)

    return { gainers, losers }
  }, [holdingsWithPrice])

  const totalPortfolio = cashBalance + holdingsValue

  const displayName =
    (user?.user_metadata?.full_name as string) ??
    user?.email?.split('@')[0] ??
    'User'
  const initial = displayName[0]?.toUpperCase() ?? 'U'
  const avatarUrl = (user?.user_metadata?.avatar_url as string) || null

  return {
    displayName,
    initial,
    avatarUrl,
    totalPortfolio,
    cashBalance,
    holdingsValue,
    totalPnl,
    dailyPnl,
    allocation,
    holdingsWithPrice,
    watchlistCount: coinIds.length,
    personalMovers,
    trending: trending ?? [],
    recentTransactions: transactions.slice(0, 3),
    allTransactions: transactions,
    coinImages,
  }
}