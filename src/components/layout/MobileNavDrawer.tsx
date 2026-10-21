import { NavLink, useNavigate } from 'react-router'
import {
  X,
  Home,
  LineChart,
  ArrowLeftRight,
  Star,
  Info,
  LogIn,
  Wallet,
  LogOut,
  type LucideIcon,
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/utils/cn'
import { Logo } from '../ui/Logo'
import { useAuthStore } from '@/stores/useAuthStore'
import { Z_LAYERS } from '@/constants'
import { confirm } from '@/lib/confirm'

interface NavLinkItem {
  label: string
  href: string
}

interface MobileNavDrawerProps {
  open: boolean
  links: NavLinkItem[]
  isAuthenticated: boolean
  userName: string
  onClose: () => void
}

const LINK_ICONS: Record<string, LucideIcon> = {
  Home: Home,
  Markets: LineChart,
  Converter: ArrowLeftRight,
  Watchlist: Star,
  About: Info,
  Wallet: Wallet,
}

export function MobileNavDrawer({
  open,
  links,
  isAuthenticated,
  userName,
  onClose,
}: MobileNavDrawerProps) {
  const initial = userName?.[0]?.toUpperCase() ?? 'U'
  const navigate = useNavigate()
  const signOut = useAuthStore((s) => s.signOut)
  const user = useAuthStore((s) => s.user)

  const avatarUrl = (user?.user_metadata?.avatar_url as string) || null

  const handleSignOut = async () => {
    const ok = await confirm({
      title: 'Sign out?',
      description: 'You will need to sign in again to access your account.',
      confirmLabel: 'Sign Out',
      cancelLabel: 'Cancel',
      variant: 'danger',
    })
    if (!ok) return

    onClose()
    await signOut()
    toast.success('Signed out')
    navigate('/')
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={cn(
          'fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 lg:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        style={{ zIndex: Z_LAYERS.drawer }}
      />

      {/* Drawer */}
      <aside
        className={cn(
          'border-border/40 bg-surface/30 fixed top-0 right-0 bottom-0 flex w-72 flex-col border-l shadow-[-8px_0_24px_-4px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-transform duration-300 ease-out lg:hidden',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
        style={{ zIndex: Z_LAYERS.drawer + 1 }}
      >
        {/* Header */}
        <div className="border-border flex h-14 items-center justify-between border-b px-4">
          <Logo />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="text-text-secondary hover:bg-elevated hover:text-text flex h-9 w-9 items-center justify-center rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {links.map((link) => {
            const Icon = LINK_ICONS[link.label] ?? Home

            return (
              <NavLink
                key={link.href}
                to={link.href}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    'flex h-11 items-center gap-3 rounded-lg border px-3 text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'border-primary/30 dark:bg-primary/10 text-primary dark:text-primary bg-white/20 shadow-[inset_0_3px_6px_rgba(0,0,0,0.6),inset_0_-1px_0_rgba(240,185,11,0.15),inset_0_1px_0_rgba(255,255,255,0.05),0_0_12px_-4px_rgba(240,185,11,0.3)] backdrop-blur-3xl'
                      : 'text-text dark:hover:bg-elevated/40 border-transparent hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.04)]',
                  )
                }
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{link.label}</span>
              </NavLink>
            )
          })}
        </nav>

        {/* Bottom: Sign Out + User */}
        <div className="border-border border-t p-3">
          {isAuthenticated ? (
            <div className="space-y-2">
              <button
                type="button"
                onClick={handleSignOut}
                className="text-error hover:bg-error/10 flex h-11 w-full items-center gap-3 rounded-lg border border-transparent px-3 text-left text-sm font-medium transition-colors"
              >
                <LogOut className="h-4 w-4 shrink-0" />
                <span>Sign Out</span>
              </button>

              <div className="bg-border/40 h-px" />

              <NavLink
                to="/dashboard"
                onClick={onClose}
                className="hover:bg-elevated flex items-center gap-3 rounded-lg px-3 py-2 transition-colors"
              >
                <div className="bg-primary text-background relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full text-sm font-bold">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={userName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    initial
                  )}
                </div>
                <div className="flex min-w-0 flex-col">
                  <span className="text-text truncate text-sm font-medium">
                    {userName}
                  </span>
                  <span className="text-text text-xs">View Dashboard</span>
                </div>
              </NavLink>
            </div>
          ) : (
            <NavLink
              to="/login"
              onClick={onClose}
              className="bg-primary text-background hover:bg-primary-hover flex h-11 w-full items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors"
            >
              <LogIn className="h-4 w-4" />
              Sign In
            </NavLink>
          )}
        </div>
      </aside>
    </>
  )
}
