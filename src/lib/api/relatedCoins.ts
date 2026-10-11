import { apiClient } from '@/lib/axios'
import type { Coin } from '@/types/coin'

export async function fetchRelatedCoins(
  currentRank: number,
  excludeId: string,
): Promise<Coin[]> {
  const page = Math.max(1, Math.floor(currentRank / 20) + 1)

  const { data } = await apiClient.get<Coin[]>('/coins/markets', {
    params: {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: 20,
      page,
      sparkline: true,
    },
  })

  return data
    .filter((c) => c.id !== excludeId)
    .sort(
      (a, b) =>
        Math.abs(a.market_cap_rank - currentRank) -
        Math.abs(b.market_cap_rank - currentRank),
    )
    .slice(0, 4)
}