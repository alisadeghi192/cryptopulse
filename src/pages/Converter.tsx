import { useEffect, useState } from 'react'
import { AmbientLights } from '@/components/ui/AmbientLights'
import { BlurFade } from '@/components/ui/BlurFade'
import { PageLoader } from '@/components/ui/PageLoader'
import type { SelectOption } from '@/features/converter/components/CurrencySelect'
import { ConverterCard } from '@/features/converter/components/ConverterCard'
import { useConverterData } from '@/features/converter/hooks/useConverterData'

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
            <ConverterCard
              options={options}
              from={from}
              to={to}
              onFromChange={setFrom}
              onToChange={setTo}
              amount={amount}
              onAmountChange={setAmount}
              result={result}
              swap={swap}
              swapKey={swapKey}
            />
          </div>
        </BlurFade>
      </div>
    </main>
  )
}