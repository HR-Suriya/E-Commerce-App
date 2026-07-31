/**
 * useTheme.ts
 *
 * Manages the app's light and dark mode state. It reads any saved preference,
 * updates the document theme class, and exposes a toggle for the interface.
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
