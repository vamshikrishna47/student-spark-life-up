
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Clock, Coffee, Heart, Phone, Book, Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface Reminder {
  id: string;
  title: string;
  description: string;
  time: string;
  enabled: boolean;
  iconType: string; // Changed from icon React.ReactNode to string type for serialization
  category: 'health' | 'social' | 'values';
}

const SelfCare = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
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

  // Helper function to get default reminders
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

  // Save reminders to localStorage when they change
  useEffect(() => {
    // Ensure we're only saving serializable data
    localStorage.setItem('selfCareReminders', JSON.stringify(reminders));
  }, [reminders]);

  const toggleReminder = (id: string) => {
    setReminders(prevReminders => 
      prevReminders.map(reminder => {
        if (reminder.id === id) {
          const updatedReminder = { ...reminder, enabled: !reminder.enabled };
          
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
          return { ...reminder, time: newTime };
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
