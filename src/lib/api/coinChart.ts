import { apiClient } from '@/lib/axios'
import type { Time } from 'lightweight-charts'
import type {
  MarketChartResponse,
  TimeRange,
  MarketChartPoint,
} from '@/types/coin'

const DAYS_MAP: Record<TimeRange, string> = {
  '24H': '1',
  '7D': '7',
  '1M': '30',
  '1Y': '365',
}

export async function fetchCoinChart(
  coinId: string,
  range: TimeRange,
  currency = 'usd'
): Promise<MarketChartPoint[]> {
  const days = DAYS_MAP[range]

  const { data } = await apiClient.get<MarketChartResponse>(
    `/coins/${coinId}/market_chart`,
    {
      params: {
        vs_currency: currency,
        days,
      },
    }
  )

return data.prices.map(([timestamp, price]) => ({
  time: Math.floor(timestamp / 1000) as Time,
  value: price,
}))
}