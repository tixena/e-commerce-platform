'use client';

import { useState } from 'react';
import { Check, Loader2, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cart';
import type { ProductVariant } from '@/types';

interface AddToCartButtonProps {
  productId: number;
  variant: ProductVariant | null;
  availableForSale: boolean;
}

export function AddToCartButton({
  productId,
  variant,
  availableForSale,
}: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const isAvailable = availableForSale && variant?.availableForSale;

  const handleAddToCart = async () => {
    if (!variant || !isAvailable) return;

    setIsAdding(true);

    // Call cart API to add product
    try {
      const response = await fetch('/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          variantId: variant.id,
          quantity: 1,
        }),
      });

      const result = await response.json();
      if (result.error) {
        console.error('Cart error:', result.error);
      }
    } catch (err) {
      console.error('Failed to sync cart:', err);
    }

    addToCart({
      productId,
      variantId: variant.id,
      quantity: 1,
    });

    setIsAdding(false);
    setJustAdded(true);

    // Reset the "just added" state after 2 seconds
    setTimeout(() => setJustAdded(false), 2000);
  };

  if (!isAvailable) {
    return (
      <Button size="lg" disabled className="w-full">
        Sold Out
      </Button>
    );
  }

  return (
    <Button
      size="lg"
      className="w-full"
      onClick={handleAddToCart}
      disabled={isAdding}
    >
      {isAdding ? (
        <>
          <Loader2 className="mr-2 size-4 animate-spin" />
          Adding...
        </>
      ) : justAdded ? (
        <>
          <Check className="mr-2 size-4" />
          Added to Cart
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 size-4" />
          Add to Cart
        </>
      )}
    </Button>
  );
}
