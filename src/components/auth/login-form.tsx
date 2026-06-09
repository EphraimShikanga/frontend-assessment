"use client";

import { type FormEvent, useCallback, useRef, useState } from "react";
import { useLogin } from "@/hooks/use-login";
import InputField from "@/components/ui/input-field";
import AlertBanner from "@/components/ui/alert-banner";
import type { LoginFormErrors } from "@/types/auth";

type Step = "username" | "password";

/**
 * Multi-step login form matching the Co-op Bank design.
 *
 * Step 1 — Enter username, click Continue.
 * Step 2 — Enter password (with visibility toggle), click Sign in.
 *
 * The username is preserved when navigating between steps so the user
 * doesn't lose their input if they go back.
 */
export default function LoginForm() {
  const { login, isPending, error: apiError, reset: resetApiError } = useLogin();

  const [step, setStep] = useState<Step>("username");
  const [username, setUsername] = useState("");
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [showPassword, setShowPassword] = useState(false);

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleContinue = useCallback(() => {
    const value = usernameRef.current?.value.trim() ?? "";
    if (!value) {
      setErrors({ username: "Username is required" });
      usernameRef.current?.focus();
      return;
    }
    setUsername(value);
    setErrors({});
    setPasswordValue("");
    resetApiError();
    setStep("password");
    setTimeout(() => passwordRef.current?.focus(), 50);
  }, [resetApiError]);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      resetApiError();

      if (step === "username") {
        handleContinue();
        return;
      }

      const password = passwordRef.current?.value ?? "";
      if (!password) {
        setErrors({ password: "Password is required" });
        passwordRef.current?.focus();
        return;
      }

      setErrors({});
      login({ username, password });
    },
    [step, username, login, handleContinue, resetApiError],
  );

  const handleBack = useCallback(() => {
    setStep("username");
    setErrors({});
    resetApiError();
    setTimeout(() => usernameRef.current?.focus(), 50);
  }, [resetApiError]);

  const clearFieldError = useCallback((field: keyof LoginFormErrors) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const { [field]: _, ...rest } = prev;
      return rest;
    });
  }, []);

  const passwordToggle = (
    <button
      type="button"
      onClick={() => setShowPassword((prev) => !prev)}
      className="text-gray transition-colors hover:text-black"
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
  );

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {apiError && (
        <AlertBanner
          message={apiError.message}
          onDismiss={resetApiError}
        />
      )}

      {step === "username" ? (
        <>
          {/* ── Step 1: Username ── */}
          <p className="text-sm text-gray">
            Enter your username to continue
          </p>

          <InputField
            ref={usernameRef}
            label="Username"
            name="username"
            type="text"
            autoComplete="username"
            placeholder="POS53110"
            value={usernameValue}
            autoFocus
            variant="underline"
            error={errors.username}
            onChange={(e) => {
              setUsernameValue(e.target.value);
              clearFieldError("username");
            }}
          />

          <button
            type="submit"
            disabled={!usernameValue.trim()}
            className="
              mt-2 flex h-12 w-full items-center justify-center gap-3
              rounded-lg bg-gold text-base font-semibold text-white
              transition-all duration-200
              hover:brightness-110 active:scale-[0.98]
              focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold
              disabled:cursor-not-allowed disabled:opacity-60
            "
          >
            Continue
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
          </button>
        </>
      ) : (
        <>
          {/* ── Step 2: Password ── */}
          <p className="text-sm text-gray">
            Enter your password to continue
          </p>

          <InputField
            ref={passwordRef}
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="xxxxxxxx"
            value={passwordValue}
            disabled={isPending}
            variant="underline"
            error={errors.password}
            endAdornment={passwordToggle}
            onChange={(e) => {
              setPasswordValue(e.target.value);
              clearFieldError("password");
            }}
          />

          <div className="mt-2 flex flex-col gap-3">
            <button
              type="submit"
              disabled={isPending || !passwordValue}
              className="
                flex h-12 w-full items-center justify-center gap-3
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

            <button
              type="button"
              onClick={handleBack}
              disabled={isPending}
              className="text-sm font-medium text-gray transition-colors hover:text-black"
            >
              ← Back
            </button>
          </div>
        </>
      )}
    </form>
  );
}
