interface ProfileStatsProps {
  watchlistCount: number
  tradesCount: number
}

export function ProfileStats({
  watchlistCount,
  tradesCount,
}: ProfileStatsProps) {
  return (
    <div className="border-border/60 flex w-full shrink-0 items-center justify-around gap-4 border-t pt-6 md:w-auto md:justify-end md:gap-8 md:border-t-0 md:border-l md:pt-0 md:pl-8">
      <div className="text-center md:text-left">
        <p className="text-text font-mono text-2xl font-bold tabular-nums">
          {watchlistCount}
        </p>
        <p className="text-text/60 mt-0.5 font-mono text-[10px] tracking-widest uppercase">
          Watchlist
        </p>
      </div>
      <div className="text-center md:text-left">
        <p className="text-text font-mono text-2xl font-bold tabular-nums">
          {tradesCount}
        </p>
        <p className="text-text/60 mt-0.5 font-mono text-[10px] tracking-widest uppercase">
          Trades
        </p>
      </div>
    </div>
  )
}