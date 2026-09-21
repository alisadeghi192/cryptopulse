import { Outlet, Link } from 'react-router'
import { Logo } from '@/components/ui/Logo'

export function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="flex h-16 items-center px-6">
        <Link to="/">
          <Logo />
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center px-6">
        <Outlet />
      </main>
    </div>
  )
}