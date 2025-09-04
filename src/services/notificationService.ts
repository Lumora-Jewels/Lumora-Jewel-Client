import { api } from '../utils/api';
import type { Notification, CreateNotificationRequest } from '../types/Notification';

export const notificationService = {
  // Create notification
  createNotification: async (notificationData: CreateNotificationRequest): Promise<Notification> => {
    return api.post('/notifications', notificationData);
  },

  // Get notifications by user
  getNotificationsByUser: async (userId: string): Promise<Notification[]> => {
    return api.get(`/notifications/user/${userId}`);
  },

  // Mark notification as read
  markAsRead: async (id: string): Promise<Notification> => {
    return api.put(`/notifications/read/${id}`);
  },

  // Delete notification
  deleteNotification: async (id: string): Promise<void> => {
    return api.delete(`/notifications/${id}`);
  },
};
