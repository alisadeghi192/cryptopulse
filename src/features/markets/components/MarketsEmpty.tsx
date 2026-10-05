import { Search, AlertCircle, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router'
import { buttonVariants } from '@/components/ui/Button'
import { cn } from '@/utils/cn'

interface MarketsEmptyProps {
  variant?: 'empty' | 'error' | 'notFound'
  query?: string
  onClear?: () => void
}

export function MarketsEmpty({
  variant = 'empty',
  query,
  onClear,
}: MarketsEmptyProps) {
  // ─── Error ───
  if (variant === 'error') {
    return (
      <div className="flex h-96 flex-col items-center justify-center gap-4">
        <AlertCircle className="text-text-secondary h-12 w-12" />
        <p className="text-text font-mono text-sm">
          Failed to load markets data.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="text-primary hover:text-primary-hover font-mono text-xs underline-offset-4 hover:underline"
        >
          Try again
        </button>
      </div>
    )
  }

  // ─── Not Found (search result empty) ───
  if (variant === 'notFound') {
    return (
      <div className="flex h-96 flex-col items-center justify-center gap-5">
        <div className="border-border bg-surface flex h-16 w-16 items-center justify-center rounded-2xl border">
          <Search className="text-text-secondary h-7 w-7" />
        </div>

        <div className="flex flex-col items-center gap-1.5 text-center">
          <p className="text-text font-mono text-sm font-medium">
            No results for "{query}"
          </p>
          <p className="text-text-secondary max-w-xs font-mono text-xs">
            We couldn't find any coins matching your search.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {onClear && (
            <button
              onClick={onClear}
              className={cn(
                buttonVariants({ variant: 'primary', size: 'sm' }),
                'font-mono text-xs',
              )}
            >
              Clear search
            </button>
          )}
          <Link
            to="/markets"
            className={cn(
              buttonVariants({ variant: 'outline', size: 'sm' }),
              'font-mono text-xs',
            )}
          >
            <ArrowLeft className="h-3 w-3" />
            Back to All
          </Link>
        </div>
      </div>
    )
  }

  // ─── Empty (no data at all) ───
  return (
    <div className="flex h-96 flex-col items-center justify-center gap-4">
      <AlertCircle className="text-text-secondary h-12 w-12" />
      <p className="text-text font-mono text-sm">No coins found.</p>
    </div>
  )
}