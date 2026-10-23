import { useMemo, useState } from 'react'
import { PieChart } from 'lucide-react'
import { AmbientLights } from '@/components/ui/AmbientLights'
import { BlurFade } from '@/components/ui/BlurFade'
import { BalanceValue } from '@/components/ui/BalanceValue'
import { cn } from '@/utils/cn'
import type { AllocationSlice } from '../hooks/useDashboardData'

interface AllocationDonutProps {
  slices: AllocationSlice[]
  total: number
  loading?: boolean
}

const SIZE = 180
const STROKE = 22
const RADIUS = (SIZE - STROKE) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export function AllocationDonut({
  slices,
  total,
  loading = false,
}: AllocationDonutProps) {
  const [hovered, setHovered] = useState<string | null>(null)

  const segments = useMemo(() => {
    if (total <= 0) return []
    let offset = 0
    return slices.map((slice) => {
      const fraction = slice.value / total
      const dash = fraction * CIRCUMFERENCE
      const seg = {
        ...slice,
        fraction,
        dash,
        offset,
      }
      offset += dash
      return seg
    })
  }, [slices, total])

  const active = segments.find((s) => s.label === hovered)

  return (
    <BlurFade delay={0.05}>
      <div className="border-border/40 bg-surface/40 relative h-full overflow-hidden rounded-3xl border shadow-xl backdrop-blur-3xl">
        <div className="pointer-events-none absolute inset-0">
          <AmbientLights variant="gold" intensity="subtle" />
          <AmbientLights variant="blue" intensity="subtle" />
        </div>
        <div className="relative flex items-center justify-between border-b border-border/40 px-5 py-4">
          <div className="flex items-center gap-2">
            <PieChart className="text-primary size-4" />
            <span className="text-text font-mono text-xs font-semibold tracking-widest uppercase">
              Allocation
            </span>
          </div>
          <span className="text-text/60 font-mono text-[10px] tracking-widest uppercase">
            {loading
              ? '—'
              : `${slices.length} ${slices.length === 1 ? 'asset' : 'assets'}`}
          </span>
        </div>

        {loading ? (
          <div className="relative flex flex-col items-center gap-4 p-5 md:flex-row md:items-center md:gap-6 md:p-6">
            <div className="bg-elevated size-45 shrink-0 animate-pulse rounded-full" />
            <div className="flex w-full flex-1 flex-col gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-elevated h-6 animate-pulse rounded"
                />
              ))}
            </div>
          </div>
        ) : total <= 0 ? (
          <div className="relative flex flex-col items-center gap-3 p-8 text-center">
            <div className="border-border/40 bg-elevated/40 flex size-12 items-center justify-center rounded-xl border">
              <PieChart className="text-text/40 size-5" />
            </div>
            <p className="text-text/60 font-mono text-xs">
              No balance to allocate yet
            </p>
          </div>
        ) : (
          <div className="relative flex flex-col items-center gap-4 p-5 md:flex-row md:items-center md:gap-6 md:p-6">
            <div className="relative shrink-0">
              <svg
                width={SIZE}
                height={SIZE}
                viewBox={`0 0 ${SIZE} ${SIZE}`}
                className="-rotate-90"
              >
                <circle
                  cx={SIZE / 2}
                  cy={SIZE / 2}
                  r={RADIUS}
                  fill="none"
                  stroke="var(--color-border)"
                  strokeWidth={STROKE}
                  opacity={0.3}
                />
                {segments.map((seg) => {
                  const isHovered = hovered === seg.label
                  const strokeWidth = isHovered ? STROKE + 4 : STROKE
                  return (
                    <circle
                      key={seg.label}
                      cx={SIZE / 2}
                      cy={SIZE / 2}
                      r={RADIUS}
                      fill="none"
                      stroke={seg.color}
                      strokeWidth={strokeWidth}
                      strokeDasharray={`${seg.dash} ${CIRCUMFERENCE - seg.dash}`}
                      strokeDashoffset={-seg.offset}
                      strokeLinecap="butt"
                      className="cursor-pointer transition-all duration-200"
                      onMouseEnter={() => setHovered(seg.label)}
                      onMouseLeave={() => setHovered(null)}
                    />
                  )
                })}
              </svg>

              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                {active ? (
                  <>
                    <span className="text-text/60 font-mono text-[10px] tracking-widest uppercase">
                      {active.label}
                    </span>
                    <span className="text-text mt-0.5 font-mono text-sm font-bold tabular-nums">
                      {(active.fraction * 100).toFixed(1)}%
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-text/60 font-mono text-[10px] tracking-widest uppercase">
                      Total
                    </span>
                    <span className="text-text mt-0.5 font-mono text-sm font-bold tabular-nums">
                      <BalanceValue value={total} />
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="flex w-full flex-1 flex-col gap-1.5">
              {segments.slice(0, 6).map((seg) => (
                <button
                  key={seg.label}
                  type="button"
                  onMouseEnter={() => setHovered(seg.label)}
                  onMouseLeave={() => setHovered(null)}
                  className={cn(
                    'hover:bg-elevated/40 flex cursor-pointer items-center justify-between gap-2 rounded-md px-2 py-1.5 text-left transition-colors',
                    hovered === seg.label && 'bg-elevated/40',
                  )}
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <span
                      className="size-2.5 shrink-0 rounded-full"
                      style={{ background: seg.color }}
                    />
                    <span className="text-text truncate font-mono text-xs">
                      {seg.label}
                    </span>
                  </div>
                  <span className="text-text/70 shrink-0 font-mono text-xs tabular-nums">
                    {(seg.fraction * 100).toFixed(1)}%
                  </span>
                </button>
              ))}
              {segments.length > 6 && (
                <p className="text-text/50 mt-1 px-2 font-mono text-[10px]">
                  +{segments.length - 6} more
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </BlurFade>
  )
}