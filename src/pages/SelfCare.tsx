
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, Clock, Coffee, Heart, Phone, Book, 
  Moon, Sun, BellRing, Bell 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { 
  isNotificationSupported, 
  requestNotificationPermission,
  checkNotificationPermission,
  scheduleNotification,
  cancelScheduledNotification
} from '@/utils/notificationUtils';

interface Reminder {
  id: string;
  title: string;
  description: string;
  time: string;
  enabled: boolean;
  iconType: string;
  category: 'health' | 'social' | 'values';
  notificationId?: number; // Store the timer ID for scheduled notifications
}

// Helper function to get default reminders - defined before it's used
const getDefaultReminders = (): Reminder[] => {
  return [
    {
      id: '1',
      title: 'Drink Water',
      description: 'Stay hydrated throughout the day',
      time: '09:00',
      enabled: true,
      iconType: 'coffee',
      category: 'health'
    },
    {
      id: '2',
      title: 'Call Parents',
      description: 'Take time to connect with family',
      time: '18:00',
      enabled: true,
      iconType: 'phone',
      category: 'social'
    },
    {
      id: '3',
      title: 'Meditate',
      description: '10 minutes of mindfulness',
      time: '07:00',
      enabled: true,
      iconType: 'heart',
      category: 'health'
    },
    {
      id: '4',
      title: 'Read a Book',
      description: 'Expand your mind with reading',
      time: '21:00',
      enabled: false,
      iconType: 'book',
      category: 'values'
    },
    {
      id: '5',
      title: 'Go to Bed',
      description: 'Ensure you get enough sleep',
      time: '22:00',
      enabled: true,
      iconType: 'moon',
      category: 'health'
    },
    {
      id: '6',
      title: 'Morning Walk',
      description: 'Start your day with fresh air',
      time: '06:30',
      enabled: false,
      iconType: 'sun',
      category: 'health'
    },
  ];
};

const SelfCare = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(false);
  
  const [reminders, setReminders] = useState<Reminder[]>(() => {
    const savedReminders = localStorage.getItem('selfCareReminders');
    if (savedReminders) {
      try {
        return JSON.parse(savedReminders);
      } catch (error) {
        console.error("Failed to parse saved reminders:", error);
        // Return default reminders if parsing fails
        return getDefaultReminders();
      }
    }
    
    // Default reminders
    return getDefaultReminders();
  });

  // Helper function to get icon component based on iconType
  const getIconComponent = (iconType: string) => {
    switch (iconType) {
      case 'coffee':
        return <Coffee className="h-5 w-5" />;
      case 'phone':
        return <Phone className="h-5 w-5" />;
      case 'heart':
        return <Heart className="h-5 w-5" />;
      case 'book':
        return <Book className="h-5 w-5" />;
      case 'moon':
        return <Moon className="h-5 w-5" />;
      case 'sun':
        return <Sun className="h-5 w-5" />;
      default:
        return <Heart className="h-5 w-5" />;
    }
  };

  // Check notification permission on component mount
  useEffect(() => {
    const checkPermission = async () => {
      const supported = isNotificationSupported();
      if (!supported) {
        console.log("Browser doesn't support notifications");
        return;
      }
      
      const permissionGranted = checkNotificationPermission();
      setNotificationsEnabled(permissionGranted);
      
      if (permissionGranted) {
        // Schedule notifications for enabled reminders
        scheduleAllNotifications();
      }
    };
    
    checkPermission();
    
    // Cleanup function to cancel all notifications when component unmounts
    return () => {
      reminders.forEach(reminder => {
        if (reminder.notificationId) {
          cancelScheduledNotification(reminder.notificationId);
        }
      });
    };
  }, []);

  // Save reminders to localStorage when they change
  useEffect(() => {
    try {
      // We're saving the serializable data
      // Convert to a plain object without circular references
      const serializableReminders = reminders.map(reminder => ({
        ...reminder,
        // Don't include non-serializable properties
        icon: undefined
      }));
      
      localStorage.setItem('selfCareReminders', JSON.stringify(serializableReminders));
    } catch (error) {
      console.error("Error saving reminders to localStorage:", error);
      toast({
        title: "Error saving reminders",
        description: "Your reminders couldn't be saved. Please try again.",
        variant: "destructive"
      });
    }
  }, [reminders, toast]);

  // Schedule notifications for all enabled reminders
  const scheduleAllNotifications = () => {
    if (!notificationsEnabled) return;
    
    // Cancel any existing notifications first
    reminders.forEach(reminder => {
      if (reminder.notificationId) {
        cancelScheduledNotification(reminder.notificationId);
      }
    });
    
    // Schedule new notifications for enabled reminders
    const updatedReminders = reminders.map(reminder => {
      if (!reminder.enabled) return reminder;
      
      const [hours, minutes] = reminder.time.split(':').map(Number);
      const now = new Date();
      const scheduledTime = new Date();
      
      scheduledTime.setHours(hours, minutes, 0, 0);
      
      // If time has already passed today, schedule for tomorrow
      if (scheduledTime <= now) {
        scheduledTime.setDate(scheduledTime.getDate() + 1);
      }
      
      const notificationId = scheduleNotification(
        reminder.title,
        { 
          body: reminder.description,
          icon: '/favicon.ico'
        },
        scheduledTime
      );
      
      return {
        ...reminder,
        notificationId
      };
    });
    
    setReminders(updatedReminders);
  };

  // Request notification permission from user
  const handleEnableNotifications = async () => {
    const permissionGranted = await requestNotificationPermission();
    
    if (permissionGranted) {
      setNotificationsEnabled(true);
      scheduleAllNotifications();
      
      toast({
        title: "Notifications enabled",
        description: "You'll receive reminders at the scheduled times",
      });
    } else {
      toast({
        title: "Notifications blocked",
        description: "Please enable notifications in your browser settings to receive reminders",
        variant: "destructive"
      });
    }
  };

  const toggleReminder = (id: string) => {
    setReminders(prevReminders => 
      prevReminders.map(reminder => {
        if (reminder.id === id) {
          const updatedReminder = { ...reminder, enabled: !reminder.enabled };
          
          // Cancel existing notification if it exists
          if (reminder.notificationId) {
            cancelScheduledNotification(reminder.notificationId);
          }
          
          // Schedule new notification if enabled
          if (updatedReminder.enabled && notificationsEnabled) {
            const [hours, minutes] = updatedReminder.time.split(':').map(Number);
            const scheduledTime = new Date();
            scheduledTime.setHours(hours, minutes, 0, 0);
            
            // If time has already passed today, schedule for tomorrow
            if (scheduledTime <= new Date()) {
              scheduledTime.setDate(scheduledTime.getDate() + 1);
            }
            
            updatedReminder.notificationId = scheduleNotification(
              updatedReminder.title,
              { 
                body: updatedReminder.description,
                icon: '/favicon.ico'
              },
              scheduledTime
            );
          }
          
          // Show toast notification
          toast({
            title: updatedReminder.enabled ? `${reminder.title} reminder enabled` : `${reminder.title} reminder disabled`,
            description: updatedReminder.enabled ? `You'll be reminded at ${reminder.time}` : 'Reminder turned off',
          });
          
          return updatedReminder;
        }
        return reminder;
      })
    );
  };

  const updateReminderTime = (id: string, newTime: string) => {
    setReminders(prevReminders => 
      prevReminders.map(reminder => {
        if (reminder.id === id) {
          const updatedReminder = { ...reminder, time: newTime };
          
          // Reschedule notification if enabled
          if (updatedReminder.enabled && notificationsEnabled) {
            // Cancel existing notification if it exists
            if (reminder.notificationId) {
              cancelScheduledNotification(reminder.notificationId);
            }
            
            const [hours, minutes] = newTime.split(':').map(Number);
            const scheduledTime = new Date();
            scheduledTime.setHours(hours, minutes, 0, 0);
            
            // If time has already passed today, schedule for tomorrow
            if (scheduledTime <= new Date()) {
              scheduledTime.setDate(scheduledTime.getDate() + 1);
            }
            
            updatedReminder.notificationId = scheduleNotification(
              updatedReminder.title,
              { 
                body: updatedReminder.description,
                icon: '/favicon.ico'
              },
              scheduledTime
            );
          }
          
          return updatedReminder;
        }
        return reminder;
      })
    );
  };

  const filterRemindersByCategory = (category: 'health' | 'social' | 'values') => {
    return reminders.filter(reminder => reminder.category === category);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-light/30 to-blue-light/30 pb-10">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center">
          <Button variant="ghost" onClick={() => navigate('/dashboard')} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-purple-dark">Self-Care Reminders</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        <div className="space-y-6">
          <Card className="gradient-card border-purple-light/30">
            <CardHeader>
              <CardTitle className="text-xl text-purple-dark flex items-center gap-2">
                <Heart className="h-5 w-5 text-purple" />
                Balance Your Life
              </CardTitle>
              <p className="text-muted-foreground">
                Set reminders for important self-care activities and build healthy habits
              </p>
              
              {/* Notifications permission button */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BellRing className="h-5 w-5 text-purple" />
                  <span>Push Notifications</span>
                </div>
                {isNotificationSupported() ? (
                  notificationsEnabled ? (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-green-600">Enabled</span>
                      <Bell className="h-5 w-5 text-green-600" />
                    </div>
                  ) : (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={handleEnableNotifications}
                      className="text-purple border-purple hover:bg-purple/10"
                    >
                      Enable Notifications
                    </Button>
                  )
                ) : (
                  <span className="text-sm text-muted-foreground">Not supported in this browser</span>
                )}
              </div>
            </CardHeader>
          </Card>

          <Tabs defaultValue="health" className="space-y-4">
            <TabsList className="grid grid-cols-3 gap-2">
              <TabsTrigger value="health" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                <span>Health</span>
              </TabsTrigger>
              <TabsTrigger value="social" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>Social</span>
              </TabsTrigger>
              <TabsTrigger value="values" className="flex items-center gap-2">
                <Book className="h-4 w-4" />
                <span>Values</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="health" className="space-y-4">
              {filterRemindersByCategory('health').map(reminder => (
                <ReminderCard 
                  key={reminder.id}
                  reminder={reminder}
                  getIconComponent={getIconComponent}
                  toggleReminder={toggleReminder}
                  updateReminderTime={updateReminderTime}
                />
              ))}
            </TabsContent>

            <TabsContent value="social" className="space-y-4">
              {filterRemindersByCategory('social').map(reminder => (
                <ReminderCard 
                  key={reminder.id}
                  reminder={reminder}
                  getIconComponent={getIconComponent}
                  toggleReminder={toggleReminder}
                  updateReminderTime={updateReminderTime}
                />
              ))}
            </TabsContent>

            <TabsContent value="values" className="space-y-4">
              {filterRemindersByCategory('values').map(reminder => (
                <ReminderCard 
                  key={reminder.id}
                  reminder={reminder}
                  getIconComponent={getIconComponent}
                  toggleReminder={toggleReminder}
                  updateReminderTime={updateReminderTime}
                />
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

// Reminder Card Component
interface ReminderCardProps {
  reminder: Reminder;
  getIconComponent: (iconType: string) => React.ReactNode;
  toggleReminder: (id: string) => void;
  updateReminderTime: (id: string, newTime: string) => void;
}

const ReminderCard = ({ reminder, getIconComponent, toggleReminder, updateReminderTime }: ReminderCardProps) => {
  return (
    <Card className={`border ${reminder.enabled ? 'border-purple-light/50 bg-white' : 'border-gray-200 bg-gray-50'} transition-colors`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`rounded-full p-2 ${reminder.enabled ? 'bg-purple-light/20 text-purple' : 'bg-gray-200 text-gray-500'}`}>
              {getIconComponent(reminder.iconType)}
            </div>
            <div>
              <h3 className={`font-medium ${reminder.enabled ? 'text-foreground' : 'text-muted-foreground'}`}>
                {reminder.title}
              </h3>
              <p className="text-sm text-muted-foreground">{reminder.description}</p>
            </div>
          </div>
          <Switch 
            checked={reminder.enabled}
            onCheckedChange={() => toggleReminder(reminder.id)}
          />
        </div>
        <div className="mt-4 flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <Input
            type="time"
            value={reminder.time}
            onChange={(e) => updateReminderTime(reminder.id, e.target.value)}
            className={`w-32 ${reminder.enabled ? '' : 'opacity-60'}`}
            disabled={!reminder.enabled}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SelfCare;
