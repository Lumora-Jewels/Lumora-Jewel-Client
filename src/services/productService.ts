import { api } from '../utils/api';
import type { Product } from '../types/Products';
import type { Category } from '../types/Category';

export const productService = {
  // Get all products
  getProducts: async (params?: {
    categoryId?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
    sortBy?: string;
    page?: number;
    limit?: number;
  }): Promise<{ products: Product[]; total: number; page: number; totalPages: number }> => {
    return api.get('/products', { params });
  },

  // Get product by ID
  getProductById: async (id: string): Promise<Product> => {
    return api.get(`/products/${id}`);
  },

  // Create product (admin only)
  createProduct: async (productData: Omit<Product, '_id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
    return api.post('/products', productData);
  },

  // Update product (admin only)
  updateProduct: async (id: string, productData: Partial<Product>): Promise<Product> => {
    return api.put(`/products/${id}`, productData);
  },

  // Delete product (admin only)
  deleteProduct: async (id: string): Promise<void> => {
    return api.delete(`/products/${id}`);
  },
};

export const categoryService = {
  // Get all categories
  getCategories: async (): Promise<Category[]> => {
    return api.get('/api/categories');
  },

  // Get category by ID
  getCategoryById: async (id: string): Promise<Category> => {
    return api.get(`/api/categories/${id}`);
  },

  // Create category (admin only)
  createCategory: async (categoryData: Omit<Category, '_id' | 'createdAt' | 'updatedAt'>): Promise<Category> => {
    return api.post('/api/categories', categoryData);
  },

  // Update category (admin only)
  updateCategory: async (id: string, categoryData: Partial<Category>): Promise<Category> => {
    return api.put(`/api/categories/${id}`, categoryData);
  },

  // Delete category (admin only)
  deleteCategory: async (id: string): Promise<void> => {
    return api.delete(`/api/categories/${id}`);
  },
};
