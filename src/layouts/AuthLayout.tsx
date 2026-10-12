import { Navigate, Outlet } from 'react-router'
import { useAuthStore } from '@/stores/useAuthStore'
import { PageLoader } from '@/components/ui/PageLoader'

export function AuthLayout() {
  const user = useAuthStore((s) => s.user)
  const initialized = useAuthStore((s) => s.initialized)

  if (!initialized) {
    return <PageLoader />
  }

  if (user) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Outlet />
    </div>
  )
}