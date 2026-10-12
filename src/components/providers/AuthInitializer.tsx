import { useEffect } from 'react'
import { useAuthStore } from '@/stores/useAuthStore'

export function AuthInitializer() {
  const initialize = useAuthStore((s) => s.initialize)
  const initialized = useAuthStore((s) => s.initialized)

  useEffect(() => {
    if (!initialized) {
      initialize()
    }
  }, [initialize, initialized])

  return null
}