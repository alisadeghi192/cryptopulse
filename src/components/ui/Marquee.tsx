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
      className={cn(
        'group flex overflow-hidden',
        pauseOnHover && 'marquee-pausable',
        className
      )}
      style={
        {
          '--marquee-duration': `${speed}s`,
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          'animate-marquee flex shrink-0 gap-4',
        )}
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className={cn(
          'animate-marquee flex shrink-0 gap-4',
        )}
      >
        {children}
      </div>
    </div>
  )
}