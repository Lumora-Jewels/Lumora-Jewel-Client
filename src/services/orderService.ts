import { orderApi } from '../utils/api';
import type { Order, CreateOrderRequest, UpdateOrderStatusRequest } from '../types/Order';

export const orderService = {
  // Create new order
  createOrder: async (orderData: CreateOrderRequest): Promise<Order> => {
    return orderApi.post('/api/orders', orderData);
  },

  // Get all orders for user
  getOrders: async (params?: {
    userId?: string;
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<{ orders: Order[]; total: number; page: number; totalPages: number }> => {
    return orderApi.get('/api/orders', { params });
  },

  // Get order by ID
  getOrderById: async (id: string): Promise<Order> => {
    return orderApi.get(`/api/orders/${id}`);
  },

  // Update order status (admin only)
  updateOrderStatus: async (id: string, statusData: UpdateOrderStatusRequest): Promise<Order> => {
    return orderApi.put(`/api/orders/${id}`, statusData);
  },

  // Delete order (admin only)
  deleteOrder: async (id: string): Promise<void> => {
    return orderApi.delete(`/api/orders/${id}`);
  },
};
