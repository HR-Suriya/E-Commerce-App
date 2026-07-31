/**
 * api.ts
 *
 * Centralizes requests to the Fake Store API so the UI layer can stay focused on
 * rendering and user interaction rather than network details.
 */

import type { Product } from "./types";

// Base URL for the Fake Store API (external mock API)
const BASE_URL = "https://fakestoreapi.com";

/**
 * Fetch all products from the API
 * @returns Promise<Product[]> - Array of all available products
 * @throws Error if API call fails
 */
export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) {
    throw new Error("Unable to load products");
  }
  return res.json();
}

/**
 * Fetch a single product by ID
 * @param id - Product ID (string or number)
 * @returns Promise<Product> - Single product object
 * @throws Error if product not found or API fails
 */
export async function fetchProductById(id: string | number): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) {
    throw new Error("Product not found");
  }
  return res.json();
}

/**
 * Fetch all available product categories
 * @returns Promise<string[]> - Array of category names
 * @throws Error if API call fails
 */
export async function fetchCategories(): Promise<string[]> {
  const res = await fetch(`${BASE_URL}/products/categories`);
  if (!res.ok) {
    throw new Error("Unable to load categories");
  }
  return res.json();
}
