import type { StrapiMedia, StrapiSeo } from './strapi';

export interface ProductOption {
  id: number;
  name: string;
  values: string[];
}

export interface SelectedOption {
  name: string;
  value: string;
}

export interface ProductVariant {
  id: number;
  title: string;
  availableForSale: boolean;
  selectedOptions: SelectedOption[];
  priceAmount: number;
  priceCurrencyCode: string;
  sku?: string;
}

export interface Product {
  id: number;
  documentId: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml?: string;
  availableForSale: boolean;
  featuredImage: StrapiMedia;
  images?: StrapiMedia[];
  tags?: string[];
  seo?: StrapiSeo;
  options?: ProductOption[];
  variants: ProductVariant[];
  collections?: ProductCollection[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface ProductCollection {
  id: number;
  documentId: string;
  title: string;
  handle: string;
}

export interface ProductListItem {
  id: number;
  documentId: string;
  title: string;
  handle: string;
  availableForSale: boolean;
  featuredImage: StrapiMedia;
  variants: Pick<ProductVariant, 'id' | 'priceAmount' | 'priceCurrencyCode'>[];
}
