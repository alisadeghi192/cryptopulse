import { cn } from '@/utils/cn'

interface FilterTab<T extends string> {
  value: T
  label: string
  count?: number
}

interface FilterTabsProps<T extends string> {
  items: readonly FilterTab<T>[]
  value: T
  onChange: (value: T) => void
  className?: string
  fullWidthOnMobile?: boolean
}

export function FilterTabs<T extends string>({
  items,
  value,
  onChange,
  className,
  fullWidthOnMobile = false,
}: FilterTabsProps<T>) {
  return (
    <div
      className={cn(
        'border-border bg-surface no-scrollbar flex items-center gap-1 overflow-x-auto rounded-lg border p-1 shadow-md',
        fullWidthOnMobile && 'max-md:w-full',
        className,
      )}
    >
      {items.map((item) => {
        const active = value === item.value
        return (
          <button
            key={item.value}
            type="button"
            onClick={() => onChange(item.value)}
            className={cn(
              'flex shrink-0 cursor-pointer items-center gap-2 rounded-md px-3 py-1.5 font-mono text-xs transition-colors',
              fullWidthOnMobile && 'max-md:flex-1',
              active
                ? 'bg-primary/15 text-primary'
                : 'text-text-secondary hover:text-text',
            )}
          >
            <span>{item.label}</span>
            {item.count !== undefined && (
              <span
                className={cn(
                  'rounded px-1.5 py-0.5 text-[10px] tabular-nums',
                  active
                    ? 'bg-primary/20 text-primary'
                    : 'bg-elevated/60 text-text-secondary',
                )}
              >
                {item.count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}