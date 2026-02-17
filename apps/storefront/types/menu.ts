export interface MenuItem {
  id: number;
  title: string;
  path: string;
  order: number;
}

export interface Menu {
  id: number;
  documentId: string;
  handle: string;
  items: MenuItem[];
}

export interface GlobalSettings {
  id: number;
  documentId: string;
  siteName: string;
  siteDescription?: string;
  favicon?: {
    url: string;
  };
  defaultSeo?: {
    metaTitle: string;
    metaDescription: string;
  };
}
