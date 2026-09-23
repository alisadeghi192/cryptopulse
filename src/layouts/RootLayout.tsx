import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import { TopBar } from "@/components/layout/TopBar";
import { MobileNavDrawer } from "@/components/layout/MobileNavDrawer";

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
    { label: "Markets", href: "/markets" },
    ...(isAuthenticated ? [{ label: "Watchlist", href: "/watchlist" }] : []),
    { label: "About", href: "/about" },
  ];

  return (
    <div className="min-h-screen container bg-background">
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
    </div>
  );
}
