import type { ColumnDef } from '@tanstack/react-table'
import { FlashValue } from '@/components/ui/FlashValue'
import { MiniSparkline } from '@/components/ui/MiniSparkline'
import { WatchlistButton } from '@/components/ui/WatchlistButton'
import { cn } from '@/utils/cn'
import type { Coin } from '@/types/coin'

export const marketsColumns: ColumnDef<Coin, any>[] = [
  // 1. Rank
  {
    accessorKey: 'market_cap_rank',
    header: '#',
    size: 60,
    cell: ({ row }) => (
      <span className="text-text-secondary font-mono text-sm">
        {row.original.market_cap_rank}
      </span>
    ),
  },

  // 2. Coin (Name & Symbol)
  {
    accessorKey: 'name',
    header: 'Coin',
    size: 240,
    minSize: 240,
    cell: ({ row }) => {
      const coin = row.original
      return (
        <div className="flex min-w-0 items-center gap-3">
          <img
            src={coin.image}
            alt={coin.name}
            className="h-8 w-8 shrink-0 rounded-full"
          />
          <div className="min-w-0">
            <p className="text-text truncate text-sm font-medium">
              {coin.name}
            </p>
            <p className="text-text-secondary font-mono text-xs uppercase">
              {coin.symbol}
            </p>
          </div>
        </div>
      )
    },
  },

  // 3. Price
  {
    accessorKey: 'current_price',
    header: 'Price',
    size: 130,
    meta: { align: 'right' },
    cell: ({ row }) => {
      const price = row.original.current_price
      return (
        <div className="text-right">
          <span className="text-text font-mono text-sm">
            $<FlashValue value={price} decimals={price < 1 ? 4 : 2} />
          </span>
        </div>
      )
    },
  },

  // 4. 1h
  {
    accessorKey: 'price_change_percentage_1h_in_currency',
    header: '1h',
    size: 90,
    meta: { align: 'right', hideBelow: 'lg' },
    cell: ({ row }) => {
      const change = row.original.price_change_percentage_1h_in_currency ?? 0
      return <ChangeCell value={change} />
    },
  },

  // 5. 24h
  {
    accessorKey: 'price_change_percentage_24h',
    header: '24h',
    size: 90,
    meta: { align: 'right' },
    cell: ({ row }) => {
      const change = row.original.price_change_percentage_24h ?? 0
      return <ChangeCell value={change} />
    },
  },

  // 6. 7d
  {
    accessorKey: 'price_change_percentage_7d_in_currency',
    header: '7d',
    size: 90,
    meta: { align: 'right', hideBelow: 'lg' },
    cell: ({ row }) => {
      const change = row.original.price_change_percentage_7d_in_currency ?? 0
      return <ChangeCell value={change} />
    },
  },

  // 7. Sparkline
  {
    id: 'sparkline',
    header: 'Last 7d',
    size: 120,
    meta: { align: 'center' },
    cell: ({ row }) => {
      const data = row.original.sparkline_in_7d?.price ?? []
      const isPositive =
        (row.original.price_change_percentage_7d_in_currency ?? 0) >= 0
      return (
        <div className="flex w-full items-center justify-center">
          <MiniSparkline
            data={data}
            isPositive={isPositive}
            width={90}
            height={32}
          />
        </div>
      )
    },
  },

  // 8. Market Cap
  {
    accessorKey: 'market_cap',
    header: 'Market Cap',
    size: 140,
    meta: { align: 'center', hideBelow: 'xl' },
    cell: ({ row }) => (
      <div className="w-full text-center font-mono text-sm tabular-nums">
        ${(row.original.market_cap / 1_000_000_000).toFixed(1)}B
      </div>
    ),
  },

  // 9. Volume
  {
    accessorKey: 'total_volume',
    header: 'Volume',
    size: 140,
    meta: { align: 'center', hideBelow: 'xl' },
    cell: ({ row }) => (
      <div className="w-full text-center font-mono text-sm tabular-nums">
        ${(row.original.total_volume / 1_000_000_000).toFixed(1)}B
      </div>
    ),
  },

  // 10. Watchlist
  {
    id: 'watchlist',
    header: 'Watch',
    size: 70,
    meta: { align: 'center' },
    cell: ({ row }) => (
      <div className="flex w-full items-center justify-center">
        <WatchlistButton coinId={row.original.id} size="sm" />
      </div>
    ),
  },
]

function ChangeCell({ value }: { value: number }) {
  const isPositive = value >= 0
  return (
    <div
      className={cn(
        'w-full text-right font-mono text-sm tabular-nums',
        isPositive ? 'text-success' : 'text-error',
      )}
    >
      {isPositive ? '+' : ''}
      {value.toFixed(2)}%
    </div>
  )
}