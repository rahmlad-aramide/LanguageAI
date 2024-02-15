'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Notification {
  message: string;
  type: 'success' | 'error';
}

interface NotificationContextType {
  notify: (message: string, type: 'success' | 'error') => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  const notify = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      {notification && <NotificationComponent message={notification.message} type={notification.type} />}
    </NotificationContext.Provider>
  );
};


interface NotificationComponentProps {
  message: string;
  type: 'success' | 'error';
}

// Notification Component
const NotificationComponent: React.FC<NotificationComponentProps> = ({ message, type }) => {
  const notificationStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: type === 'error' ? '#ffcccc' : '#ccffcc',
    color: type === 'error' ? '#ff0000' : '#008000',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    zIndex: 1000,
  };

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  );
};
