# Online Store App

A modern single-page application built with Vue.js that provides a seamless shopping experience with product browsing, cart management, and interactive notifications.

## Setup and Running

### Prerequisites
- Node.js 18.0.0 or higher
- npm (comes with Node.js)

### Installation and Development
```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

The application will be available at `http://localhost:5173/`

### Build for Production
```bash
npm run build
npm run preview
```

## Core Features

### Product List
- Products organized by category (Optical Sorters, Dryers, Rollers, Die Casting Machines)
- Grid layout with product cards showing image, name, and price
- "Add to Cart" button with toast notification feedback
- Responsive design adapting to all screen sizes
- Fallback handling for missing product images

### Product Details
- Individual product pages accessible via `/products/{productId}`
- Detailed product information with full-size image
- Product specifications and category information
- "Add to Cart" with instant toast confirmation
- Back navigation to product listing

### Shopping Cart
- **Smart Quantity Management**: Products consolidated by ID with quantity counters
- **Interactive Controls**: Increment/decrement buttons to adjust quantities
- **Intelligent UI**: Decrement button automatically disabled when quantity is 1
- **Quick Navigation**: Click any product to view its detail page
- **Delete Confirmation**: Modal prompt when removing items with quantity > 1
- **Real-time Totals**: Dynamic calculation of subtotals and grand total
- **Order Summary**: Clear breakdown of items and pricing
- **Empty State**: Helpful message with link back to shopping
- **Cart Persistence**: Shopping cart data persists across page refreshes and browser sessions

### Header
- Brand logo with home navigation
- Live date and time display
- Cart icon with dynamic item count badge
- Sticky positioning for constant accessibility

### Notifications
- **Toast System**: Non-intrusive success messages
- Smooth slide-in animations from the top-right
- Auto-dismiss after 3 seconds
- Brand-themed styling with success indicators
- Mobile-responsive placement

## Tech Stack

- **Vue.js 3** (Composition API with `<script setup>`)
- **Vue Router** (Client-side routing with history mode)
- **Pinia** (State management for cart)
- **pinia-plugin-persistedstate** (Cart persistence with localStorage)
- **Vite** (Build tool and dev server)
- **CSS3** (Custom styling with scoped styles)

## Project Structure

```
src/
├── components/
│   ├── Header.vue              # Navigation header with cart badge
│   └── ToastNotification.vue   # Toast message component
├── views/
│   ├── ProductList.vue         # Product catalog by category
│   ├── ProductDetail.vue       # Individual product details
│   └── Checkout.vue            # Shopping cart with quantity controls
├── stores/
│   └── cartStore.js            # Pinia store with quantity management
├── composables/
│   └── useToast.js             # Toast notification composable
├── data/
│   └── products.json           # Product database
├── router/
│   └── index.js                # Route configuration
├── App.vue                     # Root component with toast container
├── main.js                     # Application entry point
└── main.css                    # Global styles and design system
```

## Implementation Highlights

### Code Quality
- **Composition API**: Modern Vue.js patterns with `<script setup>` syntax
- **Reusable Composables**: `useToast` for notification management across components
- **Centralized State**: Pinia store for predictable cart state management
- **Component Architecture**: Single-file components with scoped styles
- **Clean Separation**: Views, components, stores, and composables properly organized

### Technical Features
- **Cart Persistence**:
  - Automatic localStorage sync using `pinia-plugin-persistedstate`
  - Cart data survives page refreshes and browser restarts
  - Customized storage key: `online-store-cart`
  - Selective state persistence (only cart items)
- **Quantity Management**: 
  - `incrementQuantity()` and `decrementQuantity()` methods
  - Automatic consolidation of duplicate products
  - Dynamic total calculations based on quantity
- **Router Integration**: 
  - Programmatic navigation with `router.push()`
  - Dynamic route params for product details
  - Clean URL structure with base URL support
- **CSS Positioning**: Relative-absolute pattern for cart badge overlay
- **Favicon Support**: Custom icon in public folder

## Recent Enhancements
- Integrated `pinia-plugin-persistedstate` for automatic cart persistence
- Shopping cart survives page refreshes and browser sessions
- localStorage-based state synchronization
- Refactored cart store to Options API for better plugin compatibility
- Quantity-based cart system (no duplicate product cards)
- Increment/decrement controls with visual feedback
- Disabled decrement button when quantity reaches 1
- Clickable products in cart navigate to detail pages
- Confirmation modal for deleting items with multiple quantities
- Toast notification system replacing browser alerts
- Smooth animations for toast messages
- Responsive design across all devices

## License

This project is for demonstration purposes.
