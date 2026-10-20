import { Link } from 'react-router'
import { FlashValue } from '@/components/ui/FlashValue'
import { WatchlistButton } from '@/components/ui/WatchlistButton'
import { cn } from '@/utils/cn'
import type { Coin } from '@/types/coin'

interface MarketsMobileCardProps {
  coin: Coin
}

export function MarketsMobileCard({ coin }: MarketsMobileCardProps) {
  const change24h = coin.price_change_percentage_24h ?? 0
  const isPositive = change24h >= 0

  return (
    <Link
      to={`/coin/${coin.id}`}
      className="border-border bg-surface shadow-md flex items-center gap-3 rounded-xl border p-3 transition-colors"
    >
      {/* Rank */}
      <span className="text-text-secondary w-6 shrink-0 font-mono text-xs">
        {coin.market_cap_rank}
      </span>

      {/* Logo */}
      <img
        src={coin.image}
        alt={coin.name}
        className="h-9 w-9 shrink-0 rounded-full"
      />

      {/* Name + Symbol */}
      <div className="min-w-0 flex-1">
        <p className="text-text truncate text-sm font-medium">{coin.name}</p>
        <p className="text-text-secondary font-mono text-[10px] uppercase">
          {coin.symbol}
        </p>
      </div>

      {/* Price + Change */}
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
          {change24h.toFixed(2)}%
        </p>
      </div>

      {/* Star */}
      <WatchlistButton coinId={coin.id} size="sm" />
    </Link>
  )
}
