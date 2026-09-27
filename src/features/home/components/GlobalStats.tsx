import { Globe, TrendingUp, Bitcoin, Coins } from 'lucide-react'
import { NumberTicker } from '@/components/ui/NumberTicker'
import { BlurFade } from '@/components/ui/BlurFade'
import { SpotlightCard } from '@/components/ui/SpotlightCard'
import { cn } from '@/utils/cn'
import type { GlobalStats as GlobalStatsType } from '@/types/coin'

interface GlobalStatsProps {
  stats: GlobalStatsType
}

export function GlobalStats({ stats }: GlobalStatsProps) {
  const cards = [
    {
      label: 'Total Market Cap',
      value: stats.total_market_cap.usd / 1_000_000_000_000,
      prefix: '$',
      suffix: 'T',
      decimals: 2,
      change: stats.market_cap_change_percentage_24h_usd,
      icon: Globe,
      color: {
        text: 'text-primary',
        line: 'via-primary/60',
        watermark: 'text-primary',
        spotlight: 'rgba(255, 193, 7, 0.12)',
      },
    },
    {
      label: '24h Volume',
      value: stats.total_volume.usd / 1_000_000_000,
      prefix: '$',
      suffix: 'B',
      decimals: 1,
      icon: TrendingUp,
      color: {
        text: 'text-success',
        line: 'via-success/60',
        watermark: 'text-success',
        spotlight: 'rgba(34, 197, 94, 0.12)',
      },
    },
    {
      label: 'BTC Dominance',
      value: stats.market_cap_percentage.btc,
      suffix: '%',
      decimals: 1,
      icon: Bitcoin,
      color: {
        text: 'text-[#F7931A]',
        line: 'via-[#F7931A]/60',
        watermark: 'text-[#F7931A]',
        spotlight: 'rgba(247, 147, 26, 0.12)',
      },
    },
    {
      label: 'Active Coins',
      value: stats.active_cryptocurrencies,
      suffix: '+',
      decimals: 0,
      icon: Coins,
      color: {
        text: 'text-[#7C3AED]',
        line: 'via-[#7C3AED]/60',
        watermark: 'text-[#7C3AED]',
        spotlight: 'rgba(124, 58, 237, 0.12)',
      },
    },
  ]

  return (
    <section className="py-12 md:py-16">
      <BlurFade delay={0.1}>
        <div className="mb-8 flex items-end justify-between">
          <div>
            <div className="text-text-secondary mb-2 flex items-center gap-2 font-mono text-xs uppercase tracking-widest">
              <span className="relative flex h-1.5 w-1.5">
                <span className="bg-success absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
                <span className="bg-success relative inline-flex h-1.5 w-1.5 rounded-full" />
              </span>
              Live Overview
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              Global Market
            </h2>
          </div>
          <p className="text-text-secondary hidden font-mono text-xs md:block">
            Updated just now
          </p>
        </div>
      </BlurFade>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((card, i) => {
          const Icon = card.icon

          return (
            <BlurFade key={card.label} delay={0.1 + i * 0.05}>
              <SpotlightCard
                spotlightColor={card.color.spotlight}
                className={cn(
                  'group border-border/50 bg-surface/40 relative h-full overflow-hidden rounded-2xl border backdrop-blur-xl',
                  'transition-colors hover:border-border',
                )}
              >
                <div
                  className={cn(
                    'absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent to-transparent',
                    card.color.line,
                  )}
                />

                <Icon
                  className={cn(
                    'absolute -right-4 -bottom-4 h-28 w-28 opacity-[0.05] transition-opacity duration-300 group-hover:opacity-[0.1]',
                    card.color.watermark,
                  )}
                  strokeWidth={1.5}
                />

                <div className="relative z-10 flex h-full flex-col items-center justify-center p-5 text-center">
                  {/* Label */}
                  <p className="text-text-secondary mb-3 font-mono text-[10px] uppercase tracking-widest">
                    {card.label}
                  </p>

                  {/* Value */}
                  <p
                    className={cn(
                      'font-display text-3xl font-bold tabular-nums md:text-4xl',
                      card.color.text,
                    )}
                  >
                    <NumberTicker
                      value={card.value}
                      prefix={card.prefix}
                      suffix={card.suffix}
                      decimals={card.decimals}
                    />
                  </p>

                  {/* Change */}
                  {card.change !== undefined && (
                    <div className="mt-3 flex items-center gap-1.5">
                      <div
                        className={cn(
                          'flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-medium',
                          card.change >= 0
                            ? 'bg-success/10 text-success'
                            : 'bg-error/10 text-error',
                        )}
                      >
                        <span>{card.change >= 0 ? '↑' : '↓'}</span>
                        <span>{Math.abs(card.change).toFixed(2)}%</span>
                      </div>
                      <span className="text-text-secondary font-mono text-[10px]">
                        24h
                      </span>
                    </div>
                  )}
                </div>
              </SpotlightCard>
            </BlurFade>
          )
        })}
      </div>
    </section>
  )
}