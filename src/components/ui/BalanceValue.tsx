import {
  formatBalance,
  formatBalanceFull,
  isAbbreviated,
} from '@/utils/format'
import { cn } from '@/utils/cn'

interface BalanceValueProps {
  value: number
  className?: string
}

export function BalanceValue({ value, className }: BalanceValueProps) {
  const abbreviated = isAbbreviated(value)

  if (!abbreviated) {
    return (
      <span className={cn('tabular-nums', className)}>
        {formatBalance(value)}
      </span>
    )
  }

  return (
    <span
      className={cn('group/balance relative cursor-help tabular-nums', className)}
    >
      {formatBalance(value)}

      {/* Tooltip */}
      <span
        role="tooltip"
        className="border-border/60 bg-surface/90 text-text pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 rounded-lg border px-3 py-1.5 font-mono text-xs font-medium whitespace-nowrap shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] opacity-0 backdrop-blur-xl transition-all duration-200 group-hover/balance:-translate-y-0.5 group-hover/balance:opacity-100"
      >
        {formatBalanceFull(value)}

        {/* Arrow */}
        <span className="border-border/60 bg-surface/90 absolute top-full left-1/2 size-2 -translate-x-1/2 -translate-y-1 rotate-45 border-r border-b" />
      </span>
    </span>
  )
}