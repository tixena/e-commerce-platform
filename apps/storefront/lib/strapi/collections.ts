import { strapiClient } from './client';
import type {
  Collection,
  CollectionListItem,
  CollectionWithProducts,
  StrapiResponse,
} from '@/types';

const COLLECTION_POPULATE = 'populate=seo&populate=seo.shareImage';
const COLLECTION_WITH_PRODUCTS_POPULATE = `${COLLECTION_POPULATE}&populate=products&populate=products.featuredImage&populate=products.variants`;

export async function getCollections(): Promise<CollectionListItem[]> {
  const endpoint = `/collections?fields[0]=title&fields[1]=handle&fields[2]=description`;

  const response = await strapiClient<StrapiResponse<CollectionListItem[]>>(
    endpoint,
    { next: { revalidate: 60, tags: ['collections'] } }
  );

  return response.data;
}

export async function getCollectionByHandle(
  handle: string
): Promise<Collection | null> {
  const endpoint = `/collections?${COLLECTION_POPULATE}&filters[handle][$eq]=${handle}`;

  const response = await strapiClient<StrapiResponse<Collection[]>>(endpoint, {
    next: { revalidate: 300, tags: ['collections', `collection-${handle}`] },
  });

  return response.data[0] ?? null;
}

export async function getCollectionWithProducts(
  handle: string
): Promise<CollectionWithProducts | null> {
  const endpoint = `/collections?${COLLECTION_WITH_PRODUCTS_POPULATE}&filters[handle][$eq]=${handle}`;

  const response = await strapiClient<StrapiResponse<CollectionWithProducts[]>>(
    endpoint,
    { next: { revalidate: 60, tags: ['collections', `collection-${handle}`] } }
  );

  return response.data[0] ?? null;
}

export async function getAllCollectionHandles(): Promise<string[]> {
  const endpoint = '/collections?fields[0]=handle&pagination[pageSize]=100';

  const response = await strapiClient<StrapiResponse<Array<{ handle: string }>>>(
    endpoint,
    { next: { revalidate: 3600 } }
  );

  return response.data.map((c) => c.handle);
}
