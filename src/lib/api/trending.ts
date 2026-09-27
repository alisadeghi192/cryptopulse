import { apiClient } from '@/lib/axios'
import type { TrendingCoin, TrendingResponse } from '@/types/coin'

export async function fetchTrending(): Promise<TrendingCoin[]> {
  const { data } = await apiClient.get<TrendingResponse>('/search/trending')
  return data.coins
}