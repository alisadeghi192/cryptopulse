import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'
import { BorderBeam } from '@/components/ui/BorderBeam'
import { NavLinks } from '@/components/layout/NavLinks'
import { ThemeToggle } from '@/components/layout/ThemeToggle'
import { UserMenu } from '@/components/layout/UserMenu'
import { useScroll } from '@/hooks/useScroll'
import { BORDER_BEAM_CONFIG, Z_LAYERS } from '@/constants'
import { cn } from '@/utils/cn'
import { Menu } from 'lucide-react'
import { NavigationProgress } from '../ui/NavigationProgress'
import { useAuthStore } from '@/stores/useAuthStore'

interface TopBarProps {
  onMenuClick: () => void
  showNav?: boolean
  showHamburger?: boolean
  useBorderBeam?: boolean
}

export function TopBar({
  onMenuClick,
  showNav = true,
  showHamburger = true,
  useBorderBeam = true,
}: TopBarProps) {
  const scrolled = useScroll()
  const user = useAuthStore((s) => s.user)
  const isAuthenticated = !!user

  const navLinks = [
    { label: 'Markets', href: '/markets' },
    { label: 'About', href: '/about' },
    { label: 'Converter', href: '/converter' },
  ]

  const headerContent = (
    <header
      className={cn('relative w-full transition-all duration-300 ease-out', {
        'rounded-3xl backdrop-blur-xl md:shadow-[0_0_30px_-8px_rgba(240,185,11,0.3)]':
          scrolled && useBorderBeam,
        'backdrop-blur-xl': !useBorderBeam,
        'border-border border-b backdrop-blur-xl': !scrolled,
      })}
    >
      <nav
        className={cn(
          'container mx-auto flex h-14 w-full items-center justify-between px-4 transition-all duration-300 ease-out md:h-12',
          {
            'lg:px-2': scrolled && useBorderBeam,
          },
        )}
      >
        <Logo />

        {showNav && <NavLinks links={navLinks} className="hidden lg:flex" />}

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <UserMenu isAuthenticated={isAuthenticated} />

          {showHamburger && (
            <Button
              size="icon"
              variant="outline"
              onClick={onMenuClick}
              className="lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
        </div>
      </nav>
      <NavigationProgress />
    </header>
  )
  if (!useBorderBeam) {
    return (
      <div className="sticky top-0 w-full" style={{ zIndex: Z_LAYERS.sticky }}>
        {headerContent}
      </div>
    )
  }

  return (
    <div
      className={cn(
        'sticky top-0 mx-auto w-full max-w-full transition-all duration-300 ease-out',
        {
          'top-2 max-w-[calc(100%-1rem)] rounded-3xl md:top-4 md:max-w-7/10':
            scrolled,
        },
      )}
      style={{ zIndex: Z_LAYERS.sticky }}
    >
      {scrolled ? (
        <BorderBeam
          thickness={BORDER_BEAM_CONFIG.thickness}
          duration={BORDER_BEAM_CONFIG.duration}
          className="w-full"
        >
          {headerContent}
        </BorderBeam>
      ) : (
        headerContent
      )}
    </div>
  )
}
