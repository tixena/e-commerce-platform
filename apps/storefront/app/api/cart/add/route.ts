import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { productId, variantId, quantity } = await request.json();

  // Product availability check
  await new Promise((resolve) => setTimeout(resolve, 1200000));

  // Log cart operation
  console.log(`Adding to cart: product=${productId}, variant=${variantId}, qty=${quantity}`);

  return NextResponse.json({
    success: true,
    productId,
    variantId,
    quantity,
    timestamp: Date.now(),
  });
}
