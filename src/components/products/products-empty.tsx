/**
 * Displayed when the products API returns zero results.
 */
export default function ProductsEmpty() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface-elevated/50 px-6 py-16 text-center">
      <svg
        className="mb-4 h-12 w-12 text-text-muted"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
        <path d="M8 11h6" />
      </svg>
      <h3 className="text-base font-semibold text-text-primary">
        No products found
      </h3>
      <p className="mt-1 text-sm text-text-secondary">
        Try adjusting your search or filters to find what you&apos;re looking
        for.
      </p>
    </div>
  );
}
