'use client';

import { useState } from 'react';
import { ProductGallery } from './product-gallery';
import { ProductInfo } from './product-info';
import {
  VariantSelector,
  findVariantByOptions,
  getDefaultOptions,
} from './variant-selector';
import { AddToCartButton } from './add-to-cart-button';
import type { Product } from '@/types';

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(
    () => getDefaultOptions(product.options ?? [], product.variants)
  );

  const selectedVariant = findVariantByOptions(product.variants, selectedOptions);

  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions((prev) => ({ ...prev, [optionName]: value }));
  };

  return (
    <div className="grid gap-8 md:grid-cols-2 md:gap-12">
      <ProductGallery
        featuredImage={product.featuredImage}
        images={product.images}
      />

      <div className="flex flex-col gap-6">
        <ProductInfo
          title={product.title}
          description={product.description}
          descriptionHtml={product.descriptionHtml}
          selectedVariant={selectedVariant}
          availableForSale={product.availableForSale}
        />

        {product.options && product.options.length > 0 && (
          <VariantSelector
            options={product.options}
            variants={product.variants}
            selectedOptions={selectedOptions}
            onOptionChange={handleOptionChange}
          />
        )}

        <AddToCartButton
          productId={product.id}
          variant={selectedVariant}
          availableForSale={product.availableForSale}
        />
      </div>
    </div>
  );
}
