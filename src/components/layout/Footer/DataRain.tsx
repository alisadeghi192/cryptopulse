import { useMemo } from 'react'
import { DATA_RAIN } from '@/constants'

export function DataRain() {
  const columns = useMemo(
    () =>
      Array.from({ length: DATA_RAIN.columnCount }, (_, i) => ({
        id: i,
        left: i * DATA_RAIN.columnWidth + Math.random() * 2,
        delay: Math.random() * DATA_RAIN.delayMax,
        duration:
          DATA_RAIN.durationMin +
          Math.random() * (DATA_RAIN.durationMax - DATA_RAIN.durationMin),
        chars: Array.from({ length: DATA_RAIN.charCount }, () =>
          DATA_RAIN.chars.charAt(
            Math.floor(Math.random() * DATA_RAIN.chars.length),
          ),
        ).join(' '),
      })),
    [],
  )

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {columns.map((col) => (
        <div
          key={col.id}
          className="absolute top-0 text-center font-mono text-3xl leading-[1.4] tracking-[0.3em] whitespace-pre"
          style={{
            left: `${col.left}%`,
            color: 'var(--footer-rain-color)',
            opacity: 'var(--footer-rain-opacity)',
            animation: `data-rain ${col.duration}s linear ${col.delay}s infinite`,
             transform: 'translateY(-100%)'
          }}
        >
          {col.chars.split(' ').map((char, i) => (
            <div
              key={i}
              style={{
                opacity: 1 - i * DATA_RAIN.fadeStep,
                textShadow:
                  i === DATA_RAIN.blurThreshold
                    ? 'var(--footer-rain-blur-glow)'
                    : 'none',
              }}
            >
              {char}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}