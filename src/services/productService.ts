import { productApi, api } from '../utils/api';
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
    const response = await productApi.get('/api/products', { params });
    
    // Handle different response structures
    if (Array.isArray(response)) {
      return {
        products: response,
        total: response.length,
        page: 1,
        totalPages: 1
      };
    } else if (response && response.products && Array.isArray(response.products)) {
      return response;
    } else {
      // Fallback structure
      return {
        products: [],
        total: 0,
        page: 1,
        totalPages: 1
      };
    }
  },

  // Get product by ID
  getProductById: async (id: string): Promise<Product> => {
    return productApi.get(`/api/products/${id}`);
  },

  // Create product (admin only)
  createProduct: async (productData: Omit<Product, '_id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
    return productApi.post('/api/products', productData);
  },

  // Update product (admin only)
  updateProduct: async (id: string, productData: Partial<Product>): Promise<Product> => {
    return productApi.put(`/api/products/${id}`, productData);
  },

  // Delete product (admin only)
  deleteProduct: async (id: string): Promise<void> => {
    return productApi.delete(`/api/products/${id}`);
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
