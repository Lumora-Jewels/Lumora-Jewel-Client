import { api } from '../utils/api';
import type { Cart, AddToCartRequest, UpdateCartItemRequest } from '../types/Cart';

export const cartService = {
  // Get user's cart
  getCart: async (userId: string): Promise<Cart> => {
    return api.get(`/cart/${userId}`);
  },

  // Add item to cart
  addItem: async (itemData: AddToCartRequest): Promise<Cart> => {
    return api.post('/cart', itemData);
  },

  // Update cart item
  updateItem: async (cartId: string, itemId: string, updateData: UpdateCartItemRequest): Promise<Cart> => {
    return api.put(`/cart/${cartId}/item/${itemId}`, updateData);
  },

  // Remove item from cart
  removeItem: async (cartId: string, itemId: string): Promise<Cart> => {
    return api.delete(`/cart/${cartId}/item/${itemId}`);
  },

  // Clear entire cart
  clearCart: async (userId: string): Promise<void> => {
    return api.delete(`/cart/clear/${userId}`);
  },
};
