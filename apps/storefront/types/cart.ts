import type { Product, ProductVariant } from './product';

export interface CartLine {
  id: string;
  variantId: number;
  productId: number;
  quantity: number;
}

export interface CartLineWithProduct extends CartLine {
  product: Product;
  variant: ProductVariant;
}

export interface Cart {
  id: string;
  lines: CartLine[];
  createdAt: string;
  updatedAt: string;
}

export interface CartWithTotals {
  id: string;
  lines: CartLineWithProduct[];
  totalQuantity: number;
  subtotalAmount: number;
  currencyCode: string;
  createdAt: string;
  updatedAt: string;
}

export interface AddToCartInput {
  productId: number;
  variantId: number;
  quantity?: number;
}

export interface UpdateCartLineInput {
  lineId: string;
  quantity: number;
}
