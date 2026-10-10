import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchCoins } from '@/lib/api/coins'

const PER_PAGE = 100

export function useInfiniteCoins(maxCoins: number = 5000) {
  const maxPages = Math.ceil(maxCoins / PER_PAGE)
  const sparkline = maxCoins <= 500

  return useInfiniteQuery({
    queryKey: ['coins', 'infinite', maxCoins , sparkline],
    queryFn: ({ pageParam = 1 }) =>
      fetchCoins({
        page: pageParam,
        perPage: PER_PAGE,
        sparkline
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < PER_PAGE) return undefined
      if (allPages.length >= maxPages) return undefined
      return allPages.length + 1
    },
    staleTime: 1000 * 60 * 5,
  })
}