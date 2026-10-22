import { useState, useRef, useEffect, useMemo } from 'react'
import { Search, ChevronDown, X } from 'lucide-react'
import { cn } from '@/utils/cn'
import { coinImageUrl } from '@/utils/image'

export interface SelectOption {
  id: string
  symbol: string
  name: string
  image?: string
}

interface CurrencySelectProps {
  value: SelectOption | null
  onChange: (option: SelectOption) => void
  options: SelectOption[]
  placeholder?: string
  label?: string
  exclude?: string
  className?: string
}

export function CurrencySelect({
  value,
  onChange,
  options,
  placeholder = 'Select currency',
  label,
  exclude,
  className,
}: CurrencySelectProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return options
      .filter((o) => o.id !== exclude)
      .filter(
        (o) =>
          !q ||
          o.name.toLowerCase().includes(q) ||
          o.symbol.toLowerCase().includes(q),
      )
      .slice(0, 50)
  }, [options, search, exclude])

  useEffect(() => {
    if (!open) return
    const handleClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false)
        setSearch('')
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      {label && (
        <span className="text-text-secondary mb-1.5 block font-mono text-[10px] tracking-wider uppercase">
          {label}
        </span>
      )}

      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'border-border bg-surface/40 flex h-14 w-full cursor-pointer items-center justify-between gap-3 rounded-xl border px-3',
          'hover:border-primary/40 transition-colors',
          open && 'border-primary/50',
        )}
      >
        {value ? (
          <div className="flex min-w-0 items-center gap-2.5">
            {value.image ? (
              <img
                src={coinImageUrl(value.image)}
                alt={value.name}
                className="size-7 shrink-0 rounded-full"
              />
            ) : (
              <span className="text-success flex size-7 shrink-0 items-center justify-center text-lg font-bold">
                $
              </span>
            )}
            <div className="min-w-0 text-left">
              <p className="text-text truncate text-sm font-semibold">
                {value.symbol}
              </p>
              <p className="text-text-secondary truncate text-[10px]">
                {value.name}
              </p>
            </div>
          </div>
        ) : (
          <span className="text-text-secondary text-sm">{placeholder}</span>
        )}

        <ChevronDown
          className={cn(
            'text-text-secondary size-4 shrink-0 transition-transform',
            open && 'rotate-180',
          )}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="border-border bg-surface absolute top-full right-0 left-0 mt-2 max-h-80 overflow-hidden rounded-xl border shadow-2xl">
          {/* Search */}
          <div className="border-border flex items-center gap-2 border-b px-3 py-2">
            <Search className="text-text-secondary size-4 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="text-text placeholder:text-text-secondary/60 h-8 w-full bg-transparent font-mono text-xs outline-none"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="text-text-secondary hover:text-text cursor-pointer"
                aria-label="Clear search"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          {/* Options */}
          <div className="custom-scroll max-h-64 overflow-y-auto">
            {/* USD — only if not excluded */}
            {exclude !== 'usd' && (
              <button
                type="button"
                onClick={() => {
                  onChange({ id: 'usd', symbol: 'USD', name: 'US Dollar' })
                  setOpen(false)
                  setSearch('')
                }}
                className={cn(
                  'hover:bg-elevated/60 flex w-full items-center gap-2.5 px-3 py-2.5 text-left transition-colors',
                  value?.id === 'usd' && 'bg-primary/5',
                )}
              >
                <span className="text-success flex size-7 shrink-0 items-center justify-center text-lg font-bold">
                  $
                </span>
                <div className="min-w-0">
                  <p className="text-text text-sm font-semibold">USD</p>
                  <p className="text-text-secondary text-[10px]">US Dollar</p>
                </div>
              </button>
            )}

            {/* Coins */}
            {filtered.length === 0 ? (
              <div className="text-text-secondary px-3 py-6 text-center font-mono text-xs">
                No results
              </div>
            ) : (
              filtered.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    onChange(option)
                    setOpen(false)
                    setSearch('')
                  }}
                  className={cn(
                    'hover:bg-elevated/60 flex w-full cursor-pointer items-center gap-2.5 px-3 py-2.5 text-left transition-colors',
                    value?.id === option.id && 'bg-primary/5',
                  )}
                >
                  {option.image ? (
                    <img
                      src={coinImageUrl(option.image)}
                      alt={option.name}
                      className="size-7 shrink-0 rounded-full"
                    />
                  ) : (
                    <span className="text-success flex size-7 shrink-0 items-center justify-center text-lg font-bold">
                      $
                    </span>
                  )}
                  <div className="min-w-0">
                    <p className="text-text text-sm font-semibold">
                      {option.symbol}
                    </p>
                    <p className="text-text-secondary truncate text-[10px]">
                      {option.name}
                    </p>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
