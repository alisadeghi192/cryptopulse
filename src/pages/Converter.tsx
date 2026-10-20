import { useEffect, useState } from 'react'
import { ArrowDownUp } from 'lucide-react'
import { AmbientLights } from '@/components/ui/AmbientLights'
import { BlurFade } from '@/components/ui/BlurFade'
import { PageLoader } from '@/components/ui/PageLoader'
import {
  CurrencySelect,
  type SelectOption,
} from '@/features/converter/components/CurrencySelect'
import { useConverterData } from '@/features/converter/hooks/useConverterData'
import { cn } from '@/utils/cn'

export function Converter() {
  const { options, convert, isLoading, isError } = useConverterData()

  const [from, setFrom] = useState<SelectOption | null>(null)
  const [to, setTo] = useState<SelectOption | null>(null)
  const [amount, setAmount] = useState('1')
  const [swapKey, setSwapKey] = useState(0)

  useEffect(() => {
    if (!from && options.length > 1) {
      const btc = options.find((o) => o.id === 'bitcoin')
      setFrom(btc ?? options[0])
    }
    if (!to) {
      setTo({ id: 'usd', symbol: 'USD', name: 'US Dollar' })
    }
  }, [options, from, to])

  if (isLoading) return <PageLoader />

  if (isError) {
    return (
      <main className="container py-8 md:py-12">
        <div className="flex h-96 flex-col items-center justify-center gap-4">
          <p className="text-error font-mono text-sm">
            Failed to load currencies.
          </p>
        </div>
      </main>
    )
  }

  const numericAmount = parseFloat(amount) || 0
  const result = convert(numericAmount, from, to)

  const formatValue = (value: number) => {
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

  const swap = () => {
    setFrom(to)
    setTo(from)
    setSwapKey((k) => k + 1)
  }

  return (
    <main className="relative z-30">
      <AmbientLights variant="home" intensity="subtle" />

      <div className="relative z-10 container py-8 md:py-12">
        <BlurFade delay={0.1}>
          <div className="mb-8">
            <div className="text-text-secondary mb-2 flex items-center gap-2 font-mono text-xs tracking-widest uppercase">
              <span className="relative flex h-1.5 w-1.5">
                <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
                <span className="bg-primary relative inline-flex h-1.5 w-1.5 rounded-full" />
              </span>
              Real-time rates
            </div>
            <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              Currency Converter
            </h1>
            <p className="text-text-secondary mt-2 text-sm">
              Convert between 250+ cryptocurrencies and USD.
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={0.2}>
          <div className="mx-auto my-30 max-w-md">
            <div className="border-border bg-surface/30 rounded-2xl border p-5 shadow-lg backdrop-blur-xl md:p-6">
              <h2 className="font-display text-text mb-5 text-sm font-bold">
                Converter
              </h2>

              <div className="relative" key={swapKey}>
                {/* FROM CARD —  */}
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
                      onChange={(e) => setAmount(e.target.value)}
                      min="0"
                      placeholder="0"
                      className="text-text placeholder:text-text-secondary/40 w-full [appearance:textfield] bg-transparent font-mono text-2xl font-bold tabular-nums outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />

                    <div className="w-40 shrink-0">
                      <CurrencySelect
                        value={from}
                        onChange={setFrom}
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

                {/* TO CARD — z-0 */}
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
                        onChange={setTo}
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
          </div>
        </BlurFade>
      </div>
    </main>
  )
}
