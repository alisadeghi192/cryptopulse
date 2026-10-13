import { NavLink } from 'react-router'
import {
  LayoutDashboard,
  Star,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
  Wallet,
} from 'lucide-react'
import { cn } from '@/utils/cn'
import { Logo } from '@/components/ui/Logo'

interface SidebarProps {
  collapsed: boolean
  onToggleCollapse: () => void
  mobileOpen: boolean
  onMobileClose: () => void
  onSignOut: () => void
}

interface NavItem {
  label: string
  href: string
  icon: typeof LayoutDashboard
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Wallet', href: '/wallet', icon: Wallet },
  { label: 'Watchlist', href: '/watchlist', icon: Star },
  { label: 'Profile', href: '/profile', icon: User },
]

export function Sidebar({
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onMobileClose,
  onSignOut,
}: SidebarProps) {
  return (
    <>
      {/* Mobile Backdrop */}
      <div
        onClick={onMobileClose}
        className={cn(
          'fixed inset-0 z-50 bg-black/30 backdrop-blur-sm transition-opacity duration-300 lg:hidden',
          mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        className={cn(
          'border-border/40 bg-surface/30 fixed top-0 bottom-0 left-0 z-60 flex flex-col border-r shadow-[8px_0_24px_-4px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-300 ease-out md:shadow-xl',
          'lg:sticky lg:top-12 lg:z-0 lg:h-[calc(100vh-3rem)] lg:translate-x-0',
          collapsed ? 'lg:w-16' : 'lg:w-64',
          'w-72',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {/* Mobile Header */}
        <div className="border-border flex h-14 items-center justify-between border-b px-4 lg:hidden">
          <Logo />
          <button
            type="button"
            onClick={onMobileClose}
            aria-label="Close sidebar"
            className="text-text-secondary hover:bg-elevated hover:text-text flex h-9 w-9 items-center justify-center rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {navItems.map((item) => {
            const Icon = item.icon

            return (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={onMobileClose}
                className={({ isActive }) =>
                  cn(
                    'group border-border/40 flex h-11 items-center gap-3 rounded-lg border px-3 text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'border-primary/30 dark:bg-primary/10 text-primary dark:text-primary bg-white/20 shadow-[inset_0_3px_6px_rgba(0,0,0,0.6),inset_0_-1px_0_rgba(240,185,11,0.15),inset_0_1px_0_rgba(255,255,255,0.05),0_0_12px_-4px_rgba(240,185,11,0.3)] backdrop-blur-3xl'
                      : 'text-text dark:hover:bg-elevated/40 border-transparent hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.04)]',
                    collapsed && 'lg:justify-center lg:px-0',
                  )
                }
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span className={cn(collapsed && 'lg:hidden')}>
                  {item.label}
                </span>
              </NavLink>
            )
          })}
        </nav>

        {/* Bottom */}
        <div className="border-border/40 space-y-1 border-t p-3">
           <button
              type="button"
              onClick={onSignOut}
              className={cn(
                'text-error hover:bg-error/10 flex h-11 w-full items-center gap-3 rounded-lg border border-transparent px-3 text-sm font-medium transition-colors',
                collapsed && 'lg:justify-center lg:px-0',
              )}
            >
              <LogOut className="h-5 w-5 shrink-0" />
              <span className={cn(collapsed && 'lg:hidden')}>Sign Out</span>
            </button>

          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label="Toggle sidebar"
            className={cn(
              'text-text dark:hover:bg-elevated/40 hidden h-11 w-full items-center gap-3 rounded-lg border border-transparent px-3 text-sm font-medium transition-all duration-200 hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.04)] lg:flex',
              collapsed && 'lg:justify-center lg:px-0',
            )}
          >
            {collapsed ? (
              <ChevronRight className="h-5 w-5 shrink-0" />
            ) : (
              <>
                <ChevronLeft className="h-5 w-5 shrink-0" />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  )
}