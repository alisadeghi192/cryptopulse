import { useMemo, useState } from 'react'
import { Star, Compass, Search, TrendingUp } from 'lucide-react'
import { Link } from 'react-router'
import { useCoins } from '@/hooks/useCoins'
import { useWatchlistStore } from '@/stores/useWatchlistStore'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useDebounce } from '@/hooks/useDebounce'
import { CoinCard } from '@/features/coin/components/CoinCard'
import { MarketsSkeleton } from '@/features/markets/components/MarketsSkeleton'
import { MarketsEmpty } from '@/features/markets/components/MarketsEmpty'
import { FlashValue } from '@/components/ui/FlashValue'
import { MiniSparkline } from '@/components/ui/MiniSparkline'
import { WatchlistButton } from '@/components/ui/WatchlistButton'
import { AmbientLights } from '@/components/ui/AmbientLights'
import { BlurFade } from '@/components/ui/BlurFade'
import { buttonVariants } from '@/components/ui/Button'
import { cn } from '@/utils/cn'
import type { Coin } from '@/types/coin'

export function Watchlist() {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)

  const coinIds = useWatchlistStore((s) => s.coinIds)
  const isLoaded = useWatchlistStore((s) => s.isLoaded)
  const isMobile = useMediaQuery('(max-width: 767px)')

  const ids = useMemo(() => [...coinIds].sort().join(','), [coinIds])

  const { data: allCoins, isLoading } = useCoins(
    { ids },
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

  const isLoadingPage = isLoading || !isLoaded
  const isSearchEmpty = debouncedSearch.length > 0 && coins.length === 0

  // Stats: avg 24h change of watchlist
  const avgChange = useMemo(() => {
    if (watchlistCoins.length === 0) return 0
    const total = watchlistCoins.reduce(
      (sum, c) => sum + (c.price_change_percentage_24h ?? 0),
      0,
    )
    return total / watchlistCoins.length
  }, [watchlistCoins])

  return (
    <main className="relative">
      <div>
        {/* ─── Header Card ─── */}
        <BlurFade>
          <div className="relative mb-8 shadow-xl overflow-hidden rounded-3xl">
            <div className="pointer-events-none absolute inset-0">
              <AmbientLights variant="hero" intensity="normal" />
            </div>

            <div className="border-border/40 bg-surface/40 relative rounded-3xl border shadow-2xl backdrop-blur-3xl">
              <div className="px-6 pt-8 pb-6 md:px-8 md:pt-10 md:pb-6">
                {/* Top: Title + Stats */}
                <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end md:gap-8">
                  <div>
                    <div className="text-text/70 mb-2 flex items-center gap-2 font-mono text-xs tracking-widest uppercase">
                      <Star className="text-primary h-3.5 w-3.5" />
                      Your collection
                    </div>
                    <h1 className="font-display text-text text-3xl font-bold tracking-tight md:text-4xl">
                      Watchlist
                    </h1>
                  </div>

                  {!isLoadingPage && watchlistCoins.length > 0 && (
                    <div className="flex items-center gap-6">
                      <div className="text-left md:text-right">
                        <p className="text-text font-mono text-2xl font-bold tabular-nums">
                          {watchlistCoins.length}
                        </p>
                        <p className="text-text/60 mt-0.5 font-mono text-[10px] tracking-widest uppercase">
                          Coins tracked
                        </p>
                      </div>

                      <div className="bg-border/40 h-10 w-px" />

                      <div className="text-left md:text-right">
                        <p
                          className={cn(
                            'flex items-center gap-1 font-mono text-2xl font-bold tabular-nums',
                            avgChange >= 0 ? 'text-success' : 'text-error',
                          )}
                        >
                          {avgChange >= 0 ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : (
                            <TrendingUp className="h-4 w-4 rotate-180" />
                          )}
                          {avgChange >= 0 ? '+' : ''}
                          {avgChange.toFixed(2)}%
                        </p>
                        <p className="text-text/60 mt-0.5 font-mono text-[10px] tracking-widest uppercase">
                          Avg 24h
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Search */}
                {!isLoadingPage && watchlistCoins.length > 0 && (
                  <div className="border-border/60 shadow-md bg-background/40 focus-within:border-primary/50 mt-6 flex h-11 items-center gap-2 rounded-xl border px-3 backdrop-blur-sm transition-all focus-within:shadow-[0_0_0_3px_rgba(255,193,7,0.1)]">
                    <Search className="text-text/70 h-4 w-4 shrink-0" />
                    <input
                      type="text"
                      placeholder="Search in your watchlist..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="text-text placeholder:text-text/40 h-full w-full bg-transparent font-mono text-sm outline-none"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </BlurFade>

        {/* ─── Content ─── */}
        {isLoadingPage ? (
          <MarketsSkeleton />
        ) : watchlistCoins.length === 0 ? (
          <EmptyState />
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
      </div>
    </main>
  )
}

/* ─── Desktop Grid ─── */
function WatchlistGrid({ coins }: { coins: Coin[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {coins.map((coin, i) => (
        <BlurFade key={coin.id} delay={0.02 + (i % 8) * 0.03}>
          <CoinCard coin={coin} size="default" />
        </BlurFade>
      ))}
    </div>
  )
}

/* ─── Mobile Rows ─── */
function WatchlistRows({ coins }: { coins: Coin[] }) {
  return (
    <div className="flex flex-col gap-2">
      {coins.map((coin, i) => (
        <BlurFade key={coin.id} delay={0.02 + (i % 8) * 0.03}>
          <WatchlistRow coin={coin} />
        </BlurFade>
      ))}
    </div>
  )
}

function WatchlistRow({ coin }: { coin: Coin }) {
  const change = coin.price_change_percentage_24h ?? 0
  const isPositive = change >= 0
  const sparkData = coin.sparkline_in_7d?.price ?? []
  const sparkPositive =
    sparkData.length > 1
      ? sparkData[sparkData.length - 1] >= sparkData[0]
      : isPositive

  return (
    <Link
      to={`/coin/${coin.id}`}
      className="border-border/40 shadow-md bg-surface/40 hover:border-border hover:bg-elevated/30 group flex items-center gap-3 rounded-xl border p-3 backdrop-blur-xl transition-colors"
    >
      <span className="text-text-secondary w-5 shrink-0 text-center font-mono text-[10px]">
        {coin.market_cap_rank}
      </span>

      <img
        src={coin.image}
        alt={coin.name}
        className="h-9 w-9 shrink-0 rounded-full"
      />

      <div className="min-w-0 flex-1">
        <p className="text-text truncate text-sm font-medium">{coin.name}</p>
        <p className="text-text-secondary font-mono text-[10px] uppercase">
          {coin.symbol}
        </p>
      </div>

      {sparkData.length > 1 && (
        <div className="hidden shrink-0 sm:block">
          <MiniSparkline
            data={sparkData}
            isPositive={sparkPositive}
            width={70}
            height={28}
          />
        </div>
      )}

      <div className="shrink-0 text-right">
        <p className="text-text font-mono text-sm tabular-nums">
          $
          <FlashValue
            value={coin.current_price}
            decimals={coin.current_price < 1 ? 4 : 2}
          />
        </p>
        <p
          className={cn(
            'font-mono text-xs tabular-nums',
            isPositive ? 'text-success' : 'text-error',
          )}
        >
          {isPositive ? '+' : ''}
          {change.toFixed(2)}%
        </p>
      </div>

      <div className="shrink-0 pl-1">
        <WatchlistButton coinId={coin.id} size="sm" />
      </div>
    </Link>
  )
}

/* ─── Empty ─── */
function EmptyState() {
  return (
    <BlurFade delay={0.1}>
      <div className="border-border bg-surface/30 shadow-xl relative overflow-hidden rounded-2xl border backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0">
          <AmbientLights variant="gold" intensity="subtle" />
        </div>
        <div className="relative flex flex-col items-center gap-6 p-12 text-center">
          <div className="border-border bg-elevated/60 flex size-16 items-center justify-center rounded-2xl border shadow-sm">
            <Star className="text-text-secondary h-7 w-7" />
          </div>

          <div>
            <p className="text-text font-mono text-sm font-medium">
              Your watchlist is empty
            </p>
            <p className="text-text-secondary mt-1.5 font-mono text-xs">
              Add coins you want to track — they'll appear here
            </p>
          </div>

          <Link
            to="/markets"
            className={cn(
              buttonVariants({ variant: 'primary', size: 'md' }),
              'gap-2',
            )}
          >
            <Compass className="h-4 w-4" />
            Explore Markets
          </Link>
        </div>
      </div>
    </BlurFade>
  )
}
