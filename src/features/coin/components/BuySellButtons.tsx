import { useState } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { BlurFade } from '@/components/ui/BlurFade'
import { TradeModal } from './TradeModal'
import { useWalletStore } from '@/stores/useWalletStore'
import { cn } from '@/utils/cn'

export interface TradeCoin {
  id: string
  symbol: string
  current_price: number
}

interface BuySellButtonsProps {
  coin: TradeCoin
}

export function BuySellButtons({ coin }: BuySellButtonsProps) {
  const [mode, setMode] = useState<'buy' | 'sell' | null>(null)
  const wallet = useWalletStore((s) => s.wallet)
  const holdings = useWalletStore((s) => s.holdings)

  const hasHoldings = holdings.some(
    (h) => h.coin_id === coin.id && h.amount > 0,
  )
  const hasWallet = !!wallet

  if (!hasWallet) return null

  return (
    <>
      <BlurFade delay={0.2}>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setMode('buy')}
            className="group/buy border-success/30 bg-success/10 hover:border-success/60 hover:bg-success/20 text-success flex h-14 cursor-pointer items-center justify-center gap-2 rounded-xl border font-mono text-sm font-medium tracking-wider uppercase backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_20px_-4px_rgba(34,197,94,0.4)]"
          >
            <TrendingUp className="size-4 transition-transform duration-300 group-hover/buy:-translate-y-0.5" />
            Buy
          </button>

          <button
            type="button"
            onClick={() => setMode('sell')}
            disabled={!hasHoldings}
            className={cn(
              'group/sell flex h-14 items-center justify-center gap-2 rounded-xl border font-mono text-sm font-medium tracking-wider uppercase backdrop-blur-sm transition-all duration-300',
              hasHoldings
                ? 'border-primary/30 bg-primary/10 hover:border-primary/60 hover:bg-primary/20 text-primary hover:shadow-[0_0_20px_-4px_rgba(255,193,7,0.4)] cursor-pointer'
                : 'border-border/40 bg-surface/40 text-text/30 cursor-not-allowed',
            )}
          >
            <TrendingDown className="size-4 transition-transform duration-300 group-hover/sell:translate-y-0.5" />
            Sell
          </button>
        </div>
      </BlurFade>

      {mode && (
        <TradeModal
          open={!!mode}
          onClose={() => setMode(null)}
          coin={coin}
          mode={mode}
        />
      )}
    </>
  )
}