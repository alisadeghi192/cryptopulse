import { useEffect, useRef } from 'react'
import { createChart, ColorType, AreaSeries } from 'lightweight-charts'
import type { MarketChartPoint } from '@/types/coin'
import { data } from 'react-router'

interface PriceChartProps {
  data: MarketChartPoint[]
  isPositive: boolean
  height?: number
}
console.log(data)
export function PriceChart({
  data,
  isPositive,
  height = 200,
}: PriceChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container || data.length === 0) return

    const styles = getComputedStyle(document.documentElement)
    const successColor =
      styles.getPropertyValue('--color-success').trim() || '#22c55e'
    const errorColor =
      styles.getPropertyValue('--color-error').trim() || '#ef4444'
    const lineColor = isPositive ? successColor : errorColor

    const chart = createChart(container, {
      width: container.clientWidth,
      height,
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: 'transparent',
        attributionLogo: false,
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { visible: false },
      },
      rightPriceScale: { visible: false },
      timeScale: { visible: false },
      crosshair: { mode: 0 },
      handleScroll: false,
      handleScale: false,
    })

    const series = chart.addSeries(AreaSeries, {
      lineColor,
      topColor: lineColor + '40', 
      bottomColor: lineColor + '00',
      lineWidth: 2,
      priceLineVisible: false,
      lastValueVisible: false,
      crosshairMarkerVisible: false,
    })

    series.setData(data)

    chart.timeScale().fitContent()

    // ─── Resize ───
    const handleResize = () => {
      chart.applyOptions({ width: container.clientWidth })
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      chart.remove()
    }
  }, [data, isPositive, height])

  return <div ref={containerRef} className="w-full" style={{ height }} />
}