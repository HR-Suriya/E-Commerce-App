/**
 * ProductDetails.tsx
 *
 * Shows the full product detail experience, including the product image, pricing,
 * description, rating summary, and related actions such as adding to cart or browsing
 * products in the same category.
 */
import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { fetchProductById } from "../api";
import type { Product } from "../types";
import { formatCategoryName } from "../utils/formatters";

interface ProductDetailsProps {
  onAddToCart: (product: Product) => void;
  onBack: () => void;
  onCategorySelect: (category: string) => void;
}

export default function ProductDetails({
  onAddToCart,
  onBack,
  onCategorySelect,
}: ProductDetailsProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState<Product | null>(
    location.state as Product | null,
  );
  const [isLoading, setIsLoading] = useState(!product);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (product || !id) return;

    async function load() {
      try {
        setIsLoading(true);
        const response = await fetchProductById(id as string);
        setProduct(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to load product");
      } finally {
        setIsLoading(false);
      }
    }

    load();
  }, [id, product]);

  if (isLoading) {
    return (
      <div className="rounded-[32px] bg-white p-8 shadow-card dark:bg-slate-900">
        <div className="h-96 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="rounded-[32px] bg-rose-50 p-8 text-rose-700 shadow-card dark:bg-rose-950/20 dark:text-rose-100">
        <p>{error ?? "Product not found"}</p>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mt-4 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200"
        >
          Back to shop
        </button>
      </div>
    );
  }

  return (
    <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <div className="rounded-[32px] bg-white p-8 shadow-card dark:bg-slate-900">
        <button
          type="button"
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-800 dark:focus:ring-slate-500"
        >
          ← Back to shop
        </button>
        <div className="grid gap-6 lg:grid-cols-[20rem_minmax(0,1fr)] lg:items-start">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="mx-auto h-80 w-80 rounded-[32px] bg-slate-100 p-8 object-contain dark:bg-slate-950"
          />
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 dark:bg-slate-800 dark:text-slate-300">
              {formatCategoryName(product.category)}
            </div>
            <h1 className="text-4xl break-words font-semibold text-slate-950 dark:text-white">
              {product.title}
            </h1>
            <p className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              ${product.price.toFixed(2)}
            </p>
            <div className="space-y-4 text-slate-600 dark:text-slate-300">
              <p>{product.description}</p>
              <p className="text-sm">
                Rating:{" "}
                <span className="font-semibold">
                  {product.rating.rate.toFixed(1)} / 5
                </span>{" "}
                ({product.rating.count} reviews)
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => onAddToCart(product)}
                className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200 dark:focus:ring-slate-500"
              >
                Add to cart
              </button>
              <button
                type="button"
                onClick={() => onCategorySelect(product.category)}
                className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:border-slate-700 dark:text-slate-200 dark:hover:border-slate-500 dark:focus:ring-slate-500"
              >
                Browse {formatCategoryName(product.category)}
              </button>
            </div>
          </div>
        </div>
      </div>

      <aside className="rounded-[32px] bg-slate-100 p-6 shadow-card dark:bg-slate-900 lg:max-w-[22rem]">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
          Product details
        </p>
        <div className="mt-8 space-y-5 text-slate-700 dark:text-slate-300">
          <button
            type="button"
            onClick={() => onCategorySelect(product.category)}
            className="w-full rounded-3xl bg-white p-5 text-left shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:bg-slate-950 dark:hover:bg-slate-800 dark:focus:ring-slate-500"
          >
            <p className="font-semibold">Category</p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              {formatCategoryName(product.category)}
            </p>
          </button>
          <div className="rounded-3xl bg-white p-5 shadow-sm dark:bg-slate-950">
            <p className="font-semibold">Stock estimate</p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              {product.rating.count > 20 ? "Plenty in stock" : "Limited stock"}
            </p>
          </div>
          <div className="rounded-3xl bg-white p-5 shadow-sm dark:bg-slate-950">
            <p className="font-semibold">Shipping</p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Free shipping on orders over $75
            </p>
          </div>
        </div>
      </aside>
    </section>
  );
}
