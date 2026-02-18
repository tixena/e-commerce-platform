'use client';

import { useEffect, useState } from 'react';
import { useCart, enrichCartLines } from '@/lib/cart';
import { DEFAULT_CURRENCY } from '@/lib/constants';
import type { CartLineWithProduct } from '@/types';

interface UseEnrichedCartResult {
  enrichedLines: CartLineWithProduct[];
  isLoading: boolean;
  isEmpty: boolean;
  subtotal: number;
  currencyCode: string;
  totalQuantity: number;
  updateCartLine: ReturnType<typeof useCart>['updateCartLine'];
  removeFromCart: ReturnType<typeof useCart>['removeFromCart'];
}

export function useEnrichedCart(): UseEnrichedCartResult {
  const { cart, isLoading: isCartLoading, updateCartLine, removeFromCart } = useCart();
  const [enrichedLines, setEnrichedLines] = useState<CartLineWithProduct[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (isCartLoading) return;

    const loadEnrichedLines = async () => {
      setIsFetching(true);
      const enriched = await enrichCartLines(cart);
      setEnrichedLines(enriched);
      setIsFetching(false);
    };

    loadEnrichedLines();
  }, [cart, isCartLoading]);

  const isLoading = isCartLoading || isFetching;
  const isEmpty = !isLoading && enrichedLines.length === 0;

  const subtotal = enrichedLines.reduce(
    (sum, line) => sum + line.variant.priceAmount * line.quantity,
    0
  );

  const currencyCode =
    enrichedLines[0]?.variant.priceCurrencyCode ?? DEFAULT_CURRENCY;

  const totalQuantity = enrichedLines.reduce(
    (sum, line) => sum + line.quantity,
    0
  );

  return {
    enrichedLines,
    isLoading,
    isEmpty,
    subtotal,
    currencyCode,
    totalQuantity,
    updateCartLine,
    removeFromCart,
  };
}
