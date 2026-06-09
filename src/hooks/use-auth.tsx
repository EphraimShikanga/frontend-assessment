"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { AuthUser } from "@/types/auth";
import {
  getPersistedUser,
  persistUser,
  clearPersistedUser,
} from "@/lib/auth-storage";

/* ------------------------------------------------------------------ */
/*  Context shape                                                      */
/* ------------------------------------------------------------------ */

interface AuthContextValue {
  /** The currently authenticated user, or `null` when logged out. */
  user: AuthUser | null;
  /** Whether the initial hydration from storage has completed. */
  isHydrated: boolean;
  /** Call after a successful login to store + expose the user. */
  setUser: (user: AuthUser) => void;
  /** Clear the session entirely. */
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<AuthUser | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Rehydrate from sessionStorage on mount (client-only).
  useEffect(() => {
    setUserState(getPersistedUser());
    setIsHydrated(true);
  }, []);

  const setUser = useCallback((newUser: AuthUser) => {
    persistUser(newUser);
    setUserState(newUser);
  }, []);

  const logout = useCallback(() => {
    clearPersistedUser();
    setUserState(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, isHydrated, setUser, logout }),
    [user, isHydrated, setUser, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/* ------------------------------------------------------------------ */
/*  Hook                                                               */
/* ------------------------------------------------------------------ */

/**
 * Access the current auth state from any client component.
 *
 * @throws {Error} If used outside `<AuthProvider>`.
 */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) {
    throw new Error("useAuth must be used within an <AuthProvider>");
  }
  return ctx;
}
