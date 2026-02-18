import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductDetails } from '@/components/product/product-details';
import { ProductGrid } from '@/components/product/product-grid';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { getProductByHandle, getProducts } from '@/lib/strapi/products';
import { LIMITS } from '@/lib/constants';

interface ProductPageProps {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: product.seo?.metaTitle ?? product.title,
    description: product.seo?.metaDescription ?? product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  // Fetch related products from the same collections
  const collectionHandles = product.collections?.map((c) => c.handle) ?? [];
  let relatedProducts: Awaited<ReturnType<typeof getProducts>>['products'] = [];

  if (collectionHandles.length > 0) {
    const { products } = await getProducts({
      collectionHandle: collectionHandles[0],
      limit: LIMITS.RELATED_PRODUCTS + 1,
    });
    relatedProducts = products
      .filter((p) => p.id !== product.id)
      .slice(0, LIMITS.RELATED_PRODUCTS);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: product.title },
        ]}
      />

      <ProductDetails product={product} />

      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">Related Products</h2>
          <ProductGrid products={relatedProducts} />
        </section>
      )}
    </div>
  );
}
