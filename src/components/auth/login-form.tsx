"use client";

import { type FormEvent, useCallback, useRef, useState } from "react";
import { useLogin } from "@/hooks/use-login";
import InputField from "@/components/ui/input-field";
import Button from "@/components/ui/button";
import AlertBanner from "@/components/ui/alert-banner";
import type { LoginFormErrors } from "@/types/auth";

/**
 * Login form with client-side validation, loading state, and API error display.
 *
 * Validation rules:
 *  - Both username and password are required.
 *  - Errors are cleared field-by-field as the user types.
 */
export default function LoginForm() {
  const { login, isPending, error: apiError, reset: resetApiError } = useLogin();

  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  /** Validate inputs and return `true` if the form is valid. */
  const validate = useCallback((): boolean => {
    const next: LoginFormErrors = {};

    const username = usernameRef.current?.value.trim() ?? "";
    const password = passwordRef.current?.value ?? "";

    if (!username) next.username = "Username is required";
    if (!password) next.password = "Password is required";

    setErrors(next);

    // Focus the first errored field for accessibility.
    if (next.username) usernameRef.current?.focus();
    else if (next.password) passwordRef.current?.focus();

    return Object.keys(next).length === 0;
  }, []);

  /** Clear a single field error as soon as the user starts typing. */
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

  const passwordToggle = (
    <button
      type="button"
      onClick={() => setShowPassword((prev) => !prev)}
      className="text-text-muted transition-colors hover:text-text-primary"
      aria-label={showPassword ? "Hide password" : "Show password"}
      tabIndex={-1}
    >
      {showPassword ? (
        /* Eye-off icon */
        <svg
          className="h-4.5 w-4.5"
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
        /* Eye icon */
        <svg
          className="h-4.5 w-4.5"
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
  );

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {/* ── API-level error ── */}
      {apiError && (
        <AlertBanner
          message={apiError.message}
          onDismiss={resetApiError}
        />
      )}

      {/* ── Fields ── */}
      <InputField
        ref={usernameRef}
        label="Username"
        name="username"
        type="text"
        autoComplete="username"
        placeholder="Enter your username"
        error={errors.username}
        onChange={() => clearFieldError("username")}
        disabled={isPending}
      />

      <InputField
        ref={passwordRef}
        label="Password"
        name="password"
        type={showPassword ? "text" : "password"}
        autoComplete="current-password"
        placeholder="Enter your password"
        error={errors.password}
        onChange={() => clearFieldError("password")}
        disabled={isPending}
        endAdornment={passwordToggle}
      />

      {/* ── Submit ── */}
      <Button type="submit" isLoading={isPending}>
        {isPending ? "Signing in…" : "Sign In"}
      </Button>
    </form>
  );
}
