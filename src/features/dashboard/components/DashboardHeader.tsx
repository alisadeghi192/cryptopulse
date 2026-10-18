import { LayoutDashboard } from 'lucide-react'
import { BlurFade } from '@/components/ui/BlurFade'

interface DashboardHeaderProps {
  displayName: string
  initial: string
}

export function DashboardHeader({ displayName, initial }: DashboardHeaderProps) {
  return (
    <BlurFade>
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <div className="text-text/70 mb-2 flex items-center gap-2 font-mono text-xs tracking-widest uppercase">
            <LayoutDashboard className="text-primary size-3.5" />
            Overview
          </div>
          <h1 className="font-display text-text text-3xl font-bold tracking-tight md:text-4xl">
            Welcome back, {displayName}
          </h1>
        </div>

        <div className="border-primary/30 bg-primary/10 text-primary flex size-12 shrink-0 items-center justify-center rounded-full border text-lg font-bold">
          {initial}
        </div>
      </div>
    </BlurFade>
  )
}