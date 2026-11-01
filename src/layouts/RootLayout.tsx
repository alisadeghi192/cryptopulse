import { useEffect, useState } from 'react'
import { Outlet } from 'react-router'
import { TopBar } from '@/components/layout/TopBar'
import { MobileNavDrawer } from '@/components/layout/MobileNavDrawer'
import { Footer } from '@/components/layout/Footer/Footer'
import { ScrollToTop } from '@/components/ui/ScrollToTop'

export function RootLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Markets', href: '/markets' },
    { label: 'Converter', href: '/converter' },
    { label: 'About', href: '/about' },
  ]

  return (
    <div className="bg-background min-h-screen">
      <ScrollToTop />
      <TopBar
        onMenuClick={() => setMobileOpen(true)}
        showNav={true}
        showHamburger={true}
        useBorderBeam={true}
      />

      <MobileNavDrawer
        open={mobileOpen}
        links={navLinks}
        onClose={() => setMobileOpen(false)}
      />

      <Outlet />
      <Footer />
    </div>
  )
}