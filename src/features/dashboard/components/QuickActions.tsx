import { useNavigate } from 'react-router'
import { ArrowDownToLine, ArrowUpFromLine, TrendingUp } from 'lucide-react'
import { AmbientLights } from '@/components/ui/AmbientLights'
import { SpotlightCard } from '@/components/ui/SpotlightCard'
import { BlurFade } from '@/components/ui/BlurFade'
import { cn } from '@/utils/cn'

interface QuickActionsProps {
  onDeposit: () => void
  onWithdraw: () => void
}

export function QuickActions({ onDeposit, onWithdraw }: QuickActionsProps) {
  const navigate = useNavigate()

  return (
    <BlurFade delay={0.15}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <ActionCard
          label="Deposit"
          sublabel="Add funds to your wallet"
          icon={ArrowDownToLine}
          ambientVariant="green"
          spotlightColor="rgba(34, 197, 94, 0.15)"
          accent="success"
          onClick={onDeposit}
        />
        <ActionCard
          label="Withdraw"
          sublabel="Send funds to your card"
          icon={ArrowUpFromLine}
          ambientVariant="yellow"
          spotlightColor="rgba(250, 204, 21, 0.15)"
          accent="yellow"
          onClick={onWithdraw}
        />
        <ActionCard
          label="Trade"
          sublabel="Buy and sell crypto"
          icon={TrendingUp}
          ambientVariant="lightblue"
          spotlightColor="rgba(59, 130, 246, 0.15)"
          accent="blue"
          onClick={() => navigate('/markets?view=table')}
        />
      </div>
    </BlurFade>
  )
}

type AmbientVariant = 'green' | 'yellow' | 'lightblue'
type AccentColor = 'success' | 'yellow' | 'blue'

interface ActionCardProps {
  label: string
  sublabel: string
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  ambientVariant: AmbientVariant
  spotlightColor: string
  accent: AccentColor
  onClick: () => void
}

const ACCENT_CLASSES: Record<AccentColor, { text: string; hover: string }> = {
  success: { text: 'text-success', hover: 'hover:text-success' },
  yellow: { text: 'text-[#FACC15]', hover: 'hover:text-[#FACC15]' },
  blue: { text: 'text-[#3B82F6]', hover: 'hover:text-[#3B82F6]' },
}

function ActionCard({
  label,
  sublabel,
  icon: Icon,
  ambientVariant,
  spotlightColor,
  accent,
  onClick,
}: ActionCardProps) {
  const accentClass = ACCENT_CLASSES[accent]

  return (
    <button
      type="button"
      onClick={onClick}
      className="group/action relative block h-full w-full cursor-pointer overflow-hidden rounded-2xl text-left transition-transform hover:-translate-y-0.5"
    >
      <div className="pointer-events-none absolute inset-0">
        <AmbientLights variant={ambientVariant} intensity="subtle" />
      </div>
      <SpotlightCard
        spotlightColor={spotlightColor}
        className="border-border/40 bg-surface/40 relative h-full rounded-2xl border p-5 shadow-lg backdrop-blur-3xl"
      >
        {/* Watermark Icon */}
        <Icon
          className={cn(
            'pointer-events-none absolute -right-4 -bottom-4 h-28 w-28 opacity-20 transition-opacity duration-300 group-hover/action:opacity-30 dark:opacity-5 dark:group-hover/action:opacity-10',
            accentClass.text,
          )}
          strokeWidth={1.5}
        />

        <div className="relative z-10">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Icon className={cn('size-4', accentClass.text)} />
              <span className="text-text/70 font-mono text-[10px] tracking-widest uppercase">
                {label}
              </span>
            </div>
            <div
              className={cn(
                'flex size-7 items-center justify-center rounded-full bg-background/50 opacity-0 transition-all duration-300 group-hover/action:translate-x-1 group-hover/action:opacity-100',
                accentClass.text,
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-3.5"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </div>
          </div>
          <p className="text-text mt-3 truncate font-mono text-base font-semibold">
            {label}
          </p>
          <p className="text-text/60 mt-1 font-mono text-[10px]">{sublabel}</p>
        </div>
      </SpotlightCard>
    </button>
  )
}