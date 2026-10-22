import { Star, Search, TrendingUp } from 'lucide-react'
import { AmbientLights } from '@/components/ui/AmbientLights'
import { BlurFade } from '@/components/ui/BlurFade'
import { cn } from '@/utils/cn'

interface WatchlistHeaderProps {
  count: number
  avgChange: number
  search: string
  onSearchChange: (value: string) => void
  showStats: boolean
}

export function WatchlistHeader({
  count,
  avgChange,
  search,
  onSearchChange,
  showStats,
}: WatchlistHeaderProps) {
  return (
    <BlurFade>
      <div className="relative mb-8 shadow-xl overflow-hidden rounded-3xl">
        <div className="pointer-events-none absolute inset-0">
          <AmbientLights variant="hero" intensity="normal" />
        </div>

        <div className="border-border/40 bg-surface/40 relative rounded-3xl border shadow-2xl backdrop-blur-3xl">
          <div className="px-6 pt-8 pb-6 md:px-8 md:pt-10 md:pb-6">
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

              {showStats && (
                <div className="flex items-center gap-6">
                  <div className="text-left md:text-right">
                    <p className="text-text font-mono text-2xl font-bold tabular-nums">
                      {count}
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

            {showStats && (
              <div className="border-border/60 shadow-md bg-background/40 focus-within:border-primary/50 mt-6 flex h-11 items-center gap-2 rounded-xl border px-3 backdrop-blur-sm transition-all focus-within:shadow-[0_0_0_3px_rgba(255,193,7,0.1)]">
                <Search className="text-text/70 h-4 w-4 shrink-0" />
                <input
                  type="text"
                  placeholder="Search in your watchlist..."
                  value={search}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="text-text placeholder:text-text/40 h-full w-full bg-transparent font-mono text-sm outline-none"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </BlurFade>
  )
}