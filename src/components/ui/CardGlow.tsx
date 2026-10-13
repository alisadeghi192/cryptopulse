import { cn } from '@/utils/cn'

interface CardGlowProps {
  color?: 'primary' | 'purple' | 'success' | 'orange' | 'cyan' | 'blue'
  intensity?: 'subtle' | 'normal' | 'strong'
  className?: string
}

const COLORS = {
  primary: 'bg-primary/25',
  purple: 'bg-[#7C3AED]/25',
  success: 'bg-success/25',
  orange: 'bg-[#F7931A]/25',
  cyan: 'bg-[#06B6D4]/25',
  blue: 'bg-[#3B82F6]/25',
}

const INTENSITIES = {
  subtle: 'opacity-60 blur-2xl',
  normal: 'opacity-80 blur-3xl',
  strong: 'opacity-100 blur-3xl',
}

export function CardGlow({
  color = 'primary',
  intensity = 'normal',
  className,
}: CardGlowProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute -inset-4 -z-10 rounded-[inherit] animate-glow-breathe',
        COLORS[color],
        INTENSITIES[intensity],
        className,
      )}
    />
  )
}