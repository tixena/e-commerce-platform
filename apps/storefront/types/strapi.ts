/**
 * Strapi API response wrapper types
 */

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: StrapiPagination;
  };
}

export interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface StrapiData<T> {
  id: number;
  documentId: string;
  attributes: T;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface StrapiMedia {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: StrapiImageFormats | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
}

export interface StrapiImageFormats {
  thumbnail?: StrapiImageFormat;
  small?: StrapiImageFormat;
  medium?: StrapiImageFormat;
  large?: StrapiImageFormat;
}

export interface StrapiImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  url: string;
}

export interface StrapiSeo {
  id: number;
  metaTitle: string;
  metaDescription: string;
  shareImage?: StrapiMedia;
}

export interface StrapiErrorDetails {
  [key: string]: string | number | boolean | StrapiErrorDetails | StrapiErrorDetails[];
}

export interface StrapiError {
  status: number;
  name: string;
  message: string;
  details: StrapiErrorDetails;
}
