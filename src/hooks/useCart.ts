/**
 * useCart.ts - Shopping Cart State Management Hook
 *
 * Purpose: Custom React hook that manages all cart-related state and operations
 * - Maintains list of items in cart (CartItem[])
 * - Provides methods to add, update, and remove items
 * - Persists cart data to localStorage automatically
 * - Calculates cart item count
 *
 * Features:
 * - Automatic localStorage sync on cart changes
 * - Loads persisted cart on mount
 * - Prevents duplicate items (increments quantity instead)
 * - Removes items with quantity 0
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import type { CartItem, Product } from "../types";

const CART_STORAGE_KEY = "ecommerce-cart-items";

export default function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const stored =
        typeof window !== "undefined" &&
        window.localStorage.getItem(CART_STORAGE_KEY);
      if (stored) setCart(JSON.parse(stored));
    } catch (e) {
      // ignore parse errors
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      // ignore
    }
  }, [cart]);

  const addToCart = useCallback((product: Product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    setCart((current) =>
      current
        .map((item) => (item.id === productId ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0),
    );
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCart((current) => current.filter((item) => item.id !== productId));
  }, []);

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart],
  );

  return {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    cartCount,
  } as const;
}
