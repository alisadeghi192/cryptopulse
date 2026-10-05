import { useMemo } from 'react'
import { DataTable } from '@/components/ui/DataTable'
import { marketsColumns } from '@/features/markets/components/columns'
import { useInfiniteCoins } from '@/features/markets/hooks/useInfiniteCoins'
import { useMarketsFilters } from '@/features/markets/hooks/useMarketsFilters'
import { useDebounce } from '@/hooks/useDebounce'
import { MarketsToolbar } from '@/features/markets/components/MarketsToolbar'
import { MarketsHeader } from '@/features/markets/components/MarketsHeader'
import { MarketsSkeleton } from '@/features/markets/components/MarketsSkeleton'
import { MarketsEmpty } from '@/features/markets/components/MarketsEmpty'
import type { Coin } from '@/types/coin'
import { MarketsGrid } from '@/features/markets/components/MarketsGrid'
import { MarketsMobileCard } from '@/features/markets/components/MarketsMobileCard'
import { AmbientLights } from '@/components/ui/AmbientLights'
export function Markets() {
  const { filter, view, search, maxCoins, setFilter, setView, setSearch } =
    useMarketsFilters()

  const debouncedSearch = useDebounce(search, 400)

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteCoins(maxCoins)

  const allCoins: Coin[] = useMemo(() => data?.pages.flat() ?? [], [data])

  const coins = useMemo(() => {
    if (!debouncedSearch) return allCoins
    const q = debouncedSearch.toLowerCase()
    return allCoins.filter(
      (c) =>
        c.name.toLowerCase().includes(q) || c.symbol.toLowerCase().includes(q),
    )
  }, [allCoins, debouncedSearch])

  if (isLoading) return <MarketsSkeleton />
  if (isError) return <MarketsEmpty variant="error" />

  const isSearchEmpty = debouncedSearch.length > 0 && coins.length === 0

  return (
    <main className="relative py-8 md:py-12">
      <AmbientLights variant="home" intensity="subtle" />
      <div className='relative z-10 container'>
        <MarketsHeader totalCoins={coins.length} />

        <MarketsToolbar
          search={search}
          onSearchChange={setSearch}
          filter={filter}
          onFilterChange={setFilter}
          view={view}
          onViewChange={setView}
        />

        {isSearchEmpty ? (
          <MarketsEmpty
            variant="notFound"
            query={debouncedSearch}
            onClear={() => setSearch('')}
          />
        ) : view === 'table' ? (
          <DataTable
            data={coins}
            columns={marketsColumns}
            virtualize
            estimateSize={56}
            onLoadMore={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            mobileCardRender={(coin) => <MarketsMobileCard coin={coin} />}
          />
        ) : (
          <MarketsGrid
            coins={coins}
            onLoadMore={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        )}
      </div>
    </main>
  )
}
