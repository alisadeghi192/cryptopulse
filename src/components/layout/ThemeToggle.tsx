import { useCallback, useRef } from 'react'
import { flushSync } from 'react-dom'
import { Moon, Sun } from 'lucide-react'
import { useThemeStore } from '@/stores/useThemeStore'
import { cn } from '@/utils/cn'

interface ThemeToggleProps extends React.ComponentPropsWithoutRef<'button'> {
  duration?: number
}

export function ThemeToggle({
  className,
  duration = 400,
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
      Math.max(y, viewportHeight - y)
    )

    const applyTheme = () => {
      const newTheme = isDark ? 'light' : 'dark'
      document.documentElement.classList.toggle('dark', newTheme === 'dark')
      setTheme(newTheme)

      // Persist
      document.cookie = `theme=${newTheme}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`
      localStorage.setItem('theme', newTheme)
    }

    if (typeof document.startViewTransition !== 'function') {
      applyTheme()
      return
    }

   
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
    root.style.setProperty('--theme-toggle-vt-duration', `${duration}ms`)
    root.style.setProperty('--theme-vt-clip-from', clipPath[0])

    const cleanup = () => {
      isTransitioningRef.current = false
      delete root.dataset.themeVt
      root.style.removeProperty('--theme-toggle-vt-duration')
      root.style.removeProperty('--theme-vt-clip-from')
    }

    isTransitioningRef.current = true
    const transition = document.startViewTransition(() => {
      flushSync(applyTheme)
    })

    if (typeof transition?.finished?.finally === 'function') {
      transition.finished.finally(cleanup).catch(() => {})
    } else {
      cleanup()
    }

    transition.ready
      .then(() => {
        document.documentElement.animate(
          { clipPath },
          {
            duration,
            easing: 'ease-in-out',
            fill: 'forwards',
            pseudoElement: '::view-transition-new(root)',
          }
        )
      })
      .catch(() => {})
  }, [isDark, setTheme, duration])

  if (isLoading) {
    return (
      <div
        className={cn(
          'flex h-9 w-9 items-center justify-center rounded-lg bg-elevated/50',
          className
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
        'flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-elevated hover:text-text',
        className
      )}
      {...props}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  )
}