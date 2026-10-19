import { Link } from 'react-router'
import {
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Wallet,
  Coins,
} from 'lucide-react'
import { AmbientLights } from '@/components/ui/AmbientLights'
import { BlurFade } from '@/components/ui/BlurFade'
import { BalanceValue } from '@/components/ui/BalanceValue'
import { cn } from '@/utils/cn'

interface WelcomeCardProps {
  displayName: string
  initial: string
  avatarUrl: string | null
  totalPortfolio: number
  holdingsValue: number
  holdingsCount: number
  dailyPnl: { value: number; percent: number }
}

export function WelcomeCard({
  displayName,
  initial,
  avatarUrl,
  totalPortfolio,
  holdingsValue,
  holdingsCount,
  dailyPnl,
}: WelcomeCardProps) {
  const isPositive = dailyPnl.value >= 0
  const showDaily = dailyPnl.value !== 0

  return (
    <BlurFade>
      <div className="relative overflow-hidden rounded-3xl">
        <div className="pointer-events-none absolute inset-0">
          <AmbientLights variant="hero" intensity="normal" />
        </div>
        <div className="border-border/40 bg-surface/40 relative rounded-3xl border shadow-2xl backdrop-blur-3xl">
          <div className="p-6 md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-text/60 font-mono text-[10px] tracking-widest uppercase">
                  Welcome back
                </p>
                <h1 className="font-display text-text mt-1 truncate text-2xl font-bold tracking-tight md:text-3xl">
                  {displayName}
                </h1>
              </div>

              <div className="border-primary/30 relative size-12 shrink-0 overflow-hidden rounded-full border">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={displayName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="bg-primary/10 text-primary flex h-full w-full items-center justify-center text-lg font-bold">
                    {initial}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6">
              <p className="text-text/60 font-mono text-[10px] tracking-widest uppercase">
                Total Portfolio
              </p>
              <p className="font-display text-text mt-1 text-4xl font-bold tabular-nums md:text-5xl">
                <BalanceValue value={totalPortfolio} />
              </p>

              {showDaily && (
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      'flex items-center gap-1 rounded-md px-2 py-1 font-mono text-sm font-medium',
                      isPositive
                        ? 'bg-success/10 text-success'
                        : 'bg-error/10 text-error',
                    )}
                  >
                    {isPositive ? (
                      <TrendingUp className="size-3.5" />
                    ) : (
                      <TrendingDown className="size-3.5" />
                    )}
                    {isPositive ? '+' : '-'}
                    <BalanceValue value={Math.abs(dailyPnl.value)} />
                    <span className="opacity-70">
                      ({isPositive ? '+' : ''}
                      {dailyPnl.percent.toFixed(2)}%)
                    </span>
                  </span>
                  <span className="text-text/60 font-mono text-xs">today</span>
                </div>
              )}
            </div>

            <div className="border-border/40 mt-6 flex items-center justify-between gap-4 border-t pt-5">
              <div className="flex items-center gap-6">
                <div>
                  <div className="text-text/60 flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase">
                    <Wallet className="size-3" />
                    Holdings
                  </div>
                  <p className="text-text mt-1 font-mono text-sm font-semibold tabular-nums">
                    <BalanceValue value={holdingsValue} />
                  </p>
                </div>
                <div>
                  <div className="text-text/60 flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase">
                    <Coins className="size-3" />
                    Assets
                  </div>
                  <p className="text-text mt-1 font-mono text-sm font-semibold tabular-nums">
                    {holdingsCount}
                  </p>
                </div>
              </div>

              <Link
                to="/wallet"
                className="text-text/60 hover:text-primary group flex items-center gap-1 font-mono text-[10px] tracking-widest uppercase transition-colors"
              >
                Wallet
                <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </BlurFade>
  )
}