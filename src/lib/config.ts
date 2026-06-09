/**
 * Centralised environment configuration.
 *
 * Every env var the app needs is read, validated, and exported from here.
 * Importing `@/lib/config` anywhere guarantees a single source of truth and
 * a clear build-time error when a required variable is missing.
 */

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL ?? ""
).replace(/\/+$/, "");

if (!API_BASE_URL) {
  throw new Error(
    "Missing required environment variable: NEXT_PUBLIC_API_BASE_URL. " +
      "Check your .env.local file or deployment configuration.",
  );
}

export const config = {
  api: {
    baseUrl: API_BASE_URL,
    endpoints: {
      login: `${API_BASE_URL}/auth/login`,
      products: `${API_BASE_URL}/products`,
      productsSearch: `${API_BASE_URL}/products/search`,
    },
  },
} as const;
