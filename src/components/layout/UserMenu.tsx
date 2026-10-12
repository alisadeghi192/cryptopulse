import { Link } from 'react-router'
import { ChevronDown } from 'lucide-react'
import { buttonVariants } from '@/components/ui/Button'
import { useAuthStore } from '@/stores/useAuthStore'
import { cn } from '@/utils/cn'

interface UserMenuProps {
  isAuthenticated: boolean
}

export function UserMenu({ isAuthenticated }: UserMenuProps) {
  const user = useAuthStore((s) => s.user)

  if (isAuthenticated && user) {
    const displayName =
      (user.user_metadata?.full_name as string) ??
      user.email?.split('@')[0] ??
      'User'
    const initial = displayName[0].toUpperCase()

    return (
      <Link
        to="/dashboard"
        className="hidden items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-elevated md:flex"
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-background">
          {initial}
        </div>
        <span className="text-sm font-medium text-text">{displayName}</span>
        <ChevronDown className="h-3 w-3 text-text-secondary" />
      </Link>
    )
  }

  return (
    <Link
      to="/login"
      className={cn(
        buttonVariants({ variant: 'primary', size: 'sm' }),
        'hidden md:inline-flex'
      )}
    >
      Sign In
    </Link>
  )
}