
import { GridPattern } from '@/components/ui/GridPattern'
import { HeroContent } from './HeroContent'
import { LivePulse } from './LivePulse'
import type { Coin } from '@/types/coin'
import { AmbientLights } from '@/components/ui/AmbientLights'

interface HeroSectionProps {
  coins: Coin[]
  bitcoin?: Coin
  isPositive: boolean
}

export function HeroSection({ coins, bitcoin, isPositive }: HeroSectionProps) {
  return (
    <div className="relative z-10 mx-auto sm:px-2 md:px-4 lg:px-6 xl:px-10">
      {/* ─── Background Effects ─────────────────── */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AmbientLights variant="aurora" />
        <GridPattern />
      </div>

      {/* ─── Hero Section ────────────────────── */}
      <section className="grid container grid-cols-1 items-center gap-12 py-12 md:py-20 lg:grid-cols-12 lg:gap-8">
        <HeroContent />
        <LivePulse
          coins={coins}
          bitcoin={bitcoin}
          isPositive={isPositive}
        />
      </section>
    </div>
  )
}