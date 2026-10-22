import { Link } from 'react-router'
import { SpotlightCard } from '@/components/ui/SpotlightCard'
import { BalanceValue } from '@/components/ui/BalanceValue'
import { BorderBeam } from '@/components/ui/BorderBeam'
import { TiltCard } from '@/components/ui/TiltCard'
import { cn } from '@/utils/cn'
import { formatCoinPrice, formatCoinAmount } from '@/utils/format'
import type { HoldingWithPrice } from '@/types/wallet'
import { coinImageUrl } from '@/utils/image'

interface HoldingCardProps {
  holding: HoldingWithPrice
}

export function HoldingCard({ holding }: HoldingCardProps) {
  const isPositive = holding.pnl >= 0
  // ✅ Use a safe fallback for the image
  const safeImage = coinImageUrl(holding.image) || undefined

  return (
    <Link to={`/coin/${holding.coin_id}`} className="block h-full">
      <TiltCard maxTilt={4} className="h-full">
        <BorderBeam thickness={1.5} duration={8} className="h-full rounded-2xl">
          <SpotlightCard
            spotlightColor={
              isPositive ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)'
            }
            className="border-border/40 bg-surface/40 hover:border-border flex h-full flex-col justify-between rounded-2xl border p-5 shadow-lg backdrop-blur-3xl transition-colors duration-300"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                {/* ✅ Only render <img> if safeImage exists */}
                {safeImage ? (
                  <img
                    src={safeImage}
                    alt={holding.coin_symbol}
                    className="bg-elevated size-7 shrink-0 rounded-full"
                  />
                ) : (
                  <div className="bg-elevated text-text-secondary flex size-7 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold uppercase">
                    {holding.coin_symbol.slice(0, 2)}
                  </div>
                )}
                <div>
                  <p className="text-text font-mono text-sm font-semibold">
                    {holding.coin_symbol}
                  </p>
                  <p className="text-text/60 mt-0.5 font-mono text-[10px]">
                    {formatCoinAmount(holding.amount)} {holding.coin_symbol}
                  </p>
                </div>
              </div>
              <div
                className={cn(
                  'rounded-md px-2 py-1 font-mono text-[10px] font-medium',
                  isPositive
                    ? 'bg-success/10 text-success'
                    : 'bg-error/10 text-error',
                )}
              >
                {isPositive ? '+' : ''}
                {holding.pnl_percent.toFixed(2)}%
              </div>
            </div>

            <div className="mt-4">
              <p className="text-text font-mono text-2xl font-bold tabular-nums">
                <BalanceValue value={holding.current_value} />
              </p>
              <p
                className={cn(
                  'mt-1 font-mono text-xs tabular-nums',
                  isPositive ? 'text-success' : 'text-error',
                )}
              >
                {isPositive ? '+' : '-'}
                <BalanceValue value={Math.abs(holding.pnl)} />
              </p>
            </div>

            <div className="border-border/30 mt-4 flex items-center justify-between border-t pt-3">
              <div>
                <p className="text-text/60 font-mono text-[9px] tracking-widest uppercase">
                  Avg Buy
                </p>
                <p className="text-text/80 mt-0.5 font-mono text-xs tabular-nums">
                  {formatCoinPrice(holding.avg_buy_price)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-text/60 font-mono text-[9px] tracking-widest uppercase">
                  Current
                </p>
                <p className="text-text/80 mt-0.5 font-mono text-xs tabular-nums">
                  {formatCoinPrice(holding.current_price)}
                </p>
              </div>
            </div>
          </SpotlightCard>
        </BorderBeam>
      </TiltCard>
    </Link>
  )
}
