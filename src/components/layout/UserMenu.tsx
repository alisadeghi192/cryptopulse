import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router'
import {
  ChevronDown,
  LayoutDashboard,
  Wallet,
  Star,
  User as UserIcon,
  LogOut,
  Receipt,
} from 'lucide-react'
import { buttonVariants } from '@/components/ui/Button'
import { useAuthStore } from '@/stores/useAuthStore'
import { toast } from 'sonner'
import { cn } from '@/utils/cn'
import { Z_LAYERS } from '@/constants'

interface UserMenuProps {
  isAuthenticated: boolean
}

const MENU_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Wallet', href: '/wallet', icon: Wallet },
  { label: 'Transactions', href: '/transactions', icon: Receipt },
  { label: 'Watchlist', href: '/watchlist', icon: Star },
  { label: 'Profile', href: '/profile', icon: UserIcon },
]

// App routes don't need a dropdown
const APP_ROUTES = [
  '/dashboard',
  '/wallet',
  '/transactions',
  '/watchlist',
  '/profile',
]

export function UserMenu({ isAuthenticated }: UserMenuProps) {
  const user = useAuthStore((s) => s.user)
  const signOut = useAuthStore((s) => s.signOut)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const isAppRoute = APP_ROUTES.some((r) => pathname.startsWith(r))

  useEffect(() => {
    if (!open) return

    const handleClickOutside = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  const handleMouseEnter = () => {
    if (isAppRoute) return
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setOpen(true)
  }

  const handleMouseLeave = () => {
    if (isAppRoute) return
    timeoutRef.current = setTimeout(() => setOpen(false), 200)
  }

  const handleSignOut = async () => {
    setOpen(false)
    await signOut()
    toast.success('Signed out')
    navigate('/')
  }

  if (isAuthenticated && user) {
    const displayName =
      (user.user_metadata?.full_name as string) ??
      user.email?.split('@')[0] ??
      'User'
    const initial = displayName[0].toUpperCase()
    const avatarUrl = (user.user_metadata?.avatar_url as string) || null

    const Avatar = ({ size = 'sm' }: { size?: 'sm' | 'md' }) => (
      <div
        className={cn(
          'bg-primary text-background relative flex shrink-0 items-center justify-center overflow-hidden rounded-full text-xs font-bold',
          size === 'sm' ? 'h-7 w-7' : 'h-8 w-8',
        )}
      >
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={displayName}
            className="h-full w-full object-cover"
          />
        ) : (
          initial
        )}
      </div>
    )

    // App routes: simple link to profile
    if (isAppRoute) {
      return (
        <Link
          to="/profile"
          className="hover:bg-elevated hidden items-center gap-2 rounded-lg px-2 py-1.5 transition-colors lg:flex"
        >
          <Avatar />
          <span className="text-text text-sm font-medium">{displayName}</span>
        </Link>
      )
    }

    // Public routes: hover dropdown
    return (
      <div
        ref={wrapperRef}
        className="relative hidden lg:block"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Link
          to="/dashboard"
          className="hover:bg-elevated flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 transition-colors"
        >
          <Avatar />
          <span className="text-text text-sm font-medium">{displayName}</span>
          <ChevronDown
            className={cn(
              'text-text-secondary h-3 w-3 transition-transform duration-200',
              open && 'rotate-180',
            )}
          />
        </Link>

        <div
          style={{ zIndex: Z_LAYERS.dropdown }}
          className={cn(
            'absolute top-full right-0 mt-2 w-52 origin-top-right transition-all duration-200',
            open
              ? 'pointer-events-auto scale-100 opacity-100'
              : 'pointer-events-none scale-95 opacity-0',
          )}
        >
          <div className="border-border/60 bg-surface overflow-hidden rounded-xl border p-1.5 shadow-sm">
            <div className="flex items-center gap-2.5 border-b border-border/40 px-3 pb-2.5">
              <Avatar size="md" />
              <div className="min-w-0">
                <p className="text-text truncate text-sm font-medium">
                  {displayName}
                </p>
                <p className="text-text/60 truncate font-mono text-[10px]">
                  {user.email}
                </p>
              </div>
            </div>

            {MENU_ITEMS.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className="text-text-secondary hover:bg-elevated/60 hover:text-text flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              )
            })}

            <div className="bg-border/40 my-1.5 h-px" />

            <button
              type="button"
              onClick={handleSignOut}
              className="text-error hover:bg-error/10 flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors"
            >
              <LogOut className="h-4 w-4 shrink-0" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
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