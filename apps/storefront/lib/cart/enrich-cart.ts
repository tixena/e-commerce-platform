import type { Cart, CartLineWithProduct, Product } from '@/types';

async function fetchProductsByIds(productIds: number[]): Promise<Product[]> {
  if (productIds.length === 0) return [];

  const res = await fetch(`/api/products?ids=${productIds.join(',')}`);

  if (!res.ok) return [];

  const data = await res.json();
  return data.data ?? [];
}

export async function enrichCartLines(
  cart: Cart
): Promise<CartLineWithProduct[]> {
  if (cart.lines.length === 0) return [];

  const productIds = [...new Set(cart.lines.map((line) => line.productId))];
  const products = await fetchProductsByIds(productIds);

  const enriched: CartLineWithProduct[] = [];

  for (const line of cart.lines) {
    const product = products.find((p) => p.id === line.productId);
    if (!product) continue;

    const variant = product.variants.find((v) => v.id === line.variantId);
    if (!variant) continue;

    enriched.push({
      ...line,
      product,
      variant,
    });
  }

  return enriched;
}
