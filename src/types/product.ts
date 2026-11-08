export type ProductCategory = 'tops' | 'bottoms' | 'layers' | 'jackets' | 'accessories';

export interface ProductColor {
  name: string;
  hex: string;
  borderHex?: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: ProductCategory;
  categoryName: string;
  collection: string;
  price: number;
  formattedPrice: string;
  badge?: string;
  tagline: string;
  description: string;
  editorialNote: string;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  fit: string;
  composition: string;
  care: string;
  specs: { [key: string]: string };
  isNewArrival: boolean;
  isFeaturedDrop: boolean;
  inStock: boolean;
}

export interface CollectionSummary {
  id: string;
  slug: string;
  number: string;
  name: string;
  category: ProductCategory;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  productCount: number;
}

