import { BlurFade } from '@/components/ui/BlurFade'
import { formatCompactNumber } from '@/utils/format'

interface SupplyVisualProps {
  circulating: number | null
  max: number | null
}


export function SupplyVisual({ circulating, max }: SupplyVisualProps) {
  const circ = circulating ?? 0

  if (!max) {
    return (
      <BlurFade delay={0.3}>
        <div className="border-border h-full bg-surface/30 rounded-2xl border p-5 shadow-lg md:p-6">
          <h3 className="font-display text-text mb-4 text-sm font-bold">
            Supply
          </h3>
          <p className="text-text-secondary text-xs">
            Circulating: {formatCompactNumber(circ)}
          </p>
          <p className="text-text-secondary mt-1 text-[10px]">No max supply</p>
        </div>
      </BlurFade>
    )
  }

  const percent = Math.min((circ / max) * 100, 100)
  const circumference = 2 * Math.PI * 45
  const offset = circumference - (percent / 100) * circumference

  return (
    <BlurFade delay={0.3}>
      <div className="border-border bg-surface/30 rounded-2xl border p-5 shadow-lg md:p-6">
        <h3 className="font-display text-text mb-4 text-sm font-bold">
          Supply
        </h3>

        <div className="flex items-center gap-5">
          <div className="relative size-28 shrink-0">
            <svg viewBox="0 0 100 100" className="-rotate-90">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="var(--color-border)"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                className="transition-[stroke-dashoffset] duration-1000 ease-out"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-display text-primary text-lg font-bold">
                {percent.toFixed(1)}%
              </span>
              <span className="text-text-secondary font-mono text-[9px] tracking-wider uppercase">
                Circulating
              </span>
            </div>
          </div>

          <div className="min-w-0 flex-1 space-y-3">
            <div>
              <p className="text-text-secondary font-mono text-[10px] tracking-wider uppercase">
                Circulating
              </p>
              <p className="text-text font-mono text-sm font-semibold tabular-nums">
                {formatCompactNumber(circ)}
              </p>
            </div>

            <div>
              <p className="text-text-secondary font-mono text-[10px] tracking-wider uppercase">
                Max Supply
              </p>
              <p className="text-text font-mono text-sm font-semibold tabular-nums">
                {formatCompactNumber(max)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </BlurFade>
  )
}