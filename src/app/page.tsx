"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import LoginForm from "@/components/auth/login-form";

export default function LoginPage() {
  const { user, isHydrated } = useAuth();
  const router = useRouter();

  // If already authenticated, redirect to dashboard immediately.
  useEffect(() => {
    if (isHydrated && user) {
      router.replace("/dashboard");
    }
  }, [isHydrated, user, router]);

  // Prevent flash while checking session.
  if (!isHydrated) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-3 border-coop-200 border-t-coop-600" />
      </div>
    );
  }

  // Already logged in — show nothing while redirect fires.
  if (user) return null;

  return (
    <div className="flex flex-1 items-center justify-center bg-surface px-4 py-12">
      <div className="w-full max-w-md">
        {/* ── Brand header ── */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-coop-700 shadow-lg shadow-coop-700/25">
            <svg
              className="h-7 w-7 text-white"
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
              <path d="M10 9h4" />
              <path d="M10 13h4" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">
            Co-op Bank
          </h1>
          <p className="mt-1 text-sm text-text-muted">
            Sign in to your dashboard
          </p>
        </div>

        {/* ── Card ── */}
        <div className="rounded-2xl border border-border-muted bg-surface-elevated p-6 shadow-sm sm:p-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
