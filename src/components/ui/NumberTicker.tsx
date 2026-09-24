import { useEffect, useRef, useState } from 'react'
import { cn } from '@/utils/cn'

interface NumberTickerProps {
  value: number
  decimals?: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}

export function NumberTicker({
  value,
  decimals = 2,
  prefix = '',
  suffix = '',
  duration = 2000,
  className,
}: NumberTickerProps) {
  const [display, setDisplay] = useState(0)
  const startRef = useRef<number | null>(null)
  const fromRef = useRef(0)

  useEffect(() => {
    fromRef.current = display
    startRef.current = null

    let raf: number
    const animate = (t: number) => {
      if (startRef.current === null) startRef.current = t
      const elapsed = t - startRef.current
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(fromRef.current + (value - fromRef.current) * eased)
      if (progress < 1) raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [value, duration])

  return (
    <span className={cn('font-mono tabular-nums', className)}>
      {prefix}
      {display.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  )
}