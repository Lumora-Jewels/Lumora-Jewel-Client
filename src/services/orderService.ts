import { api } from '../utils/api';
import type { Order, CreateOrderRequest, UpdateOrderStatusRequest } from '../types/Order';

export const orderService = {
  // Create new order
  createOrder: async (orderData: CreateOrderRequest): Promise<Order> => {
    return api.post('/orders', orderData);
  },

  // Get all orders for user
  getOrders: async (params?: {
    userId?: string;
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<{ orders: Order[]; total: number; page: number; totalPages: number }> => {
    return api.get('/orders', { params });
  },

  // Get order by ID
  getOrderById: async (id: string): Promise<Order> => {
    return api.get(`/orders/${id}`);
  },

  // Update order status (admin only)
  updateOrderStatus: async (id: string, statusData: UpdateOrderStatusRequest): Promise<Order> => {
    return api.put(`/orders/${id}`, statusData);
  },

  // Delete order (admin only)
  deleteOrder: async (id: string): Promise<void> => {
    return api.delete(`/orders/${id}`);
  },
};
