import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { TopBar } from "@/components/layout/TopBar";
import { MobileNavDrawer } from "@/components/layout/MobileNavDrawer";
import { Footer } from "@/components/layout/Footer/Footer";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

const isAuthenticated = true;
const user = { name: "Ali" };

export function RootLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Markets", href: "/markets" },
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
        userName={user.name}
        onClose={() => setMobileOpen(false)}
      />

      <Outlet />
      <Footer/>
    </div>
  );
}
