import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/utils';
import type { ProductVariant } from '@/types';

interface ProductInfoProps {
  title: string;
  description: string;
  descriptionHtml?: string;
  selectedVariant: ProductVariant | null;
  availableForSale: boolean;
}

export function ProductInfo({
  title,
  description,
  descriptionHtml,
  selectedVariant,
  availableForSale,
}: ProductInfoProps) {
  const price = selectedVariant?.priceAmount ?? 0;
  const currencyCode = selectedVariant?.priceCurrencyCode ?? 'USD';
  const isAvailable = availableForSale && (selectedVariant?.availableForSale ?? false);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-2xl font-semibold">
            {formatPrice(price, currencyCode)}
          </span>
          {!isAvailable && (
            <Badge variant="secondary">Sold Out</Badge>
          )}
        </div>
      </div>

      <div className="prose prose-sm max-w-none text-muted-foreground">
        {descriptionHtml ? (
          <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
        ) : (
          <p>{description}</p>
        )}
      </div>
    </div>
  );
}
