# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Auroreal is a React + TypeScript e-commerce website built with Vite for selling educational books about giftedness. The site features a pre-sale system for "Chaves para Educar" with three product tiers (Digital, Físico, Colecionador) and includes Google OAuth authentication, shopping cart functionality, and a multi-step checkout flow.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production (TypeScript compilation + Vite build)
npm run build

# Preview production build
npm run preview
```

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS with custom theme
- **Animations**: Framer Motion
- **Authentication**: Google OAuth (@react-oauth/google)
- **Icons**: Lucide React

## Architecture & Structure

### Component Organization

All React components live in the `/Components` directory (note: capitalized). The app follows a modal-heavy architecture:

- **App.tsx**: Root component managing global state for modals (checkout, login, cart, search) and shopping cart state
- **Modals**: CheckoutModal, LoginModal, SearchModal, CartSidebar - all controlled by boolean state flags in App.tsx
- **Layout**: Header, Footer, Hero sections
- **Product Display**: BookCard, BookGrid for catalog items

### State Management

Simple React state (useState) at the App level:
- Cart items stored as `Product[]` array
- Modal visibility controlled by boolean flags (`isCheckoutOpen`, `isLoginOpen`, etc.)
- Selected product for checkout passed via prop drilling

### Product Types

Three product tiers defined in App.tsx interface:
```typescript
interface Product {
    name: string;
    price: string;
    type: 'digital' | 'fisico' | 'colecionador';
}
```

### Data Layer

`data/siteData.ts` exports:
- `books`: Array of BookProps for catalog display
- `navItems`: Navigation menu configuration

### Checkout Flow

Multi-step checkout in CheckoutModal.tsx:
1. Personal data collection (name, CPF, email, phone)
2. Password creation for account
3. Address input (for physical products)
4. Payment processing

CPF validation implemented with Brazilian tax ID algorithm.

### Styling System

Tailwind configured with Auroreal brand colors in `tailwind.config.js`:
- Primary: `#662D91` (purple)
- Accent: `#f7941d` (orange)
- Background: `#F8F6F3` (cream)

Content paths include root-level files and Components directory.

### Authentication

Google OAuth integration via `GoogleOAuthProvider` wrapper in App.tsx. Requires `VITE_GOOGLE_CLIENT_ID` environment variable (falls back to "mock-client-id" for development).

### Cart Behavior

- "Reservar" buttons add products to cart AND open checkout modal
- Cart persists during checkout (items remain if user cancels)
- Red dot indicator on cart icon when items present (`cartCount` prop)

### Build Configuration

Vite configured with minification disabled (`build.minify: false`) for debugging purposes.

### Error Handling

ErrorBoundary wrapper in index.tsx catches React component errors globally.

## Key Implementation Details

- Smooth scrolling utility in `utils/smoothScroll.ts` for anchor navigation
- All modals use AnimatePresence for entry/exit animations
- Pre-venda section uses viewport-triggered animations (`viewport={{ once: false }}`)
- Product cards feature hover effects (elevation, border color changes)
- Colecionador tier includes special bonus section with exclusive webinar access

## Environment Variables

Required:
- `VITE_GOOGLE_CLIENT_ID`: Google OAuth client ID for authentication

## File Naming Conventions

- Components use PascalCase with .tsx extension
- Data/utils use camelCase with .ts extension
- Main Components directory is capitalized (not lowercase)
