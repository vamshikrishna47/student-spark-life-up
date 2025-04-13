
/**
 * Utility functions for handling browser notifications
 */

// Check if browser notifications are supported
export const isNotificationSupported = (): boolean => {
  return 'Notification' in window;
};

// Request notification permission from user
export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!isNotificationSupported()) {
    console.warn('Notifications are not supported in this browser');
    return false;
  }
  
  try {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return false;
  }
};

// Check if notification permission is already granted
export const checkNotificationPermission = (): boolean => {
  if (!isNotificationSupported()) return false;
  return Notification.permission === 'granted';
};

// Schedule a notification to be shown at a specific time
export const scheduleNotification = (
  title: string,
  options: { body: string; icon?: string },
  scheduledTime: Date
): number => {
  const now = new Date();
  const timeUntilNotification = scheduledTime.getTime() - now.getTime();
  
  // If the time has already passed, don't schedule
  if (timeUntilNotification <= 0) return -1;
  
  // Schedule notification
  const timerId = window.setTimeout(() => {
    showNotification(title, options);
  }, timeUntilNotification);
  
  return timerId;
};

// Show an immediate notification
export const showNotification = (
  title: string,
  options: { body: string; icon?: string }
): void => {
  if (!checkNotificationPermission()) {
    console.warn('Notification permission not granted');
    return;
  }
  
  try {
    new Notification(title, options);
  } catch (error) {
    console.error('Error showing notification:', error);
  }
};

// Cancel a scheduled notification
export const cancelScheduledNotification = (timerId: number): void => {
  if (timerId > 0) {
    window.clearTimeout(timerId);
  }
};
