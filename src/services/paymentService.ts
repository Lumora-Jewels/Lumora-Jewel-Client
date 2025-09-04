import { api } from '../utils/api';
import type { Payment, CreatePaymentRequest, UpdatePaymentStatusRequest } from '../types/Payment';

export const paymentService = {
  // Create payment
  createPayment: async (paymentData: CreatePaymentRequest): Promise<Payment> => {
    return api.post('/payments', paymentData);
  },

  // Update payment status
  updatePaymentStatus: async (statusData: UpdatePaymentStatusRequest): Promise<Payment> => {
    return api.put('/payments/status', statusData);
  },

  // Get all payments
  getPayments: async (params?: {
    userId?: string;
    orderId?: string;
    status?: string;
    page?: number;
    limit?: number;
  }): Promise<{ payments: Payment[]; total: number; page: number; totalPages: number }> => {
    return api.get('/payments', { params });
  },

  // Get payment by ID
  getPaymentById: async (id: string): Promise<Payment> => {
    return api.get(`/payments/${id}`);
  },
};
