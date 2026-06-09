"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api/auth";
import { useAuth } from "@/hooks/use-auth";
import type { LoginCredentials, AuthUser } from "@/types/auth";

/**
 * Encapsulates the login mutation lifecycle.
 *
 * - Calls the auth API via TanStack Query `useMutation`
 * - On success: stores user in context → navigates to `/dashboard`
 * - Exposes `isPending` and `error` for the UI layer
 */
export function useLogin() {
  const router = useRouter();
  const { setUser } = useAuth();

  const mutation = useMutation<AuthUser, Error, LoginCredentials>({
    mutationFn: login,
    onSuccess: (user) => {
      setUser(user);
      router.push("/dashboard");
    },
  });

  return {
    login: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset,
  };
}
