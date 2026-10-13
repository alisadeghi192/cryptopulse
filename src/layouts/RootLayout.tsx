import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { TopBar } from "@/components/layout/TopBar";
import { MobileNavDrawer } from "@/components/layout/MobileNavDrawer";
import { Footer } from "@/components/layout/Footer/Footer";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { useAuthStore } from "@/stores/useAuthStore";

export function RootLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = !!user;

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const userName =
    (user?.user_metadata?.full_name as string) ??
    user?.email?.split('@')[0] ??
    'User';

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
        isAuthenticated={isAuthenticated}
        userName={userName}
        onClose={() => setMobileOpen(false)}
      />

      <Outlet />
      <Footer/>
    </div>
  );
}