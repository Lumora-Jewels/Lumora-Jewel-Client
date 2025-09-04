import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';

// API Configuration
const CATEGORY_SERVICE_URL = import.meta.env.VITE_CATEGORY_SERVICE_URL || 'http://localhost:3004';
const AUTH_SERVICE_URL = import.meta.env.VITE_AUTH_SERVICE_URL || 'http://localhost:3002';
const PRODUCT_SERVICE_URL = import.meta.env.VITE_PRODUCT_SERVICE_URL || 'http://localhost:3003';
const USER_SERVICE_URL = import.meta.env.VITE_USER_SERVICE_URL || 'http://localhost:3001';
const CART_SERVICE_URL = import.meta.env.VITE_CART_SERVICE_URL || 'http://localhost:3005';
const ORDER_SERVICE_URL = import.meta.env.VITE_ORDER_SERVICE_URL || 'http://localhost:3006';
const PAYMENT_SERVICE_URL = import.meta.env.VITE_PAYMENT_SERVICE_URL || 'http://localhost:3007';
const NOTIFICATION_SERVICE_URL = import.meta.env.VITE_NOTIFICATION_SERVICE_URL || 'http://localhost:3008';

// Create axios instances for different services
const createApiClient = (baseURL: string): AxiosInstance => {
  return axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

const categoryApiClient = createApiClient(CATEGORY_SERVICE_URL);
const authApiClient = createApiClient(AUTH_SERVICE_URL);
const productApiClient = createApiClient(PRODUCT_SERVICE_URL);
const userApiClient = createApiClient(USER_SERVICE_URL);
const cartApiClient = createApiClient(CART_SERVICE_URL);
const orderApiClient = createApiClient(ORDER_SERVICE_URL);
const paymentApiClient = createApiClient(PAYMENT_SERVICE_URL);
const notificationApiClient = createApiClient(NOTIFICATION_SERVICE_URL);

// Add interceptors to all clients
const addInterceptors = (client: AxiosInstance) => {
  // Request interceptor to add auth token
  client.interceptors.request.use(
    (config: any) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: any) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor for error handling
  client.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: any) => {
      if (error.response?.status === 401) {
        // Token expired or invalid
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
};

// Add interceptors to all clients
addInterceptors(categoryApiClient);
addInterceptors(authApiClient);
addInterceptors(productApiClient);
addInterceptors(userApiClient);
addInterceptors(cartApiClient);
addInterceptors(orderApiClient);
addInterceptors(paymentApiClient);
addInterceptors(notificationApiClient);

// Generic API methods for different services
export const api = {
  // Category service methods
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    categoryApiClient.get(url, config).then((response: any) => response.data),
  
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    categoryApiClient.post(url, data, config).then((response: any) => response.data),
  
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    categoryApiClient.put(url, data, config).then((response: any) => response.data),
  
  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    categoryApiClient.delete(url, config).then((response: any) => response.data),
  
  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    categoryApiClient.patch(url, data, config).then((response: any) => response.data),
};

// Service-specific API clients
export const authApi = {
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    authApiClient.get(url, config).then((response: any) => response.data),
  
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    authApiClient.post(url, data, config).then((response: any) => response.data),
  
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    authApiClient.put(url, data, config).then((response: any) => response.data),
  
  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    authApiClient.delete(url, config).then((response: any) => response.data),
  
  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    authApiClient.patch(url, data, config).then((response: any) => response.data),
};

export const productApi = {
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    productApiClient.get(url, config).then((response: any) => response.data),
  
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    productApiClient.post(url, data, config).then((response: any) => response.data),
  
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    productApiClient.put(url, data, config).then((response: any) => response.data),
  
  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    productApiClient.delete(url, config).then((response: any) => response.data),
  
  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    productApiClient.patch(url, data, config).then((response: any) => response.data),
};

export const userApi = {
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    userApiClient.get(url, config).then((response: any) => response.data),
  
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    userApiClient.post(url, data, config).then((response: any) => response.data),
  
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    userApiClient.put(url, data, config).then((response: any) => response.data),
  
  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    userApiClient.delete(url, config).then((response: any) => response.data),
  
  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    userApiClient.patch(url, data, config).then((response: any) => response.data),
};

export const cartApi = {
  get: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    cartApiClient.get(url, config).then((response: any) => response.data),
  
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    cartApiClient.post(url, data, config).then((response: any) => response.data),
  
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    cartApiClient.put(url, data, config).then((response: any) => response.data),
  
  delete: <T = any>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    cartApiClient.delete(url, config).then((response: any) => response.data),
  
  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    cartApiClient.patch(url, data, config).then((response: any) => response.data),
};

export default categoryApiClient;
