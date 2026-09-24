import { Link } from 'react-router'
import {
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Zap,
  Coins,
  Gift,
  Shield,
} from 'lucide-react'
import { buttonVariants } from '@/components/ui/Button'
import { BorderBeam } from '@/components/ui/BorderBeam'
import { NumberTicker } from '@/components/ui/NumberTicker'
import { Marquee } from '@/components/ui/Marquee'
import { AnimatedSparkline } from '@/components/ui/AnimatedSparkline'
import { Aurora } from '@/components/ui/Aurora'
import { BlurFade } from '@/components/ui/BlurFade'
import { GridPattern } from '@/components/ui/GridPattern'
import { cn } from '@/utils/cn'

const tickerData = [
  { symbol: 'BTC', price: 45234.56, change: 2.34 },
  { symbol: 'ETH', price: 2345.67, change: -1.23 },
  { symbol: 'SOL', price: 98.45, change: 5.67 },
  { symbol: 'ADA', price: 0.45, change: 1.89 },
  { symbol: 'XRP', price: 0.62, change: -0.45 },
  { symbol: 'DOGE', price: 0.089, change: 3.12 },
]

export function Home() {
  return (
    <main className="relative">
      {/* ─── Background Effects ─────────────────── */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Aurora />
        <GridPattern />
      </div>

      <div className="container mx-auto px-6 py-12 lg:px-8">
        {/* ─── Hero Section ────────────────────── */}
        <section className="grid grid-cols-1 items-center gap-12 pt-12 md:pt-20 lg:grid-cols-12 lg:gap-8">
          {/* ─── Left Column ───────────────────── */}
          <div className="flex flex-col items-start gap-6 lg:col-span-6">
            {/* 1. Badge */}
            <div className="xs:flex-row xs:justify-evenly flex w-full flex-col items-center gap-4 sm:justify-start">
              <BlurFade delay={0.1}>
                <span className="border-success/30 bg-success/10 text-success inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-xs backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="bg-success absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
                    <span className="bg-success relative inline-flex h-2 w-2 rounded-full" />
                  </span>
                  Live Market Data
                </span>
              </BlurFade>
              <BlurFade delay={0.1}>
                <span className="border-primary/30 bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-xs backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
                    <span className="bg-primary relative inline-flex h-2 w-2 rounded-full" />
                  </span>
                  $1,000 free to start trading
                </span>
              </BlurFade>
            </div>

            {/* 2. Headline */}
            <BlurFade delay={0.2}>
              <h1 className="font-display text-center text-5xl leading-[1.05] font-bold tracking-tight sm:text-start md:text-6xl lg:text-7xl">
                The Pulse of{' '}
                <span className="from-primary via-primary-hover to-primary bg-linear-to-r bg-clip-text text-transparent">
                  Crypto
                </span>
                , <span className="text-primary">Live.</span>
              </h1>
            </BlurFade>

            {/* 3. Subheadline */}
            <BlurFade delay={0.3}>
              <p className="text-text-secondary max-w-xl text-center text-lg sm:text-start">
                <span className="text-text font-semibold">
                  $1,000 in virtual funds.
                </span>{' '}
                Real-time prices, powerful charts, and a wallet to grow your
                crypto wealth.
              </p>
            </BlurFade>

            {/* 4. CTAs */}
              <BlurFade delay={0.4} className='w-full'>
                <div className="flex flex-wrap basis-full items-center gap-3 pt-2">
                  <Link
                    to="/register"
                    className={cn(
                      buttonVariants({ variant: 'primary', size: 'lg' }),
                      'group shadow-primary/20 gap-2 shadow-lg max-sm:w-full',
                    )}
                  >
                    Get $1,000 Free
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    to="/markets"
                    className={cn(
                      buttonVariants({ variant: 'outline', size: 'lg' }),
                      "max-sm:w-full"
                    )}
                  >
                    Explore Markets
                  </Link>
                </div>
              </BlurFade>

            {/* 5. Trust badges */}
            <BlurFade delay={0.5}>
              <div className="text-text-secondary flex flex-wrap items-center justify-evenly gap-6 pt-4 text-sm">
                <div className="flex items-center gap-2">
                  <Zap className="text-success h-4 w-4" />
                  <span>Live prices</span>
                </div>
                <div className="flex items-center gap-2">
                  <Coins className="text-success h-4 w-4" />
                  <span>1000+ coins</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="text-success h-4 w-4" />
                  <span>Safe wallet</span>
                </div>
                <div className="flex items-center gap-2">
                  <Gift className="text-primary h-4 w-4" />
                  <span className="text-primary">$1,000 free</span>
                </div>
              </div>
            </BlurFade>
          </div>

          {/* ─── Right Column: Live Pulse ─────── */}
          <div className="lg:col-span-6">
            <BlurFade delay={0.4}>
              <BorderBeam
                thickness={2}
                duration={6}
                className="rounded-2xl shadow-2xl shadow-black/10 dark:shadow-black/40"
              >
                <div className="bg-surface/80 overflow-hidden rounded-2xl backdrop-blur-2xl">
                  {/* ─── Ticker Marquee ─────── */}
                  <div className="border-border/50 bg-background/40 border-b py-2">
                    <Marquee
                      speed={30}
                      className="mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
                    >
                      {tickerData.map((coin) => (
                        <div
                          key={coin.symbol}
                          className="flex shrink-0 items-center gap-2 px-3 font-mono text-xs"
                        >
                          <span className="text-text-secondary">
                            {coin.symbol}
                          </span>
                          <span className="text-text">
                            ${coin.price.toLocaleString()}
                          </span>
                          <span
                            className={cn(
                              'flex items-center gap-0.5',
                              coin.change >= 0 ? 'text-success' : 'text-error',
                            )}
                          >
                            {coin.change >= 0 ? (
                              <TrendingUp className="h-3 w-3" />
                            ) : (
                              <TrendingDown className="h-3 w-3" />
                            )}
                            {coin.change >= 0 ? '+' : ''}
                            {coin.change}%
                          </span>
                        </div>
                      ))}
                    </Marquee>
                  </div>

                  {/* ─── Main Card (BTC) ────── */}
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-[#F7931A] to-[#FFB84D] text-xl font-bold text-white shadow-lg shadow-[#F7931A]/30">
                          ₿
                        </div>
                        <div>
                          <p className="text-text font-medium">Bitcoin</p>
                          <p className="text-text-secondary font-mono text-xs">
                            BTC/USD
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-text font-mono text-3xl font-bold tabular-nums">
                          $<NumberTicker value={45234.56} />
                        </p>
                        <p className="text-success flex items-center justify-end gap-1 font-mono text-sm">
                          <TrendingUp className="h-3 w-3" />
                          +2.34%
                        </p>
                      </div>
                    </div>

                    {/* Sparkline */}
                    <div className="mt-4">
                      <AnimatedSparkline />
                    </div>

                    {/* Time Range Tabs */}
                    <div className="mt-4 flex items-center gap-1">
                      {['1H', '24H', '7D', '1M', '1Y'].map((range, i) => (
                        <button
                          key={range}
                          className={cn(
                            'rounded-md px-2.5 py-1 font-mono text-xs transition-colors',
                            i === 1
                              ? 'bg-primary/20 text-primary'
                              : 'text-text-secondary hover:bg-elevated hover:text-text',
                          )}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* ─── Stats Grid ────── */}
                  <div className="border-border/50 grid grid-cols-3 border-t">
                    {[
                      {
                        label: '24h Volume',
                        value: 45.2,
                        prefix: '$',
                        suffix: 'B',
                        decimals: 1,
                      },
                      {
                        label: 'Market Cap',
                        value: 892.1,
                        prefix: '$',
                        suffix: 'B',
                        decimals: 1,
                      },
                      {
                        label: 'BTC Dom',
                        value: 52.3,
                        suffix: '%',
                        decimals: 1,
                      },
                    ].map((stat, i) => (
                      <div
                        key={stat.label}
                        className={cn(
                          'p-4 text-center',
                          i !== 2 && 'border-border/50 border-r',
                        )}
                      >
                        <p className="text-text-secondary font-mono text-xs">
                          {stat.label}
                        </p>
                        <p className="text-text mt-1 font-mono text-sm font-bold">
                          <NumberTicker
                            value={stat.value}
                            prefix={stat.prefix}
                            suffix={stat.suffix}
                            decimals={stat.decimals}
                          />
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </BorderBeam>
            </BlurFade>
          </div>
        </section>
      </div>
    </main>
  )
}
