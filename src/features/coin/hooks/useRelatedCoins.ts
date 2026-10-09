import { useQuery } from '@tanstack/react-query'
import { fetchRelatedCoins } from '@/lib/api/relatedCoins'

export function useRelatedCoins(
  currentRank: number | undefined,
  excludeId: string | undefined,
) {
  return useQuery({
    queryKey: ['relatedCoins', currentRank, excludeId],
    queryFn: () => fetchRelatedCoins(currentRank!, excludeId!),
    enabled: !!currentRank && !!excludeId,
    staleTime: 1000 * 60 * 5,
  })
}