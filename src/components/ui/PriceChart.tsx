import { useEffect, useRef } from 'react'
import { createChart, ColorType, AreaSeries } from 'lightweight-charts'
import { useThemeStore } from '@/stores/useThemeStore'
import type { MarketChartPoint } from '@/types/coin'

interface PriceChartProps {
  data: MarketChartPoint[]
  isPositive: boolean
  height?: number
  variant?: 'sparkline' | 'full'
}

export function PriceChart({
  data,
  isPositive,
  height = 200,
  variant = 'sparkline',
}: PriceChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const theme = useThemeStore((s) => s.theme)
  const isFull = variant === 'full'

  useEffect(() => {
    const container = containerRef.current
    if (!container || data.length === 0) return

    const styles = getComputedStyle(document.documentElement)
    const successColor =
      styles.getPropertyValue('--color-success').trim() || '#22c55e'
    const errorColor =
      styles.getPropertyValue('--color-error').trim() || '#ef4444'
    const textColor =
      styles.getPropertyValue('--color-text-secondary').trim() || '#8a94a6'
    const borderColor =
      styles.getPropertyValue('--color-border').trim() || '#252a36'
    const lineColor = isPositive ? successColor : errorColor

    const chart = createChart(container, {
      width: container.clientWidth,
      height,
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: isFull ? textColor : 'transparent',
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: isFull ? 11 : 0,
        attributionLogo: false,
      },
      grid: {
        vertLines: {
          visible: isFull,
          color: isFull ? borderColor + '60' : 'transparent',
        },
        horzLines: {
          visible: isFull,
          color: isFull ? borderColor + '60' : 'transparent',
        },
      },
      rightPriceScale: {
        visible: isFull,
        borderColor: isFull ? borderColor : 'transparent',
        scaleMargins: { top: 0.15, bottom: 0.15 },
      },
      timeScale: {
        visible: isFull,
        borderColor: isFull ? borderColor : 'transparent',
        timeVisible: isFull,
        secondsVisible: false,
      },
      crosshair: {
        mode: isFull ? 1 : 0,
        vertLine: {
          color: isFull ? textColor : 'transparent',
          labelBackgroundColor: isFull ? lineColor : 'transparent',
        },
        horzLine: {
          color: isFull ? textColor : 'transparent',
          labelBackgroundColor: isFull ? lineColor : 'transparent',
        },
      },
      handleScroll: {
        mouseWheel: false,
        pressedMouseMove: isFull,
        horzTouchDrag: isFull,
        vertTouchDrag: false,
      },
      handleScale: {
        axisPressedMouseMove: isFull,
        mouseWheel: false,
        pinch: isFull,
      },
    })

    const series = chart.addSeries(AreaSeries, {
      lineColor,
      topColor: lineColor + '40',
      bottomColor: lineColor + '00',
      lineWidth: 2,
      priceLineVisible: isFull,
      lastValueVisible: isFull,
      crosshairMarkerVisible: isFull,
    })

    series.setData(data)
    chart.timeScale().fitContent()

    // Ctrl + Wheel Zoom
    const handleWheel = (e: WheelEvent) => {
      if (!isFull) return
      if (!e.ctrlKey && !e.metaKey) return

      e.preventDefault()

      const timeScale = chart.timeScale()
      const logicalRange = timeScale.getVisibleLogicalRange()
      if (!logicalRange) return

      const zoomFactor = e.deltaY > 0 ? 1.15 : 0.87
      const midPoint = (logicalRange.from + logicalRange.to) / 2
      const newRange = ((logicalRange.to - logicalRange.from) / 2) * zoomFactor

      timeScale.setVisibleLogicalRange({
        from: midPoint - newRange,
        to: midPoint + newRange,
      })
    }

    container.addEventListener('wheel', handleWheel, { passive: false })

    // ResizeObserver
    let raf: number
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (!entry) return
      const newWidth = Math.floor(entry.contentRect.width)
      if (newWidth === 0) return
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        chart.applyOptions({ width: newWidth })
      })
    })
    resizeObserver.observe(container)

    return () => {
      container.removeEventListener('wheel', handleWheel)
      cancelAnimationFrame(raf)
      resizeObserver.disconnect()
      chart.remove()
    }
  }, [data, isPositive, height, variant, theme, isFull])

  return (
    <div
      ref={containerRef}
      className={isFull ? 'w-full cursor-grab' : 'w-full'}
      style={{ height }}
    />
  )
}