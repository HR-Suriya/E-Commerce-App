/**
 * useLocalStorage.ts - LocalStorage State Synchronization Hook
 *
 * Purpose: Generic React hook for syncing state with browser localStorage
 * - Reads initial value from localStorage
 * - Automatically saves state changes to localStorage
 * - Provides fallback/default value if localStorage is empty
 *
 * Features:
 * - Type-safe with TypeScript generics
 * - Handles JSON serialization/deserialization
 * - Works with any data type (strings, objects, arrays, etc.)
 */

import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    const stored = window.localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : initialValue;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue] as const;
}
