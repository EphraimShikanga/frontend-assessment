"use client";

import { useCallback, useState } from "react";
import { useProducts, DEFAULT_PAGE_SIZE } from "@/hooks/use-products";
import { useDebounce } from "@/hooks/use-debounce";
import ProductsGrid from "@/components/products/products-grid";
import ProductSkeletonGrid from "@/components/products/product-skeleton";
import ProductsEmpty from "@/components/products/products-empty";
import ProductsError from "@/components/products/products-error";
import ProductDetailModal from "@/components/products/product-detail-modal";
import SearchInput from "@/components/ui/search-input";
import Pagination from "@/components/ui/pagination";
import type { Product } from "@/types/product";

/**
 * Dashboard page — product listing with search, pagination, and detail modal.
 *
 * State flow:
 *  1. Initial load → skeleton grid
 *  2. Data arrives → product grid + pagination
 *  3. Search input → debounced query, reset to page 1, server-side filtering
 *  4. Page change → stale data dimmed (keepPreviousData) + new data fetched
 *  5. Card click → detail modal
 *  6. Error → error state with retry
 *  7. Empty → empty state
 */
export default function DashboardPage() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Debounce search to avoid firing on every keystroke.
  const debouncedSearch = useDebounce(searchQuery, 300);

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
    totalPages,
  } = useProducts({
    page,
    pageSize: DEFAULT_PAGE_SIZE,
    search: debouncedSearch,
  });

  // Reset to page 1 when search changes — handled naturally because
  // debouncedSearch is in the query key, but we also reset the page
  // state to keep the UI in sync.
  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    setPage(1);
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleSelectProduct = useCallback((product: Product) => {
    setSelectedProduct(product);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  const isSearching =
    searchQuery !== debouncedSearch || (isFetching && !!debouncedSearch);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* ── Page header + Search ── */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-text-primary">
            Products
          </h1>
          {data && (
            <p className="mt-0.5 text-sm text-text-muted">
              {data.total.toLocaleString()} product
              {data.total !== 1 ? "s" : ""}{" "}
              {debouncedSearch ? "found" : "available"}
            </p>
          )}
        </div>

        <SearchInput
          value={searchQuery}
          onChange={handleSearchChange}
          isSearching={isSearching}
        />
      </div>

      {/* ── Content ── */}
      {isLoading ? (
        <ProductSkeletonGrid count={DEFAULT_PAGE_SIZE} />
      ) : isError ? (
        <ProductsError
          message={error?.message ?? "An unexpected error occurred"}
          onRetry={() => refetch()}
        />
      ) : !data || data.products.length === 0 ? (
        <ProductsEmpty />
      ) : (
        <>
          <ProductsGrid
            products={data.products}
            onSelectProduct={handleSelectProduct}
          />

          {totalPages > 1 && (
            <div className="mt-8 flex flex-col items-center gap-3">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
              <p className="text-xs text-text-muted">
                Page {page} of {totalPages.toLocaleString()}
              </p>
            </div>
          )}
        </>
      )}

      <ProductDetailModal
        product={selectedProduct}
        onClose={handleCloseModal}
      />
    </div>
  );
}
