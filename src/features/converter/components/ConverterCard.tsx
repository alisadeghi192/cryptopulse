import { ArrowDownUp } from 'lucide-react'
import { CurrencySelect, type SelectOption } from './CurrencySelect'
import { cn } from '@/utils/cn'

interface ConverterCardProps {
  options: SelectOption[]
  from: SelectOption | null
  to: SelectOption | null
  onFromChange: (option: SelectOption) => void
  onToChange: (option: SelectOption) => void
  amount: string
  onAmountChange: (value: string) => void
  result: number
  swap: () => void
  swapKey: number
}

function formatValue(value: number) {
  if (value >= 1000) {
    return value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }
  if (value >= 1) {
    return value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    })
  }
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 8,
  })
}

export function ConverterCard({
  options,
  from,
  to,
  onFromChange,
  onToChange,
  amount,
  onAmountChange,
  result,
  swap,
  swapKey,
}: ConverterCardProps) {
  const numericAmount = parseFloat(amount) || 0

  return (
    <div className="border-border bg-surface/30 rounded-2xl border p-5 shadow-lg backdrop-blur-xl md:p-6">
      <h2 className="font-display text-text mb-5 text-sm font-bold">
        Converter
      </h2>

      <div className="relative" key={swapKey}>
        {/* FROM CARD */}
        <div className="border-border/50 bg-surface/40 relative z-40 animate-[slide-fade_0.4s_ease-out] rounded-2xl border p-4 backdrop-blur-xl">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-text-secondary font-mono text-[10px] tracking-[0.15em] uppercase">
              From
            </span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <input
              type="number"
              value={amount}
              onChange={(e) => onAmountChange(e.target.value)}
              min="0"
              placeholder="0"
              className="text-text placeholder:text-text-secondary/40 w-full [appearance:textfield] bg-transparent font-mono text-2xl font-bold tabular-nums outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />

            <div className="w-40 shrink-0">
              <CurrencySelect
                value={from}
                onChange={onFromChange}
                options={options}
                exclude={to?.id}
                placeholder="Select"
              />
            </div>
          </div>
        </div>

        {/* SWAP BUTTON */}
        <div className="relative z-60 -my-3 flex justify-center">
          <button
            type="button"
            onClick={swap}
            aria-label="Swap currencies"
            className={cn(
              'border-border bg-background cursor-pointer text-text-secondary rounded-full border-2 p-2.5 shadow-lg transition-all duration-500',
              'hover:border-primary/40 hover:bg-primary/10 hover:text-primary',
              'active:scale-95',
            )}
          >
            <ArrowDownUp className="size-4" />
          </button>
        </div>

        {/* TO CARD */}
        <div className="border-border/50 bg-surface/40 relative z-0 animate-[slide-fade_0.4s_ease-out_0.1s_both] rounded-2xl border p-4 backdrop-blur-xl">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-text-secondary font-mono text-[10px] tracking-[0.15em] uppercase">
              To
            </span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <span
              key={result}
              className="text-text w-full animate-[swap-flash_0.5s_ease-out] truncate font-mono text-2xl font-bold tabular-nums"
            >
              {formatValue(result)}
            </span>

            <div className="w-40 shrink-0">
              <CurrencySelect
                value={to}
                onChange={onToChange}
                options={options}
                exclude={from?.id}
                placeholder="Select"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic result line */}
      {from && to && numericAmount > 0 && (
        <p className="text-text-secondary mt-5 text-center font-mono text-[11px]">
          <span className="text-text">
            {formatValue(numericAmount)} {from.symbol}
          </span>{' '}
          ={' '}
          <span className="text-primary font-semibold">
            {formatValue(result)} {to.symbol}
          </span>
        </p>
      )}
    </div>
  )
}