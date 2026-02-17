import { strapiClient } from './client';
import type { GlobalSettings } from '@/types';

export async function getGlobalSettings(): Promise<GlobalSettings | null> {
  const endpoint = '/global?populate=favicon&populate=defaultSeo';

  try {
    const response = await strapiClient<{ data: GlobalSettings }>(endpoint, {
      next: { revalidate: 300, tags: ['global'] },
    });
    return response.data;
  } catch {
    return null;
  }
}
