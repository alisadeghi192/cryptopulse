import { Component, type ReactNode } from 'react'
import { AlertCircle, RefreshCw, Home } from 'lucide-react'
import { Button } from './Button'
import { AmbientLights } from './AmbientLights'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false, error: null }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info)
  }

  handleReload = () => {
    window.location.reload()
  }

  handleGoHome = () => {
    window.location.href = '/'
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (!this.state.hasError) return this.props.children
    if (this.props.fallback) return this.props.fallback

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
              <h1 className="text-text font-display text-xl font-bold">
                Something went wrong
              </h1>
              <p className="text-text-secondary mt-2 max-w-sm text-sm leading-relaxed">
                An unexpected error occurred. You can try again, or reload the
                page.
              </p>
            </div>

            {import.meta.env.DEV && this.state.error && (
              <pre className="border-border custom-scroll bg-background/60 text-error max-h-40 w-full overflow-auto rounded-lg border p-3 text-left font-mono text-[10px] leading-relaxed">
                {this.state.error.message}
                {'\n\n'}
                {this.state.error.stack?.slice(0, 500)}
              </pre>
            )}

            <div className="flex w-full flex-col gap-2 sm:flex-row">
              <Button
                variant="primary"
                size="md"
                onClick={this.handleReset}
                className="flex-1 gap-2"
              >
                <RefreshCw className="size-4" />
                Try again
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={this.handleReload}
                className="flex-1 gap-2"
              >
                <RefreshCw className="size-4" />
                Reload page
              </Button>
            </div>

            <button
              type="button"
              onClick={this.handleGoHome}
              className="text-text-secondary hover:text-primary flex items-center gap-1.5 font-mono text-xs transition-colors"
            >
              <Home className="size-3" />
              Back to home
            </button>
          </div>
        </div>
      </div>
    )
  }
}