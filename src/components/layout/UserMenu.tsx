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
        className="hover:bg-elevated hidden items-center gap-2 rounded-lg px-2 py-1.5 transition-colors lg:flex"
      >
        <div className="bg-primary text-background flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold">
          {initial}
        </div>
        <span className="text-text text-sm font-medium">{displayName}</span>
        <ChevronDown className="text-text-secondary h-3 w-3" />
      </Link>
    )
  }

  return (
    <Link
      to="/login"
      className={cn(
        buttonVariants({ variant: 'primary', size: 'sm' }),
        'hidden lg:inline-flex',
      )}
    >
      Sign In
    </Link>
  )
}