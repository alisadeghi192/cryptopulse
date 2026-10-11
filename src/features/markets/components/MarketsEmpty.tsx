import { Search, AlertCircle, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router'
import { buttonVariants } from '@/components/ui/Button'
import { cn } from '@/utils/cn'

interface MarketsEmptyProps {
  variant?: 'empty' | 'error' | 'notFound'
  query?: string
  scope?: string
  onClear?: () => void
  onExpandScope?: () => void
}

export function MarketsEmpty({
  variant = 'empty',
  query,
  scope,
  onClear,
  onExpandScope,
}: MarketsEmptyProps) {
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

  if (variant === 'notFound') {
    return (
      <div className="flex h-96 flex-col items-center justify-center gap-5">
        <div className="border-border bg-surface flex h-16 w-16 items-center justify-center rounded-2xl border">
          <Search className="text-text-secondary h-7 w-7" />
        </div>

        <div className="flex flex-col items-center gap-1.5 text-center">
          <p className="text-text font-mono text-sm font-medium">
            No results for "{query}"{scope ? ` in ${scope}` : ''}
          </p>
          <p className="text-text-secondary max-w-xs font-mono text-xs">
            The coin may exist outside this range. Try expanding the scope.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
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
          {onExpandScope && (
            <button
              onClick={onExpandScope}
              className={cn(
                buttonVariants({ variant: 'outline', size: 'sm' }),
                'font-mono text-xs',
              )}
            >
              Search all 5000 coins
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

  return (
    <div className="flex h-96 flex-col items-center justify-center gap-4">
      <AlertCircle className="text-text-secondary h-12 w-12" />
      <p className="text-text font-mono text-sm">No coins found.</p>
    </div>
  )
}