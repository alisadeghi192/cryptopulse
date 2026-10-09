import { TrendingUp, TrendingDown } from 'lucide-react'
import { BlurFade } from '@/components/ui/BlurFade'
import { SpotlightCard } from '@/components/ui/SpotlightCard'

interface SentimentMeterProps {
  up: number | null
  down: number | null
}

export function SentimentMeter({ up, down }: SentimentMeterProps) {
  if (up === null || down === null) return null

  return (
    <BlurFade delay={0.45}>
      <SpotlightCard
        spotlightColor="rgba(34, 197, 94, 0.08)"
        className="border-border h-full bg-surface/30 rounded-2xl border p-5 shadow-lg md:p-6"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-text text-sm font-bold">
            Community Sentiment
          </h3>
          <span className="text-text-secondary font-mono text-[10px] tracking-wider uppercase">
            CoinGecko votes
          </span>
        </div>

        <div className="space-y-3">
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-success flex items-center gap-1.5 font-mono text-xs">
                <TrendingUp className="size-3" />
                Bullish
              </span>
              <span className="text-success font-mono text-xs font-semibold tabular-nums">
                {up.toFixed(1)}%
              </span>
            </div>
            <div className="bg-border h-1.5 overflow-hidden rounded-full">
              <div
                className="bg-success h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${up}%` }}
              />
            </div>
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-error flex items-center gap-1.5 font-mono text-xs">
                <TrendingDown className="size-3" />
                Bearish
              </span>
              <span className="text-error font-mono text-xs font-semibold tabular-nums">
                {down.toFixed(1)}%
              </span>
            </div>
            <div className="bg-border h-1.5 overflow-hidden rounded-full">
              <div
                className="bg-error h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${down}%` }}
              />
            </div>
          </div>
        </div>
      </SpotlightCard>
    </BlurFade>
  )
}