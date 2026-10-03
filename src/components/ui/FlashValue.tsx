import { useEffect, useRef, useState } from 'react'
import { cn } from '@/utils/cn'

interface FlashValueProps {
  value: number
  decimals?: number
  className?: string
}

export function FlashValue({ value, decimals = 0, className }: FlashValueProps) {
  const prevRef = useRef(value)
  const [flash, setFlash] = useState<'up' | 'down' | null>(null)

  useEffect(() => {
    if (prevRef.current === value) return
    const direction = value > prevRef.current ? 'up' : 'down'
    setFlash(direction)
    prevRef.current = value

    const t = setTimeout(() => setFlash(null), 600)
    return () => clearTimeout(t)
  }, [value])

  return (
    <span
      className={cn(
        'font-mono tabular-nums transition-colors duration-300',
        flash === 'up' && 'text-success',
        flash === 'down' && 'text-error',
        flash && 'animate-[flash-pulse_0.6s_ease-out]',
        className,
      )}
    >
      {value.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
    </span>
  )
}