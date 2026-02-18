import { NextRequest, NextResponse } from 'next/server';
import { STRAPI_URL } from '@/lib/constants';

const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const ids = searchParams.get('ids');

  if (!ids) {
    return NextResponse.json({ data: [] });
  }

  const productIds = ids.split(',').filter(Boolean);

  if (productIds.length === 0) {
    return NextResponse.json({ data: [] });
  }

  const params = productIds.map((id) => `filters[id][$in]=${id}`).join('&');
  const url = `${STRAPI_URL}/api/products?${params}&populate=featuredImage&populate=variants`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (STRAPI_API_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`;
  }

  const res = await fetch(url, { headers });

  if (!res.ok) {
    return NextResponse.json({ data: [] }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
