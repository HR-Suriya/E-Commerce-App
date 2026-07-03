/**
 * Header.tsx - Navigation and Search Bar Component
 *
 * Purpose: Main navigation header with search, filtering, and cart access
 *
 * Features:
 * - Search input with clear button (affordance for users)
 * - Category filter dropdown with loading/error states
 * - Theme toggle (light/dark mode)
 * - Cart button with item count badge
 * - Responsive design with mobile-friendly layout
 * - Accessibility: Focus states, aria labels, keyboard navigation
 *
 * Props:
 * - cartCount: Number of items in cart
 * - search: Current search term
 * - selectedCategory: Currently selected category
 * - categories: Array of available categories
 * - categoriesLoading/Error: API state for categories
 * - onSearchChange: Callback when search input changes
 * - onCategoryChange: Callback when category is selected
 * - onToggleCart: Callback to open cart drawer
 * - onToggleTheme: Callback to switch theme
 * - onResetFilters: Callback to clear search and category
 */

/**
 * Header.tsx - Site header and top navigation
 *
 * Purpose: Provides search, category filtering, theme toggle, and cart access.
 * It also surfaces loading/error state for category data.
 */
import { useMemo } from "react";
import { Link } from "react-router-dom";

interface HeaderProps {
  cartCount: number;
  search: string;
  selectedCategory: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onToggleCart: () => void;
  onToggleTheme: () => void;
  onResetFilters: () => void;
  theme: "light" | "dark";
  cartButtonRef?: React.RefObject<HTMLButtonElement>;
  categories?: string[];
  categoriesLoading?: boolean;
  categoriesError?: string | null;
}

export default function Header({
  cartCount,
  search,
  selectedCategory,
  onSearchChange,
  onCategoryChange,
  onToggleCart,
  onToggleTheme,
  onResetFilters,
  theme,
  cartButtonRef,
  categories = [],
  categoriesLoading = false,
  categoriesError = null,
}: HeaderProps) {
  const cartLabel = useMemo(
    () =>
      cartCount === 0
        ? "Empty cart"
        : `${cartCount} item${cartCount > 1 ? "s" : ""}`,
    [cartCount],
  );

  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/90">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
            >
              MarketHub
            </Link>
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Responsive shop UI with cart, filters, and product pages.
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 shadow-sm transition hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:focus:ring-slate-500"
            >
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </button>
            <button
              type="button"
              onClick={onToggleCart}
              ref={cartButtonRef}
              aria-label={`Open shopping cart, ${cartLabel}`}
              className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-900 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 dark:focus:ring-slate-500"
            >
              Cart · {cartLabel}
            </button>
          </div>
        </div>
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative flex-1">
            <span className="sr-only">Search products</span>
            <input
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-slate-500 dark:focus:ring-slate-700"
              placeholder="Search products, brands, categories..."
            />
            {search && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 transition hover:bg-slate-200 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200 dark:focus:ring-slate-500"
              >
                ✕
              </button>
            )}
          </label>
          <label htmlFor="category-select" className="sr-only">
            Select category
          </label>
          <div className="flex-1">
            <select
              id="category-select"
              value={selectedCategory}
              onChange={(event) => onCategoryChange(event.target.value)}
              disabled={categoriesLoading}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition hover:border-slate-300 focus:border-slate-400 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:disabled:bg-slate-800 dark:focus:border-slate-500 dark:focus:ring-slate-700"
            >
              <option value="all">
                {categoriesLoading ? "Loading categories..." : "All categories"}
              </option>
              {!categoriesLoading &&
                categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
            </select>
            {categoriesLoading && (
              <p className="mt-2 text-xs text-slate-500">
                Fetching categories…
              </p>
            )}
            {categoriesError && (
              <p className="mt-2 text-xs text-rose-500">{categoriesError}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onResetFilters}
            aria-label="Reset search and category filters"
            className="rounded-2xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200 dark:focus:ring-slate-500"
          >
            Reset filters
          </button>
        </div>
      </div>
    </header>
  );
}
