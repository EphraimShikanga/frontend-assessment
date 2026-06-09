# Co-operative Bank — Product Dashboard

A frontend assessment for Co-operative Bank of Kenya. An authenticated product dashboard built with React 19, Next.js 16, TypeScript, Tailwind CSS v4, and TanStack Query.

**Test Credentials:** `emilys` / `emilyspass`

---

## Setup & Run

```bash
# 1. Clone the repo
git clone https://github.com/<your-username>/frontend-assessment.git
cd frontend-assessment

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env.local

# 4. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | DummyJSON API base URL (no trailing slash) | `https://dummyjson.com` |

The app validates this at startup — if missing, it throws a clear error with instructions.

---

## Implementation Approach

### Architecture Decisions

I structured this project around a **component-driven architecture** with clear separation of concerns. Every piece of UI is a self-contained, reusable component, and all business logic (API calls, auth state, data fetching) is extracted into custom hooks and a centralised config layer.

For **state management**, I deliberately chose **React Context + TanStack Query** over Redux. The auth state (user session, login/logout) lives in an `AuthProvider` context, while all server state (products, search results) is managed by TanStack Query. I felt Redux would be unnecessary overhead here — Context handles the client state cleanly, and TanStack Query handles the server state with built-in caching, deduplication, and background refetching. That said, TanStack Query was a quick implementation from a one-day reading of the docs, so I may not have implemented everything in TanStack perfectly, but I believe I've been able to use it the right way — query keys as a factory, appropriate `staleTime`/`gcTime`, and mutations with proper error handling.

### Authentication (Part 1)

I built the login flow with a `useLogin` hook that wraps a TanStack Query `useMutation`. The form performs **client-side validation** first (required field checks), then sends credentials to the DummyJSON `/auth/login` endpoint. On success, the user object is persisted to `sessionStorage` via a dedicated `auth-storage` module and the `AuthContext` is updated, triggering a redirect to the dashboard. On failure, the API error message surfaces in an `AlertBanner` component.

The password field has a **visibility toggle** for usability. All form fields use a reusable `InputField` component built with `forwardRef` so the form can programmatically focus the first errored field.

### Protected Dashboard (Part 2)

Route protection is handled by an `AuthGuard` component at the **layout level** (`dashboard/layout.tsx`). This checks the auth context and redirects unauthenticated users back to login. The dashboard header displays the logged-in user's initials and name, plus a logout button that clears the session and redirects home.

### Products Listing (Part 3)

Product fetching is handled through a `useProducts` hook that calls `fetchProducts` — which maps the app's 1-based page index to DummyJSON's `skip`/`limit` parameters. I specifically designed this to **handle large catalogues (50,000+ products)** by:

- **Server-side pagination**: Only requesting one page worth of data at a time. The server does the heavy lifting.
- **Field projection**: The API call includes a `select` parameter that only requests the fields I actually render (`id,title,description,price,discountPercentage,category,rating,stock,brand,thumbnail,images`). This reduces payload size significantly at scale.
- **TanStack Query caching**: `staleTime` is set to 5 minutes and `gcTime` to 30 minutes, so navigating back to previously visited pages is instant — the cached data is served immediately without a network request.
- **React.memo on ProductCard**: Each card component is wrapped in `React.memo` to prevent unnecessary re-renders during state changes that don't affect the card's props.

The pagination component uses an **ellipsis-based window strategy** — it always shows the first and last page, a window around the current page, and collapses gaps into "…". This keeps the UI compact even with thousands of pages.

I implemented three UI states beyond the happy path: **skeleton loaders** (structural wireframes that mirror the exact card layout), an **error state** with a retry button, and an **empty state** with a helpful message.

### Search (Part 4)

Search uses the DummyJSON `/products/search?q=query` endpoint for **server-side, case-insensitive filtering**. I didn't do client-side filtering because it's not viable with large datasets.

To avoid firing a network request on every keystroke, I built a **`useDebounce` hook** that delays the search query by 300ms. The raw input value is managed by the parent for immediate responsiveness — the user sees their typing reflected instantly — while the debounced value is what actually triggers the API call through the TanStack Query key. When the debounced value changes, the page resets to 1 automatically.

The search input has a **loading spinner** that appears when the debounced value differs from the raw input (i.e. typing is still settling) or when TanStack Query is fetching. It also has a clear button that resets the search and refocuses the input.

### Product Details Modal

Clicking any product card opens a **native `<dialog>` element** — I chose this over a custom modal because it provides built-in accessibility: focus trapping, Escape key handling, and proper ARIA semantics out of the box. The modal shows the full product info including a discount price calculation, stock status indicator (green/yellow/red dot), brand, category badge, and description.

The dialog has a backdrop click handler (clicking outside closes it) and a CSS animation for the open transition.

### Theming & Dark Mode

I set up the design system using **Tailwind CSS v4's `@theme inline` directive** with CSS custom properties. The architecture works like this:

1. `:root` defines all light-mode CSS variables
2. `.dark` overrides those variables with dark-mode values
3. `@theme inline` maps each variable to a Tailwind utility via `var()`

This means `bg-surface`, `text-text-primary`, `border-border-muted`, etc. automatically resolve to the correct value based on which mode is active — **zero `dark:` prefixes in any component file**. Every component only uses semantic tokens like `text-primary`, `text-secondary`, `text-muted`, `brand-text`, `brand-surface`, `badge-bg`, `skeleton`, and `interactive-hover`.

The theme toggle persists the user's preference to `localStorage` and toggles a `.dark` class on the `<html>` element.

### SVGs

The SVG icons throughout the app (building icon, search, chevrons, star rating, eye toggle, etc.) were generated with AI assistance. I didn't use an icon library to keep the bundle lean.

---

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Design system — CSS variables + @theme inline
│   ├── layout.tsx           # Root layout with font loading + providers
│   ├── page.tsx             # Login page
│   └── dashboard/
│       ├── layout.tsx       # Auth guard wrapper
│       └── page.tsx         # Product listing + search + modal
├── components/
│   ├── auth/
│   │   ├── auth-guard.tsx   # Route protection
│   │   └── login-form.tsx   # Login form with validation
│   ├── dashboard/
│   │   └── dashboard-header.tsx  # Top bar with user info + theme toggle + logout
│   ├── products/
│   │   ├── product-card.tsx        # Memoised product card
│   │   ├── product-detail-modal.tsx # Native <dialog> modal
│   │   ├── product-skeleton.tsx    # Skeleton wireframes
│   │   ├── products-empty.tsx      # Empty state
│   │   ├── products-error.tsx      # Error state with retry
│   │   └── products-grid.tsx       # Responsive grid layout
│   ├── ui/
│   │   ├── alert-banner.tsx   # Dismissable error banner
│   │   ├── button.tsx         # Primary button with loading state
│   │   ├── input-field.tsx    # Reusable input with label + error
│   │   ├── pagination.tsx     # Ellipsis-based pagination
│   │   ├── search-input.tsx   # Search with clear + spinner
│   │   └── theme-toggle.tsx   # Dark mode toggle button
│   └── providers.tsx          # QueryClient + Theme + Auth providers
├── hooks/
│   ├── use-auth.tsx      # Auth context + provider
│   ├── use-debounce.ts   # Generic debounce hook
│   ├── use-login.ts      # Login mutation hook
│   ├── use-products.ts   # Paginated + searchable product fetching
│   └── use-theme.tsx     # Theme context + provider
├── lib/
│   ├── api/
│   │   ├── auth.ts       # Login API call
│   │   └── products.ts   # Products fetch + search + single product
│   ├── auth-storage.ts   # sessionStorage persistence
│   ├── config.ts         # Centralised env config with validation
│   └── query-client.ts   # TanStack Query client instance
└── types/
    ├── auth.ts           # Auth types
    └── product.ts        # Product + API response types
```

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 19.2 | UI library |
| Next.js | 16.2 | App Router, SSR, image optimisation |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Utility-first styling with CSS variable theming |
| TanStack Query | 5.x | Server state management, caching, mutations |

---

## Requirements Checklist

### Core Requirements
- [x] **Part 1** — Login screen with validation, loading, error, auth storage, redirect
- [x] **Part 2** — Protected dashboard with auth guard, user display, logout
- [x] **Part 3** — Products listing with image, title, price, category, rating, loading/error/empty states
- [x] **Part 4** — Search by title, immediate updates (debounced), case insensitive (server-side)

### Optional Enhancements
- [x] Pagination (ellipsis-based, handles 50,000+ products)
- [x] Product Details Modal (native `<dialog>`)
- [x] TanStack Query integration (queries, mutations, cache keys, staleTime/gcTime)
- [ ] Redux integration (intentionally skipped — Context + TanStack Query covers the use case)
- [x] Responsive design (1 → 2 → 3 → 4 column grid)
- [x] Dark mode (class-based toggle, CSS variable theming, localStorage persistence)
- [x] Skeleton loaders (structural wireframes matching card layout)
