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
import { Head } from '@/components/ui/Head'

const FILTER_LABEL: Record<string, string> = {
  all: 'All',
  top100: 'Top 100',
  top500: 'Top 500',
  top1000: 'Top 1000',
  top5000: 'Top 5000',
}

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

  const columns = useMemo(() => {
    if (maxCoins > 500) {
      return marketsColumns.filter((c) => c.id !== 'sparkline')
    }
    return marketsColumns
  }, [maxCoins])

  if (isLoading) return <MarketsSkeleton />
  if (isError) return <MarketsEmpty variant="error" />

  const isSearchEmpty = debouncedSearch.length > 0 && coins.length === 0
  const searchScope = FILTER_LABEL[filter] ?? 'All'
  const canExpand = filter !== 'all' && filter !== 'top5000'

  return (
    <main className="relative py-8 md:py-12">
      <Head
        title="Markets"
        description="Live prices, 24h change, and market cap for 5,000+ cryptocurrencies. Filter by top 100, 500, or 5,000."
        url="/markets"
      />
      <AmbientLights variant="home" intensity="subtle" />
      <div className="relative z-10 container">
        <MarketsHeader totalCoins={coins.length} />

        <MarketsToolbar
          search={search}
          onSearchChange={setSearch}
          filter={filter}
          onFilterChange={setFilter}
          view={view}
          onViewChange={setView}
          searchScope={searchScope}
          isLoadingMore={isFetchingNextPage}
        />

        {isSearchEmpty ? (
          <MarketsEmpty
            variant="notFound"
            query={debouncedSearch}
            scope={searchScope}
            onClear={() => setSearch('')}
            onExpandScope={canExpand ? () => setFilter('all') : undefined}
            onLoadMore={hasNextPage ? fetchNextPage : undefined}
            isLoadingMore={isFetchingNextPage}
          />
        ) : view === 'table' ? (
          <DataTable
            data={coins}
            columns={columns}
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
