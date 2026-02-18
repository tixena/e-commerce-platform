'use client';

import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { formatPrice, getStrapiImageUrl } from '@/lib/utils';
import type { CartLineWithProduct } from '@/types';

interface OrderSummaryProps {
  lines: CartLineWithProduct[];
  subtotal: number;
  currencyCode: string;
}

export function OrderSummary({ lines, subtotal, currencyCode }: OrderSummaryProps) {
  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);

  return (
    <div className="rounded-lg border bg-card">
      <div className="p-6">
        <h2 className="text-lg font-semibold">Order Summary</h2>
        <p className="text-sm text-muted-foreground">
          {itemCount} {itemCount === 1 ? 'item' : 'items'}
        </p>
      </div>

      <Separator />

      <div className="max-h-80 overflow-y-auto p-6">
        <ul className="space-y-4">
          {lines.map((line) => {
            const variantTitle =
              line.variant.selectedOptions.length > 0
                ? line.variant.selectedOptions.map((opt) => opt.value).join(' / ')
                : null;

            return (
              <li key={line.id} className="flex gap-3">
                <div className="relative size-16 shrink-0 overflow-hidden rounded-md bg-muted">
                  <Image
                    src={getStrapiImageUrl(line.product.featuredImage)}
                    alt={line.product.title}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                  <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                    {line.quantity}
                  </span>
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <p className="text-sm font-medium leading-tight">
                    {line.product.title}
                  </p>
                  {variantTitle && (
                    <p className="text-xs text-muted-foreground">{variantTitle}</p>
                  )}
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium">
                    {formatPrice(
                      line.variant.priceAmount * line.quantity,
                      line.variant.priceCurrencyCode
                    )}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <Separator />

      <div className="space-y-3 p-6">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{formatPrice(subtotal, currencyCode)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span className="text-muted-foreground">Calculated at next step</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tax</span>
          <span className="text-muted-foreground">Calculated at next step</span>
        </div>
        <Separator />
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>{formatPrice(subtotal, currencyCode)}</span>
        </div>
      </div>
    </div>
  );
}
