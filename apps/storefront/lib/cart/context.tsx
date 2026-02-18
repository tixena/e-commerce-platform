'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import type { Cart, AddToCartInput, UpdateCartLineInput } from '@/types';
import { getOrCreateCart, saveCart, createEmptyCart } from './storage';
import {
  addToCart as addToCartAction,
  removeFromCart as removeFromCartAction,
  updateCartLine as updateCartLineAction,
  clearCart as clearCartAction,
  getCartTotalQuantity,
} from './actions';

interface CartContextValue {
  cart: Cart;
  totalQuantity: number;
  isLoading: boolean;
  addToCart: (input: AddToCartInput) => void;
  removeFromCart: (lineId: string) => void;
  updateCartLine: (input: UpdateCartLineInput) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<Cart>(createEmptyCart);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = getOrCreateCart();
    setCart(storedCart);
    setIsLoading(false);
  }, []);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      saveCart(cart);
    }
  }, [cart, isLoading]);

  const addToCart = useCallback((input: AddToCartInput) => {
    setCart((currentCart) => addToCartAction(currentCart, input));
  }, []);

  const removeFromCart = useCallback((lineId: string) => {
    setCart((currentCart) => removeFromCartAction(currentCart, lineId));
  }, []);

  const updateCartLine = useCallback((input: UpdateCartLineInput) => {
    setCart((currentCart) => updateCartLineAction(currentCart, input));
  }, []);

  const clearCart = useCallback(() => {
    setCart((currentCart) => clearCartAction(currentCart));
  }, []);

  const totalQuantity = useMemo(() => getCartTotalQuantity(cart), [cart]);

  const value: CartContextValue = useMemo(
    () => ({
      cart,
      totalQuantity,
      isLoading,
      addToCart,
      removeFromCart,
      updateCartLine,
      clearCart,
    }),
    [cart, totalQuantity, isLoading, addToCart, removeFromCart, updateCartLine, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
}
