"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";

interface AuthGuardProps {
  children: React.ReactNode;
}

/**
 * Wrapper that protects child routes from unauthenticated access.
 *
 * - While hydrating from sessionStorage: shows a branded spinner.
 * - If no user after hydration: redirects to `/` (login).
 * - Otherwise: renders children.
 */
export default function AuthGuard({ children }: AuthGuardProps) {
  const { user, isHydrated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isHydrated && !user) {
      router.replace("/");
    }
  }, [isHydrated, user, router]);

  if (!isHydrated) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-3 border-coop-200 border-t-coop-600" />
      </div>
    );
  }

  if (!user) return null;

  return <>{children}</>;
}
