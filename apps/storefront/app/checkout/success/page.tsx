import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Order Confirmed',
  description: 'Your order has been placed successfully',
};

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-md text-center">
        <div className="mb-6 flex justify-center">
          <CheckCircle className="size-16 text-green-500" />
        </div>
        <h1 className="mb-4 text-3xl font-bold">Order Confirmed!</h1>
        <p className="mb-8 text-muted-foreground">
          Thank you for your order. We&apos;ve received your order and will begin
          processing it soon. You&apos;ll receive a confirmation email shortly.
        </p>
        <div className="space-y-3">
          <Link href="/products" className="block">
            <Button className="w-full">Continue Shopping</Button>
          </Link>
          <Link href="/" className="block">
            <Button variant="outline" className="w-full">
              Return to Home
            </Button>
          </Link>
        </div>
        <p className="mt-8 text-xs text-muted-foreground">
          This is a demo store. No real order was placed.
        </p>
      </div>
    </div>
  );
}
