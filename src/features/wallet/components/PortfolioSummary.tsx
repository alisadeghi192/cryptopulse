import {
  ArrowDownToLine,
  ArrowUpFromLine,
  TrendingUp,
  TrendingDown,
} from 'lucide-react'
import { AmbientLights } from '@/components/ui/AmbientLights'
import { BlurFade } from '@/components/ui/BlurFade'
import { BalanceValue } from '@/components/ui/BalanceValue'
import { cn } from '@/utils/cn'

interface PortfolioSummaryProps {
  totalPortfolio: number
  cashBalance: number
  holdingsValue: number
  totalPnl: number
  onDeposit: () => void
  onWithdraw: () => void
}

export function PortfolioSummary({
  totalPortfolio,
  cashBalance,
  holdingsValue,
  totalPnl,
  onDeposit,
  onWithdraw,
}: PortfolioSummaryProps) {
  return (
    <BlurFade delay={0.05}>
      <div className="relative mb-6 shadow-xl overflow-hidden rounded-3xl">
        <div className="pointer-events-none absolute inset-0">
          <AmbientLights variant="hero" intensity="normal" />
        </div>
        <div className="border-border/40 bg-surface/40 relative rounded-3xl border shadow-2xl backdrop-blur-3xl">
          <div className="grid gap-6 p-6 md:grid-cols-[1fr_auto] md:gap-8 md:p-8">
            {/* Left: Total value */}
            <div>
              <p className="text-text/70 font-mono text-[10px] tracking-widest uppercase">
                Total Portfolio Value
              </p>
              <p className="font-display text-text mt-2 text-4xl font-bold tabular-nums md:text-5xl">
                <BalanceValue value={totalPortfolio} />
              </p>

              {totalPnl !== 0 && (
                <div className="mt-3 flex items-center gap-2">
                  <span
                    className={cn(
                      'flex items-center gap-1 rounded-md px-2 py-1 font-mono text-sm font-medium',
                      totalPnl >= 0
                        ? 'bg-success/10 text-success'
                        : 'bg-error/10 text-error',
                    )}
                  >
                    {totalPnl >= 0 ? (
                      <TrendingUp className="size-3.5" />
                    ) : (
                      <TrendingDown className="size-3.5" />
                    )}
                    {totalPnl >= 0 ? '+' : '-'}
                    <BalanceValue value={Math.abs(totalPnl)} />
                  </span>
                  <span className="text-text/70 font-mono text-xs">
                    all-time PnL
                  </span>
                </div>
              )}

              <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
                <div>
                  <p className="text-text/70 font-mono text-[10px] tracking-widest uppercase">
                    Cash
                  </p>
                  <p className="text-text mt-1 font-mono text-lg font-semibold tabular-nums">
                    <BalanceValue value={cashBalance} />
                  </p>
                </div>
                <div>
                  <p className="text-text/70 font-mono text-[10px] tracking-widest uppercase">
                    Holdings
                  </p>
                  <p className="text-text mt-1 font-mono text-lg font-semibold tabular-nums">
                    <BalanceValue value={holdingsValue} />
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex flex-col gap-3 md:w-48">
              <button
                type="button"
                onClick={onDeposit}
                className="group/deposit border-success/30 bg-success/10 hover:border-success/60 hover:bg-success/20 text-success flex h-12 w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg border font-mono text-sm font-medium tracking-wider uppercase backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_20px_-4px_rgba(34,197,94,0.4)]"
              >
                <ArrowDownToLine className="size-4 transition-transform duration-300 group-hover/deposit:translate-y-1" />
                Deposit
              </button>

              <button
                type="button"
                onClick={onWithdraw}
                className="group/withdraw border-primary/30 bg-primary/10 hover:border-primary/60 hover:bg-primary/20 text-primary flex h-12 w-full cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg border font-mono text-sm font-medium tracking-wider uppercase backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_20px_-4px_rgba(255,193,7,0.4)]"
              >
                <ArrowUpFromLine className="size-4 transition-transform duration-300 group-hover/withdraw:-translate-y-1" />
                Withdraw
              </button>
            </div>
          </div>
        </div>
      </div>
    </BlurFade>
  )
}