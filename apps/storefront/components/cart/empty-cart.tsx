import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyCartProps {
  message?: string;
}

export function EmptyCart({
  message = "Looks like you haven't added anything to your cart yet.",
}: EmptyCartProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
      <ShoppingBag className="size-16 text-muted-foreground" />
      <h2 className="text-xl font-semibold">Your cart is empty</h2>
      <p className="text-muted-foreground">{message}</p>
      <Link href="/products">
        <Button>Continue Shopping</Button>
      </Link>
    </div>
  );
}
