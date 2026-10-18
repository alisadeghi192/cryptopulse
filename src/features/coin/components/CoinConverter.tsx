import { useState } from 'react'
import { ArrowDownUp } from 'lucide-react'
import { BlurFade } from '@/components/ui/BlurFade'
import { cn } from '@/utils/cn'

interface CoinConverterProps {
  price: number
  symbol: string
  image: string
  name: string
}

export function CoinConverter({ price, symbol, image, name }: CoinConverterProps) {
  const [direction, setDirection] = useState<'coin-to-usd' | 'usd-to-coin'>(
    'coin-to-usd',
  )
  const [input, setInput] = useState('1')
  const [swapKey, setSwapKey] = useState(0)

  const numericInput = parseFloat(input) || 0

  const output =
    direction === 'coin-to-usd'
      ? numericInput * price
      : price > 0
        ? numericInput / price
        : 0

  const fromUnit = direction === 'coin-to-usd' ? symbol : 'USD'
  const toUnit = direction === 'coin-to-usd' ? 'USD' : symbol

  const fromLabel = direction === 'coin-to-usd' ? 'You pay' : 'You receive'
  const toLabel = direction === 'coin-to-usd' ? 'You receive' : 'You pay'

  const toggle = () => {
    setDirection((d) =>
      d === 'coin-to-usd' ? 'usd-to-coin' : 'coin-to-usd',
    )
    setSwapKey((k) => k + 1)
  }

  const formatOutput = (value: number) => {
    if (direction === 'coin-to-usd') {
      return value.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    }
    return value.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 8,
    })
  }

  const rateLine =
    direction === 'coin-to-usd'
      ? `1 ${symbol} = $${price.toLocaleString('en-US', { maximumFractionDigits: 2 })}`
      : `$1 = ${(1 / price).toLocaleString('en-US', { maximumFractionDigits: 8 })} ${symbol}`

  return (
    <BlurFade delay={0.4}>
      <div className="border-border shadow-lg bg-surface/30 h-full rounded-2xl border p-5 md:p-6">
        <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-display text-text text-sm font-bold">
            Converter
          </h2>
          <span className="text-primary font-mono text-[10px] tracking-wider">
            {rateLine}
          </span>
        </div>

        <div className="relative" key={swapKey}>
          <div className="border-border/50 bg-surface/40 animate-[slide-fade_0.4s_ease-out] rounded-2xl border p-4 backdrop-blur-xl">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-text-secondary font-mono text-[10px] tracking-[0.15em] uppercase">
                {fromLabel}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <input
                type="number"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                min="0"
                placeholder="0"
                className="text-text placeholder:text-text-secondary/40 w-full bg-transparent font-mono text-2xl font-bold tabular-nums outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />

              <div className="border-border/60 bg-background/60 flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2">
                {fromUnit === symbol ? (
                  <>
                    <img src={image} alt={name} className="size-5 rounded-full" />
                    <span className="text-text font-mono text-xs font-semibold">
                      {fromUnit}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-success text-sm">$</span>
                    <span className="text-text font-mono text-xs font-semibold">
                      {fromUnit}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="relative z-10 -my-3 flex justify-center">
            <button
              type="button"
              onClick={toggle}
              aria-label="Swap direction"
              className={cn(
                'border-border cursor-pointer bg-background text-text-secondary rounded-full border-2 p-2.5 shadow-lg transition-all duration-500',
                'hover:border-primary/40 hover:bg-primary/10 hover:text-primary',
                'active:scale-95',
              )}
            >
              <ArrowDownUp
                className={cn(
                  'size-4 transition-transform duration-500',
                  direction === 'usd-to-coin' && 'rotate-180',
                )}
              />
            </button>
          </div>

          <div className="border-border/50 bg-surface/40 animate-[slide-fade_0.4s_ease-out_0.1s_both] rounded-2xl border p-4 backdrop-blur-xl">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-text-secondary font-mono text-[10px] tracking-[0.15em] uppercase">
                {toLabel}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span
                key={output}
                className="text-text animate-[swap-flash_0.5s_ease-out] w-full truncate font-mono text-2xl font-bold tabular-nums"
              >
                {formatOutput(output)}
              </span>

              <div className="border-border/60 bg-background/60 flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2">
                {toUnit === symbol ? (
                  <>
                    <img src={image} alt={name} className="size-5 rounded-full" />
                    <span className="text-text font-mono text-xs font-semibold">
                      {toUnit}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-success text-sm">$</span>
                    <span className="text-text font-mono text-xs font-semibold">
                      {toUnit}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <p className="text-text-secondary mt-5 text-center font-mono text-[11px]">
          <span className="text-text">
            {numericInput.toLocaleString('en-US', {
              maximumFractionDigits: 8,
            })}{' '}
            {fromUnit}
          </span>{' '}
          ={' '}
          <span className="text-primary font-semibold">
            {formatOutput(output)} {toUnit}
          </span>
        </p>
      </div>
    </BlurFade>
  )
}