import { Wallet as WalletIcon, TrendingUp } from 'lucide-react'
import { BlurFade } from '@/components/ui/BlurFade'
import { AmbientLights } from '@/components/ui/AmbientLights'
import { HoldingCard } from './HoldingCard'
import type { HoldingWithPrice } from '@/types/wallet'

interface HoldingsGridProps {
  holdings: HoldingWithPrice[]
}

export function HoldingsGrid({ holdings }: HoldingsGridProps) {
  return (
    <BlurFade delay={0.1}>
      <div className="mb-3 flex items-center gap-2">
        <TrendingUp className="text-primary size-3.5" />
        <span className="text-primary font-mono text-[10px] tracking-[0.25em] uppercase">
          Holdings
        </span>
        <div className="bg-border h-px flex-1" />
      </div>

      {holdings.length === 0 ? (
        <div className="border-border/40 bg-surface/40 relative overflow-hidden rounded-2xl border backdrop-blur-3xl">
          <div className="pointer-events-none absolute inset-0">
            <AmbientLights variant="blue" intensity="subtle" />
          </div>
          <div className="relative flex flex-col items-center gap-5 p-12 text-center">
            <div className="border-border/40 bg-elevated/40 flex size-16 items-center justify-center rounded-2xl border shadow-sm">
              <WalletIcon className="text-text/40 size-7" />
            </div>
            <div>
              <p className="text-text font-mono text-sm font-medium">
                No holdings yet
              </p>
              <p className="text-text/60 mt-1 font-mono text-xs">
                Buy your first coin to start building your portfolio
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {holdings.map((holding) => (
            <HoldingCard key={holding.id} holding={holding} />
          ))}
        </div>
      )}
    </BlurFade>
  )
}