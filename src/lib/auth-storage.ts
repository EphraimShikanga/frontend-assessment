import type { AuthUser } from "@/types/auth";

const STORAGE_KEY = "coop_auth_user";

/**
 * Persist authenticated user data to sessionStorage.
 * We intentionally use sessionStorage over localStorage so the session
 * is scoped to the browser tab — standard practice for banking apps.
 */
export function persistUser(user: AuthUser): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } catch {
    // Storage quota exceeded or disabled — fail silently.
  }
}

/** Retrieve the stored user, or `null` if absent / corrupt. */
export function getPersistedUser(): AuthUser | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

/** Clear stored auth data (logout). */
export function clearPersistedUser(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Fail silently.
  }
}
