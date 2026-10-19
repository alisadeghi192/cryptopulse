import { Search, X } from 'lucide-react'
import { cn } from '@/utils/cn'
import type { TransactionType } from '@/types/wallet'

export type TransactionFilter = 'all' | TransactionType

const FILTERS: { value: TransactionFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'deposit', label: 'Deposit' },
  { value: 'withdraw', label: 'Withdraw' },
  { value: 'buy', label: 'Buy' },
  { value: 'sell', label: 'Sell' },
]

interface TransactionsFiltersProps {
  value: TransactionFilter
  onChange: (value: TransactionFilter) => void
  counts: Record<TransactionFilter, number>
  search: string
  onSearchChange: (value: string) => void
}

export function TransactionsFilters({
  value,
  onChange,
  counts,
  search,
  onSearchChange,
}: TransactionsFiltersProps) {
  return (
    <div className="mb-5 flex flex-col gap-3">
      {/* Search Bar */}
      <div className="border-border bg-surface/60 focus-within:border-primary/50 flex h-11 items-center gap-2 rounded-xl border px-3 backdrop-blur-xl transition-all focus-within:shadow-[0_0_0_3px_rgba(255,193,7,0.1)]">
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

      {/* Filter Tabs */}
      <div className="border-border w-fit bg-surface/60 no-scrollbar flex flex-wrap items-center gap-1 overflow-x-auto rounded-lg border p-1 backdrop-blur-xl">
        {FILTERS.map((filter) => (
          <button
            key={filter.value}
            type="button"
            onClick={() => onChange(filter.value)}
            className={cn(
              'flex shrink-0 cursor-pointer items-center gap-2 rounded-md px-3 py-1.5 font-mono text-xs transition-colors',
              value === filter.value
                ? 'bg-primary/15 text-primary'
                : 'text-text-secondary hover:text-text',
            )}
          >
            <span>{filter.label}</span>
            <span
              className={cn(
                'rounded px-1.5 py-0.5 text-[10px] tabular-nums',
                value === filter.value
                  ? 'bg-primary/20 text-primary'
                  : 'bg-elevated/60 text-text-secondary',
              )}
            >
              {counts[filter.value]}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}