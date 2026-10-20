import type { LucideIcon } from 'lucide-react'
import { Copy } from 'lucide-react'
import { toast } from 'sonner'
import { AmbientLights } from '@/components/ui/AmbientLights'
import { SpotlightCard } from '@/components/ui/SpotlightCard'
import { cn } from '@/utils/cn'

type AmbientVariant = 'lightblue' | 'green' | 'yellow'
type AccentColor = 'blue' | 'success' | 'yellow'

interface InfoCardProps {
  label: string
  value: string
  sublabel: string
  icon: LucideIcon
  ambientVariant: AmbientVariant
  spotlightColor: string
  accent: AccentColor
  copyValue: string
  copyLabel: string
  valueClassName?: string
}

const ACCENT_CLASSES: Record<
  AccentColor,
  { text: string; hover: string; }
> = {
  blue: {
    text: 'text-[#3B82F6]',
    hover: 'hover:text-[#3B82F6]',
  },
  success: {
    text: 'text-success',
    hover: 'hover:text-success',
  },
  yellow: {
    text: 'text-[#FACC15]',
    hover: 'hover:text-[#FACC15]',
  },
}

export function InfoCard({
  label,
  value,
  sublabel,
  icon: Icon,
  ambientVariant,
  spotlightColor,
  accent,
  copyValue,
  copyLabel,
  valueClassName,
}: InfoCardProps) {
  const accentClass = ACCENT_CLASSES[accent]

  return (
    <div className="relative h-full shadow-md overflow-hidden rounded-2xl">
      <div className="pointer-events-none absolute inset-0">
        <AmbientLights variant={ambientVariant} intensity="subtle" />
      </div>
      <SpotlightCard
        spotlightColor={spotlightColor}
        className="border-border/40 bg-surface/40 group/card relative h-full rounded-2xl border p-5 shadow-lg backdrop-blur-3xl"
      >

        {/* Watermark icon */}
        <Icon
          className={cn(
            'pointer-events-none absolute -right-4 -bottom-4 h-28 w-28 opacity-20 dark:opacity-5 transition-opacity duration-300 dark:group-hover/card:opacity-10 group-hover/card:opacity-30',
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
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(copyValue)
                toast.success('Copied!', { description: copyLabel })
              }}
              aria-label={`Copy ${label.toLowerCase()}`}
              className={cn(
                'text-text/40 shrink-0 opacity-0 transition-all group-hover/card:opacity-100',
                accentClass.hover,
              )}
            >
              <Copy className="size-3.5 cursor-pointer" />
            </button>
          </div>
          <p
            className={cn(
              'text-text mt-3 truncate font-mono text-base font-semibold tabular-nums md:text-lg',
              valueClassName,
            )}
          >
            {value}
          </p>
          <p className="text-text/70 mt-1 font-mono text-[10px]">{sublabel}</p>
        </div>
      </SpotlightCard>
    </div>
  )
}