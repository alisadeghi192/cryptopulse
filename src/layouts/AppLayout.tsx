import { useState, useRef } from 'react'
import { Navigate, Outlet } from 'react-router'
import { TopBar } from '@/components/layout/TopBar'
import { Sidebar } from '@/components/layout/Sidebar'
import { PageLoader } from '@/components/ui/PageLoader'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { useAuthStore } from '@/stores/useAuthStore'

export function AppLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const mainRef = useRef<HTMLElement>(null)

  const user = useAuthStore((s) => s.user)
  const initialized = useAuthStore((s) => s.initialized)

  if (!initialized) {
    return <PageLoader />
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <ScrollToTop containerRef={mainRef} />

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
        />

        <main
          ref={mainRef}
          className="custom-scroll min-w-0 flex-1 overflow-y-auto p-2 md:p-8"
        >
          <Outlet />
        </main>
      </div>
    </div>
  )
}