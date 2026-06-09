import { type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Show a loading spinner and disable the button. */
  isLoading?: boolean;
}

/**
 * Primary action button with built-in loading state.
 *
 * Renders a spinner SVG alongside the label text when `isLoading` is true,
 * and prevents interaction via `disabled`.
 */
export default function Button({
  children,
  isLoading = false,
  disabled,
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={`
        relative flex h-11 w-full items-center justify-center gap-2
        rounded-lg bg-coop-700 px-5 text-sm font-semibold text-white
        transition-all duration-200
        hover:bg-coop-600 active:scale-[0.98]
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coop-500
        disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100
        ${className}
      `}
      {...rest}
    >
      {isLoading && (
        <svg
          className="h-4 w-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
