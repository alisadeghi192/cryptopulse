import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { AmbientLights } from './AmbientLights'
import { BlurFade } from './BlurFade'
import { cn } from '@/utils/cn'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description?: string
  action?: ReactNode
  variant?: 'default' | 'gold' | 'blue'
  className?: string
}

const VARIANT_AMBIENT = {
  default: 'multi',
  gold: 'gold',
  blue: 'blue',
} as const

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  variant = 'blue',
  className,
}: EmptyStateProps) {
  return (
    <BlurFade delay={0.1}>
      <div
        className={cn(
          'border-border/40 bg-surface/40 relative overflow-hidden rounded-2xl border shadow-xl backdrop-blur-3xl',
          className,
        )}
      >
        <div className="pointer-events-none absolute inset-0">
          <AmbientLights variant={VARIANT_AMBIENT[variant]} intensity="subtle" />
        </div>
        <div className="relative flex flex-col items-center gap-5 p-12 text-center">
          <div className="border-border/40 bg-elevated/40 flex size-16 items-center justify-center rounded-2xl border shadow-sm">
            <Icon className="text-text/40 size-7" />
          </div>
          <div>
            <p className="text-text font-mono text-sm font-medium">{title}</p>
            {description && (
              <p className="text-text/60 mt-1 font-mono text-xs">
                {description}
              </p>
            )}
          </div>
          {action}
        </div>
      </div>
    </BlurFade>
  )
}