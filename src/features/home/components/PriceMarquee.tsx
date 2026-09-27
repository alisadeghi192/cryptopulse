import { TrendingUp, TrendingDown } from 'lucide-react'
import { Marquee } from '@/components/ui/Marquee'
import { cn } from '@/utils/cn'
import type { Coin } from '@/types/coin'

interface PriceMarqueeProps {
  coins: Coin[]
}

export function PriceMarquee({ coins }: PriceMarqueeProps) {
  return (
    <div className="border-border/50 bg-background/40 border-b py-2">
      <Marquee
        speed={300}
        pauseOnHover={true}
        className="mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
      >
        {coins.map((coin) => (
          <div
            key={coin.id}
            className="flex shrink-0 items-center gap-2 px-3 font-mono text-xs"
          >
            <span className="text-text-secondary uppercase">
              {coin.symbol}
            </span>
            <span className="text-text">
              $
              {coin.current_price.toLocaleString('en-US', {
                maximumFractionDigits: coin.current_price < 1 ? 4 : 2,
              })}
            </span>
            <span
              className={cn(
                'flex items-center gap-0.5',
                (coin.price_change_percentage_24h ?? 0) >= 0
                  ? 'text-success'
                  : 'text-error',
              )}
            >
              {(coin.price_change_percentage_24h ?? 0) >= 0 ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              {(coin.price_change_percentage_24h ?? 0) >= 0 ? '+' : ''}
              {coin.price_change_percentage_24h?.toFixed(2) ?? '0.00'}
              %
            </span>
          </div>
        ))}
      </Marquee>
    </div>
  )
}