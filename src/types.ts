/**
 * types.ts
 *
 * Shared TypeScript interfaces for the app's main data models, keeping the UI,
 * hooks, and API layer consistent when working with products and cart items.
 */

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

// CartItem represents a product added to the shopping cart with quantity
export interface CartItem extends Product {
  quantity: number;
}
