import { Eye, TrendingUp } from 'lucide-react'
import { BlurFade } from '@/components/ui/BlurFade'
import { SpotlightCard } from '@/components/ui/SpotlightCard'

interface CommunityStatsProps {
  watchlistUsers: number | null
}

function formatNumber(value: number | null) {
  if (!value) return '—'
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`
  return value.toLocaleString()
}

export function CommunityStats({ watchlistUsers }: CommunityStatsProps) {
  const watchlist = formatNumber(watchlistUsers)

  if (watchlist === '—') return null

  return (
    <BlurFade delay={0.5}>
      <SpotlightCard
        spotlightColor="rgba(247, 147, 26, 0.10)"
        className="border-border shadow-lg bg-surface/30 h-full rounded-2xl border p-5 md:p-6"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-text text-sm font-bold">
            Community
          </h3>
          <span className="text-text-secondary font-mono text-[10px] tracking-wider uppercase">
            CoinGecko
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="border-[#F7931A]/30 bg-[#F7931A]/10 text-[#F7931A] flex size-12 shrink-0 items-center justify-center rounded-xl border">
            <Eye className="size-5" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-text-secondary font-mono text-[10px] tracking-wider uppercase">
              Watchlist
            </p>
            <p className="font-display text-text text-2xl font-bold tabular-nums">
              {watchlist}
            </p>
          </div>

          <TrendingUp className="text-[#F7931A]/50 size-5 shrink-0" />
        </div>
      </SpotlightCard>
    </BlurFade>
  )
}