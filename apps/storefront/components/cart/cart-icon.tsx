'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cart';

export function CartIcon() {
  const { totalQuantity, isLoading } = useCart();

  return (
    <Link href="/cart">
      <Button variant="ghost" size="icon" className="relative">
        <ShoppingCart className="size-5" />
        {!isLoading && totalQuantity > 0 && (
          <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
            {totalQuantity > 99 ? '99+' : totalQuantity}
          </span>
        )}
        <span className="sr-only">Cart ({totalQuantity} items)</span>
      </Button>
    </Link>
  );
}
