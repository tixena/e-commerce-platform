import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatPrice, getStrapiImageUrl } from '@/lib/utils';
import type { Product, ProductListItem } from '@/types';

interface ProductCardProps {
  product: Product | ProductListItem;
}

export function ProductCard({ product }: ProductCardProps) {
  const price = product.variants[0]?.priceAmount ?? 0;
  const currencyCode = product.variants[0]?.priceCurrencyCode ?? 'USD';
  const imageUrl = getStrapiImageUrl(product.featuredImage);

  return (
    <Link href={`/products/${product.handle}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={imageUrl}
            alt={product.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {!product.availableForSale && (
            <Badge
              variant="secondary"
              className="absolute left-2 top-2"
            >
              Sold Out
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium text-foreground line-clamp-1">
            {product.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {formatPrice(price, currencyCode)}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
