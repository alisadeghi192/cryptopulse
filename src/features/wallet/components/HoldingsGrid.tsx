import { Wallet as WalletIcon, TrendingUp } from 'lucide-react'
import { BlurFade } from '@/components/ui/BlurFade'
import { EmptyState } from '@/components/ui/EmptyState'
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
        <EmptyState
          icon={WalletIcon}
          title="No holdings yet"
          description="Buy your first coin to start building your portfolio"
          variant="blue"
        />
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