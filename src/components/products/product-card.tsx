import { memo } from "react";
import Image from "next/image";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  onSelect?: (product: Product) => void;
}

/**
 * Individual product card displaying thumbnail, title, category, price, and rating.
 *
 * Wrapped in `React.memo` — since this component receives stable data from a
 * cached TanStack Query response, memo prevents unnecessary re-renders during
 * pagination transitions (when `keepPreviousData` shows stale items).
 */
const ProductCard = memo(function ProductCard({
  product,
  onSelect,
}: ProductCardProps) {
  const { title, thumbnail, price, category, rating } = product;

  return (
    <article
      onClick={() => onSelect?.(product)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect?.(product);
        }
      }}
      tabIndex={onSelect ? 0 : undefined}
      role={onSelect ? "button" : undefined}
      className={`
        group flex flex-col overflow-hidden rounded-xl border border-border-muted
        bg-surface-elevated shadow-sm transition-all duration-200
        hover:shadow-md
        ${onSelect ? "cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coop-500" : ""}
      `}
    >
      {/* ── Image ── */}
      <div className="relative aspect-square overflow-hidden bg-surface">
        <Image
          src={thumbnail}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute left-2.5 top-2.5 rounded-md bg-coop-700/90 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
          {category}
        </span>
      </div>

      {/* ── Details ── */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-text-primary">
          {title}
        </h3>

        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-brand-text">
            ${price.toFixed(2)}
          </span>

          <div className="flex items-center gap-1 text-sm text-text-muted">
            <svg
              className="h-4 w-4 text-amber-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="font-medium">{rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </article>
  );
});

export default ProductCard;
