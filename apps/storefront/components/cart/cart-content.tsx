'use client';

import { Separator } from '@/components/ui/separator';
import { CartItem } from './cart-item';
import { CartSummary } from './cart-summary';
import { EmptyCart } from './empty-cart';
import { useEnrichedCart } from '@/lib/hooks/use-enriched-cart';

export function CartContent() {
  const {
    enrichedLines,
    isLoading,
    isEmpty,
    subtotal,
    currencyCode,
    totalQuantity,
    updateCartLine,
    removeFromCart,
  } = useEnrichedCart();

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-muted-foreground">Loading cart...</div>
      </div>
    );
  }

  if (isEmpty) {
    return <EmptyCart />;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="rounded-lg border bg-card">
          <div className="p-6">
            <h2 className="text-lg font-semibold">
              Cart ({totalQuantity} {totalQuantity === 1 ? 'item' : 'items'})
            </h2>
          </div>
          <Separator />
          <div className="divide-y px-6">
            {enrichedLines.map((line) => (
              <CartItem
                key={line.id}
                line={line}
                onUpdateQuantity={(quantity) =>
                  updateCartLine({ lineId: line.id, quantity })
                }
                onRemove={() => removeFromCart(line.id)}
              />
            ))}
          </div>
        </div>
      </div>

      <div>
        <CartSummary
          subtotal={subtotal}
          currencyCode={currencyCode}
          itemCount={totalQuantity}
        />
      </div>
    </div>
  );
}
