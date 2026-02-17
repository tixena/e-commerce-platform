import { STRAPI_API_URL } from '../constants';
import type { StrapiError } from '@/types';

const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

export interface FetchOptions extends RequestInit {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

export interface StrapiClientError {
  type: 'StrapiClientError';
  status: number;
  name: string;
  message: string;
  details: StrapiError['details'];
}

export function createStrapiError(error: StrapiError): StrapiClientError {
  return {
    type: 'StrapiClientError',
    status: error.status,
    name: error.name,
    message: error.message,
    details: error.details,
  };
}

export function isStrapiError(error: Error | StrapiClientError): error is StrapiClientError {
  return (error as StrapiClientError).type === 'StrapiClientError';
}

export async function strapiClient<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const url = `${STRAPI_API_URL}${endpoint}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (STRAPI_API_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`;
  }

  const response = await fetch(url, {
    headers: {
      ...headers,
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      error: {
        status: response.status,
        name: 'FetchError',
        message: `Failed to fetch: ${response.statusText}`,
        details: {},
      },
    }));

    throw createStrapiError(errorData.error);
  }

  return response.json();
}

export function buildPopulate(fields: string[]): string {
  return fields.map((field) => `populate=${field}`).join('&');
}

type FilterValue = string | number | boolean;
type FilterObject = { [key: string]: FilterValue | FilterObject };

export function buildFilters(filters: FilterObject): string {
  const params = new URLSearchParams();

  const addFilter = (key: string, value: FilterValue | FilterObject, prefix = 'filters'): void => {
    if (typeof value === 'object' && value !== null) {
      Object.entries(value).forEach(([k, v]) => {
        addFilter(`${prefix}[${key}][${k}]`, v, '');
      });
    } else {
      params.append(`${prefix}[${key}]`, String(value));
    }
  };

  Object.entries(filters).forEach(([key, value]) => {
    addFilter(key, value);
  });

  return params.toString();
}
