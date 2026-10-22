import { Link } from 'react-router'
import { FlashValue } from '@/components/ui/FlashValue'
import { MiniSparkline } from '@/components/ui/MiniSparkline'
import { WatchlistButton } from '@/components/ui/WatchlistButton'
import { cn } from '@/utils/cn'
import type { Coin } from '@/types/coin'

export function WatchlistRow({ coin }: { coin: Coin }) {
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