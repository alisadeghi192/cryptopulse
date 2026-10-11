import { cn } from '@/utils/cn'

interface AmbientLightsProps {
  variant?:
    | 'gold'
    | 'success'
    | 'purple'
    | 'multi'
    | 'home'
    | 'aurora'
    | 'about'
    | 'coin'
    | 'auth'
  intensity?: 'subtle' | 'normal'
  className?: string
}

const LIGHTS = {
  aurora: [
    {
      position: '-top-40 -left-40',
      size: 'h-96 w-96',
      blur: 'blur-[80px]',
      color: '#7C3AED',
      opacity: 0.5,
      animation: 'aurora-1 15s ease-in-out infinite',
    },
    {
      position: '-right-40 -bottom-40',
      size: 'h-96 w-96',
      blur: 'blur-[80px]',
      color: 'var(--color-success)',
      opacity: 0.4,
      animation: 'aurora-2 18s ease-in-out infinite',
    },
    {
      position: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
      size: 'h-80 w-80',
      blur: 'blur-[100px]',
      color: 'var(--color-primary)',
      opacity: 0.3,
      animation: 'aurora-3 20s ease-in-out infinite',
    },
  ],
  gold: [
    {
      position: 'top-1/3 left-1/4',
      size: 'h-72 w-72',
      blur: 'blur-[100px]',
      color: 'var(--color-primary)',
      opacity: 0.4,
      animation: 'cta-light-1 14s ease-in-out infinite',
    },
  ],
  success: [
    {
      position: 'right-1/4 bottom-1/3',
      size: 'h-72 w-72',
      blur: 'blur-[100px]',
      color: 'var(--color-success)',
      opacity: 0.3,
      animation: 'cta-light-2 18s ease-in-out infinite',
    },
  ],
  purple: [
    {
      position: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
      size: 'h-80 w-80',
      blur: 'blur-[110px]',
      color: '#7C3AED',
      opacity: 0.25,
      animation: 'cta-light-3 20s ease-in-out infinite',
    },
  ],
  multi: [
    {
      position: 'top-1/3 left-1/4',
      size: 'h-72 w-72',
      blur: 'blur-[100px]',
      color: 'var(--color-primary)',
      opacity: 0.4,
      animation: 'cta-light-1 14s ease-in-out infinite',
    },
    {
      position: 'right-1/4 bottom-1/3',
      size: 'h-72 w-72',
      blur: 'blur-[100px]',
      color: 'var(--color-success)',
      opacity: 0.25,
      animation: 'cta-light-2 18s ease-in-out infinite',
    },
    {
      position: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
      size: 'h-80 w-80',
      blur: 'blur-[110px]',
      color: '#7C3AED',
      opacity: 0.25,
      animation: 'cta-light-3 20s ease-in-out infinite',
    },
  ],
  home: [
    {
      position: 'top-[5%] left-[8%]',
      size: 'h-72 w-72',
      blur: 'blur-[100px]',
      color: 'var(--color-primary)',
      opacity: 0.35,
      animation: 'cta-light-1 16s ease-in-out infinite',
    },

    {
      position: 'top-[15%] right-[10%]',
      size: 'h-80 w-80',
      blur: 'blur-[110px]',
      color: '#3B82F6',
      opacity: 0.25,
      animation: 'cta-light-2 18s ease-in-out infinite',
    },

    {
      position: 'top-[45%] left-[5%]',
      size: 'h-72 w-72',
      blur: 'blur-[100px]',
      color: '#7C3AED',
      opacity: 0.25,
      animation: 'cta-light-3 20s ease-in-out infinite',
    },

    {
      position: 'top-[55%] right-[8%]',
      size: 'h-72 w-72',
      blur: 'blur-[100px]',
      color: 'var(--color-success)',
      opacity: 0.22,
      animation: 'cta-light-1 22s ease-in-out infinite',
    },

    {
      position: 'bottom-[5%] left-1/2 -translate-x-1/2',
      size: 'h-80 w-80',
      blur: 'blur-[110px]',
      color: 'var(--color-primary)',
      opacity: 0.3,
      animation: 'cta-light-2 20s ease-in-out infinite',
    },

    {
      position: 'top-[30%] left-1/2 -translate-x-1/2',
      size: 'h-64 w-64',
      blur: 'blur-[90px]',
      color: 'var(--color-error)',
      opacity: 0.12,
      animation: 'cta-light-3 24s ease-in-out infinite',
    },
  ],
  about: [
    // Row 1: Hero
    {
      position: 'top-[3%] left-[8%]',
      size: 'h-80 w-80',
      blur: 'blur-[110px]',
      color: 'var(--color-primary)',
      opacity: 0.22,
      animation: 'cta-light-1 18s ease-in-out infinite',
    },
    {
      position: 'top-[5%] right-[10%]',
      size: 'h-72 w-72',
      blur: 'blur-[100px]',
      color: 'var(--color-error)',
      opacity: 0.14,
      animation: 'cta-light-2 20s ease-in-out infinite',
    },

    // Row 2: Mission / Tech
    {
      position: 'top-[18%] left-[15%]',
      size: 'h-72 w-72',
      blur: 'blur-[100px]',
      color: '#7C3AED',
      opacity: 0.2,
      animation: 'cta-light-3 22s ease-in-out infinite',
    },
    {
      position: 'top-[25%] right-[15%]',
      size: 'h-72 w-72',
      blur: 'blur-[100px]',
      color: 'var(--color-success)',
      opacity: 0.16,
      animation: 'cta-light-1 24s ease-in-out infinite',
    },
    {
      position: 'top-[32%] left-1/2 -translate-x-1/2',
      size: 'h-80 w-80',
      blur: 'blur-[110px]',
      color: 'var(--color-primary)',
      opacity: 0.16,
      animation: 'cta-light-2 26s ease-in-out infinite',
    },

    // Row 3: Features / Capabilities
    {
      position: 'top-[45%] left-[10%]',
      size: 'h-72 w-72',
      blur: 'blur-[100px]',
      color: 'var(--color-error)',
      opacity: 0.12,
      animation: 'cta-light-3 20s ease-in-out infinite',
    },
    {
      position: 'top-[52%] right-[10%]',
      size: 'h-72 w-72',
      blur: 'blur-[100px]',
      color: '#7C3AED',
      opacity: 0.18,
      animation: 'cta-light-1 22s ease-in-out infinite',
    },
    {
      position: 'top-[60%] left-1/2 -translate-x-1/2',
      size: 'h-80 w-80',
      blur: 'blur-[110px]',
      color: 'var(--color-success)',
      opacity: 0.14,
      animation: 'cta-light-2 24s ease-in-out infinite',
    },

    // Row 4: Developer / Bottom
    {
      position: 'top-[74%] left-[15%]',
      size: 'h-72 w-72',
      blur: 'blur-[100px]',
      color: 'var(--color-primary)',
      opacity: 0.18,
      animation: 'cta-light-3 24s ease-in-out infinite',
    },
    {
      position: 'top-[80%] right-[15%]',
      size: 'h-72 w-72',
      blur: 'blur-[100px]',
      color: 'var(--color-error)',
      opacity: 0.12,
      animation: 'cta-light-1 26s ease-in-out infinite',
    },
    {
      position: 'top-[93%] left-[25%] -translate-x-1/2',
      size: 'h-80 w-80',
      blur: 'blur-[110px]',
      color: '#7C3AED',
      opacity: 0.16,
      animation: 'cta-light-2 28s ease-in-out infinite',
    },
  ],
coin: [
  // 1. Top-left (gold)
  {
    position: 'top-[3%] left-[10%]',
    size: 'h-80 w-80',
    blur: 'blur-[110px]',
    color: 'var(--color-primary)',
    opacity: 0.2,
    animation: 'cta-light-1 18s ease-in-out infinite',
  },
  // 2. Top-right (green)
  {
    position: 'top-[8%] right-[10%]',
    size: 'h-72 w-72',
    blur: 'blur-[100px]',
    color: 'var(--color-success)',
    opacity: 0.12,
    animation: 'cta-light-2 20s ease-in-out infinite',
  },
  // 3. Middle-center (blue)
  {
    position: 'top-[28%] left-1/2 -translate-x-1/2',
    size: 'h-80 w-80',
    blur: 'blur-[120px]',
    color: '#3B82F6',
    opacity: 0.12,
    animation: 'cta-light-3 22s ease-in-out infinite',
  },
  // 4. Middle-left (purple)
  {
    position: 'top-[45%] left-[8%]',
    size: 'h-72 w-72',
    blur: 'blur-[100px]',
    color: '#7C3AED',
    opacity: 0.1,
    animation: 'cta-light-1 24s ease-in-out infinite',
  },
  // 5. Middle-right (cyan)
  {
    position: 'top-[52%] right-[8%]',
    size: 'h-72 w-72',
    blur: 'blur-[100px]',
    color: '#06B6D4',
    opacity: 0.1,
    animation: 'cta-light-2 22s ease-in-out infinite',
  },
  // 6. Bottom-left (error)
  {
    position: 'top-[70%] left-[12%]',
    size: 'h-72 w-72',
    blur: 'blur-[100px]',
    color: 'var(--color-error)',
    opacity: 0.08,
    animation: 'cta-light-3 26s ease-in-out infinite',
  },
  // 7. Bottom-right (gold)
  {
    position: 'top-[82%] right-[12%]',
    size: 'h-80 w-80',
    blur: 'blur-[110px]',
    color: 'var(--color-primary)',
    opacity: 0.12,
    animation: 'cta-light-1 28s ease-in-out infinite',
  },
],
  auth: [
    { position: 'top-[8%] left-[12%]', size: 'h-72 w-72', blur: 'blur-[100px]', color: 'var(--color-error)', opacity: 0.28, animation: 'cta-light-1 18s ease-in-out infinite' },
    { position: 'top-[3%] right-[15%]', size: 'h-64 w-64', blur: 'blur-[90px]', color: '#7C3AED', opacity: 0.26, animation: 'cta-light-2 20s ease-in-out infinite' },
    { position: 'top-[30%] left-1/2 -translate-x-1/2', size: 'h-80 w-80', blur: 'blur-[120px]', color: 'var(--color-success)', opacity: 0.2, animation: 'cta-light-3 22s ease-in-out infinite' },
    { position: 'top-[25%] right-[8%]', size: 'h-72 w-72', blur: 'blur-[100px]', color: '#3B82F6', opacity: 0.22, animation: 'cta-light-1 24s ease-in-out infinite' },
    { position: 'top-1/2 left-[5%] -translate-y-1/2', size: 'h-72 w-72', blur: 'blur-[100px]', color: '#F7931A', opacity: 0.24, animation: 'cta-light-2 26s ease-in-out infinite' },
    { position: 'top-1/2 right-[5%] -translate-y-1/2', size: 'h-80 w-80', blur: 'blur-[110px]', color: 'var(--color-primary)', opacity: 0.26, animation: 'cta-light-3 24s ease-in-out infinite' },
    { position: 'bottom-[8%] left-[18%]', size: 'h-72 w-72', blur: 'blur-[100px]', color: '#06B6D4', opacity: 0.22, animation: 'cta-light-1 22s ease-in-out infinite' },
    { position: 'bottom-[3%] left-1/2 -translate-x-1/2', size: 'h-80 w-80', blur: 'blur-[110px]', color: 'var(--color-primary)', opacity: 0.3, animation: 'cta-light-2 20s ease-in-out infinite' },
    { position: 'bottom-[12%] right-[10%]', size: 'h-64 w-64', blur: 'blur-[90px]', color: 'var(--color-error)', opacity: 0.16, animation: 'cta-light-3 28s ease-in-out infinite' },
  ],
} as const

export function AmbientLights({
  variant = 'multi',
  intensity = 'normal',
  className,
}: AmbientLightsProps) {
  const lights = LIGHTS[variant]
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
