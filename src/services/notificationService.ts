import { notificationApi } from '../utils/api';
import type { Notification, CreateNotificationRequest } from '../types/Notification';

export const notificationService = {
  // Create notification
  createNotification: async (notificationData: CreateNotificationRequest): Promise<Notification> => {
    return notificationApi.post('/api/notifications', notificationData);
  },

  // Get notifications by user
  getNotificationsByUser: async (userId: string): Promise<Notification[]> => {
    return notificationApi.get(`/api/notifications/user/${userId}`);
  },

  // Mark notification as read
  markAsRead: async (id: string): Promise<Notification> => {
    return notificationApi.put(`/api/notifications/read/${id}`);
  },

  // Delete notification
  deleteNotification: async (id: string): Promise<void> => {
    return notificationApi.delete(`/api/notifications/${id}`);
  },
};
