import { apiClient } from '@/lib/axios'
import type { Coin } from '@/types/coin'

export interface FetchCoinsParams {
  page?: number
  perPage?: number
  order?: 'market_cap_desc' | 'market_cap_asc' | 'volume_desc'
  currency?: string
  sparkline?: boolean
  ids?: string
}

export async function fetchCoins({
  page = 1,
  perPage = 100,
  order = 'market_cap_desc',
  currency = 'usd',
  sparkline = false,
  ids,
}: FetchCoinsParams = {}): Promise<Coin[]> {
  const { data } = await apiClient.get<Coin[]>('/coins/markets', {
    params: {
      vs_currency: currency,
      order,
      per_page: perPage,
      page,
      sparkline,
      price_change_percentage: '1h,24h,7d',
      ...(ids && { ids }),
    },
  })

  return data
}