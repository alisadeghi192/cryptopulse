import { TrendingUp, TrendingDown } from 'lucide-react'
import { FlashValue } from '@/components/ui/FlashValue'
import { BlurFade } from '@/components/ui/BlurFade'
import { WatchlistButton } from '@/components/ui/WatchlistButton'
import { cn } from '@/utils/cn'
import { coinImageUrl } from '@/utils/image'

interface CoinHeaderProps {
  coinId: string
  name: string
  symbol: string
  image: string
  rank: number
  price: number
  change24h: number
}

export function CoinHeader({
  name,
  symbol,
  image,
  rank,
  price,
  change24h,
  coinId,
}: CoinHeaderProps) {
  const isPositive = change24h >= 0

  return (
    <BlurFade>
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <div className="bg-primary/20 absolute inset-0 rounded-full blur-lg" />
            <img
              src={coinImageUrl(image)}
              alt={name}
              className="relative h-14 w-14 animate-[scale-in_0.5s_ease-out] rounded-full md:h-16 md:w-16"
            />
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-display text-text text-2xl font-bold tracking-wider md:text-3xl">
                {name}
              </h1>
              <span className="text-primary font-mono text-sm uppercase">
                {symbol}
              </span>
              <span className="border-border bg-elevated/60 text-text-secondary rounded-md border px-2 py-0.5 font-mono text-xs">
                #{rank}
              </span>
            </div>

            <div className="mt-2 flex items-center gap-3">
              <span className="text-text font-mono text-4xl font-bold tabular-nums max-[400px]:text-2xl! max-md:text-3xl">
                $<FlashValue value={price} decimals={price < 1 ? 6 : 2} />
              </span>
              <span
                className={cn(
                  'flex items-center gap-1 rounded-md px-2 py-0.5 font-mono text-sm font-medium',
                  isPositive
                    ? 'bg-success/10 text-success'
                    : 'bg-error/10 text-error',
                )}
              >
                {isPositive ? (
                  <TrendingUp className="h-3.5 w-3.5" />
                ) : (
                  <TrendingDown className="h-3.5 w-3.5" />
                )}
                {isPositive ? '+' : ''}
                {change24h.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>

        <WatchlistButton
          coinId={coinId}
          size="md"
          variant="full"
        />
      </div>
    </BlurFade>
  )
}
