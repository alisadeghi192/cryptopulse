import { useQuery } from '@tanstack/react-query'
import { fetchCoinChart } from '@/lib/api/coinChart'
import type { TimeRange } from '@/types/coin'

export function useCoinChart(coinId: string | undefined, range: TimeRange) {
  return useQuery({
    queryKey: ['coinChart', coinId, range],
    queryFn: () => fetchCoinChart(coinId!, range),
    enabled: !!coinId,
    staleTime: 1000 * 60 * 5,
  })
}