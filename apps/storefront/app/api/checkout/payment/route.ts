import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const paymentData = await request.json();

  console.log('Processing payment:', JSON.stringify(paymentData));

  if (!paymentData.cardNumber || !paymentData.cvv) {
    console.error('Invalid payment data received:', paymentData);
    return NextResponse.json(
      { error: 'Invalid payment data', details: paymentData },
      { status: 400 }
    );
  }

  await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json({
    success: true,
    transactionId: `TXN-${Date.now()}`,
    cardLast4: paymentData.cardNumber.slice(-4),
    rawData: paymentData,
  });
}
