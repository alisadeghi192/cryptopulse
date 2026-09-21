import { NavLink } from 'react-router'
import { cn } from '@/utils/cn'

interface NavLinkItem {
  label: string
  href: string
}

interface NavLinksProps {
  links: NavLinkItem[]
  className?: string
  onLinkClick?: () => void
}

export function NavLinks({ links, className, onLinkClick }: NavLinksProps) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      {links.map((link) => (
        <NavLink
          key={link.href}
          to={link.href}
          onClick={onLinkClick}
          className={({ isActive }) =>
            cn(
              'inline-flex h-9 items-center justify-center rounded-lg px-4 text-sm font-medium transition-colors',
              isActive
                ? 'text-primary'
                : 'text-text-secondary hover:bg-elevated hover:text-text'
            )
          }
        >
          {link.label}
        </NavLink>
      ))}
    </div>
  )
}