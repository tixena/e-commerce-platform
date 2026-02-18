'use client';

import { CheckoutForm } from './checkout-form';
import { OrderSummary } from './order-summary';
import { EmptyCart } from '@/components/cart/empty-cart';
import { useEnrichedCart } from '@/lib/hooks/use-enriched-cart';

export function CheckoutContent() {
  const { enrichedLines, isLoading, isEmpty, subtotal, currencyCode } =
    useEnrichedCart();

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-muted-foreground">Loading checkout...</div>
      </div>
    );
  }

  if (isEmpty) {
    return <EmptyCart message="Add some items to your cart before checking out." />;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div>
        <CheckoutForm />
      </div>
      <div className="lg:sticky lg:top-24 lg:self-start">
        <OrderSummary
          lines={enrichedLines}
          subtotal={subtotal}
          currencyCode={currencyCode}
        />
      </div>
    </div>
  );
}
