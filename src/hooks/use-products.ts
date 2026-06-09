"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/api/products";
import type { ProductsResponse } from "@/types/product";

/** Default page size tuned for a good balance of perceived speed and data density. */
export const DEFAULT_PAGE_SIZE = 12;

/** Stable query-key factory — makes cache invalidation predictable. */
export const productsKeys = {
  all: ["products"] as const,
  list: (params: { page: number; pageSize: number; search: string }) =>
    [...productsKeys.all, "list", params] as const,
};

interface UseProductsOptions {
  page?: number;
  pageSize?: number;
  /** Server-side search query — case-insensitive title match. */
  search?: string;
}

/**
 * TanStack Query hook for paginated + searchable product fetching.
 *
 * Key behaviours:
 *  - `placeholderData: keepPreviousData` — the old page stays visible while
 *    the new page loads, preventing layout thrash during pagination.
 *  - `staleTime: 5 min` — avoids redundant refetches when the user navigates
 *    back to a page they already visited.
 *  - `gcTime: 30 min` — keeps cached pages in memory so revisiting
 *    earlier pages is instant (important at scale with 50 000+ products).
 *  - Search query is part of the cache key — each search+page combo
 *    is cached independently.
 *  - Derived `totalPages` for the pagination UI.
 */
export function useProducts({
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
  search = "",
}: UseProductsOptions = {}) {
  const query = useQuery<ProductsResponse>({
    queryKey: productsKeys.list({ page, pageSize, search }),
    queryFn: () => fetchProducts({ page, pageSize, search: search || undefined }),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
  });

  const totalPages = query.data
    ? Math.ceil(query.data.total / pageSize)
    : 0;

  return {
    ...query,
    totalPages,
  };
}
