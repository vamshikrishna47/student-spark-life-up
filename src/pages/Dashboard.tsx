
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Smile, 
  Frown, 
  Meh, 
  BookOpen, 
  Clock, 
  MessageCircle, 
  PenTool, 
  Heart, 
  LineChart,
  LogOut
} from 'lucide-react';
import { useToast } from '../hooks/use-toast';

type Mood = 'happy' | 'neutral' | 'sad' | null;

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentMood, setCurrentMood] = useState<Mood>(null);

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      toast({
        title: 'Logged out successfully',
        description: 'Hope to see you soon!',
      });
      navigate('/');
    } else {
      toast({
        variant: 'destructive',
        title: 'Logout failed',
        description: result.error || 'Please try again',
      });
    }
  };

  const features = [
    {
      title: "AI Buddy Chat",
      icon: <MessageCircle className="h-6 w-6 text-purple" />,
      path: "/chat",
      description: "Talk through your emotions and get supportive guidance"
    },
    {
      title: "Focus Mode",
      icon: <Clock className="h-6 w-6 text-purple" />,
      path: "/focus",
      description: "Stay productive with Pomodoro timers"
    },
    {
      title: "Learning Zone",
      icon: <BookOpen className="h-6 w-6 text-purple" />,
      path: "/learn",
      description: "Step-by-step tech learning paths"
    },
    {
      title: "Journal",
      icon: <PenTool className="h-6 w-6 text-purple" />,
      path: "/journal",
      description: "Reflect on your day and track your thoughts"
    },
    {
      title: "Self-Care",
      icon: <Heart className="h-6 w-6 text-purple" />,
      path: "/self-care",
      description: "Reminders for balanced living"
    },
    {
      title: "Progress",
      icon: <LineChart className="h-6 w-6 text-purple" />,
      path: "/progress",
      description: "Track your mood and habit progress"
    }
  ];

  const handleMoodSelect = (mood: Mood) => {
    setCurrentMood(mood);
    toast({
      title: "Mood logged successfully",
      description: `You're feeling ${mood === 'happy' ? 'happy 😊' : mood === 'neutral' ? 'neutral 😐' : 'sad 😔'} today.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-light/30 to-blue-light/30 pb-10">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-dark">Student Spark</h1>
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground hidden md:block">
              {currentUser?.email}
            </p>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Greeting */}
        <section className="mb-8">
          <h2 className="text-3xl font-bold text-purple-dark mb-2">
            Hello, {currentUser?.email?.split('@')[0] || 'Friend'}! 👋
          </h2>
          <p className="text-muted-foreground">
            How are you feeling today? Let's make progress together.
          </p>
        </section>

        {/* Mood Tracker */}
        <section className="mb-10">
          <Card className="gradient-card border-purple-light/50">
            <CardHeader>
              <CardTitle className="text-xl text-purple-dark">
                How are you feeling today?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center gap-8">
                <Button 
                  variant={currentMood === 'happy' ? 'default' : 'outline'} 
                  className={`rounded-full p-4 hover-lift ${currentMood === 'happy' ? 'bg-purple text-white' : 'border-purple text-purple hover:text-purple-dark'}`}
                  onClick={() => handleMoodSelect('happy')}
                >
                  <Smile className="h-10 w-10" />
                </Button>
                <Button 
                  variant={currentMood === 'neutral' ? 'default' : 'outline'} 
                  className={`rounded-full p-4 hover-lift ${currentMood === 'neutral' ? 'bg-purple text-white' : 'border-purple text-purple hover:text-purple-dark'}`}
                  onClick={() => handleMoodSelect('neutral')}
                >
                  <Meh className="h-10 w-10" />
                </Button>
                <Button 
                  variant={currentMood === 'sad' ? 'default' : 'outline'} 
                  className={`rounded-full p-4 hover-lift ${currentMood === 'sad' ? 'bg-purple text-white' : 'border-purple text-purple hover:text-purple-dark'}`}
                  onClick={() => handleMoodSelect('sad')}
                >
                  <Frown className="h-10 w-10" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Features Grid */}
        <section>
          <h3 className="text-2xl font-bold text-purple-dark mb-6">
            What would you like to do today?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="gradient-card hover-lift cursor-pointer" onClick={() => navigate(feature.path)}>
                <CardContent className="p-6 flex items-start space-x-4">
                  <div className="h-12 w-12 rounded-full bg-purple/10 flex items-center justify-center shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
