import { AlertCircle } from 'lucide-react'
import { Button } from './Button'
import { BlurFade } from './BlurFade'
import { AmbientLights } from './AmbientLights'

interface ErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'We could not load your data. Please check your connection and try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <BlurFade>
      <div className="border-error/20 bg-surface/40 relative overflow-hidden rounded-2xl border shadow-lg backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0">
          <AmbientLights variant="red" intensity="subtle" />
        </div>
        <div className="relative flex flex-col items-center gap-4 p-8 text-center md:p-12">
          <div className="border-error/30 bg-error/10 flex size-14 items-center justify-center rounded-full border">
            <AlertCircle className="text-error size-7" />
          </div>
          <div>
            <h3 className="text-text font-display text-lg font-bold">{title}</h3>
            <p className="text-text-secondary mt-1.5 max-w-sm text-sm">
              {message}
            </p>
          </div>
          {onRetry && (
            <Button variant="outline" onClick={onRetry} className="mt-2">
              Try again
            </Button>
          )}
        </div>
      </div>
    </BlurFade>
  )
}