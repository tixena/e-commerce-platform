import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProductGrid } from '@/components/product/product-grid';
import { getProducts } from '@/lib/strapi/products';
import { LIMITS } from '@/lib/constants';

export async function FeaturedProducts() {
  const { products } = await getProducts({ limit: LIMITS.FEATURED_PRODUCTS });

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl">Featured Products</h2>
          <p className="mt-2 text-muted-foreground">
            Check out our most popular items
          </p>
        </div>
        <Link
          href="/products"
          className="group flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          View all
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
      <ProductGrid products={products} />
    </section>
  );
}
