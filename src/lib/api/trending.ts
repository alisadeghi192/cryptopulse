import { apiClient } from '@/lib/axios'
import type { TrendingResponse, Coin } from '@/types/coin'

interface TrendingItem {
  id: string
  name: string
  symbol: string
  market_cap_rank: number
  large: string
  data: {
    price: number
    price_change_percentage_24h: { usd: number }
    market_cap: string
    total_volume: string
    sparkline: string
  }
}

// Step 1: get trending IDs from /search/trending
async function fetchTrendingIds(): Promise<TrendingItem[]> {
  const { data } = await apiClient.get<TrendingResponse>('/search/trending')
  return data.coins.map((c) => c.item)
}

// Step 2: get full data (with real sparkline) from /coins/markets
async function fetchTrendingCoins(ids: string[]): Promise<Coin[]> {
  const { data } = await apiClient.get<Coin[]>('/coins/markets', {
    params: {
      vs_currency: 'usd',
      ids: ids.join(','),
      sparkline: true,
      price_change_percentage: '24h,7d',
      order: 'market_cap_desc',
    },
  })
  return data
}

// Main: combine both
export async function fetchTrending(): Promise<Coin[]> {
  const trendingItems = await fetchTrendingIds()
  const ids = trendingItems.map((t) => t.id).slice(0, 12)

  if (ids.length === 0) return []

  const coins = await fetchTrendingCoins(ids)

  // Preserve trending order (CoinGecko /coins/markets returns by market cap)
  const coinMap = new Map(coins.map((c) => [c.id, c]))
  return ids
    .map((id) => coinMap.get(id))
    .filter((c): c is Coin => !!c)
}