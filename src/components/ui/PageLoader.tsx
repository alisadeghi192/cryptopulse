import { useId } from 'react'
import { cn } from '@/utils/cn'

interface PageLoaderProps {
  className?: string
}

export function PageLoader({ className }: PageLoaderProps) {
  const id = useId()

  return (
    <div
      className={cn(
        'flex min-h-[80vh] flex-col items-center justify-center gap-8',
        className,
      )}
    >
      {/* ─── Rotating Coin ─── */}
      <div className="relative h-28 w-28">
        {/* Outer ring */}
        <div className="border-border/50 absolute inset-0 rounded-full border" />

        {/* Middle ring */}
        <div className="border-border/30 absolute inset-3 rounded-full border" />

        {/* Spinning arc */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full"
          style={{ animation: 'spin 1.4s linear infinite' }}
        >
          <defs>
            <linearGradient id={`loader-arc-${id}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0" />
              <stop offset="50%" stopColor="var(--color-primary)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="1" />
            </linearGradient>
          </defs>
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke={`url(#loader-arc-${id})`}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="80 220"
          />
        </svg>

        {/* Rotating crypto symbols */}
        {['₿', 'Ξ', '₮', '$'].map((symbol, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2"
            style={{
              transform: `translate(-50%, -50%) rotate(${i * 90}deg) translateY(-38px)`,
              animation: `counter-spin 3s linear infinite`,
              transformOrigin: 'center',
            }}
          >
            <span
              className="text-primary font-mono text-sm font-bold"
              style={{
                transform: `rotate(${-i * 90}deg)`,
                display: 'inline-block',
                textShadow: '0 0 8px var(--color-primary)',
                animation: 'symbol-pulse 2s ease-in-out infinite',
                animationDelay: `${i * 0.3}s`,
              }}
            >
              {symbol}
            </span>
          </div>
        ))}

        {/* Center pulse */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-primary h-2 w-2 animate-pulse rounded-full shadow-[0_0_16px_var(--color-primary)]" />
        </div>
      </div>

      {/* ─── Progress Bar ─── */}
      <div className="bg-border h-0.5 w-56 overflow-hidden rounded-full">
        <div
          className="from-primary/0 via-primary to-primary/0 h-full bg-linear-to-r"
          style={{ animation: 'loader-progress 1.6s ease-in-out infinite' }}
        />
      </div>

      {/* ─── Text ─── */}
      <div className="flex flex-col items-center gap-2">
        <p className="text-text font-mono text-xs tracking-[0.3em] uppercase">
          Loading Market Data
        </p>
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="bg-primary h-1 w-1 rounded-full"
              style={{
                animation: `pulse-dot 1.4s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}