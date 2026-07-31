/**
 * Home.tsx
 *
 * Main product listing page. It loads the catalog, applies the current search/category
 * filters, and shows the matching products in a responsive grid.
 */

import { useEffect, useMemo, useState } from "react";
import { fetchProducts } from "../api";
import type { Product } from "../types";
import ProductCard from "../components/ProductCard";
import { formatCategoryName } from "../utils/formatters";

interface HomeProps {
  search: string;
  selectedCategory: string;
  onAddToCart: (product: Product) => void;
  onOpenProduct: (product: Product) => void;
  onCategorySelect: (category: string) => void;
  categories?: string[];
  categoriesLoading?: boolean;
  categoriesError?: string | null;
}

export default function Home({
  search,
  selectedCategory,
  onAddToCart,
  onOpenProduct,
  onCategorySelect,
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

  const featuredCategories = useMemo(
    () => categories.slice(0, 4),
    [categories],
  );

  return (
    <section className="space-y-8">
      <div className="rounded-[32px] bg-gradient-to-r from-slate-900 via-slate-700 to-slate-950 p-8 text-white shadow-2xl shadow-slate-900/25 md:p-12">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-300">
            Modern storefront experience
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Discover curated essentials with a shopping experience made to feel
            effortless.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">
            Explore standout products, refine your browse by category, and move
            from discovery to checkout in minutes.
          </p>
          {featuredCategories.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {featuredCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => onCategorySelect(category)}
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
                >
                  {formatCategoryName(category)}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
            Products
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">
            Browse the collection
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
