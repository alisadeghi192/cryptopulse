import { NavLink } from 'react-router'
import {
  LayoutDashboard,
  Star,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Wallet,
  Receipt,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/utils/cn'
import { useSignOut } from '@/hooks/useSignOut'

interface SidebarProps {
  collapsed: boolean
  onToggleCollapse: () => void
}

interface NavItem {
  label: string
  href: string
  icon: LucideIcon
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Wallet', href: '/wallet', icon: Wallet },
  { label: 'Transactions', href: '/transactions', icon: Receipt },
  { label: 'Watchlist', href: '/watchlist', icon: Star },
  { label: 'Profile', href: '/profile', icon: User },
]

export function Sidebar({ collapsed, onToggleCollapse }: SidebarProps) {
  const handleSignOut = useSignOut()

  return (
    <aside
      className={cn(
        'border-border/40 bg-background/20 hidden shrink-0 flex-col border-r shadow-xl backdrop-blur-xl transition-all duration-300 ease-out lg:sticky lg:top-12 lg:flex lg:h-[calc(100vh-3rem)]',
        collapsed ? 'lg:w-16' : 'lg:w-64',
      )}
    >
      {/* Nav Items */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {navItems.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.href}
              to={item.href}
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
              <span className={cn(collapsed && 'lg:hidden')}>{item.label}</span>
            </NavLink>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="border-border/40 space-y-1 border-t p-3">
        <button
          type="button"
          onClick={() => handleSignOut()}
          className={cn(
            'text-error hover:bg-error/10 flex h-11 w-full cursor-pointer items-center gap-3 rounded-lg border border-transparent px-3 text-sm font-medium transition-colors',
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
            'text-text dark:hover:bg-elevated/40 flex h-11 w-full cursor-pointer items-center gap-3 rounded-lg border border-transparent px-3 text-sm font-medium transition-all duration-200 hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.04)]',
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
  )
}