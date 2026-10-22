import { TiltCard } from './TiltCard'
import { BorderBeam } from './BorderBeam'
import { SpotlightCard } from './SpotlightCard'
import { cn } from '@/utils/cn'

interface PremiumCardProps {
  children: React.ReactNode
  spotlightColor?: string
  maxTilt?: number
  beam?: boolean
  className?: string
  beamClassName?: string
}

export function PremiumCard({
  children,
  spotlightColor = 'rgba(255, 193, 7, 0.12)',
  maxTilt = 4,
  beam = true,
  className,
  beamClassName,
}: PremiumCardProps) {
  const inner = (
    <SpotlightCard spotlightColor={spotlightColor} className={className}>
      {children}
    </SpotlightCard>
  )

  const withBeam = beam ? (
    <BorderBeam
      thickness={1.5}
      duration={8}
      className={cn('rounded-2xl', beamClassName)}
    >
      {inner}
    </BorderBeam>
  ) : (
    inner
  )

  return (
    <TiltCard maxTilt={maxTilt} className="h-full">
      {withBeam}
    </TiltCard>
  )
}