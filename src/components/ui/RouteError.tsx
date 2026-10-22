import { useRouteError, isRouteErrorResponse, Link } from 'react-router'
import { AlertCircle, RefreshCw, Home } from 'lucide-react'
import { Button } from './Button'
import { AmbientLights } from './AmbientLights'

export function RouteError() {
  const error = useRouteError()

  let title = 'Something went wrong'
  let message = 'An unexpected error occurred.'
  let detail: string | null = null

  if (isRouteErrorResponse(error)) {
    title = `${error.status} ${error.statusText}`
    message = error.data?.message ?? 'The page could not be loaded.'
    detail = error.data?.stack ?? null
  } else if (error instanceof Error) {
    title = 'Something went wrong'
    message = error.message
    detail = error.stack ?? null
  }

  return (
    <div className="bg-background relative flex min-h-dvh items-center justify-center overflow-hidden p-6">
      <div className="pointer-events-none absolute inset-0">
        <AmbientLights variant="red" intensity="subtle" />
      </div>

      <div className="border-error/20 bg-surface/40 relative w-full max-w-lg overflow-hidden rounded-2xl border shadow-xl backdrop-blur-xl">
        <div className="flex flex-col items-center gap-5 p-8 text-center md:p-10">
          <div className="border-error/30 bg-error/10 flex size-16 items-center justify-center rounded-full border">
            <AlertCircle className="text-error size-8" />
          </div>

          <div>
            <h1 className="text-text font-display text-xl font-bold">{title}</h1>
            <p className="text-text-secondary mt-2 max-w-sm text-sm leading-relaxed">
              {message}
            </p>
          </div>

          {import.meta.env.DEV && detail && (
            <pre className="border-border custom-scroll bg-background/60 text-error max-h-40 w-full overflow-auto rounded-lg border p-3 text-left font-mono text-[10px] leading-relaxed">
              {detail.slice(0, 800)}
            </pre>
          )}

          <div className="flex w-full flex-col gap-2 sm:flex-row">
            <Button
              variant="primary"
              size="md"
              onClick={() => window.location.reload()}
              className="flex-1 gap-2"
            >
              <RefreshCw className="size-4" />
              Reload page
            </Button>
            <Link
              to="/"
              className="border-border bg-surface hover:bg-elevated text-text flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors"
            >
              <Home className="size-4" />
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}