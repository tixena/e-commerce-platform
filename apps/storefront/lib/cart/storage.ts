import type { Cart } from '@/types';
import { generateId } from '@/lib/utils';

const CART_STORAGE_KEY = 'storefront-cart';

/**
 * Check if we're in a browser environment
 */
function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Create a new empty cart
 */
export function createEmptyCart(): Cart {
  const now = new Date().toISOString();
  return {
    id: generateId(),
    lines: [],
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * Read cart from localStorage
 */
export function getStoredCart(): Cart | null {
  if (!isBrowser()) {
    return null;
  }

  const stored = localStorage.getItem(CART_STORAGE_KEY);

  if (!stored) {
    return null;
  }

  const parsed = JSON.parse(stored) as Cart;
  return parsed;
}

/**
 * Save cart to localStorage
 */
export function saveCart(cart: Cart): void {
  if (!isBrowser()) {
    return;
  }

  const updated: Cart = {
    ...cart,
    updatedAt: new Date().toISOString(),
  };

  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updated));
}

/**
 * Clear cart from localStorage
 */
export function clearStoredCart(): void {
  if (!isBrowser()) {
    return;
  }

  localStorage.removeItem(CART_STORAGE_KEY);
}

/**
 * Get or create cart from localStorage
 */
export function getOrCreateCart(): Cart {
  const stored = getStoredCart();

  if (stored) {
    return stored;
  }

  const newCart = createEmptyCart();
  saveCart(newCart);
  return newCart;
}
