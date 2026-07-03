/**
 * types.ts - TypeScript Type Definitions
 *
 * Defines all core types used throughout the application:
 * - Product: Represents a product from the API (id, title, price, etc.)
 * - CartItem: Extends Product with quantity property for shopping cart
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
