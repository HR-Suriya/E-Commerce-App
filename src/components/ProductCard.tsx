/**
 * ProductCard.tsx
 *
 * Displays a single product in a compact card with image, title, price, rating,
 * and quick actions for opening details or adding it to the cart.
 */

import type { Product } from "../types";
import {
  formatCategoryName,
  getStarFillPercentages,
} from "../utils/formatters";

function StarIcon({ fillPercent, id }: { fillPercent: number; id: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0 text-amber-500"
      aria-hidden="true"
    >
      <defs>
        <clipPath id={id}>
          <rect x="0" y="0" width={24 * fillPercent} height="24" />
        </clipPath>
      </defs>
      <path
        d="M12 2.75l2.78 5.63 6.2.9-4.49 4.38 1.06 6.18L12 17.6 6.45 19.84l1.06-6.18L3.02 9.28l6.2-.9L12 2.75z"
        fill={fillPercent > 0 ? "currentColor" : "none"}
        clipPath={`url(#${id})`}
      />
      <path
        d="M12 2.75l2.78 5.63 6.2.9-4.49 4.38 1.06 6.18L12 17.6 6.45 19.84l1.06-6.18L3.02 9.28l6.2-.9L12 2.75z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

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
  const starFills = getStarFillPercentages(product.rating.rate);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-card transition hover:-translate-y-1 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900">
      <button
        type="button"
        onClick={() => onOpen(product)}
        className="flex h-full flex-col items-start gap-4 p-5 text-left"
      >
        <div className="flex h-64 w-full items-center justify-center overflow-hidden rounded-3xl bg-slate-100 p-5 transition duration-300 group-hover:bg-slate-200 dark:bg-slate-950 dark:group-hover:bg-slate-900">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="mx-auto h-full w-full max-w-[12rem] object-contain"
          />
        </div>
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {formatCategoryName(product.category)}
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
          <div
            className="mb-2 flex items-center gap-1"
            aria-label={`Rated ${product.rating.rate.toFixed(1)} out of 5`}
          >
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {product.rating.rate.toFixed(1)} / 5
            </p>
            <br />
            {starFills.map((fill, index) => (
              <StarIcon
                key={`${product.id}-star-${index}`}
                fillPercent={fill}
                id={`${product.id}-star-${index}`}
              />
            ))}
          </div>
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
