interface AlertBannerProps {
  /** The error/message string to display. */
  message: string;
  /** Optional callback to dismiss the banner. */
  onDismiss?: () => void;
}

/**
 * Inline error banner for surfacing API / form-level errors.
 * Includes an optional dismiss button.
 */
export default function AlertBanner({ message, onDismiss }: AlertBannerProps) {
  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-lg border border-error/20 bg-red-50 px-4 py-3"
    >
      {/* Exclamation icon */}
      <svg
        className="mt-0.5 h-4 w-4 shrink-0 text-error"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
          clipRule="evenodd"
        />
      </svg>

      <p className="flex-1 text-sm text-error">{message}</p>

      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 text-error/60 transition-colors hover:text-error"
          aria-label="Dismiss error"
        >
          <svg
            className="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
      )}
    </div>
  );
}
