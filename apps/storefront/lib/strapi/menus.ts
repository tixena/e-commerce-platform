import { strapiClient } from './client';
import type { Menu, StrapiResponse } from '@/types';

export async function getMenu(handle: string): Promise<Menu | null> {
  const endpoint = `/menus?populate=items&filters[handle][$eq]=${handle}`;

  const response = await strapiClient<StrapiResponse<Menu[]>>(endpoint, {
    next: { revalidate: 300, tags: ['menus', `menu-${handle}`] },
  });

  const menu = response.data[0];

  if (!menu) return null;

  return {
    ...menu,
    items: [...menu.items].sort((a, b) => a.order - b.order),
  };
}

export async function getMainMenu(): Promise<Menu | null> {
  return getMenu('main');
}

export async function getFooterMenu(): Promise<Menu | null> {
  return getMenu('footer');
}
