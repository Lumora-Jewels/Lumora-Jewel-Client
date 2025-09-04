import type { Product } from './Products';

export interface CartItem {
  _id: string;
  productId: string;
  product: Product;
  quantity: number;
  selectedVariant?: {
    color?: string;
    size?: string;
    material?: string;
  };
  addedAt: Date;
}

export interface Cart {
  _id: string;
  userId: string;
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AddToCartRequest {
  productId: string;
  quantity: number;
  selectedVariant?: {
    color?: string;
    size?: string;
    material?: string;
  };
}

export interface UpdateCartItemRequest {
  quantity: number;
  selectedVariant?: {
    color?: string;
    size?: string;
    material?: string;
  };
}

export interface CartContextType {
  cart: Cart | null;
  isLoading: boolean;
  addToCart: (itemData: AddToCartRequest) => Promise<void>;
  updateCartItem: (itemId: string, updateData: UpdateCartItemRequest) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  loadCart: () => Promise<void>;
  getCartItemCount: () => number;
  getCartTotal: () => number;
}
