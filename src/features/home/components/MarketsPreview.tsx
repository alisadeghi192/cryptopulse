import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { BlurFade } from '@/components/ui/BlurFade'
import { CoinRow } from '@/features/coin/components/CoinCard'
import { useCoins } from '@/hooks/useCoins'

export function MarketsPreview() {
  const { data: coins, isLoading } = useCoins({
    perPage: 10,
    sparkline: true,
  })

  if (isLoading || !coins || coins.length === 0) {
    return (
      <section className="container pt-12 md:pt-16">
        <div className="mb-8">
          <div className="bg-elevated mb-2 h-4 w-32 animate-pulse rounded" />
          <div className="bg-elevated h-10 w-40 animate-pulse rounded" />
        </div>
        <div className="border-border bg-surface h-96 animate-pulse rounded-2xl border" />
      </section>
    )
  }

  return (
    <section className="container pt-12 md:pt-16">
      <BlurFade delay={0.1}>
        <div className="mb-8 flex items-end justify-between">
          <div>
            <div className="text-text-secondary mb-2 flex items-center gap-2 font-mono text-xs tracking-widest uppercase">
              <span className="relative flex h-1.5 w-1.5">
                <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
                <span className="bg-primary relative inline-flex h-1.5 w-1.5 rounded-full" />
              </span>
              Top 10 by Market Cap
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              Markets
            </h2>
          </div>
          <Link
            to="/markets"
            className="text-primary hover:text-primary-hover group flex items-center gap-1 font-mono text-xs transition-colors"
          >
            View All
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </BlurFade>

      <BlurFade delay={0.2}>
        <div className="border-border bg-surface/80 overflow-hidden rounded-2xl border shadow-lg backdrop-blur-2x">
          <div className="border-border text-text-secondary grid grid-cols-[1fr_90px_80px] items-center border-b px-4 py-3 font-mono text-xs tracking-wider uppercase md:grid-cols-[60px_1fr_130px_110px_120px_100px]">
            <span className="md:hidden">Coin</span>
            <span className="hidden md:block">#</span>
            <span className="hidden md:block">Coin</span>
            <span className="text-center">Price</span>
            <span className="text-center">24h %</span>
            <span className="hidden text-center md:block">7d</span>
            <span className="hidden text-center md:block">Market Cap</span>
          </div>

          <div className="divide-border/30 divide-y">
            {coins.map((coin, i) => (
              <BlurFade key={coin.id} delay={0.3 + i * 0.03}>
                <CoinRow coin={coin} />
              </BlurFade>
            ))}
          </div>
        </div>
      </BlurFade>
    </section>
  )
}