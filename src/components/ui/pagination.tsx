import { memo, useMemo } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

/**
 * Pagination control designed for large datasets (50 000+ items).
 *
 * Uses an ellipsis-based window strategy:
 *  - Always shows first and last page.
 *  - Shows a window of pages around the current page.
 *  - Collapses gaps into "…" to keep the control compact.
 *
 * Example with 4167 pages, current = 50:
 *  « ‹ 1 … 48 49 [50] 51 52 … 4167 › »
 */
const Pagination = memo(function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}: PaginationProps) {
  const pages = useMemo(
    () => generatePageRange(currentPage, totalPages),
    [currentPage, totalPages],
  );

  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1.5">
      {/* First */}
      <PageButton
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1 || isLoading}
        aria-label="First page"
      >
        <ChevronDoubleLeft />
      </PageButton>

      {/* Previous */}
      <PageButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
        aria-label="Previous page"
      >
        <ChevronLeft />
      </PageButton>

      {/* Page numbers */}
      {pages.map((page, idx) =>
        page === null ? (
          <span
            key={`ellipsis-${idx}`}
            className="flex h-9 w-9 items-center justify-center text-sm text-text-muted"
            aria-hidden="true"
          >
            …
          </span>
        ) : (
          <PageButton
            key={page}
            onClick={() => onPageChange(page)}
            disabled={isLoading}
            active={page === currentPage}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </PageButton>
        ),
      )}

      {/* Next */}
      <PageButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
        aria-label="Next page"
      >
        <ChevronRight />
      </PageButton>

      {/* Last */}
      <PageButton
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages || isLoading}
        aria-label="Last page"
      >
        <ChevronDoubleRight />
      </PageButton>
    </nav>
  );
});

export default Pagination;

/* ------------------------------------------------------------------ */
/*  Internal: Page range generator                                      */
/* ------------------------------------------------------------------ */

/** Returns an array of page numbers with `null` representing ellipsis gaps. */
function generatePageRange(
  current: number,
  total: number,
  windowSize = 1,
): (number | null)[] {
  const pages: (number | null)[] = [];

  const rangeStart = Math.max(2, current - windowSize);
  const rangeEnd = Math.min(total - 1, current + windowSize);

  // First page
  pages.push(1);

  // Left ellipsis
  if (rangeStart > 2) pages.push(null);

  // Window
  for (let i = rangeStart; i <= rangeEnd; i++) {
    pages.push(i);
  }

  // Right ellipsis
  if (rangeEnd < total - 1) pages.push(null);

  // Last page
  if (total > 1) pages.push(total);

  return pages;
}

/* ------------------------------------------------------------------ */
/*  Internal: Page button                                               */
/* ------------------------------------------------------------------ */

interface PageButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  children: React.ReactNode;
}

function PageButton({
  active = false,
  children,
  className = "",
  ...rest
}: PageButtonProps) {
  return (
    <button
      type="button"
      className={`
        flex h-9 min-w-9 items-center justify-center rounded-lg
        text-sm font-medium transition-colors duration-150
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coop-500
        disabled:cursor-not-allowed disabled:opacity-40
        ${
          active
            ? "bg-coop-700 text-white shadow-sm"
            : "text-text-secondary hover:bg-interactive-hover"
        }
        ${className}
      `}
      {...rest}
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Internal: Chevron SVG icons                                         */
/* ------------------------------------------------------------------ */

const iconClass = "h-3.5 w-3.5";

function ChevronLeft() {
  return (
    <svg className={iconClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg className={iconClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function ChevronDoubleLeft() {
  return (
    <svg className={iconClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="11 18 5 12 11 6" />
      <polyline points="19 18 13 12 19 6" />
    </svg>
  );
}

function ChevronDoubleRight() {
  return (
    <svg className={iconClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="13 18 19 12 13 6" />
      <polyline points="5 18 11 12 5 6" />
    </svg>
  );
}
