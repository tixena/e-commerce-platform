'use client';

import Image from 'next/image';
import Link from 'next/link';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QuantitySelector } from './quantity-selector';
import { formatPrice, getStrapiImageUrl } from '@/lib/utils';
import type { CartLineWithProduct } from '@/types';

interface CartItemProps {
  line: CartLineWithProduct;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

export function CartItem({ line, onUpdateQuantity, onRemove }: CartItemProps) {
  const { product, variant, quantity } = line;
  const lineTotal = variant.priceAmount * quantity;

  const variantTitle =
    variant.selectedOptions.length > 0
      ? variant.selectedOptions.map((opt) => opt.value).join(' / ')
      : null;

  return (
    <div className="flex gap-4 py-4">
      <Link
        href={`/products/${product.handle}`}
        className="relative size-24 shrink-0 overflow-hidden rounded-md bg-muted"
      >
        <Image
          src={getStrapiImageUrl(product.featuredImage)}
          alt={product.title}
          fill
          className="object-cover"
          sizes="96px"
        />
      </Link>

      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between">
          <div>
            <Link
              href={`/products/${product.handle}`}
              className="font-medium hover:underline"
            >
              {product.title}
            </Link>
            {variantTitle && (
              <p className="text-sm text-muted-foreground">{variantTitle}</p>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            onClick={onRemove}
          >
            <X className="size-4" />
            <span className="sr-only">Remove item</span>
          </Button>
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <QuantitySelector
            quantity={quantity}
            onIncrement={() => onUpdateQuantity(quantity + 1)}
            onDecrement={() => onUpdateQuantity(quantity - 1)}
          />
          <span className="font-medium">
            {formatPrice(lineTotal, variant.priceCurrencyCode)}
          </span>
        </div>
      </div>
    </div>
  );
}
