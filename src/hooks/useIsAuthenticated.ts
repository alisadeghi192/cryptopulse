import { useAuthStore } from '@/stores/useAuthStore'

export function useIsAuthenticated(): boolean {
  return !!useAuthStore((s) => s.user)
}