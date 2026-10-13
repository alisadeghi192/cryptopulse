import { Star } from 'lucide-react'
import { BorderBeam } from '@/components/ui/BorderBeam'
import { useWatchlistToggle } from '@/hooks/useWatchlistToggle'
import { cn } from '@/utils/cn'

interface WatchlistButtonProps {
  coinId: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'icon' | 'full'
  className?: string
}

const SIZE_CLASSES = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
}

export function WatchlistButton({
  coinId,
  size = 'md',
  variant = 'icon',
  className,
}: WatchlistButtonProps) {
  const { toggle, coinIds } = useWatchlistToggle()
  const isIn = coinIds.includes(coinId)

  if (variant === 'full') {
    return (
      <BorderBeam className="w-fit rounded-lg">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            toggle(coinId)
          }}
          aria-label={isIn ? 'Remove from watchlist' : 'Add to watchlist'}
          className={cn(
            'border-border bg-surface/40 flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 text-sm transition-colors',
            isIn
              ? 'text-primary border-primary/30'
              : 'text-text-secondary hover:text-primary',
            className,
          )}
        >
          <Star
            className={cn(SIZE_CLASSES[size], isIn && 'fill-primary')}
          />
          {isIn ? 'In Watchlist' : 'Add to Watchlist'}
        </button>
      </BorderBeam>
    )
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        toggle(coinId)
      }}
      aria-label={isIn ? 'Remove from watchlist' : 'Add to watchlist'}
      className={cn(
        'shrink-0 cursor-pointer transition-colors',
        isIn ? 'text-primary' : 'text-text-secondary hover:text-primary',
        className,
      )}
    >
      <Star className={cn(SIZE_CLASSES[size], isIn && 'fill-primary')} />
    </button>
  )
}