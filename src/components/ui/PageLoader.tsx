import { cn } from '@/utils/cn'

interface PageLoaderProps {
  className?: string
}

export function PageLoader({ className }: PageLoaderProps) {
  return (
    <div
      className={cn(
        'flex min-h-[80vh] flex-col items-center justify-center gap-8',
        className,
      )}
    >
      {/* ─── Radar Tracker ─── */}
      <div className="relative flex h-44 w-44 items-center justify-center">
        {/* Ambient glow */}
        <div className="bg-primary/15 absolute inset-0 rounded-full blur-3xl" />

        {/* Radar circular grid */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full"
        >
          {/* Outer circle */}
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="var(--color-border)"
            strokeWidth="0.5"
            opacity="0.6"
          />

          {/* Middle circle */}
          <circle
            cx="50"
            cy="50"
            r="32"
            fill="none"
            stroke="var(--color-border)"
            strokeWidth="0.5"
            opacity="0.4"
          />

          {/* Inner circle */}
          <circle
            cx="50"
            cy="50"
            r="16"
            fill="none"
            stroke="var(--color-border)"
            strokeWidth="0.5"
            opacity="0.3"
          />

          {/* Cross lines */}
          <line
            x1="50"
            y1="2"
            x2="50"
            y2="98"
            stroke="var(--color-border)"
            strokeWidth="0.3"
            opacity="0.4"
          />
          <line
            x1="2"
            y1="50"
            x2="98"
            y2="50"
            stroke="var(--color-border)"
            strokeWidth="0.3"
            opacity="0.4"
          />

          {/* Radar sweep (conic gradient-like) */}
          <defs>
            <radialGradient id="radar-sweep" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.1" />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="radar-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Radar sweep */}
          <g
            style={{
              transformOrigin: '50px 50px',
              animation: 'radar-sweep 3s linear infinite',
            }}
          >
            <path
              d="M50,50 L50,2 A48,48 0 0,1 90,25 Z"
              fill="url(#radar-sweep)"
              opacity="0.6"
            />
            <line
              x1="50"
              y1="50"
              x2="50"
              y2="2"
              stroke="url(#radar-line)"
              strokeWidth="1"
            />
          </g>

          {/* Pulsing rings (blips) */}
          <circle
            cx="50"
            cy="50"
            r="10"
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="0.5"
            opacity="0.5"
            style={{ animation: 'radar-ping 2s ease-out infinite' }}
          />
          <circle
            cx="50"
            cy="50"
            r="10"
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="0.5"
            opacity="0.5"
            style={{ animation: 'radar-ping 2s ease-out 1s infinite' }}
          />

          {/* Blips (targets) */}
          <circle
            cx="30"
            cy="38"
            r="1.5"
            fill="var(--color-success)"
            style={{ animation: 'radar-blip 2s ease-in-out infinite' }}
          />
          <circle
            cx="72"
            cy="60"
            r="1.5"
            fill="var(--color-error)"
            style={{ animation: 'radar-blip 2s ease-in-out 0.7s infinite' }}
          />
          <circle
            cx="65"
            cy="30"
            r="1.5"
            fill="var(--color-primary)"
            style={{ animation: 'radar-blip 2s ease-in-out 1.4s infinite' }}
          />
        </svg>

        {/* Center: Bitcoin logo (circular badge) */}
        <div className="border-primary/40 bg-background/80 relative z-10 flex size-14 items-center justify-center rounded-full border-2 backdrop-blur-sm">
          {/* Inner glow */}
          <div className="bg-primary/20 absolute inset-0 rounded-full blur-md" />

          {/* Bitcoin symbol */}
          <span
            className="font-display text-primary relative text-2xl font-bold"
            style={{
              textShadow: '0 0 12px var(--color-primary)',
            }}
          >
            ₿
          </span>
        </div>
      </div>

      {/* ─── ECG Heartbeat Line ─── */}
      <div className="relative h-10 w-72">
        <svg viewBox="0 0 500 50" className="h-full w-full" fill="none">
          <defs>
            <linearGradient id="ecg-grad" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0" />
              <stop offset="15%" stopColor="var(--color-primary)" stopOpacity="0.4" />
              <stop offset="50%" stopColor="var(--color-primary)" stopOpacity="1" />
              <stop offset="85%" stopColor="var(--color-primary)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
            </linearGradient>

            <filter id="ecg-glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background line (faint) */}
          <path
            d="M0,25 L120,25 L135,25 L145,10 L155,40 L165,25 L200,25 L260,25 L275,25 L285,10 L295,40 L305,25 L340,25 L420,25 L435,25 L445,10 L455,40 L465,25 L500,25"
            stroke="var(--color-border)"
            strokeWidth="1"
            opacity="0.5"
          />

          {/* Animated ECG line */}
          <path
            d="M0,25 L120,25 L135,25 L145,10 L155,40 L165,25 L200,25 L260,25 L275,25 L285,10 L295,40 L305,25 L340,25 L420,25 L435,25 L445,10 L455,40 L465,25 L500,25"
            stroke="url(#ecg-grad)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#ecg-glow)"
            strokeDasharray="200 800"
            style={{ animation: 'ecg-travel 2.5s linear infinite' }}
          />
        </svg>

        {/* Pulsing dot on the line */}
        <div
          className="bg-primary shadow-primary absolute top-1/2 size-1.5 -translate-y-1/2 rounded-full shadow-[0_0_8px_var(--color-primary)]"
          style={{ animation: 'ecg-dot 2.5s linear infinite' }}
        />
      </div>

      {/* ─── Brand ─── */}
      <div className="flex flex-col items-center gap-3">
        <p className="font-display text-primary text-lg font-bold tracking-[0.3em]">
          CRYPTOPULSE
        </p>

        <div className="flex items-center gap-2">
          <div className="bg-border h-px w-8" />
          <p className="text-text-secondary font-mono text-[10px] tracking-[0.2em] uppercase">
            Tracking Markets
          </p>
          <div className="bg-border h-px w-8" />
        </div>
      </div>

      {/* ─── Status dots ─── */}
      <div className="flex gap-1.5">
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
  )
}