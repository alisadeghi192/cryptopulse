import { Link } from 'react-router'
import { ChevronDown } from 'lucide-react'
import { buttonVariants } from '@/components/ui/Button'
import { cn } from '@/utils/cn'

interface UserMenuProps {
  isAuthenticated: boolean
  userName: string
}

export function UserMenu({ isAuthenticated, userName }: UserMenuProps) {
  if (isAuthenticated) {
    return (
      <Link
        to="/dashboard"
        className="hidden items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-elevated md:flex"
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-background">
          {userName[0]}
        </div>
        <span className="text-sm font-medium text-text">{userName}</span>
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