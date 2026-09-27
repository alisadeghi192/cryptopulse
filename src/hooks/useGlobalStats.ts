import { useQuery } from '@tanstack/react-query'
import { fetchGlobalStats } from '@/lib/api/global'

export function useGlobalStats() {
  return useQuery({
    queryKey: ['globalStats'],
    queryFn: fetchGlobalStats,
    staleTime: 1000 * 60 * 5, 
  })
}