"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import ThemeToggle from "@/components/ui/theme-toggle";
import LogoutModal from "@/components/dashboard/logout-modal";

interface DashboardHeaderProps {
  onToggleSidebar: () => void;
}

/**
 * Dashboard top bar displaying the authenticated user's name and a logout button.
 * Includes a hamburger toggle for the sidebar on all screen sizes.
 */
export default function DashboardHeader({ onToggleSidebar }: DashboardHeaderProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = useCallback(() => {
    logout();
    router.replace("/");
  }, [logout, router]);

  return (
    <>
      <header
        className="sticky top-0 z-30 bg-cover bg-center font-poppins"
        style={{ backgroundImage: "url('/header/header@2x.png')" }}
      >
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          {/* ── Left: Toggle + Brand ── */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleSidebar}
              className="
                flex h-9 w-9 items-center justify-center rounded-lg
                text-white transition-colors duration-150
                hover:bg-white/10
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white
              "
              aria-label="Toggle sidebar"
            >
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>

            <span className="text-lg font-bold tracking-tight text-white">
              Inua Mkulima Subsidy Program
            </span>
          </div>

          {/* ── Right: User info + Actions ── */}
          <div className="flex items-center gap-4">
            {user && (
              <div className="hidden items-center gap-1.5 text-sm text-white/80 sm:flex">
                <span>Logged In As:</span>
                <span className="font-semibold uppercase text-white">
                  {user.firstName}
                </span>
              </div>
            )}

            <ThemeToggle />

            <button
              onClick={() => setShowLogoutModal(true)}
              className="
                flex h-9 items-center gap-2 rounded-lg border border-white/40
                px-3.5 text-sm font-medium text-white
                transition-colors duration-150
                hover:border-white hover:bg-white/10
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white
              "
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logout/sign-out.svg"
                alt=""
                className="h-4 w-4 brightness-0 invert"
                aria-hidden="true"
              />
              Logout
            </button>
          </div>
        </div>
      </header>

      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}
