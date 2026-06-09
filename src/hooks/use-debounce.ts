"use client";

import { useEffect, useState } from "react";

/**
 * Debounces a value by the specified delay.
 *
 * Returns the debounced value that only updates after the caller
 * stops changing the input for `delay` ms. Used to avoid firing a
 * network request on every keystroke in the search field.
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
