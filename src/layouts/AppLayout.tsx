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
    <div className="bg-background flex min-h-screen flex-col lg:h-screen lg:overflow-hidden">
      <ScrollToTop containerRef={mainRef} />

      <TopBar
        onMenuClick={() => setMobileOpen(true)}
        showNav={true}
        showHamburger={true}
        useBorderBeam={false}
      />

      <div className="flex flex-1 lg:min-h-0">
        <Sidebar
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed(!collapsed)}
          mobileOpen={mobileOpen}
          onMobileClose={() => setMobileOpen(false)}
        />

        <main
          ref={mainRef}
          className="custom-scroll min-w-0 flex-1 lg:overflow-y-auto lg:p-8"
        >
          <div className="p-4 lg:p-0">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}