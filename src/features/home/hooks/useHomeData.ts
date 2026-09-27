import { useCoins } from '@/hooks/useCoins'

export function useHomeData() {
  const {
    data: coins,
    isLoading,
    error,
  } = useCoins({ perPage: 10 })

  const bitcoin = coins?.find((c) => c.id === 'bitcoin')
  const isPositive = (bitcoin?.price_change_percentage_24h ?? 0) >= 0

  return {
    coins: coins ?? [],
    bitcoin,
    isPositive,
    isLoading,
    error,
  }
}