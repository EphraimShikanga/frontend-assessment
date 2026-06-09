"use client";

import { type FormEvent, useCallback, useRef, useState } from "react";
import { useLogin } from "@/hooks/use-login";
import AlertBanner from "@/components/ui/alert-banner";
import type { LoginFormErrors } from "@/types/auth";

/**
 * Login form styled to match the Co-op Bank design.
 * Uses Poppins font (inherited from the login page), gold submit button,
 * and standard input fields with labels above.
 */
export default function LoginForm() {
  const { login, isPending, error: apiError, reset: resetApiError } = useLogin();

  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const validate = useCallback((): boolean => {
    const next: LoginFormErrors = {};

    const username = usernameRef.current?.value.trim() ?? "";
    const password = passwordRef.current?.value ?? "";

    if (!username) next.username = "Username is required";
    if (!password) next.password = "Password is required";

    setErrors(next);

    if (next.username) usernameRef.current?.focus();
    else if (next.password) passwordRef.current?.focus();

    return Object.keys(next).length === 0;
  }, []);

  const clearFieldError = useCallback((field: keyof LoginFormErrors) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const { [field]: _, ...rest } = prev;
      return rest;
    });
  }, []);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      resetApiError();

      if (!validate()) return;

      login({
        username: usernameRef.current!.value.trim(),
        password: passwordRef.current!.value,
      });
    },
    [login, validate, resetApiError],
  );

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {apiError && (
        <AlertBanner
          message={apiError.message}
          onDismiss={resetApiError}
        />
      )}

      {/* Username */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="username" className="text-sm font-medium text-black">
          Username
        </label>
        <input
          ref={usernameRef}
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          placeholder="Enter your username"
          disabled={isPending}
          aria-invalid={!!errors.username}
          onChange={() => clearFieldError("username")}
          className={`
            h-11 w-full rounded-lg border px-4 text-sm text-black
            outline-none transition-colors
            placeholder:text-gray
            ${
              errors.username
                ? "border-error focus:border-error"
                : "border-[#00000029] focus:border-primary-green"
            }
          `}
        />
        {errors.username && (
          <p className="text-xs text-error">{errors.username}</p>
        )}
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-sm font-medium text-black">
          Password
        </label>
        <div className="relative">
          <input
            ref={passwordRef}
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="xxxxxxxx"
            disabled={isPending}
            aria-invalid={!!errors.password}
            onChange={() => clearFieldError("password")}
            className={`
              h-11 w-full rounded-lg border px-4 pr-11 text-sm text-black
              outline-none transition-colors
              placeholder:text-gray
              ${
                errors.password
                  ? "border-error focus:border-error"
                  : "border-[#00000029] focus:border-primary-green"
              }
            `}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray transition-colors hover:text-black"
            aria-label={showPassword ? "Hide password" : "Show password"}
            tabIndex={-1}
          >
            {showPassword ? (
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-xs text-error">{errors.password}</p>
        )}
      </div>

      {/* Submit — gold button with arrow */}
      <button
        type="submit"
        disabled={isPending}
        className="
          mt-2 flex h-12 w-full items-center justify-center gap-3
          rounded-lg bg-gold text-base font-semibold text-white
          transition-all duration-200
          hover:brightness-110 active:scale-[0.98]
          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold
          disabled:cursor-not-allowed disabled:opacity-60
        "
      >
        {isPending ? (
          <>
            <svg
              className="h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Signing in…
          </>
        ) : (
          <>
            Sign in
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
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}
