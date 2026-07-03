import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useCart from "./useCart";
import type { Product } from "../types";

const mockProduct: Product = {
  id: 1,
  title: "Test Product",
  price: 29.99,
  description: "A test product",
  category: "electronics",
  image: "https://example.com/image.jpg",
  rating: { rate: 4.5, count: 10 },
};

describe("useCart", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("should initialize with empty cart", () => {
    const { result } = renderHook(() => useCart());
    expect(result.current.cart).toEqual([]);
    expect(result.current.cartCount).toBe(0);
  });

  it("should add a product to cart", () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(mockProduct);
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0]).toMatchObject({
      id: 1,
      quantity: 1,
    });
    expect(result.current.cartCount).toBe(1);
  });

  it("should increment quantity when adding same product twice", () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.addToCart(mockProduct);
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].quantity).toBe(2);
    expect(result.current.cartCount).toBe(2);
  });

  it("should update quantity", () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(mockProduct);
    });

    act(() => {
      result.current.updateQuantity(1, 5);
    });

    expect(result.current.cart[0].quantity).toBe(5);
    expect(result.current.cartCount).toBe(5);
  });

  it("should remove product when quantity is set to 0", () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(mockProduct);
    });

    act(() => {
      result.current.updateQuantity(1, 0);
    });

    expect(result.current.cart).toHaveLength(0);
    expect(result.current.cartCount).toBe(0);
  });

  it("should remove product from cart", () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(mockProduct);
    });

    act(() => {
      result.current.removeFromCart(1);
    });

    expect(result.current.cart).toHaveLength(0);
    expect(result.current.cartCount).toBe(0);
  });

  it("should persist cart to localStorage", () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart(mockProduct);
    });

    const stored = localStorage.getItem("ecommerce-cart-items");
    expect(stored).toBeTruthy();
    expect(JSON.parse(stored!)).toHaveLength(1);
  });

  it("should load cart from localStorage", () => {
    const cartData = [{ ...mockProduct, quantity: 2 }];
    localStorage.setItem("ecommerce-cart-items", JSON.stringify(cartData));

    const { result } = renderHook(() => useCart());

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cartCount).toBe(2);
  });
});
