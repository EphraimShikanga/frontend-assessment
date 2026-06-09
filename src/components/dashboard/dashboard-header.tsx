"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import ThemeToggle from "@/components/ui/theme-toggle";

/**
 * Dashboard top bar displaying the authenticated user's name and a logout button.
 */
export default function DashboardHeader() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = useCallback(() => {
    logout();
    router.replace("/");
  }, [logout, router]);

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-surface-elevated/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* ── Brand ── */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-coop-700">
            <svg
              className="h-4.5 w-4.5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 21h18" />
              <path d="M5 21V7l7-4 7 4v14" />
              <path d="M9 21v-6h6v6" />
            </svg>
          </div>
          <span className="text-lg font-bold tracking-tight text-text-primary">
            Co-op Bank
          </span>
        </div>

        {/* ── User info + Actions ── */}
        <div className="flex items-center gap-4">
          {user && (
            <div className="hidden items-center gap-2.5 sm:flex">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-surface text-xs font-semibold text-brand-text">
                {user.firstName?.[0]}
                {user.lastName?.[0]}
              </div>
              <span className="text-sm font-medium text-text-primary">
                {user.firstName} {user.lastName}
              </span>
            </div>
          )}

          <ThemeToggle />

          <button
            onClick={handleLogout}
            className="
              flex h-9 items-center gap-2 rounded-lg border border-border-muted
              bg-surface-elevated px-3.5 text-sm font-medium text-text-secondary
              transition-colors duration-150
              hover:border-error/40 hover:bg-error/10 hover:text-error
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coop-500
            "
          >
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
