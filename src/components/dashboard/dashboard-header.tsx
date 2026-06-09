"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import ThemeToggle from "@/components/ui/theme-toggle";
import LogoutModal from "@/components/dashboard/logout-modal";

/**
 * Dashboard top bar displaying the authenticated user's name and a logout button.
 */
export default function DashboardHeader() {
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
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* ── Brand ── */}
          <span className="text-lg font-bold tracking-tight text-white">
            Inua Mkulima Subsidy Program
          </span>

          {/* ── User info + Actions ── */}
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
