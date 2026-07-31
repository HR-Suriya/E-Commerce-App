# 🛍️ MarketHub Commerce

MarketHub Commerce is a modern and responsive e-commerce web application built with React, TypeScript, Tailwind CSS, and Vite. The project provides a polished shopping experience with product discovery, filtering, cart interactions, theme switching, and a product detail flow that feels clean and user-friendly.

## 📌 Project Overview

This application is designed to simulate a real online shopping experience for users browsing products, exploring categories, and managing a cart. It emphasizes a smooth user interface, strong accessibility support, and maintainable frontend architecture.

## ✨ Features

### Shopping Features

- Product catalog with a responsive grid layout
- Product cards with images, prices, categories, and ratings
- Search functionality for finding products quickly
- Category-based filtering to narrow product results
- Product detail page with description, price, and rating information
- Add-to-cart actions with quantity controls
- Cart drawer with subtotal, total, and removal actions
- Cart persistence so items remain available after refresh

### User Interface

- Modern and polished layout with a professional storefront feel
- Mobile-friendly and responsive design for phones, tablets, and desktops
- Clean hero section and intuitive navigation structure
- Smooth visual feedback for interactions such as adding items to the cart
- Light and dark mode support with a persistent theme preference

### Accessibility

- Keyboard-friendly navigation for core interactions
- Focus management for cart interactions and modal-like UI behavior
- Semantic structure and accessible labels for improved screen-reader support
- Clear visual affordances for buttons, links, and controls

### Quality Assurance

- Unit and component tests for critical app behavior
- Coverage for cart logic, theme handling, and cart drawer interactions
- Type-safe development with TypeScript to reduce runtime issues
- Build validation to ensure the app compiles cleanly for production

## 🛠️ Technologies Used

### Frontend

- React for building the user interface
- TypeScript for type safety and better code maintainability
- React Router for page navigation between home and product detail views

### Build & Development

- Vite for fast development and optimized production builds
- PostCSS and Autoprefixer for CSS processing and browser compatibility

### Testing

- Vitest as the testing framework
- Testing Library for rendering and interaction-based component tests
- jsdom for DOM-based test environments

### Styling

- Tailwind CSS for utility-first styling and responsive UI design

### API

- Fake Store API for realistic product and category data

## 📁 Project Structure

```text
src/
├── App.tsx                  # Main app layout and routing
├── api.ts                   # API calls for products and categories
├── main.tsx                 # Application entry point
├── types.ts                 # Shared TypeScript interfaces
├── components/
│   ├── Header.tsx           # Header, search, filters, and cart trigger
│   ├── ProductCard.tsx      # Product card UI component
│   └── CartDrawer.tsx       # Slide-out cart interface
├── pages/
│   ├── Home.tsx             # Product listing page
│   └── ProductDetails.tsx   # Single product detail page
├── hooks/
│   ├── useCart.ts           # Cart state management
│   ├── useTheme.ts          # Theme toggle state management
│   └── useLocalStorage.ts   # Browser storage helper
├── utils/
│   └── formatters.ts        # Utility functions for formatting labels and ratings
└── test/
    ├── setup.ts
    ├── useCart.test.ts
    ├── useTheme.test.ts
    └── CartDrawer.test.tsx
```

## ▶️ Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher

### Installation

1. Clone or open the project folder.
2. Install dependencies:

```bash
npm install
```

### Run in Development Mode

Start the local development server:

```bash
npm run dev
```

Then open the URL shown in the terminal, usually:

```text
http://localhost:5173
```

### Build for Production

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## 🧪 Available Scripts

```bash
npm run dev        # Start the development server
npm run build      # Create a production build
npm run preview    # Preview the built app locally
npm run test:run   # Run the test suite once
npm test           # Start Vitest in watch mode
```

## 🧠 Application Architecture Notes

- The cart state is managed through a dedicated hook and synced to local storage.
- The theme preference is also persisted so users keep their selected appearance across sessions.
- Product data is fetched from the Fake Store API and displayed through reusable components.

## ✅ Summary

MarketHub Commerce is a complete example of a modern frontend storefront with a polished user experience, responsive layout, accessible interactions, and strong development practices. It is suitable for showcasing React and TypeScript skills in a realistic e-commerce product context.

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
