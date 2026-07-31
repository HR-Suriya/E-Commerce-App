/**
 * CartDrawer.tsx
 *
 * Displays the current basket in a slide-out panel with quantity controls,
 * removal actions, pricing details, and keyboard-friendly behavior.
 */
import { useEffect, useRef } from "react";
import type { CartItem } from "../types";

interface CartDrawerProps {
  open: boolean;
  cartItems: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
  openerRef?: React.RefObject<HTMLElement>;
}

export default function CartDrawer({
  open,
  cartItems,
  onClose,
  onUpdateQuantity,
  onRemove,
  openerRef,
}: CartDrawerProps) {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const drawerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const previousActive = document.activeElement as HTMLElement | null;
    const drawer = drawerRef.current;
    const focusableSelector =
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
    const focusable = drawer
      ? Array.from(
          drawer.querySelectorAll<HTMLElement>(focusableSelector),
        ).filter((el) => !el.hasAttribute("disabled"))
      : [];

    // focus the first focusable element in the drawer
    focusable[0]?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "Tab") {
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement as HTMLElement | null;

        if (e.shiftKey) {
          if (active === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (active === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      // restore focus to opener or previously focused element
      if (openerRef && openerRef.current) openerRef.current.focus();
      else previousActive?.focus();
    };
  }, [open, onClose, openerRef]);

  return (
    <div
      className={`fixed inset-0 z-50 transform transition duration-300 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
      aria-hidden={!open}
    >
      <button
        type="button"
        aria-label="Close cart drawer"
        tabIndex={-1}
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <section
        ref={drawerRef as any}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        className="absolute right-0 top-0 h-full w-full max-w-md overflow-hidden bg-white p-6 shadow-2xl dark:bg-slate-950"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
              Shopping cart
            </p>
            <h2
              id="cart-drawer-title"
              className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white"
            >
              Your bag
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 px-3 py-2 text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900 dark:focus:ring-slate-500"
          >
            Close
          </button>
        </div>

        <div className="mt-6 flex max-h-[calc(100vh-280px)] flex-col gap-4 overflow-y-auto pr-1">
          {cartItems.length === 0 ? (
            <p className="rounded-3xl border border-dashed border-slate-200 p-8 text-center text-slate-500 dark:border-slate-800 dark:text-slate-400">
              Your cart is empty. Add products from the shop.
            </p>
          ) : (
            cartItems.map((item) => (
              <article
                key={item.id}
                className="rounded-3xl border border-slate-200 p-4 dark:border-slate-800"
              >
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-20 w-20 rounded-3xl object-contain bg-slate-100 p-2 dark:bg-slate-900"
                  />
                  <div className="flex-1">
                    <h3 className="break-words font-semibold text-slate-900 dark:text-slate-100">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      ${item.price.toFixed(2)}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() =>
                          onUpdateQuantity(item.id, item.quantity - 1)
                        }
                        className="rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900 dark:focus:ring-slate-500"
                      >
                        -
                      </button>
                      <span className="text-sm font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() =>
                          onUpdateQuantity(item.id, item.quantity + 1)
                        }
                        className="rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900 dark:focus:ring-slate-500"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Subtotal: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    type="button"
                    onClick={() => onRemove(item.id)}
                    className="text-sm font-semibold text-rose-600 transition hover:text-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-400 dark:text-rose-400 dark:hover:text-rose-300 dark:focus:ring-rose-500"
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))
          )}
        </div>

        <div className="mt-6 rounded-3xl bg-slate-50 p-5 dark:bg-slate-900">
          <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400">
            <span>Total</span>
            <span className="font-semibold text-slate-950 dark:text-slate-100">
              ${total.toFixed(2)}
            </span>
          </div>
          <button
            type="button"
            disabled={cartItems.length === 0}
            className="mt-4 w-full rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200 dark:focus:ring-slate-500"
          >
            Checkout
          </button>
        </div>
      </section>
    </div>
  );
}
