import { userApi } from '../utils/api';
import type { User } from '../types/Auth';

export const userService = {
  // Create user (admin only)
  createUser: async (userData: Omit<User, '_id' | 'createdAt' | 'updatedAt'>): Promise<User> => {
    return userApi.post('/api/users', userData);
  },

  // Get all users (admin only)
  getUsers: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<{ users: User[]; total: number; page: number; totalPages: number }> => {
    return userApi.get('/api/users', { params });
  },

  // Get user by ID
  getUserById: async (id: string): Promise<User> => {
    return userApi.get(`/api/users/${id}`);
  },

  // Update user
  updateUser: async (id: string, userData: Partial<User>): Promise<User> => {
    return userApi.put(`/api/users/${id}`, userData);
  },

  // Delete user (admin only)
  deleteUser: async (id: string): Promise<void> => {
    return userApi.delete(`/api/users/${id}`);
  },
};
