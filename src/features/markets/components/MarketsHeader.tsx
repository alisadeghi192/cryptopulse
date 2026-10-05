import { BlurFade } from '@/components/ui/BlurFade'

interface MarketsHeaderProps {
  totalCoins: number
}

export function MarketsHeader({ totalCoins }: MarketsHeaderProps) {
  return (
    <BlurFade delay={0.1}>
      <div className="mb-8">
        <div className="text-text-secondary mb-2 flex items-center gap-2 font-mono text-xs tracking-widest uppercase">
          <span className="relative flex h-1.5 w-1.5">
            <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
            <span className="bg-primary relative inline-flex h-1.5 w-1.5 rounded-full" />
          </span>
          {totalCoins.toLocaleString()} coins tracked
        </div>
        <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
          Markets
        </h1>
      </div>
    </BlurFade>
  )
}