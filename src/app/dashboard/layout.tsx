"use client";

import { useState, useCallback } from "react";
import AuthGuard from "@/components/auth/auth-guard";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import Sidebar from "@/components/dashboard/sidebar";

/**
 * Layout for `/dashboard` and all nested routes.
 *
 * Wraps children in `AuthGuard` so every page under `/dashboard`
 * is automatically protected — no need to repeat the check per page.
 *
 * Structure: Header (full width) → Sidebar + Main content side-by-side.
 * Sidebar open/close state is managed here so the header toggle can control it.
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= 1024; // lg breakpoint
    }
    return true;
  });

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  return (
    <AuthGuard>
      <div className="flex flex-1 flex-col">
        <DashboardHeader onToggleSidebar={toggleSidebar} />
        <div className="flex flex-1">
          <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}
