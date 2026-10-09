import { BlurFade } from '@/components/ui/BlurFade'
import { SpotlightCard } from '@/components/ui/SpotlightCard'
import { cn } from '@/utils/cn'

interface ATHATLVisualProps {
  current: number
  ath: number
  atl: number
  athChangePercentage: number
}

function formatUSD(value: number) {
  if (value >= 1000)
    return `$${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
  return `$${value.toLocaleString('en-US', { maximumFractionDigits: 2 })}`
}

export function ATHATLVisual({ current, ath, atl, athChangePercentage }: ATHATLVisualProps) {
  const range = ath - atl
  const currentPos = range > 0 ? ((current - atl) / range) * 100 : 50
  const athPos = 100
  const atlPos = 0

  return (
    <BlurFade delay={0.35}>
      <SpotlightCard
        spotlightColor="rgba(255, 193, 7, 0.06)"
        className="border-border shadow-lg bg-surface/30 rounded-2xl border p-5 md:p-6"
      >
        <div className="mb-6 flex items-center justify-between">
          <h3 className="font-display text-text text-sm font-bold">Range</h3>
          <span
            className={cn(
              'font-mono text-xs font-semibold',
              athChangePercentage >= -5 ? 'text-success' : 'text-error',
            )}
          >
            {athChangePercentage.toFixed(2)}% from ATH
          </span>
        </div>

        <div className="from-error/30 via-primary/30 to-success/30 relative h-2 rounded-full bg-linear-to-r">
          <div
            className="border-background bg-error absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
            style={{ left: `${atlPos}%` }}
          />
          <div
            className="border-background bg-success absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
            style={{ left: `${athPos}%` }}
          />
          <div
            className="border-background bg-primary shadow-[0_0_12px_var(--color-primary)] absolute top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-all duration-500"
            style={{ left: `${currentPos}%` }}
          />
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-text-secondary font-mono text-[10px] tracking-wider uppercase">
              ATL
            </p>
            <p className="text-error mt-1 font-mono text-xs font-semibold tabular-nums">
              {formatUSD(atl)}
            </p>
          </div>
          <div>
            <p className="text-text-secondary font-mono text-[10px] tracking-wider uppercase">
              Current
            </p>
            <p className="text-primary mt-1 font-mono text-sm font-bold tabular-nums">
              {formatUSD(current)}
            </p>
          </div>
          <div>
            <p className="text-text-secondary font-mono text-[10px] tracking-wider uppercase">
              ATH
            </p>
            <p className="text-success mt-1 font-mono text-xs font-semibold tabular-nums">
              {formatUSD(ath)}
            </p>
          </div>
        </div>
      </SpotlightCard>
    </BlurFade>
  )
}