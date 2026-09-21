import { Moon, Sun } from 'lucide-react'
import { cn } from '@/utils/cn'

interface ThemeToggleProps {
  theme: 'dark' | 'light'
  onToggle: () => void
  className?: string
}

export function ThemeToggle({ theme, onToggle, className }: ThemeToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label="Toggle theme"
      className={cn(
        'flex h-9 w-9 items-center justify-center rounded-lg cursor-pointer transition-colors hover:bg-elevated hover:text-text',
        className
      )}
    >
      {theme === 'dark' ? (
        <Moon className="h-4 w-4 text-white" />
      ) : (
        <Sun className="h-4 w-4 text-primary" />
      )}
    </button>
  )
}