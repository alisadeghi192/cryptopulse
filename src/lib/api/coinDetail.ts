import { apiClient } from '@/lib/axios'
import type { CoinDetail } from '@/types/coin'

export async function fetchCoinDetail(id: string): Promise<CoinDetail> {
  const { data } = await apiClient.get<CoinDetail>(`/coins/${id}`, {
    params: {
      localization: false,
      tickers: false,
      market_data: true,
      community_data: true,
      developer_data: true,
      sparkline: false,
    },
  })

  return data
}
