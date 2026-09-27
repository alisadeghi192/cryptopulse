import { useCoins } from '@/hooks/useCoins'
import { useGlobalStats } from '@/hooks/useGlobalStats'

export function useHomeData() {
  const {
    data: coins,
    isLoading: coinsLoading,
    error: coinsError,
  } = useCoins({ perPage: 100 })

  const {
    data: globalStats,
    isLoading: statsLoading,
    error: statsError,
  } = useGlobalStats()

  const bitcoin = coins?.find((c) => c.id === 'bitcoin')
  const isPositive = (bitcoin?.price_change_percentage_24h ?? 0) >= 0

  return {
    coins: coins ?? [],
    bitcoin,
    isPositive,
    globalStats,
    isLoading: coinsLoading || statsLoading,
    error: coinsError || statsError,
  }
}