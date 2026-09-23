import { create } from 'zustand'

type Theme = 'light' | 'dark'

interface ThemeState {
  theme: Theme
  isLoading: boolean
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
  setLoading: (loading: boolean) => void
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: 'dark',
  isLoading: true,
  toggleTheme: () => {
    const newTheme = get().theme === 'dark' ? 'light' : 'dark'
    set({ theme: newTheme })
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', newTheme === 'dark')
    }
    document.cookie = `theme=${newTheme}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`
    localStorage.setItem('theme', newTheme)
  },
  setTheme: (theme) => set({ theme }),
  setLoading: (loading) => set({ isLoading: loading }),
}))