"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import type { Product } from "@/types/product";

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

/**
 * Product detail modal using the native `<dialog>` element for
 * proper accessibility (focus trap, Escape key, backdrop click).
 */
export default function ProductDetailModal({
  product,
  onClose,
}: ProductDetailModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (product) {
      if (!dialog.open) dialog.showModal();
    } else {
      dialog.close();
    }
  }, [product]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      if (e.target === dialogRef.current) onClose();
    },
    [onClose],
  );

  const handleClose = useCallback(() => onClose(), [onClose]);

  if (!product) return null;

  const discountedPrice =
    product.discountPercentage > 0
      ? product.price * (1 - product.discountPercentage / 100)
      : null;

  return (
    <dialog
      ref={dialogRef}
      onClose={handleClose}
      onClick={handleBackdropClick}
      className="
        m-auto max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-2xl
        border border-border-muted bg-surface-elevated p-0 shadow-2xl
        backdrop:bg-black/50 backdrop:backdrop-blur-sm
      "
    >
      <div className="flex max-h-[90vh] flex-col overflow-y-auto">
        {/* ── Header ── */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border-muted bg-surface-elevated px-6 py-4">
          <h2 className="text-lg font-bold text-text-primary pr-4 line-clamp-1">
            {product.title}
          </h2>
          <button
            onClick={onClose}
            className="
              flex h-8 w-8 shrink-0 items-center justify-center rounded-lg
              text-text-muted transition-colors
              hover:bg-interactive-hover hover:text-text-primary
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coop-500
            "
            aria-label="Close modal"
          >
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        {/* ── Body ── */}
        <div className="px-6 py-5">
          {/* Image */}
          <div className="relative mb-5 aspect-video overflow-hidden rounded-xl bg-surface">
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              sizes="(max-width: 672px) 100vw, 672px"
              className="object-contain"
              priority
            />
          </div>

          {/* Price + Category + Rating */}
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-brand-text">
                ${(discountedPrice ?? product.price).toFixed(2)}
              </span>
              {discountedPrice && (
                <>
                  <span className="text-sm text-text-muted line-through">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="rounded-md bg-badge-bg px-1.5 py-0.5 text-xs font-semibold text-badge-text">
                    -{product.discountPercentage.toFixed(0)}%
                  </span>
                </>
              )}
            </div>

            <div className="ml-auto flex items-center gap-3">
              <span className="rounded-md bg-brand-surface px-2.5 py-1 text-xs font-medium text-brand-text">
                {product.category}
              </span>

              <div className="flex items-center gap-1">
                <svg
                  className="h-4 w-4 text-amber-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span className="text-sm font-semibold text-text-secondary">
                  {product.rating.toFixed(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Stock & Brand */}
          <div className="mb-4 flex flex-wrap gap-4 text-sm">
            {product.brand && (
              <div className="flex items-center gap-1.5 text-text-secondary">
                <span className="font-medium text-text-muted">Brand:</span>
                {product.brand}
              </div>
            )}
            {product.stock !== undefined && (
              <div className="flex items-center gap-1.5">
                <span
                  className={`inline-block h-2 w-2 rounded-full ${
                    product.stock > 10
                      ? "bg-success"
                      : product.stock > 0
                        ? "bg-warning"
                        : "bg-error"
                  }`}
                />
                <span className="text-text-secondary">
                  {product.stock > 0
                    ? `${product.stock} in stock`
                    : "Out of stock"}
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <div>
              <h3 className="mb-1.5 text-sm font-semibold text-text-primary">
                Description
              </h3>
              <p className="text-sm leading-relaxed text-text-secondary">
                {product.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
}
