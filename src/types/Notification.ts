export interface Notification {
  _id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'order' | 'payment' | 'promotion';
  isRead: boolean;
  data?: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateNotificationRequest {
  userId: string;
  title: string;
  message: string;
  type: Notification['type'];
  data?: any;
}

export interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (notificationId: string) => Promise<void>;
  deleteNotification: (notificationId: string) => Promise<void>;
  clearAllNotifications: () => Promise<void>;
  isLoading: boolean;
}




