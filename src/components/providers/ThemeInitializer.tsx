import { useEffect } from 'react'
import { useThemeStore } from '@/stores/useThemeStore'

export function ThemeInitializer() {
  const setTheme = useThemeStore((s) => s.setTheme)
  const setLoading = useThemeStore((s) => s.setLoading)

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark')
    if (isDark) {
      setTheme('dark')
    } else {
      const stored = localStorage.getItem('theme')
      if (stored === 'dark' || stored === 'light') {
        setTheme(stored)
        document.documentElement.classList.toggle('dark', stored === 'dark')
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark')
        document.documentElement.classList.add('dark')
      } else {
        setTheme('light')
      }
    }
    setLoading(false)
  }, [setTheme, setLoading])

  return null
}