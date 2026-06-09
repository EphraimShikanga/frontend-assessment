import { memo } from "react";
import type { Product } from "@/types/product";
import ProductCard from "./product-card";

interface ProductsGridProps {
  products: Product[];
  /** Visual dim when a page transition is in progress. */
  isTransitioning?: boolean;
  /** Called when a product card is clicked. */
  onSelectProduct?: (product: Product) => void;
}

/**
 * Responsive product grid.
 *
 * Delegates rendering of each item to the memoised `ProductCard`.
 * Applies an opacity transition during page changes (when `keepPreviousData`
 * is showing stale data) so the user gets visual feedback that new data
 * is loading without a jarring skeleton flash.
 */
const ProductsGrid = memo(function ProductsGrid({
  products,
  onSelectProduct,
}: ProductsGridProps) {
  return (
    <div
      className={`
        grid grid-cols-1 gap-5 transition-opacity duration-200
        sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
      `}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onSelect={onSelectProduct}
        />
      ))}
    </div>
  );
});

export default ProductsGrid;
