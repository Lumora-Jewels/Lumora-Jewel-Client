import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Cart, AddToCartRequest, UpdateCartItemRequest, CartContextType } from '../types/Cart';
import { cartService } from '../services/cartService';
import { useAuth } from './AuthContext';

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();

  // Load cart when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      loadCart();
    } else {
      setCart(null);
    }
  }, [isAuthenticated, user]);

  const loadCart = async (): Promise<void> => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      const cartData = await cartService.getCart(user._id);
      setCart(cartData);
    } catch (error) {
      console.error('Failed to load cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (itemData: AddToCartRequest): Promise<void> => {
    if (!user) throw new Error('User must be logged in to add items to cart');
    
    try {
      setIsLoading(true);
      
      // Transform the data to match backend expectations
      const cartRequest = {
        userId: user._id,
        productId: itemData.productId,
        quantity: itemData.quantity,
        variant: itemData.selectedVariant ? {
          color: itemData.selectedVariant.color,
          size: itemData.selectedVariant.size
        } : undefined,
        priceSnapshot: itemData.price || 0
      };
      
      const updatedCart = await cartService.addItem(cartRequest);
      setCart(updatedCart);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateCartItem = async (itemId: string, updateData: UpdateCartItemRequest): Promise<void> => {
    if (!cart || !user) return;
    
    try {
      setIsLoading(true);
      const updatedCart = await cartService.updateItem(cart._id, itemId, updateData);
      setCart(updatedCart);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (itemId: string): Promise<void> => {
    if (!cart || !user) return;
    
    try {
      setIsLoading(true);
      const updatedCart = await cartService.removeItem(cart._id, itemId);
      setCart(updatedCart);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async (): Promise<void> => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      await cartService.clearCart(user._id);
      setCart(null);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getCartItemCount = (): number => {
    return cart?.totalItems || 0;
  };

  const getCartTotal = (): number => {
    return cart?.totalPrice || 0;
  };

  const value: CartContextType = {
    cart,
    isLoading,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    loadCart,
    getCartItemCount,
    getCartTotal,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
