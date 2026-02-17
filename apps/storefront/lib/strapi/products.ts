import { strapiClient } from './client';
import type { Product, ProductListItem, StrapiResponse } from '@/types';

const PRODUCT_POPULATE = 'populate=featuredImage&populate=images&populate=seo&populate=seo.shareImage&populate=options&populate=variants&populate=collections';

interface GetProductsOptions {
  limit?: number;
  page?: number;
  featured?: boolean;
  collectionHandle?: string;
}

interface GetProductsResult {
  products: Product[];
  total: number;
}

export async function getProducts(
  options: GetProductsOptions = {}
): Promise<GetProductsResult> {
  const { limit = 25, page = 1, featured, collectionHandle } = options;

  let endpoint = `/products?${PRODUCT_POPULATE}&pagination[page]=${page}&pagination[pageSize]=${limit}`;

  if (featured) {
    endpoint += '&filters[tags][$contains]=featured';
  }

  if (collectionHandle) {
    endpoint += `&filters[collections][handle][$eq]=${collectionHandle}`;
  }

  const response = await strapiClient<StrapiResponse<Product[]>>(endpoint, {
    next: { revalidate: 60, tags: ['products'] },
  });

  return {
    products: response.data,
    total: response.meta.pagination?.total ?? 0,
  };
}

export async function getProductByHandle(
  handle: string
): Promise<Product | null> {
  const endpoint = `/products?${PRODUCT_POPULATE}&filters[handle][$eq]=${handle}`;

  const response = await strapiClient<StrapiResponse<Product[]>>(endpoint, {
    next: { revalidate: 300, tags: ['products', `product-${handle}`] },
  });

  return response.data[0] ?? null;
}

export async function getProductById(id: number): Promise<Product | null> {
  const endpoint = `/products/${id}?${PRODUCT_POPULATE}`;

  try {
    const response = await strapiClient<{ data: Product }>(endpoint, {
      next: { revalidate: 300, tags: ['products', `product-${id}`] },
    });
    return response.data;
  } catch {
    return null;
  }
}

export async function searchProducts(query: string): Promise<ProductListItem[]> {
  const endpoint = `/products?populate=featuredImage&populate=variants&filters[$or][0][title][$containsi]=${encodeURIComponent(query)}&filters[$or][1][description][$containsi]=${encodeURIComponent(query)}`;

  const response = await strapiClient<StrapiResponse<ProductListItem[]>>(
    endpoint,
    { next: { revalidate: 60 } }
  );

  return response.data;
}

export async function getProductsByCollection(
  collectionHandle: string,
  options: { limit?: number; page?: number } = {}
): Promise<GetProductsResult> {
  return getProducts({ ...options, collectionHandle });
}

export async function getAllProductHandles(): Promise<string[]> {
  const endpoint = '/products?fields[0]=handle&pagination[pageSize]=100';

  const response = await strapiClient<
    StrapiResponse<Array<{ handle: string }>>
  >(endpoint, {
    next: { revalidate: 3600 },
  });

  return response.data.map((p) => p.handle);
}
