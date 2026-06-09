import { memo, useRef, useCallback, type ChangeEvent } from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isSearching?: boolean;
}

/**
 * Search input with clear button and optional loading indicator.
 *
 * This is a controlled component — the parent manages the raw (un-debounced)
 * value so the input stays responsive. Debouncing happens upstream in the
 * parent before passing the value to the query hook.
 */
const SearchInput = memo(function SearchInput({
  value,
  onChange,
  placeholder = "Search products…",
  isSearching = false,
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value),
    [onChange],
  );

  const handleClear = useCallback(() => {
    onChange("");
    inputRef.current?.focus();
  }, [onChange]);

  return (
    <div className="relative w-full sm:max-w-xs">
      <svg
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>

      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label="Search products by title"
        className="
          h-10 w-full rounded-lg border border-border-muted bg-surface-elevated
          pl-9 pr-9 text-sm text-text-primary
          outline-none transition-colors duration-150
          placeholder:text-text-muted
          focus:border-coop-500 focus:ring-1 focus:ring-coop-500/30
        "
      />

      {value && (
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
          {isSearching ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-border border-t-coop-500" />
          ) : (
            <button
              type="button"
              onClick={handleClear}
              className="flex h-5 w-5 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-interactive-hover hover:text-text-primary"
              aria-label="Clear search"
            >
              <svg
                className="h-3.5 w-3.5"
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
          )}
        </div>
      )}
    </div>
  );
});

export default SearchInput;
