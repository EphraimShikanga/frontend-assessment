import { config } from "@/lib/config";
import type { LoginCredentials, AuthUser } from "@/types/auth";

/**
 * Authenticate a user against the DummyJSON auth API.
 *
 * Throws a descriptive `Error` on network failure or non-2xx response,
 * so callers (TanStack Query mutations) can surface the message directly.
 */
export async function login(credentials: LoginCredentials): Promise<AuthUser> {
  const response = await fetch(config.api.endpoints.login, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...credentials,
      expiresInMins: 30,
    }),
    credentials: "include",
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const message =
      body?.message ?? `Authentication failed (${response.status})`;
    throw new Error(message);
  }

  return response.json();
}
