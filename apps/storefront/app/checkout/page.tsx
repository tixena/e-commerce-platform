import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { CheckoutContent } from '@/components/checkout/checkout-content';

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Complete your order',
};

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link
          href="/cart"
          className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Return to cart
        </Link>
        <h1 className="text-3xl font-bold">Checkout</h1>
      </div>
      <CheckoutContent />
    </div>
  );
}
