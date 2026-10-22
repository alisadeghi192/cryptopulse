import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { TopBar } from "@/components/layout/TopBar";
import { MobileNavDrawer } from "@/components/layout/MobileNavDrawer";
import { Footer } from "@/components/layout/Footer/Footer";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { useIsAuthenticated } from "@/hooks/useIsAuthenticated";

export function RootLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isAuthenticated = useIsAuthenticated()

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);


const navLinks = [
  { label: "Home", href: "/" },
  { label: "Markets", href: "/markets" },
  { label: 'Converter', href: '/converter' },
  ...(isAuthenticated ? [{ label: "Wallet", href: "/wallet" }] : []),
  ...(isAuthenticated ? [{ label: "Watchlist", href: "/watchlist" }] : []),
  { label: "About", href: "/about" },
];

  return (
    <div className="min-h-screen  bg-background">
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
      <Footer/>
    </div>
  );
}