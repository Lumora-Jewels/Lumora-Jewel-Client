import { api } from '../utils/api';
import type { LoginRequest, RegisterRequest, AuthResponse, User } from '../types/Auth';

export const authService = {
  // Login user
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    return api.post<AuthResponse>('/auth/login', credentials);
  },

  // Register user
  register: async (userData: RegisterRequest): Promise<AuthResponse> => {
    return api.post<AuthResponse>('/auth/register', userData);
  },

  // Get user profile
  getProfile: async (): Promise<User> => {
    return api.get<User>('/auth/profile');
  },

  // Logout (client-side only, server doesn't need to be called)
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    const token = localStorage.getItem('authToken');
    return !!token;
  },

  // Get stored user data
  getStoredUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  },

  // Store auth data
  storeAuthData: (authResponse: AuthResponse) => {
    localStorage.setItem('authToken', authResponse.token);
    localStorage.setItem('user', JSON.stringify(authResponse.user));
  },
};
