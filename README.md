# 🛍️ Full Responsive E-Commerce App

A modern, fully-featured e-commerce storefront built with **React**, **TypeScript**, **Tailwind CSS**, and **Vite**. This project showcases a responsive shopping experience with advanced features like real-time search, category filtering, cart management, dark mode, and comprehensive accessibility support.

**Live Preview:** After building, the app is ready for deployment and can be previewed locally.

---

## ✨ Features

### 🛒 Shopping Features

- **Product Listing**: Browse all products in a responsive grid layout with product cards
- **Search**: Real-time search functionality across product titles, descriptions, and categories
- **Category Filtering**: Filter products by category with a dropdown selector
- **Product Details**: View detailed information for each product including description, price, rating, and reviews
- **Shopping Cart**: Add items to cart, adjust quantities, remove items
- **Cart Persistence**: Shopping cart contents are automatically saved to localStorage across browser sessions
- **Checkout Ready**: Cart total calculation with checkout button

### 🎨 User Interface

- **Responsive Design**: Mobile-first approach works seamlessly on all devices (mobile, tablet, desktop)
- **Dark Mode**: Toggle between light and dark themes with persistent preference storage
- **Smooth Animations**: CSS transitions for better user experience
- **Loading States**: Skeleton loaders during API calls
- **Error Handling**: Graceful error messages for failed requests

### ♿ Accessibility (WCAG Compliant)

- **Focus Management**: Visible focus states on all interactive elements
- **Keyboard Navigation**: Full keyboard support including Escape to close drawer, Tab cycling
- **Focus Trap**: Modal focus management keeps keyboard users in the cart drawer
- **ARIA Labels**: Semantic HTML and ARIA attributes for screen readers
- **Color Contrast**: High contrast ratios for readability
- **Lazy Loading**: Images load on demand for better performance

### 🧪 Quality Assurance

- **Comprehensive Tests**: 26 unit and component tests covering:
  - Cart operations (add, update quantity, remove)
  - Theme persistence and switching
  - Cart drawer rendering and interactions
- **Type Safety**: Full TypeScript implementation for runtime safety
- **Code Organization**: Well-documented components with clear responsibility separation

---

## 🛠️ Technology Stack

### Frontend

- **React 18.3.1** - UI library with hooks-based architecture
- **TypeScript 5.6.2** - Static type checking
- **React Router DOM 6.18.1** - Client-side routing (SPA)
- **Tailwind CSS 3.4.4** - Utility-first CSS framework

### Build & Development

- **Vite 5.4.1** - Modern bundler for fast development and optimized builds
- **@vitejs/plugin-react 4.3.1** - React support for Vite

### Testing

- **Vitest 0.34.6** - Unit testing framework
- **@testing-library/react 14.0.0** - React component testing utilities
- **@testing-library/jest-dom 6.9.1** - DOM matchers for testing library
- **jsdom 22.1.0** - DOM environment for tests

### Styling

- **PostCSS 8.4.40** - CSS processing
- **Autoprefixer 10.4.19** - Browser prefix support

### API

- **Fake Store API** - Mock e-commerce API for product data

---

## 📋 Project Structure

```
src/
├── App.tsx                 # Root component with routing and global state
├── main.tsx               # Application entry point
├── types.ts               # TypeScript type definitions (Product, CartItem)
├── api.ts                 # API integration layer for Fake Store API
├── index.css              # Global styles
│
├── components/
│   ├── Header.tsx         # Navigation, search, filters, cart button
│   ├── CartDrawer.tsx     # Shopping cart modal with accessibility
│   └── ProductCard.tsx    # Individual product card component
│
├── pages/
│   ├── Home.tsx           # Product listing page with filtering
│   └── ProductDetails.tsx # Single product detail page
│
├── hooks/
│   ├── useCart.ts         # Cart state management and localStorage sync
│   ├── useTheme.ts        # Theme state and dark mode management
│   └── useLocalStorage.ts # Generic localStorage hook
│
├── test/
│   ├── setup.ts           # Test environment configuration
│   ├── useCart.test.ts    # Cart hook tests
│   ├── useTheme.test.ts   # Theme hook tests
│   └── CartDrawer.test.tsx # Cart drawer component tests
│
└── icons/
    ├── CartIcon.tsx       # SVG cart icon
    ├── MoonIcon.tsx       # SVG moon icon
    └── SunIcon.tsx        # SVG sun icon
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ or higher
- **npm** 9+

### Installation

1. **Clone or navigate to the project directory**

```bash
cd "E-Commerce App"
```

2. **Install dependencies**

```bash
npm install
```

### Development

Start the development server with hot module reloading:

```bash
npm run dev
```

Opens at `http://localhost:5173`

### Production Build

Build for production:

```bash
npm run build
```

This runs TypeScript checks and creates optimized files in the `dist/` folder.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

Opens at `http://localhost:4173`

---

## 📜 Available Scripts

| Command            | Description                                 |
| ------------------ | ------------------------------------------- |
| `npm run dev`      | Start development server with HMR           |
| `npm run build`    | Create production build (TypeScript + Vite) |
| `npm run preview`  | Preview production build locally            |
| `npm test`         | Run tests in watch mode                     |
| `npm run test:ui`  | Run tests with interactive UI dashboard     |
| `npm run test:run` | Run tests once (CI mode)                    |
| `npm run lint`     | Check TypeScript types (no emit)            |

---

## 🔄 State Management

### Cart Management (`useCart`)

- Centralized hook managing cart items
- Automatic localStorage synchronization
- Methods: `addToCart()`, `updateQuantity()`, `removeFromCart()`
- Exports: `cart`, `cartCount`, and operation handlers

### Theme Management (`useTheme`)

- Centralized hook for light/dark mode
- Persists user preference to localStorage
- Updates `document.documentElement.classList` for Tailwind dark mode
- Methods: `toggleTheme()`, `setTheme()`
- Exports: `theme`, `toggleTheme`

---

## 🧪 Testing

### Running Tests

**Watch Mode** (rerun on file changes):

```bash
npm test
```

**Interactive UI** (visual dashboard):

```bash
npm run test:ui
```

**Single Run** (CI/CD):

```bash
npm run test:run
```

### Test Coverage

- **useCart.test.ts**: 8 tests covering cart operations and persistence
- **useTheme.test.ts**: 7 tests covering theme toggle and storage
- **CartDrawer.test.tsx**: 11 tests covering rendering, interactions, and accessibility

Total: **26 passing tests**

---

## 🎯 Key Features in Detail

### Search & Filtering

- **Real-time Search**: Filters products by title, description, and category as you type
- **Clear Button**: Visual affordance to clear search with × button
- **Category Filter**: Dropdown with loading state while categories are fetched
- **Reset Filters**: One-click button to clear all filters

### Cart Experience

- **Keyboard Accessible**: Press Escape to close, Tab to navigate
- **Focus Management**: Automatically returns focus to cart button when closed
- **Quantity Controls**: +/- buttons for easy quantity adjustment
- **Empty State**: Clear message when cart is empty
- **Total Calculation**: Real-time cart total display

### Responsive Layout

- **Mobile First**: Optimized for small screens
- **Tablet/Desktop**: Grid adjusts for larger viewports
- **Touch Friendly**: Large tap targets for mobile users
- **Flexible Spacing**: Proper padding and margins across all breakpoints

### Performance

- **Image Lazy Loading**: Images load only when visible
- **Code Splitting**: Route-based code splitting with React Router
- **Optimized Bundle**: Production build is ~185KB (58KB gzipped)

---

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 📝 Code Style & Documentation

Every component and function includes:

- **JSDoc comments** explaining purpose and responsibilities
- **TypeScript types** for full type safety
- **Accessibility attributes** (aria-labels, roles, etc.)
- **Clear naming conventions** for readability

---

## 🔒 Data & Privacy

- **Product Data**: Fetched from [Fake Store API](https://fakestoreapi.com)
- **Cart Storage**: Stored locally in browser localStorage (no server upload)
- **Theme Preference**: Stored locally in browser localStorage
- **No Tracking**: No analytics or external tracking

---

## 🚀 Deployment

The production-ready files are in the `dist/` folder after running `npm run build`.

### Deployment Options

1. **Static Hosting**: Upload `dist/` to Netlify, Vercel, GitHub Pages
2. **Docker**: Create a container with Node to serve the app
3. **CDN**: Deploy to CloudFlare, AWS S3, or similar

### Pre-deployment Checklist

- ✅ Run `npm run lint` to check types
- ✅ Run `npm run test:run` to verify all tests pass
- ✅ Run `npm run build` to create optimized bundle
- ✅ Run `npm run preview` to test production build locally

---

## 🎓 Learning Resources

This project demonstrates:

- **React Hooks**: useState, useEffect, useCallback, useMemo
- **Custom Hooks**: Building reusable hook logic
- **TypeScript**: Type-safe React components
- **Routing**: Client-side navigation with React Router
- **Testing**: Unit and component testing with Vitest
- **Accessibility**: WCAG compliance and keyboard navigation
- **Responsive Design**: Tailwind CSS mobile-first approach
- **Performance**: Lazy loading and code splitting

---

## 📞 Support & Feedback

For questions or issues with the project, please check:

1. Component documentation in the JSDoc comments
2. Test files for usage examples
3. TypeScript types in `src/types.ts`

---

## 📄 License

This project is open source and available for educational and commercial use.

---

**Built for responsive, accessible e-commerce experiences**
