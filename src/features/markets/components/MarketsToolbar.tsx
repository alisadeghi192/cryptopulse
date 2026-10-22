import { Search, LayoutGrid, List, Loader2 } from 'lucide-react'
import { FilterTabs } from '@/components/ui/FilterTabs'
import { cn } from '@/utils/cn'
import type { MarketsFilter, MarketsView } from '../hooks/useMarketsFilters'

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'top100', label: 'Top 100' },
  { value: 'top500', label: 'Top 500' },
  { value: 'top1000', label: 'Top 1000' },
  { value: 'top5000', label: 'Top 5000' },
] as const

interface MarketsToolbarProps {
  search: string
  onSearchChange: (v: string) => void
  filter: MarketsFilter
  onFilterChange: (v: MarketsFilter) => void
  view: MarketsView
  onViewChange: (v: MarketsView) => void
  searchScope: string
  isLoadingMore?: boolean
}

export function MarketsToolbar({
  search,
  onSearchChange,
  filter,
  onFilterChange,
  view,
  onViewChange,
  searchScope,
  isLoadingMore,
}: MarketsToolbarProps) {
  return (
    <div className="mb-5 flex flex-col gap-3">
      <div className="border-border bg-surface focus-within:border-primary/50 flex h-10 items-center gap-2 rounded-lg border px-3 shadow-md transition-colors">
        <Search className="text-text-secondary h-4 w-4 shrink-0" />
        <input
          type="text"
          placeholder={`Search in ${searchScope}...`}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="text-text placeholder:text-text-secondary/60 h-full w-full bg-transparent font-mono text-sm outline-none"
        />
        {isLoadingMore && (
          <Loader2 className="text-text-secondary h-3 w-3 animate-spin" />
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <FilterTabs
          items={FILTERS}
          value={filter}
          onChange={onFilterChange}
          fullWidthOnMobile
        />

        <div className="border-border bg-surface hidden shrink-0 items-center rounded-lg border p-1 shadow-md md:flex">
          <button
            onClick={() => onViewChange('table')}
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-md transition-colors',
              view === 'table'
                ? 'bg-primary/15 text-primary'
                : 'text-text-secondary hover:text-text',
            )}
            aria-label="Table view"
          >
            <List className="h-4 w-4" />
          </button>
          <button
            onClick={() => onViewChange('grid')}
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-md transition-colors',
              view === 'grid'
                ? 'bg-primary/15 text-primary'
                : 'text-text-secondary hover:text-text',
            )}
            aria-label="Grid view"
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}