import { Link } from 'react-router'
import {
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Wallet,
  Coins,
  PiggyBank,
} from 'lucide-react'
import { AmbientLights } from '@/components/ui/AmbientLights'
import { BlurFade } from '@/components/ui/BlurFade'
import { BalanceValue } from '@/components/ui/BalanceValue'
import { cn } from '@/utils/cn'

interface PortfolioCardProps {
  totalPortfolio: number
  cashBalance: number
  holdingsValue: number
  totalPnl: number
  holdingsCount: number
}

export function PortfolioCard({
  totalPortfolio,
  cashBalance,
  holdingsValue,
  totalPnl,
  holdingsCount,
}: PortfolioCardProps) {
  return (
    <BlurFade delay={0.05}>
      <div className="relative h-full overflow-hidden rounded-3xl">
        <div className="pointer-events-none absolute inset-0">
          <AmbientLights variant="hero" intensity="normal" />
        </div>
        <div className="border-border/40 bg-surface/40 relative h-full rounded-3xl border shadow-2xl backdrop-blur-3xl">
          <div className="p-6 md:p-8">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wallet className="text-primary size-4" />
                <span className="text-text/70 font-mono text-[10px] tracking-widest uppercase">
                  Total Portfolio
                </span>
              </div>
              <Link
                to="/wallet"
                className="text-text/60 hover:text-primary group flex items-center gap-1 font-mono text-[10px] tracking-widest uppercase transition-colors"
              >
                Wallet
                <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <p className="font-display text-text text-4xl font-bold tabular-nums md:text-5xl">
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

            <div className="border-border/40 mt-6 grid grid-cols-3 gap-4 border-t pt-5">
              <div>
                <div className="text-text/70 flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase">
                  <PiggyBank className="size-3" />
                  Cash
                </div>
                <p className="text-text mt-1 font-mono text-sm font-semibold tabular-nums md:text-base">
                  <BalanceValue value={cashBalance} />
                </p>
              </div>
              <div>
                <div className="text-text/70 flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase">
                  <Coins className="size-3" />
                  Holdings
                </div>
                <p className="text-text mt-1 font-mono text-sm font-semibold tabular-nums md:text-base">
                  <BalanceValue value={holdingsValue} />
                </p>
              </div>
              <div>
                <div className="text-text/70 flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase">
                  <TrendingUp className="size-3" />
                  Assets
                </div>
                <p className="text-text mt-1 font-mono text-sm font-semibold tabular-nums md:text-base">
                  {holdingsCount}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BlurFade>
  )
}