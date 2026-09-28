import { useMemo } from 'react'
import { useCoins } from '@/hooks/useCoins'
import { useGlobalStats } from '@/hooks/useGlobalStats'

export function useHomeData() {
  const { data: coins, isLoading: coinsLoading, error: coinsError } = useCoins({ perPage: 100 })
  const { data: globalStats, isLoading: statsLoading, error: statsError } = useGlobalStats()

  const bitcoin = useMemo(() => coins?.find((c) => c.id === 'bitcoin'), [coins])
  const isPositive = (bitcoin?.price_change_percentage_24h ?? 0) >= 0

  const { topGainers, topLosers } = useMemo(() => {
    const sorted = [...(coins ?? [])].sort(
      (a, b) => (b.price_change_percentage_24h ?? 0) - (a.price_change_percentage_24h ?? 0)
    )
    return { topGainers: sorted.slice(0, 5), topLosers: sorted.slice(-5).reverse() }
  }, [coins])

  const top10 = useMemo(() => (coins ?? []).slice(0, 10), [coins])

  return {
    bitcoin,
    isPositive,
    globalStats,
    topGainers,
    topLosers,
    top10,
    isLoading: coinsLoading || statsLoading,
    error: coinsError || statsError,
  }
}