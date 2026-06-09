interface ProductsErrorProps {
  message: string;
  onRetry: () => void;
}

/**
 * Error state with a retry button.
 * Shown when the products fetch fails (network error, server 5xx, etc.).
 */
export default function ProductsError({ message, onRetry }: ProductsErrorProps) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-2xl border border-border-muted bg-surface-elevated px-4 py-12 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-error/10 text-error">
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <h3 className="text-base font-semibold text-text-primary">
        Failed to load products
      </h3>
      <p className="mt-1 max-w-sm text-sm text-text-secondary">{message}</p>
      <button
        onClick={onRetry}
        className="
          mt-5 rounded-lg bg-coop-700 px-5 py-2 text-sm font-medium text-white
          transition-colors hover:bg-coop-600
          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coop-500
        "
      >
        Try again
      </button>
    </div>
  );
}
