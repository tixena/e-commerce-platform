import { Metadata } from 'next';
import { ProductGrid } from '@/components/product/product-grid';
import { getProducts, searchProducts } from '@/lib/strapi/products';

export const metadata: Metadata = {
  title: 'Products',
  description: 'Browse our collection of products',
};

interface ProductsPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const query = params.q;

  const products = query
    ? await searchProducts(query)
    : (await getProducts()).products;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          {query ? `Search results for "${query}"` : 'All Products'}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {products.length} {products.length === 1 ? 'product' : 'products'} found
        </p>
      </div>

      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <div className="py-12 text-center">
          <p className="text-lg text-muted-foreground">
            {query
              ? 'No products found matching your search.'
              : 'No products available at this time.'}
          </p>
        </div>
      )}
    </div>
  );
}
