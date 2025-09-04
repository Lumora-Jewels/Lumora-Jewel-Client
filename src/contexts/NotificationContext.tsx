import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Notification, NotificationContextType } from '../types/Notification';
import { notificationService } from '../services/notificationService';
import { useAuth } from './AuthContext';

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();

  // Load notifications when user is authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      loadNotifications();
    } else {
      setNotifications([]);
    }
  }, [isAuthenticated, user]);

  const loadNotifications = async (): Promise<void> => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      const notificationData = await notificationService.getNotificationsByUser(user._id);
      setNotifications(notificationData);
    } catch (error) {
      console.error('Failed to load notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (notificationId: string): Promise<void> => {
    try {
      setIsLoading(true);
      await notificationService.markAsRead(notificationId);
      setNotifications(prev => 
        prev.map(notification => 
          notification._id === notificationId 
            ? { ...notification, isRead: true }
            : notification
        )
      );
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteNotification = async (notificationId: string): Promise<void> => {
    try {
      setIsLoading(true);
      await notificationService.deleteNotification(notificationId);
      setNotifications(prev => 
        prev.filter(notification => notification._id !== notificationId)
      );
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const clearAllNotifications = async (): Promise<void> => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      // Delete all notifications for the user
      const deletePromises = notifications.map(notification => 
        notificationService.deleteNotification(notification._id)
      );
      await Promise.all(deletePromises);
      setNotifications([]);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const unreadCount = notifications.filter(notification => !notification.isRead).length;

  const value: NotificationContextType = {
    notifications,
    unreadCount,
    markAsRead,
    deleteNotification,
    clearAllNotifications,
    isLoading,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
