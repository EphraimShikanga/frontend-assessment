"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuItem {
  label: string;
  href: string;
  disabled?: boolean;
}

const MENU_ITEMS: MenuItem[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Transactions", href: "/dashboard/transactions" },
  { label: "Reports", href: "/dashboard/reports", disabled: true },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Sidebar navigation for the dashboard.
 *
 * - Active item has a gold left border accent.
 * - Disabled items are grayed out and not clickable.
 * - Controlled by the parent layout via isOpen/onClose.
 * - On mobile: slides in/out with a backdrop overlay.
 * - On desktop: toggles visibility via the header hamburger.
 */
export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* ── Mobile backdrop ── */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* ── Sidebar nav ── */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-56 border-r border-border bg-surface
          pt-16 font-poppins transition-transform duration-200 ease-in-out
          lg:sticky lg:top-16 lg:z-auto lg:h-[calc(100vh-4rem)] lg:pt-0
          lg:transition-[width,margin] lg:duration-200
          ${isOpen ? "translate-x-0 lg:translate-x-0 lg:w-56" : "-translate-x-full lg:translate-x-0 lg:w-0 lg:border-r-0 lg:overflow-hidden"}
        `}
      >
        <nav className="flex w-56 flex-col py-4">
          {MENU_ITEMS.map((item) => {
            const isActive = pathname === item.href;

            if (item.disabled) {
              return (
                <span
                  key={item.href}
                  className="
                    flex h-12 cursor-not-allowed items-center border-l-4 border-transparent
                    px-6 text-sm text-gray/50
                  "
                  aria-disabled="true"
                >
                  {item.label}
                </span>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`
                  flex h-12 items-center border-l-4 px-6 text-sm font-medium
                  transition-colors duration-150
                  ${
                    isActive
                      ? "border-gold bg-gold/5 text-text-primary"
                      : "border-transparent text-text-muted hover:bg-interactive-hover hover:text-text-primary"
                  }
                `}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
