import { api } from '../utils/api';
import type { User } from '../types/Auth';

export const userService = {
  // Create user (admin only)
  createUser: async (userData: Omit<User, '_id' | 'createdAt' | 'updatedAt'>): Promise<User> => {
    return api.post('/users', userData);
  },

  // Get all users (admin only)
  getUsers: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<{ users: User[]; total: number; page: number; totalPages: number }> => {
    return api.get('/users', { params });
  },

  // Get user by ID
  getUserById: async (id: string): Promise<User> => {
    return api.get(`/users/${id}`);
  },

  // Update user
  updateUser: async (id: string, userData: Partial<User>): Promise<User> => {
    return api.put(`/users/${id}`, userData);
  },

  // Delete user (admin only)
  deleteUser: async (id: string): Promise<void> => {
    return api.delete(`/users/${id}`);
  },
};
