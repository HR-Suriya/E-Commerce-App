/**
 * Home.tsx - Product Listing Page
 *
 * Purpose: Main shopping page displaying all products with search and filtering
 *
 * Features:
 * - Fetches and displays all products from API
 * - Filters products by search term (title, description, category)
 * - Filters products by selected category
 * - Shows loading skeleton loaders while fetching
 * - Displays "no results" message when filters match nothing
 * - Handles API errors gracefully
 * - Responsive grid layout with product cards
 *
 * Props:
 * - search: Current search term from App state
 * - selectedCategory: Currently selected category
 * - categories: Array of available categories
 * - categoriesLoading/Error: Category fetch state
 * - onAddToCart: Callback to add product to cart
 * - onOpenProduct: Callback to navigate to product details
 */

import { useEffect, useMemo, useState } from "react";
import { fetchProducts } from "../api";
import type { Product } from "../types";
import ProductCard from "../components/ProductCard";

interface HomeProps {
  search: string;
  selectedCategory: string;
  onAddToCart: (product: Product) => void;
  onOpenProduct: (product: Product) => void;
  categories?: string[];
  categoriesLoading?: boolean;
  categoriesError?: string | null;
}

export default function Home({
  search,
  selectedCategory,
  onAddToCart,
  onOpenProduct,
  categories = [],
  categoriesLoading = false,
  categoriesError = null,
}: HomeProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setIsLoading(true);
        const items = await fetchProducts();
        setProducts(items);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Unable to load products",
        );
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, []);

  const visibleProducts = useMemo(
    () =>
      products.filter((product) => {
        const lowerSearch = search.toLowerCase();
        const matchesSearch =
          product.title.toLowerCase().includes(lowerSearch) ||
          product.description.toLowerCase().includes(lowerSearch);
        const matchesCategory =
          selectedCategory === "all" || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
      }),
    [products, search, selectedCategory],
  );

  return (
    <section className="space-y-8">
      <div className="rounded-[32px] bg-gradient-to-r from-slate-900 via-slate-700 to-slate-950 p-8 text-white shadow-2xl shadow-slate-900/25 md:p-12">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-300">
            React Tailwind portfolio app
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Full responsive e-commerce frontend with real API integration.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">
            Browse best sellers, filter by category, view product details, and
            manage a persistent cart in a polished interface.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
            Products
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">
            Shop all categories
          </h2>
        </div>
        <div className="rounded-3xl bg-slate-100 p-4 text-sm text-slate-700 shadow-sm dark:bg-slate-900 dark:text-slate-300">
          {visibleProducts.length} products matched
          <span className="ml-2 text-slate-500 dark:text-slate-400">
            ({(categories || []).length} categories available)
          </span>
        </div>
      </div>

      {error && (
        <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-rose-700 dark:border-rose-800 dark:bg-rose-950/20 dark:text-rose-100">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-96 animate-pulse rounded-[28px] bg-slate-200 dark:bg-slate-800"
            />
          ))}
        </div>
      ) : visibleProducts.length === 0 ? (
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 text-center shadow-card dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-2xl font-semibold text-slate-950 dark:text-white">
            No results found
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
            Try adjusting your search or category filters to discover products.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onOpen={onOpenProduct}
            />
          ))}
        </div>
      )}
    </section>
  );
}
