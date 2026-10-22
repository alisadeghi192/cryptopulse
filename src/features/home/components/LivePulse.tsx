import { Link } from 'react-router'
import { BorderBeam } from '@/components/ui/BorderBeam'
import { BlurFade } from '@/components/ui/BlurFade'
import { PriceMarquee } from './PriceMarquee'
import { MainCoinCard } from './MainCoinCard'
import type { Coin } from '@/types/coin'

interface LivePulseProps {
  coins: Coin[]
  bitcoin?: Coin
  isPositive: boolean
}

export function LivePulse({ coins, bitcoin, isPositive }: LivePulseProps) {
  return (
    <div className="lg:col-span-6">
      <BlurFade delay={0.4} className="animate-auto-tilt">
        <BorderBeam
          thickness={2}
          duration={6}
          className="rounded-2xl shadow-2xl shadow-black/10 transition-shadow duration-500 hover:shadow-primary/20 dark:shadow-black/40"
        >
          <div className="bg-surface/80 overflow-hidden rounded-2xl backdrop-blur-2xl">
            {/* Marquee — link to BTC */}
            <Link to="/coin/bitcoin" className="block group">
              <PriceMarquee coins={coins} />
            </Link>

            {/* Main card — the card body stays as the link, but buttons are outside */}
            <MainCoinCard bitcoin={bitcoin} isPositive={isPositive} />
          </div>
        </BorderBeam>
      </BlurFade>
    </div>
  )
}