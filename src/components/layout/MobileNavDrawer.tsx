import { NavLink } from "react-router";
import { X } from "lucide-react";
import { cn } from "@/utils/cn";
import { Logo } from "../ui/Logo";

interface NavLinkItem {
  label: string;
  href: string;
}

interface MobileNavDrawerProps {
  open: boolean;
  links: NavLinkItem[];
  isAuthenticated: boolean;
  userName: string;
  onClose: () => void;
}

export function MobileNavDrawer({
  open,
  links,
  isAuthenticated,
  userName,
  onClose,
}: MobileNavDrawerProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-50 bg-black/30 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={cn(
          "fixed top-0 right-0 bottom-0 z-60 flex w-72 flex-col border-l border-border/40 bg-surface/30 backdrop-blur-xl shadow-[-8px_0_24px_-4px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-out md:hidden",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Header */}
        <div className="flex h-14 items-center justify-between border-b border-border px-4">
          <Logo/>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-elevated hover:text-text"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {links.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "flex h-11 items-center rounded-lg border px-3 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "border-primary/30 dark:bg-primary/10 bg-white/20 backdrop-blur-3xl text-primary dark:text-primary shadow-[inset_0_3px_6px_rgba(0,0,0,0.6),inset_0_-1px_0_rgba(240,185,11,0.15),inset_0_1px_0_rgba(255,255,255,0.05),0_0_12px_-4px_rgba(240,185,11,0.3)]"
                    :  "border-transparent text-text dark:hover:bg-elevated/40 hover:shadow-[inset_0_2px_4px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.04)]",
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom: Auth */}
        <div className="border-t border-border p-3">
          {isAuthenticated ? (
            <NavLink
              to="/dashboard"
              onClick={onClose}
              className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-elevated"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-background">
                {userName[0]}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-text">
                  {userName}
                </span>
                <span className="text-xs text-text">
                  View Dashboard
                </span>
              </div>
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              onClick={onClose}
              className="flex h-11 w-full items-center justify-center rounded-lg bg-primary text-sm font-medium text-background transition-colors hover:bg-primary-hover"
            >
              Sign In
            </NavLink>
          )}
        </div>
      </aside>
    </>
  );
}
