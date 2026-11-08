import { Product } from './product';

export interface CartItem {
  id: string; // unique item id based on product.id + size + color
  productId: string;
  product: Product;
  size: string;
  color: string;
  quantity: number;
  addedAt: number;
}

export interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: Product, size: string, color: string, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalCount: () => number;
  getSubtotal: () => number;
}

