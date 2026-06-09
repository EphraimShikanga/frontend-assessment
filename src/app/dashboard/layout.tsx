"use client";

import AuthGuard from "@/components/auth/auth-guard";
import DashboardHeader from "@/components/dashboard/dashboard-header";

/**
 * Layout for `/dashboard` and all nested routes.
 *
 * Wraps children in `AuthGuard` so every page under `/dashboard`
 * is automatically protected — no need to repeat the check per page.
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="flex flex-1 flex-col">
        <DashboardHeader />
        <main className="flex-1">{children}</main>
      </div>
    </AuthGuard>
  );
}
