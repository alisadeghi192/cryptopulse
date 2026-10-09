import { useQuery } from '@tanstack/react-query'
import { fetchCoinDetail } from '@/lib/api/coinDetail'

export function useCoinDetail(id: string | undefined) {
  return useQuery({
    queryKey: ['coin', id],
    queryFn: () => fetchCoinDetail(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  })
}