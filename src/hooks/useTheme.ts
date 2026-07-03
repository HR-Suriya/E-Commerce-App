/**
 * useTheme.ts - Dark Mode Theme Management Hook
 *
 * Purpose: Custom React hook for managing light/dark theme
 * - Toggles between light and dark themes
 * - Persists theme preference to localStorage
 * - Updates document.documentElement class for dark mode CSS
 * - Initializes theme from localStorage or defaults to light
 *
 * Features:
 * - Automatic DOM class updates when theme changes
 * - LocalStorage persistence across sessions
 * - CSS-based dark mode (Tailwind dark: selector)
 */

import { useEffect, useState, useCallback } from "react";

const THEME_STORAGE_KEY = "ecommerce-theme-mode";

export default function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    return (
      (localStorage.getItem(THEME_STORAGE_KEY) as "light" | "dark") ?? "light"
    );
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (e) {
      // ignore storage errors
    }
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((mode) => (mode === "dark" ? "light" : "dark"));
  }, []);

  return { theme, setTheme, toggleTheme } as const;
}
