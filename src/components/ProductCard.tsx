/**
 * ProductCard.tsx - Individual Product Grid Card Component
 *
 * Purpose: Displays a single product in a grid layout
 *
 * Features:
 * - Shows product image, title, price, and rating
 * - Add to cart button with loading state
 * - Click handler to view full product details
 * - Image lazy loading optimization
 * - Responsive design
 * - Accessibility: Focus states and aria labels
 *
 * Props:
 * - product: Product object with all details
 * - onAddToCart: Callback when add to cart is clicked
 * - onOpen: Callback to navigate to product details
 */

import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onOpen: (product: Product) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
  onOpen,
}: ProductCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-card transition hover:-translate-y-1 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900">
      <button
        type="button"
        onClick={() => onOpen(product)}
        className="flex h-full flex-col items-start gap-4 p-5 text-left"
      >
        <div className="flex h-64 items-center justify-center overflow-hidden rounded-3xl bg-slate-100 p-5 transition duration-300 group-hover:bg-slate-200 dark:bg-slate-950 dark:group-hover:bg-slate-900">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="max-h-full h-auto min-w-full object-contain"
          />
        </div>
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {product.category}
          </div>
          <h3 className="text-lg font-semibold leading-snug text-slate-900 dark:text-slate-100">
            {product.title}
          </h3>
          <p className="line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
            {product.description}
          </p>
        </div>
      </button>
      <div className="flex items-center justify-between gap-4 border-t border-slate-200 px-5 py-4 dark:border-slate-800">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Rating {product.rating.rate.toFixed(1)} ⭐
          </p>
          <p className="text-xl font-semibold text-slate-950 dark:text-slate-100">
            ${product.price.toFixed(2)}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onAddToCart(product)}
          className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200 dark:focus:ring-slate-500"
        >
          Add
        </button>
      </div>
    </article>
  );
}
