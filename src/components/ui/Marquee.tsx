import { cn } from '@/utils/cn'

interface MarqueeProps {
  children: React.ReactNode
  className?: string
  speed?: number
  pauseOnHover?: boolean
}

export function Marquee({
  children,
  className,
  speed = 40,
  pauseOnHover = true,
}: MarqueeProps) {
  return (
    <div
      className={cn('group flex overflow-hidden', className)}
      style={
        {
          '--marquee-duration': `${speed}s`,
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          'flex shrink-0 animate-marquee gap-4',
          pauseOnHover && 'group-hover:[animation-play-state:paused]'
        )}
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className={cn(
          'flex shrink-0 animate-marquee gap-4',
          pauseOnHover && 'group-hover:[animation-play-state:paused]'
        )}
      >
        {children}
      </div>
    </div>
  )
}