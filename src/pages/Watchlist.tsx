import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { Star } from 'lucide-react'
import { useCoins } from '@/hooks/useCoins'
import { useWatchlistStore } from '@/stores/useWatchlistStore'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useDebounce } from '@/hooks/useDebounce'
import { MarketsSkeleton } from '@/features/markets/components/MarketsSkeleton'
import { MarketsEmpty } from '@/features/markets/components/MarketsEmpty'
import { WatchlistHeader } from '@/features/watchlist/components/WatchlistHeader'
import { WatchlistGrid } from '@/features/watchlist/components/WatchlistGrid'
import { WatchlistRows } from '@/features/watchlist/components/WatchlistRows'
import { EmptyState } from '@/components/ui/EmptyState'
import { buttonVariants } from '@/components/ui/Button'
import { cn } from '@/utils/cn'
import type { Coin } from '@/types/coin'
import { Head } from '@/components/ui/Head'

export function Watchlist() {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)

  const coinIds = useWatchlistStore((s) => s.coinIds)
  const isLoaded = useWatchlistStore((s) => s.isLoaded)
  const isMobile = useMediaQuery('(max-width: 767px)')

  const ids = useMemo(() => [...coinIds].sort().join(','), [coinIds])

  const { data: allCoins, isLoading } = useCoins(
    { ids, perPage: 250 },
    isLoaded && coinIds.length > 0,
  )

  const watchlistCoins = useMemo(() => {
    if (!allCoins) return []
    const byId = new Map(allCoins.map((c) => [c.id, c]))
    return coinIds.map((id) => byId.get(id)).filter((c): c is Coin => !!c)
  }, [allCoins, coinIds])

  const coins = useMemo(() => {
    if (!debouncedSearch) return watchlistCoins
    const q = debouncedSearch.toLowerCase()
    return watchlistCoins.filter(
      (c) =>
        c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q),
    )
  }, [watchlistCoins, debouncedSearch])

  const isLoadingPage = !isLoaded || (isLoading && !allCoins)
  const isSearchEmpty = debouncedSearch.length > 0 && coins.length === 0

  const avgChange = useMemo(() => {
    if (watchlistCoins.length === 0) return 0
    const total = watchlistCoins.reduce(
      (sum, c) => sum + (c.price_change_percentage_24h ?? 0),
      0,
    )
    return total / watchlistCoins.length
  }, [watchlistCoins])

  const showStats = !isLoadingPage && watchlistCoins.length > 0

  return (
    <main className="relative">
      <Head
        title="Watchlist"
        description="Cryptocurrencies you're tracking."
        url="/watchlist"
        noIndex
      />
      <WatchlistHeader
        count={watchlistCoins.length}
        avgChange={avgChange}
        search={search}
        onSearchChange={setSearch}
        showStats={showStats}
      />

      {isLoadingPage ? (
        <MarketsSkeleton />
      ) : watchlistCoins.length === 0 ? (
        <EmptyState
          icon={Star}
          title="Your watchlist is empty"
          description="Add coins you want to track — they'll appear here"
          variant="gold"
          action={
            <Link
              to="/markets"
              className={cn(
                buttonVariants({ variant: 'primary', size: 'md' }),
                'gap-2',
              )}
            >
              Explore Markets
            </Link>
          }
        />
      ) : isSearchEmpty ? (
        <MarketsEmpty
          variant="notFound"
          query={debouncedSearch}
          onClear={() => setSearch('')}
        />
      ) : isMobile ? (
        <WatchlistRows coins={coins} />
      ) : (
        <WatchlistGrid coins={coins} />
      )}
    </main>
  )
}
