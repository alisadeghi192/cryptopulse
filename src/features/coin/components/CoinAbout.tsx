import { BlurFade } from '@/components/ui/BlurFade'

interface CoinAboutProps {
  name: string
  description: string
}

export function CoinAbout({ name, description: rawDescription }: CoinAboutProps) {
  const description = rawDescription?.replace(/<[^>]*>/g, '') ?? ''
  if (!description) return null

  return (
    <BlurFade delay={0.3}>
      <div className="border-border shadow-lg bg-surface/30 rounded-2xl border p-5 md:p-6">
        <h2 className="font-display text-text mb-4 text-lg font-bold">
          About {name}
        </h2>
        <p className="text-text-secondary text-sm leading-7">
          {description.length > 600
            ? description.slice(0, 600) + '...'
            : description}
        </p>
      </div>
    </BlurFade>
  )
}