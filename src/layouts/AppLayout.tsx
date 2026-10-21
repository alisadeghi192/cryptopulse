import { useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router'
import { TopBar } from '@/components/layout/TopBar'
import { Sidebar } from '@/components/layout/Sidebar'
import { PageLoader } from '@/components/ui/PageLoader'
import { useAuthStore } from '@/stores/useAuthStore'
import { confirm } from '@/lib/confirm'

export function AppLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const user = useAuthStore((s) => s.user)
  const initialized = useAuthStore((s) => s.initialized)
  const signOut = useAuthStore((s) => s.signOut)
  const navigate = useNavigate()

  const handleSignOut = async () => {
    const ok = await confirm({
      title: 'Sign out?',
      description: 'You will need to sign in again to access your account.',
      confirmLabel: 'Sign Out',
      cancelLabel: 'Cancel',
      variant: 'danger',
    })
    if (!ok) return

    await signOut()
    navigate('/')
  }

  if (!initialized) {
    return <PageLoader />
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="bg-background container flex h-screen flex-col overflow-hidden">
      <TopBar
        onMenuClick={() => setMobileOpen(true)}
        showNav={true}
        showHamburger={true}
        useBorderBeam={false}
      />

      <div className="flex min-h-0 flex-1">
        <Sidebar
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed(!collapsed)}
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
          onSignOut={handleSignOut}
        />

        <main className="custom-scroll min-w-0 flex-1 overflow-y-auto p-2 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
