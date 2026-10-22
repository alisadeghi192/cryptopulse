import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { fetchCoins, type FetchCoinsParams } from '@/lib/api/coins'

export function useCoins(
  params: FetchCoinsParams = {},
  enabled = true,
) {
  return useQuery({
    queryKey: ['coins', params],
    queryFn: () => fetchCoins(params),
    enabled,
    staleTime: 1000 * 60 * 2,
    refetchInterval: 1000 * 60 * 2,
    refetchIntervalInBackground: false,
    placeholderData: keepPreviousData,
  })
}