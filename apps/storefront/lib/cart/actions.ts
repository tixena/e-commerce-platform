import type { Cart, CartLine, AddToCartInput, UpdateCartLineInput } from '@/types';
import { generateId } from '@/lib/utils';

/**
 * Add an item to the cart
 * If the variant already exists, increase quantity
 */
export function addToCart(cart: Cart, input: AddToCartInput): Cart {
  const { productId, variantId, quantity = 1 } = input;

  // Check if variant already exists in cart
  const existingLineIndex = cart.lines.findIndex(
    (line) => line.variantId === variantId && line.productId === productId
  );

  if (existingLineIndex >= 0) {
    // Update existing line quantity
    const updatedLines = cart.lines.map((line, index) =>
      index === existingLineIndex
        ? { ...line, quantity: line.quantity + quantity }
        : line
    );

    return { ...cart, lines: updatedLines };
  }

  // Add new line
  const newLine: CartLine = {
    id: generateId(),
    productId,
    variantId,
    quantity,
  };

  return { ...cart, lines: [...cart.lines, newLine] };
}

/**
 * Remove an item from the cart by line ID
 */
export function removeFromCart(cart: Cart, lineId: string): Cart {
  return {
    ...cart,
    lines: cart.lines.filter((line) => line.id !== lineId),
  };
}

/**
 * Update the quantity of a cart line
 * If quantity is 0 or less, remove the line
 */
export function updateCartLine(cart: Cart, input: UpdateCartLineInput): Cart {
  const { lineId, quantity } = input;

  if (quantity <= 0) {
    return removeFromCart(cart, lineId);
  }

  return {
    ...cart,
    lines: cart.lines.map((line) =>
      line.id === lineId ? { ...line, quantity } : line
    ),
  };
}

/**
 * Clear all items from the cart
 */
export function clearCart(cart: Cart): Cart {
  return { ...cart, lines: [] };
}

/**
 * Get the total quantity of items in the cart
 */
export function getCartTotalQuantity(cart: Cart): number {
  return cart.lines.reduce((total, line) => total + line.quantity, 0);
}

/**
 * Check if a variant is in the cart
 */
export function isInCart(cart: Cart, variantId: number): boolean {
  return cart.lines.some((line) => line.variantId === variantId);
}

/**
 * Get a cart line by variant ID
 */
export function getCartLineByVariant(
  cart: Cart,
  variantId: number
): CartLine | undefined {
  return cart.lines.find((line) => line.variantId === variantId);
}
