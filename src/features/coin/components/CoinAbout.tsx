// src/features/coin/components/CoinAbout.tsx
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { BlurFade } from '@/components/ui/BlurFade'
import { cn } from '@/utils/cn'

interface CoinAboutProps {
  name: string
  description: string
}

const MAX_LENGTH = 400

export function CoinAbout({ name, description: rawDescription }: CoinAboutProps) {
  const [expanded, setExpanded] = useState(false)

  const description = rawDescription?.replace(/<[^>]*>/g, '') ?? ''
  if (!description) return null

  const isLong = description.length > MAX_LENGTH
  const visibleText =
    expanded || !isLong
      ? description
      : description.slice(0, MAX_LENGTH) + '...'

  return (
    <BlurFade delay={0.3}>
      <div className="border-border bg-surface/30 overflow-hidden rounded-2xl border shadow-lg">
        <div className="p-5 md:p-6">
          <h2 className="font-display text-text mb-4 text-lg font-bold">
            About {name}
          </h2>

          <p className="text-text-secondary text-sm leading-7">
            {visibleText}
          </p>

          {isLong && (
            <button
              type="button"
              onClick={() => setExpanded((e) => !e)}
              className="group text-primary hover:text-primary-hover mt-3 inline-flex items-center gap-1.5 font-mono text-xs font-medium transition-colors"
            >
              <span>{expanded ? 'Show less' : 'Read more'}</span>
              <ChevronDown
                className={cn(
                  'size-3.5 transition-transform duration-500 ease-out',
                  expanded && 'rotate-180',
                )}
              />
            </button>
          )}
        </div>
      </div>
    </BlurFade>
  )
}