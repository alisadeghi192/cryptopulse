import { cn } from '@/utils/cn'
import { AMBIENT_LIGHTS, type AmbientVariant } from '@/constants/ambient'

interface AmbientLightsProps {
  variant?: AmbientVariant
  intensity?: 'subtle' | 'normal'
  className?: string
}

export function AmbientLights({
  variant = 'multi',
  intensity = 'normal',
  className,
}: AmbientLightsProps) {
  const lights = AMBIENT_LIGHTS[variant]
  const multiplier = intensity === 'subtle' ? 0.6 : 1

  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        className,
      )}
    >
      {lights.map((light, i) => (
        <div
          key={i}
          className={cn(
            'absolute rounded-full',
            light.position,
            light.size,
            light.blur,
          )}
          style={{
            background: light.color,
            opacity: `calc(${light.opacity} * var(--ambient-multiplier, 1) * ${multiplier})`,
            animation: light.animation,
          }}
        />
      ))}
    </div>
  )
}