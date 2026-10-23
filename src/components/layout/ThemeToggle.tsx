import { useCallback, useRef } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useThemeStore } from '@/stores/useThemeStore'
import { cn } from '@/utils/cn'

interface ThemeToggleProps extends React.ComponentPropsWithoutRef<'button'> {
  duration?: number
}

export function ThemeToggle({
  className,
  duration = 650,
  ...props
}: ThemeToggleProps) {
  const theme = useThemeStore((s) => s.theme)
  const setTheme = useThemeStore((s) => s.setTheme)
  const isLoading = useThemeStore((s) => s.isLoading)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const isTransitioningRef = useRef(false)

  const isDark = theme === 'dark'

  const toggleTheme = useCallback(() => {
    const button = buttonRef.current
    if (
      !button ||
      isTransitioningRef.current ||
      document.documentElement.dataset.themeVt === 'active'
    )
      return

    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    const { top, left, width, height } = button.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2

    const maxRadius = Math.hypot(
      Math.max(x, viewportWidth - x),
      Math.max(y, viewportHeight - y),
    )

    const applyThemeClass = () => {
      const newTheme = isDark ? 'light' : 'dark'
      document.documentElement.classList.toggle('dark', newTheme === 'dark')
      document.cookie = `theme=${newTheme}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`
      localStorage.setItem('theme', newTheme)
    }

    const applyThemeState = () => {
      setTheme(isDark ? 'light' : 'dark')
    }

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (prefersReduced || typeof document.startViewTransition !== 'function') {
      applyThemeClass()
      applyThemeState()
      return
    }

    const isMobile = viewportWidth < 768
    const effectiveDuration = isMobile ? 700 : duration

    const toX = (val: number) => `${(val / viewportWidth) * 100}%`
    const toY = (val: number) => `${(val / viewportHeight) * 100}%`
    const toRadius = (r: number) =>
      `${(r / (Math.hypot(viewportWidth, viewportHeight) / Math.SQRT2)) * 100}%`

    const point = `${toX(x)} ${toY(y)}`
    const clipPath = [
      `circle(0% at ${point})`,
      `circle(${toRadius(maxRadius)} at ${point})`,
    ] as [string, string]

    const root = document.documentElement
    root.dataset.themeVt = 'active'
    root.classList.add('freeze-animations')
    root.style.setProperty(
      '--theme-toggle-vt-duration',
      `${effectiveDuration}ms`,
    )
    root.style.setProperty('--theme-vt-clip-from', clipPath[0])

    const cleanup = () => {
      isTransitioningRef.current = false
      delete root.dataset.themeVt
      root.classList.remove('freeze-animations')
      root.style.removeProperty('--theme-toggle-vt-duration')
      root.style.removeProperty('--theme-vt-clip-from')
    }

    isTransitioningRef.current = true
    const transition = document.startViewTransition(() => {
      applyThemeClass()
    })

    transition.finished
      .finally(() => {
        applyThemeState()
        cleanup()
      })
      .catch(() => {})

    transition.ready
      .then(() => {
        root.animate(
          { clipPath },
          {
            duration: effectiveDuration,
            easing: 'ease-in-out',
            fill: 'forwards',
            pseudoElement: '::view-transition-new(root)',
          },
        )
      })
      .catch(() => {})
  }, [isDark, setTheme, duration])

  if (isLoading) {
    return (
      <div
        className={cn(
          'flex h-9 w-9 items-center justify-center rounded-lg bg-elevated/50',
          className,
        )}
      >
        <div className="h-4 w-4 animate-pulse rounded-full bg-border" />
      </div>
    )
  }

  return (
    <button
      type="button"
      ref={buttonRef}
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={cn(
        'flex h-9 w-9 items-center cursor-pointer justify-center rounded-lg text-text-secondary transition-colors hover:bg-elevated hover:text-text',
        className,
      )}
      {...props}
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-primary" />
      ) : (
        <Moon className="h-4 w-4 text-blue-900" />
      )}
    </button>
  )
}