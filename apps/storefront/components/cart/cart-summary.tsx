import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { formatPrice } from '@/lib/utils';

interface CartSummaryProps {
  subtotal: number;
  currencyCode: string;
  itemCount: number;
}

export function CartSummary({ subtotal, currencyCode, itemCount }: CartSummaryProps) {
  // For simplicity, shipping and tax are not calculated
  const total = subtotal;

  return (
    <div className="rounded-lg border bg-card p-6">
      <h2 className="text-lg font-semibold">Order Summary</h2>

      <div className="mt-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})
          </span>
          <span>{formatPrice(subtotal, currencyCode)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span className="text-muted-foreground">Calculated at checkout</span>
        </div>

        <Separator />

        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span>{formatPrice(total, currencyCode)}</span>
        </div>
      </div>

      <Link href="/checkout" className="mt-6 block">
        <Button className="w-full" size="lg">
          Proceed to Checkout
        </Button>
      </Link>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        Shipping and taxes calculated at checkout
      </p>
    </div>
  );
}
