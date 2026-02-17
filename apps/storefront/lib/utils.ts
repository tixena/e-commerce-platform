import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { STRAPI_URL, DEFAULT_CURRENCY, DEFAULT_LOCALE } from "./constants"
import type { StrapiMedia } from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a price amount with currency
 */
export function formatPrice(
  amount: number,
  currencyCode: string = DEFAULT_CURRENCY,
  locale: string = DEFAULT_LOCALE
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
  }).format(amount)
}

/**
 * Get the full URL for a Strapi media asset
 */
export function getStrapiImageUrl(media: StrapiMedia | null | undefined): string {
  if (!media?.url) {
    return '/placeholder.svg'
  }

  // If the URL is already absolute, return it
  if (media.url.startsWith('http')) {
    return media.url
  }

  // Otherwise, prepend the Strapi URL
  return `${STRAPI_URL}${media.url}`
}

/**
 * Get the URL for a specific image format
 */
export function getStrapiImageFormatUrl(
  media: StrapiMedia | null | undefined,
  format: 'thumbnail' | 'small' | 'medium' | 'large'
): string {
  if (!media?.formats?.[format]?.url) {
    return getStrapiImageUrl(media)
  }

  const formatUrl = media.formats[format].url

  if (formatUrl.startsWith('http')) {
    return formatUrl
  }

  return `${STRAPI_URL}${formatUrl}`
}

/**
 * Generate a unique ID for client-side use
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}
