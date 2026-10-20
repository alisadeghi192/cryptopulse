
import { Link } from 'react-router'
import { Wallet, ChevronRight } from 'lucide-react'
import { AmbientLights } from '@/components/ui/AmbientLights'
import { SpotlightCard } from '@/components/ui/SpotlightCard'
import { BalanceValue } from '@/components/ui/BalanceValue'

interface BalanceCardProps {
  cashBalance: number
}

export function BalanceCard({ cashBalance }: BalanceCardProps) {
  return (
    <Link to="/wallet" className="block h-full">
      <div className="group/wallet relative h-full overflow-hidden rounded-2xl shadow-md transition-transform hover:-translate-y-0.5">
        <div className="pointer-events-none absolute inset-0">
          <AmbientLights variant="yellow" intensity="subtle" />
        </div>
        <SpotlightCard
          spotlightColor="rgba(250, 204, 21, 0.15)"
          className="border-border/40 bg-surface/40 relative h-full rounded-2xl border p-5 shadow-lg backdrop-blur-3xl"
        >
          {/* Watermark */}
          <Wallet
            className="pointer-events-none absolute -right-4 -bottom-4 h-28 w-28 text-[#FACC15] opacity-20 transition-opacity duration-300 group-hover/wallet:opacity-30 dark:opacity-5 dark:group-hover/wallet:opacity-10"
            strokeWidth={1.5}
          />

          <div className="relative z-10">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Wallet className="size-4 text-[#FACC15]" />
                <span className="text-text/70 font-mono text-[10px] tracking-widest uppercase">
                  Cash Balance
                </span>
              </div>
              <ChevronRight className="text-text/40 group-hover/wallet:text-[#FACC15] size-4 shrink-0 transition-all group-hover/wallet:translate-x-0.5" />
            </div>
            <p className="text-text mt-3 font-mono text-base font-semibold tabular-nums md:text-lg">
              <BalanceValue value={cashBalance} />
            </p>
            <p className="text-text/70 mt-1 font-mono text-[10px]">
              Available funds
            </p>
          </div>
        </SpotlightCard>
      </div>
    </Link>
  )
}