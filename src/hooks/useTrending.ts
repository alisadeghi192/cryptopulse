import { useQuery } from '@tanstack/react-query'
import { fetchTrending } from '@/lib/api/trending'

export function useTrending() {
  return useQuery({
    queryKey: ['trending'],
    queryFn: fetchTrending,
    staleTime: 1000 * 60 * 10,  
  })
}