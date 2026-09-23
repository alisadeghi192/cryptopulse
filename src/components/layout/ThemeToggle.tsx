import { Moon, Sun } from 'lucide-react'
import { useThemeStore } from '@/stores/useThemeStore'
import { cn } from '@/utils/cn'

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const theme = useThemeStore((s) => s.theme)
  const toggleTheme = useThemeStore((s) => s.toggleTheme)
  const isLoading = useThemeStore((s) => s.isLoading)

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
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={cn(
        'flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-elevated hover:text-text',
        className
      )}
    >
      {theme === 'dark' ? (
        <Sun className="h-4 w-4 text-primary" />
      ) : (
        <Moon className="h-4 w-4 text-indigo-950" />
      )}
    </button>
  )
}