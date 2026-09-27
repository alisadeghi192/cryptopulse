import { useEffect, useRef, useState } from 'react'
import { Flame } from 'lucide-react'
import { BlurFade } from '@/components/ui/BlurFade'
import { TrendingCoinCard } from './TrendingCoinCard'
import type { TrendingCoin } from '@/types/coin'

interface TrendingCoinsProps {
  coins: TrendingCoin[]
}

export function TrendingCoins({ coins }: TrendingCoinsProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const isPausedRef = useRef(false)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartRef = useRef({ x: 0, scrollLeft: 0 })

  const duplicatedCoins = [...coins, ...coins]

  useEffect(() => {
    const el = scrollRef.current
    if (!el || coins.length === 0) return

    let lastTime = performance.now()
    const speed = 30

    const animate = (currentTime: number) => {
      const delta = (currentTime - lastTime) / 1000
      lastTime = currentTime

      if (!isPausedRef.current && !isDragging) {
        el.scrollLeft += speed * delta

        const halfWidth = el.scrollWidth / 2
        if (el.scrollLeft >= halfWidth) {
          el.scrollLeft -= halfWidth
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [coins.length, isDragging])

  // ─── Drag Handlers ───
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollRef.current
    if (!el) return
    setIsDragging(true)
    dragStartRef.current = {
      x: e.pageX,
      scrollLeft: el.scrollLeft,
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    const el = scrollRef.current
    if (!el) return
    e.preventDefault()
    const walk = (e.pageX - dragStartRef.current.x) * 1.5
    el.scrollLeft = dragStartRef.current.scrollLeft - walk
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // ─── Touch Handlers ───
  const handleTouchStart = () => {
    setIsDragging(true)
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  return (
    <section className="py-12 md:py-16">
      <BlurFade delay={0.1}>
        <div className="mb-8 flex items-end justify-between">
          <div>
            <div className="text-text-secondary mb-2 flex items-center gap-2 font-mono text-xs uppercase tracking-widest">
              <Flame className="text-primary h-3.5 w-3.5" />
              Hot Right Now
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              Trending
            </h2>
          </div>
          <p className="text-text-secondary hidden font-mono text-xs md:block">
            Most searched in 24h
          </p>
        </div>
      </BlurFade>

      {/* Auto-scroll Container */}
      <div
        ref={scrollRef}
        onMouseEnter={() => (isPausedRef.current = true)}
        onMouseLeave={() => {
          isPausedRef.current = false
          setIsDragging(false)
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={`no-scrollbar -mx-6 overflow-x-auto px-6 pb-4 lg:-mx-8 lg:px-8 ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        <div className="flex gap-4" style={{ width: 'max-content' }}>
          {duplicatedCoins.map((coin, i) => (
            <div key={`${coin.item.id}-${i}`} className="w-65 select-none">
              <TrendingCoinCard coin={coin} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}