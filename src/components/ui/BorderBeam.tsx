import { cn } from "@/utils/cn"

interface BorderBeamProps {
  children: React.ReactNode
  className?: string
  thickness?: number
  duration?: number
}

export function BorderBeam({
  children,
  className,
  thickness = 1.5,
  duration = 8,
}: BorderBeamProps) {
  return (
    <div className={cn('relative rounded-[inherit]', className)}>
      <div
        className="pointer-events-none absolute rounded-[inherit]"
        style={{
          inset: `-${thickness}px`,
          padding: `${thickness}px`,
          background: `conic-gradient(
            from var(--angle),
            transparent 0%,
            var(--color-primary) 12%,
            var(--color-error) 20%,
            var(--color-success) 28%,
            var(--color-primary) 50%,
            transparent 60%
          )`,
          animation: `spin-border ${duration}s linear infinite`,
          WebkitMask:
            'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />

      <div className="relative rounded-[inherit] backdrop-blur-xl">
        {children}
      </div>
    </div>
  )
}