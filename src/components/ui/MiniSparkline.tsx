interface MiniSparklineProps {
  data: number[]
  isPositive: boolean
  width?: number
  height?: number
  className?: string
}

export function MiniSparkline({
  data,
  isPositive,
  width = 100,
  height = 30,
  className,
}: MiniSparklineProps) {
  if (data.length < 2) return null

  const paddingX = 6
  const paddingY = 4
  const innerWidth = width - paddingX * 2
  const innerHeight = height - paddingY * 2

  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1

  const points = data.map((value, i) => {
    const x = paddingX + (i / (data.length - 1)) * innerWidth
    const y = paddingY + innerHeight - ((value - min) / range) * innerHeight
    return { x, y }
  })

  const linePath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(2)},${p.y.toFixed(2)}`)
    .join(' ')

  const areaPath = `${linePath} L${points[points.length - 1].x.toFixed(2)},${height - paddingY} L${points[0].x.toFixed(2)},${height - paddingY} Z`

  const color = isPositive ? 'var(--color-success)' : 'var(--color-error)'
  const gradientId = `spark-${Math.random().toString(36).slice(2, 9)}`

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      style={{ display: 'block' }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>

      <path d={areaPath} fill={`url(#${gradientId})`} />

      <path
        d={linePath}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}