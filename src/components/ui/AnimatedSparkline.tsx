interface AnimatedSparklineProps {
  points?: number[]
  className?: string
  color?: string
}

export function AnimatedSparkline({
  points = [
    45, 40, 42, 30, 35, 25, 28, 18, 22, 15, 20, 12, 18, 10, 15, 8,
  ],
  className = 'h-16 w-full',
  color = 'var(--color-success)',
}: AnimatedSparklineProps) {
  const width = 300
  const height = 60
  const max = Math.max(...points)
  const min = Math.min(...points)
  const range = max - min || 1

  const coords = points.map((p, i) => ({
    x: (i / (points.length - 1)) * width,
    y: height - ((p - min) / range) * (height - 10) - 5,
  }))

  const linePath = coords
    .map((c, i) => `${i === 0 ? 'M' : 'L'}${c.x},${c.y}`)
    .join(' ')

  const areaPath = `${linePath} L${width},${height} L0,${height} Z`

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="sparkline-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Area */}
      <path
        d={areaPath}
        fill="url(#sparkline-fill)"
        className="animate-fade-in"
      />

      {/* Line - self drawing */}
      <path
        d={linePath}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#glow)"
        style={{
          strokeDasharray: 1000,
          strokeDashoffset: 1000,
          animation: 'draw-line 1.5s ease-out forwards',
        }}
      />

      {/* Moving dot */}
      <circle r="3" fill={color} filter="url(#glow)">
        <animateMotion dur="3s" repeatCount="indefinite" path={linePath} />
      </circle>
    </svg>
  )
}