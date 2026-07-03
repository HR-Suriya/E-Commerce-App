/**
 * App.tsx - Main Application Component
 *
 * Purpose:
 * - Serves as the root component and main app shell
 * - Manages global state: cart, categories, search, theme
 * - Handles routing between Home page and Product Details page
 * - Provides cart drawer modal and header navigation
 *
 * Responsibilities:
 * - Fetch categories from API and handle loading/error states
 * - Coordinate cart operations across all pages
 * - Manage theme switching (light/dark mode)
 * - Route between different pages and pass necessary props
 * - Focus management for accessibility (cart drawer)
 */

/**
 * App.tsx - Main Application Component
 *
 * This component is the root of the app and coordinates app-wide state.
 * It manages:
 * - Cart drawer visibility and cart operations
 * - Theme switching (light/dark)
 * - Category fetching and filter state
 * - Routing between Home and Product Details pages
 */
import { useEffect, useRef, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Header from "./components/Header";
import CartDrawer from "./components/CartDrawer";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import type { Product } from "./types";
import useCart from "./hooks/useCart";
import { fetchCategories } from "./api";
import useTheme from "./hooks/useTheme";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartButtonRef = useRef<HTMLButtonElement | null>(null);

  const { cart, addToCart, updateQuantity, removeFromCart, cartCount } =
    useCart();
  const [categories, setCategories] = useState<string[]>([]);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { theme, toggleTheme } = useTheme();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let mounted = true;

    async function loadCategories() {
      try {
        setCategoriesLoading(true);
        setCategoriesError(null);
        const list = await fetchCategories();
        if (mounted) {
          setCategories(list);
        }
      } catch (error) {
        if (mounted) {
          setCategoriesError(
            error instanceof Error
              ? error.message
              : "Unable to load categories",
          );
        }
      } finally {
        if (mounted) {
          setCategoriesLoading(false);
        }
      }
    }

    loadCategories();

    return () => {
      mounted = false;
    };
  }, []);

  const handleAddToCart = (product: Product) => addToCart(product);
  const handleUpdateQuantity = (productId: number, quantity: number) =>
    updateQuantity(productId, quantity);
  const handleRemove = (productId: number) => removeFromCart(productId);

  const openProduct = (product: Product) => {
    navigate(`/product/${product.id}`, { state: product });
  };

  const resetFilters = () => {
    setSearch("");
    setSelectedCategory("all");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <Header
        cartCount={cartCount}
        search={search}
        selectedCategory={selectedCategory}
        onSearchChange={setSearch}
        onCategoryChange={setSelectedCategory}
        onToggleCart={() => setIsCartOpen(true)}
        cartButtonRef={cartButtonRef}
        onToggleTheme={toggleTheme}
        theme={theme}
        categories={categories}
        categoriesLoading={categoriesLoading}
        categoriesError={categoriesError}
        onResetFilters={resetFilters}
      />
      <main className="mx-auto max-w-7xl px-4 pb-12 pt-6 sm:px-6 lg:px-8">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                search={search}
                selectedCategory={selectedCategory}
                onAddToCart={handleAddToCart}
                onOpenProduct={openProduct}
                categories={categories}
                categoriesLoading={categoriesLoading}
                categoriesError={categoriesError}
              />
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProductDetails
                onAddToCart={handleAddToCart}
                onBack={() => navigate("/")}
              />
            }
          />
        </Routes>
      </main>
      <CartDrawer
        open={isCartOpen}
        cartItems={cart}
        onClose={() => setIsCartOpen(false)}
        openerRef={cartButtonRef}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemove}
      />
      {location.pathname !== "/" && (
        <button
          type="button"
          onClick={() => navigate("/")}
          className="fixed bottom-6 right-6 z-40 rounded-full bg-slate-900 px-4 py-3 text-sm text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200 dark:focus:ring-slate-500"
        >
          Back to shop
        </button>
      )}
    </div>
  );
}

export default App;
