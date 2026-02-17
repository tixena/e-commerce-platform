import type { StrapiSeo } from './strapi';
import type { Product, ProductListItem } from './product';

export interface Collection {
  id: number;
  documentId: string;
  title: string;
  handle: string;
  description?: string;
  seo?: StrapiSeo;
  products?: Product[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface CollectionListItem {
  id: number;
  documentId: string;
  title: string;
  handle: string;
  description?: string;
  productCount?: number;
}

export interface CollectionWithProducts {
  id: number;
  documentId: string;
  title: string;
  handle: string;
  description?: string;
  seo?: StrapiSeo;
  products: ProductListItem[];
}
