import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  endAdornment?: ReactNode;
}

/**
 * Uses `forwardRef` so parent forms can manage focus (e.g. auto-focus
 * the first field with a validation error).
 */
const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  function InputField(
    { label, error, id, className = "", endAdornment, ...rest },
    ref,
  ) {
    const inputId = id ?? `input-${label.toLowerCase().replace(/\s+/g, "-")}`;
    const errorId = `${inputId}-error`;

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-text-secondary"
        >
          {label}
        </label>

        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className={`
              peer
              h-11 w-full rounded-lg border px-3.5 text-sm text-text-primary
              outline-none transition-all duration-200
              placeholder:text-transparent
              ${endAdornment ? "pr-11" : ""}
              ${
                error
                  ? "border-error focus:border-error focus:ring-1 focus:ring-error/30"
                  : "border-border-muted bg-surface-elevated focus:border-coop-500 focus:ring-1 focus:ring-coop-500/30"
              }
              ${className}
            `}
            {...rest}
          />

          {endAdornment && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              {endAdornment}
            </div>
          )}
        </div>

        {error && (
          <p id={errorId} role="alert" className="text-xs text-error">
            {error}
          </p>
        )}
      </div>
    );
  },
);

export default InputField;
