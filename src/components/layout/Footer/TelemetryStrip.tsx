import { Radio, Clock } from 'lucide-react'
import { FlashValue } from '@/components/ui/FlashValue'
import { useCoins } from '@/hooks/useCoins'
import { useLiveClock } from '@/hooks/useLiveClock'
import { TELEMETRY } from '@/constants'

const TELEMETRY_COIN_COUNT = 2

function LiveDot() {
  return (
    <div className="flex items-center gap-2">
      <span className="relative flex h-2 w-2">
        <span className="bg-success absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
        <span className="bg-success relative inline-flex h-2 w-2 rounded-full" />
      </span>
      <span className="text-success uppercase">{TELEMETRY.liveLabel}</span>
    </div>
  )
}

function CoinTicker({ symbol, price, change, className }: {
  symbol: string
  price: number
  change: number
  className?: string
}) {
  return (
    <span className={`items-center gap-1.5 ${className ?? ''}`}>
      <span className="text-text-secondary">{symbol}</span>
      <FlashValue
        value={price}
        decimals={0}
        className={change >= 0 ? 'text-success' : 'text-error'}
      />
    </span>
  )
}

export function TelemetryStrip() {
  const time = useLiveClock()
  const formattedTime = time.toLocaleTimeString('en-US', { hour12: false })

  const { data: coins } = useCoins({ perPage: TELEMETRY_COIN_COUNT })
  const btc = coins?.find((c) => c.id === 'bitcoin')
  const eth = coins?.find((c) => c.id === 'ethereum')

  return (
    <div className="border-border/40 flex items-center justify-between gap-4 border-b py-3 font-mono text-[11px] tracking-wider">
      <div className="flex items-center gap-4">
        <LiveDot />
        <div className="bg-border/40 h-3 w-px" />
        <div className="text-text-secondary flex items-center gap-1.5">
          <Radio className="text-primary h-3 w-3" />
          <span>{TELEMETRY.dataSource}</span>
        </div>
      </div>

      <div className="text-text-secondary flex items-center gap-4">
        {btc && (
          <CoinTicker
            symbol="BTC"
            price={btc.current_price}
            change={btc.price_change_percentage_24h ?? 0}
            className="hidden md:inline-flex"
          />
        )}
        {eth && (
          <CoinTicker
            symbol="ETH"
            price={eth.current_price}
            change={eth.price_change_percentage_24h ?? 0}
            className="hidden lg:inline-flex"
          />
        )}

        <div className="bg-border/40 h-3 w-px" />
        <div className="flex items-center gap-1.5">
          <Clock className="text-primary h-3 w-3" />
          <span className="text-primary tabular-nums">{formattedTime} UTC</span>
        </div>
      </div>
    </div>
  )
}