import { memo } from "react";

/**
 * Skeleton placeholder for a single product card.
 * Mirrors the exact layout of `ProductCard` for a seamless
 * transition when data arrives.
 */
const ProductSkeleton = memo(function ProductSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border-muted bg-surface-elevated shadow-sm">
      {/* Image area */}
      <div className="relative aspect-square bg-skeleton flex items-center justify-center">
        <svg
          className="h-10 w-10 text-skeleton-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
        </svg>

        {/* Category badge placeholder */}
        <div className="absolute left-2.5 top-2.5 h-5 w-16 rounded-md bg-skeleton" />
      </div>

      {/* Details area */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="space-y-2">
          <div className="h-3.5 w-full rounded bg-skeleton" />
          <div className="h-3.5 w-2/3 rounded bg-skeleton" />
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="h-5 w-16 rounded bg-skeleton" />
          <div className="flex items-center gap-1">
            <div className="h-4 w-4 rounded-full bg-skeleton" />
            <div className="h-4 w-8 rounded bg-skeleton" />
          </div>
        </div>
      </div>
    </div>
  );
});

interface ProductSkeletonGridProps {
  count?: number;
}

/**
 * Grid of skeleton cards shown during the initial data load.
 * Uses the same grid layout as `ProductsGrid` for a seamless transition.
 */
export default function ProductSkeletonGrid({
  count = 12,
}: ProductSkeletonGridProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }, (_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}
