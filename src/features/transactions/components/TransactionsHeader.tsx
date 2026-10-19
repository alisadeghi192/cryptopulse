import { Receipt, Search, X } from 'lucide-react'
import { AmbientLights } from '@/components/ui/AmbientLights'
import { BlurFade } from '@/components/ui/BlurFade'
import { formatBalance } from '@/utils/format'
import { cn } from '@/utils/cn'
import type { TransactionFilter } from './TransactionsFilters'

interface TransactionsHeaderProps {
  total: number
  volume: number
  filter: TransactionFilter
  onFilterChange: (value: TransactionFilter) => void
  counts: Record<TransactionFilter, number>
  search: string
  onSearchChange: (value: string) => void
}

const FILTERS: { value: TransactionFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'deposit', label: 'Deposit' },
  { value: 'withdraw', label: 'Withdraw' },
  { value: 'buy', label: 'Buy' },
  { value: 'sell', label: 'Sell' },
]

export function TransactionsHeader({
  total,
  volume,
  filter,
  onFilterChange,
  counts,
  search,
  onSearchChange,
}: TransactionsHeaderProps) {
  return (
    <BlurFade>
      <div className="relative mb-8 overflow-hidden rounded-3xl">
        <div className="pointer-events-none absolute inset-0">
          <AmbientLights variant="hero" intensity="normal" />
        </div>

        <div className="border-border/40 bg-surface/40 relative rounded-3xl border shadow-2xl backdrop-blur-3xl">
          <div className="px-6 pt-8 pb-6 md:px-8 md:pt-10 md:pb-6">
            {/* Top: Title + Stats */}
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end md:gap-8">
              <div>
                <div className="text-text/70 mb-2 flex items-center gap-2 font-mono text-xs tracking-widest uppercase">
                  <Receipt className="text-primary h-3.5 w-3.5" />
                  Account activity
                </div>
                <h1 className="font-display text-text text-3xl font-bold tracking-tight md:text-4xl">
                  Transactions
                </h1>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-left md:text-right">
                  <p className="text-text font-mono text-2xl font-bold tabular-nums">
                    {total}
                  </p>
                  <p className="text-text/60 mt-0.5 font-mono text-[10px] tracking-widest uppercase">
                    Total records
                  </p>
                </div>

                <div className="bg-border/40 h-10 w-px" />

                <div className="text-left md:text-right">
                  <p className="text-text font-mono text-2xl font-bold tabular-nums">
                    {formatBalance(volume)}
                  </p>
                  <p className="text-text/60 mt-0.5 font-mono text-[10px] tracking-widest uppercase">
                    Volume
                  </p>
                </div>
              </div>
            </div>

            {/* Search + Filters */}
            <div className="mt-6 flex flex-col gap-3">
              {/* Search */}
              <div className="border-border/60 bg-background/40 focus-within:border-primary/50 flex h-11 items-center gap-2 rounded-xl border px-3 backdrop-blur-sm transition-all focus-within:shadow-[0_0_0_3px_rgba(255,193,7,0.1)]">
                <Search className="text-text/70 h-4 w-4 shrink-0" />
                <input
                  type="text"
                  placeholder="Search by TXN ID or coin..."
                  value={search}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="text-text placeholder:text-text/40 h-full w-full bg-transparent font-mono text-sm outline-none"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => onSearchChange('')}
                    className="text-text/40 hover:text-text shrink-0 cursor-pointer transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Filters */}
              <div className="border-border/60 flex-wrap bg-background/40 no-scrollbar flex items-center gap-1 overflow-x-auto rounded-xl border p-1 backdrop-blur-sm">
                {FILTERS.map((f) => (
                  <button
                    key={f.value}
                    type="button"
                    onClick={() => onFilterChange(f.value)}
                    className={cn(
                      'flex shrink-0 cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5 font-mono text-xs transition-colors',
                      filter === f.value
                        ? 'bg-primary/15 text-primary'
                        : 'text-text/60 hover:text-text hover:bg-elevated/40',
                    )}
                  >
                    <span>{f.label}</span>
                    <span
                      className={cn(
                        'rounded px-1.5 py-0.5 text-[10px] tabular-nums',
                        filter === f.value
                          ? 'bg-primary/20 text-primary'
                          : 'bg-elevated/60 text-text/60',
                      )}
                    >
                      {counts[f.value]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </BlurFade>
  )
}