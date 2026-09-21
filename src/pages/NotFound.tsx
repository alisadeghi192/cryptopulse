import { Link } from 'react-router'
import { buttonVariants } from '@/components/ui/Button'

export function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="font-display text-7xl font-bold text-primary">404</h1>
      <p className="text-text-secondary">Page not found</p>
      <Link to="/" className={buttonVariants({ variant: 'primary' })}>
        Go Home
      </Link>
    </div>
  )
}