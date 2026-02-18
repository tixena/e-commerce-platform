# Storefront Implementation Plan

A simple e-commerce storefront connecting to the Strapi CMS backend.

---

## Module 1: Foundation - Types & Constants

**Goal:** Set up TypeScript types and configuration constants.

### Tasks
- [x] 1.1 Create `lib/constants.ts` with Strapi URL config
- [x] 1.2 Create `types/strapi.ts` - API response wrapper types
- [x] 1.3 Create `types/product.ts` - Product, Variant, Option interfaces
- [x] 1.4 Create `types/collection.ts` - Collection interface
- [x] 1.5 Create `types/cart.ts` - Cart, CartLine interfaces
- [x] 1.6 Create `types/menu.ts` - Menu, MenuItem interfaces

### Files Created
```
lib/constants.ts
types/index.ts
types/strapi.ts
types/product.ts
types/collection.ts
types/cart.ts
types/menu.ts
```

---

## Module 2: Strapi API Client

**Goal:** Create fetch utilities to communicate with Strapi backend.

### Tasks
- [x] 2.1 Create `lib/strapi/client.ts` - base fetch wrapper with error handling
- [x] 2.2 Create `lib/strapi/products.ts` - getProducts, getProductByHandle, searchProducts
- [x] 2.3 Create `lib/strapi/collections.ts` - getCollections, getCollectionByHandle
- [x] 2.4 Create `lib/strapi/menus.ts` - getMenu
- [x] 2.5 Create `lib/strapi/global.ts` - getGlobalSettings
- [x] 2.6 Add helper functions to `lib/utils.ts` - formatPrice, getStrapiImageUrl

### Files Created
```
lib/strapi/index.ts
lib/strapi/client.ts
lib/strapi/products.ts
lib/strapi/collections.ts
lib/strapi/menus.ts
lib/strapi/global.ts
```

### Files Modified
```
lib/utils.ts
```

---

## Module 3: Layout Components

**Goal:** Create the site shell with header and footer.

### Tasks
- [x] 3.1 Create `components/layout/header.tsx` - logo, navigation links placeholder
- [x] 3.2 Create `components/layout/footer.tsx` - simple footer with links
- [x] 3.3 Update `next.config.ts` - add Strapi image domain to remotePatterns
- [x] 3.4 Update `app/layout.tsx` - add header and footer

### Files Created
```
components/layout/header.tsx
components/layout/footer.tsx
```

### Files Modified
```
next.config.ts
app/layout.tsx
```

---

## Module 4: Product Components

**Goal:** Create reusable product display components.

### Tasks
- [x] 4.1 Create `components/product/product-card.tsx` - card with image, title, price, badge
- [x] 4.2 Create `components/product/product-grid.tsx` - responsive grid layout
- [x] 4.3 Create `components/product/product-gallery.tsx` - image display with thumbnails
- [x] 4.4 Create `components/product/product-info.tsx` - title, price, description display
- [x] 4.5 Create `components/product/variant-selector.tsx` - option selection UI

### Files Created
```
components/product/product-card.tsx
components/product/product-grid.tsx
components/product/product-gallery.tsx
components/product/product-info.tsx
components/product/variant-selector.tsx
```

---

## Module 5: Landing Page

**Goal:** Build the homepage with hero, featured products, and collections.

### Tasks
- [x] 5.1 Create `components/home/hero-section.tsx` - hero banner with CTA
- [x] 5.2 Create `components/home/featured-products.tsx` - product grid section
- [x] 5.3 Create `components/home/collections-grid.tsx` - collection cards
- [x] 5.4 Update `app/page.tsx` - compose landing page with all sections

### Files Created
```
components/home/hero-section.tsx
components/home/featured-products.tsx
components/home/collections-grid.tsx
```

### Files Modified
```
app/page.tsx
```

---

## Module 6: Product Pages

**Goal:** Create product listing and detail pages.

### Tasks
- [x] 6.1 Create `app/products/page.tsx` - product listing with grid
- [x] 6.2 Create `app/products/[handle]/page.tsx` - product detail page
- [x] 6.3 Create `app/collections/[handle]/page.tsx` - collection products page

### Files Created
```
app/products/page.tsx
app/products/[handle]/page.tsx
app/collections/[handle]/page.tsx
app/collections/page.tsx
components/product/product-details.tsx
```

---

## Module 7: Cart State Management

**Goal:** Implement cart functionality with localStorage persistence.

### Tasks
- [x] 7.1 Create `lib/cart/storage.ts` - localStorage read/write utilities
- [x] 7.2 Create `lib/cart/actions.ts` - add, remove, update cart functions
- [x] 7.3 Create `lib/cart/context.tsx` - CartProvider and useCart hook
- [x] 7.4 Update `app/layout.tsx` - wrap app with CartProvider

### Files Created
```
lib/cart/storage.ts
lib/cart/actions.ts
lib/cart/context.tsx
lib/cart/index.ts
```

### Files Modified
```
app/layout.tsx
```

---

## Module 8: Cart UI Components

**Goal:** Create cart-related UI components.

### Tasks
- [x] 8.1 Create `components/cart/cart-icon.tsx` - header icon with item count badge
- [x] 8.2 Create `components/cart/quantity-selector.tsx` - +/- quantity controls
- [x] 8.3 Create `components/cart/cart-item.tsx` - single line item display
- [x] 8.4 Create `components/cart/cart-summary.tsx` - subtotal and total display
- [x] 8.5 Create `components/product/add-to-cart-button.tsx` - add to cart with loading state
- [x] 8.6 Update `components/layout/header.tsx` - add CartIcon

### Files Created
```
components/cart/cart-icon.tsx
components/cart/quantity-selector.tsx
components/cart/cart-item.tsx
components/cart/cart-summary.tsx
components/product/add-to-cart-button.tsx
```

### Files Modified
```
components/layout/header.tsx
components/product/product-details.tsx
```

---

## Module 9: Cart Page

**Goal:** Create the shopping cart page.

### Tasks
- [x] 9.1 Create `app/cart/page.tsx` - full cart view with items and summary

### Files Created
```
app/cart/page.tsx
components/cart/cart-content.tsx
```

---

## Module 10: Checkout

**Goal:** Create checkout page with form.

### Tasks
- [x] 10.1 Create `components/checkout/order-summary.tsx` - readonly cart summary
- [x] 10.2 Create `components/checkout/checkout-form.tsx` - contact, shipping, payment fields
- [x] 10.3 Create `app/checkout/page.tsx` - checkout page with form and summary

### Files Created
```
components/checkout/order-summary.tsx
components/checkout/checkout-form.tsx
components/checkout/checkout-content.tsx
app/checkout/page.tsx
app/checkout/success/page.tsx
```

---

## Configuration

### Environment Variables (.env.local)
```
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

### Next.js Config (next.config.ts)
```typescript
images: {
  remotePatterns: [{
    protocol: 'http',
    hostname: 'localhost',
    port: '1337',
    pathname: '/uploads/**',
  }],
}
```

---

## Strapi Data Reference

### Product Schema
| Field | Type | Required |
|-------|------|----------|
| title | string | yes |
| handle | uid | yes |
| description | text | yes |
| descriptionHtml | richtext | no |
| availableForSale | boolean | yes |
| featuredImage | media | yes |
| images | media[] | no |
| tags | json | no |
| seo | component | no |
| options | component[] | no |
| variants | component[] | yes |
| collections | relation[] | no |

### Variant Schema
| Field | Type |
|-------|------|
| title | string |
| availableForSale | boolean |
| selectedOptions | json |
| priceAmount | decimal |
| priceCurrencyCode | string |
| sku | string |

### Cart Approach
- localStorage-based (no authentication)
- Store: productId, variantId, quantity per line
- Enrich with product data on display

---

## Verification Checklist

- [ ] Dev server runs without errors
- [ ] Landing page displays hero, products, collections
- [ ] Products page shows product grid
- [ ] Product detail page shows gallery, info, variant selector
- [ ] Add to cart works and updates cart icon count
- [ ] Cart page displays items with quantity controls
- [ ] Checkout form displays with order summary
- [ ] Cart persists after page refresh
- [ ] Mobile responsive layout works
