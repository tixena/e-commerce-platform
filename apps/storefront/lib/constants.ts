export const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
export const STRAPI_API_URL = `${STRAPI_URL}/api`;

export const DEFAULT_CURRENCY = 'USD';
export const DEFAULT_LOCALE = 'en-US';

export const LIMITS = {
  PRODUCTS_PER_PAGE: 25,
  FEATURED_PRODUCTS: 8,
  RELATED_PRODUCTS: 4,
  QUANTITY_MIN: 1,
  QUANTITY_MAX: 99,
} as const;
