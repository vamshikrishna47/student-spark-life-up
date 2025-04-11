
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Play, Pause, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

type TimerMode = 'pomodoro' | 'shortBreak' | 'longBreak';

const FocusMode = () => {
  const [mode, setMode] = useState<TimerMode>('pomodoro');
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [sessions, setSessions] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Timer durations in seconds
  const durations = {
    pomodoro: 25 * 60, // 25 minutes
    shortBreak: 5 * 60, // 5 minutes
    longBreak: 15 * 60, // 15 minutes
  };

  // Change timer mode
  const switchMode = (newMode: TimerMode) => {
    setMode(newMode);
    setTimeLeft(durations[newMode]);
    setIsActive(false);
  };

  // Toggle timer active state
  const toggleTimer = () => {
    setIsActive(!isActive);
    
    if (!isActive && timeLeft === durations[mode]) {
      toast({
        title: `${mode === 'pomodoro' ? 'Focus session' : 'Break'} started`,
        description: `Stay ${mode === 'pomodoro' ? 'focused' : 'relaxed'} for the next ${formatTime(timeLeft)}`,
      });
    }
  };

  // Reset timer
  const resetTimer = () => {
    setTimeLeft(durations[mode]);
    setIsActive(false);
  };

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Calculate progress percentage
  const calculateProgress = () => {
    return 100 - (timeLeft / durations[mode] * 100);
  };

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      // Timer finished
      setIsActive(false);
      
      // If pomodoro session completed
      if (mode === 'pomodoro') {
        const newSessions = sessions + 1;
        setSessions(newSessions);
        
        toast({
          title: "Focus session completed! 🎉",
          description: "Great job! Take a well-deserved break.",
        });
        
        // After 4 pomodoros, suggest a long break
        if (newSessions % 4 === 0) {
          switchMode('longBreak');
        } else {
          switchMode('shortBreak');
        }
      } else {
        // Break completed
        toast({
          title: "Break time over!",
          description: "Ready for another focused session?",
        });
        switchMode('pomodoro');
      }
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, mode, sessions]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-light/30 to-blue-light/30 pb-10">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center">
          <Button variant="ghost" onClick={() => navigate('/dashboard')} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-purple-dark">Focus Mode</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        <div className="space-y-8">
          <Card className="gradient-card border-purple-light/30">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-purple-dark">
                {mode === 'pomodoro' ? 'Focus Session' : mode === 'shortBreak' ? 'Short Break' : 'Long Break'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Timer Display */}
              <div className="text-center">
                <div className="text-6xl font-bold text-purple-dark mb-4">
                  {formatTime(timeLeft)}
                </div>
                <Progress value={calculateProgress()} className="h-2" />
              </div>
              
              {/* Timer Controls */}
              <div className="flex justify-center space-x-4">
                <Button 
                  onClick={toggleTimer}
                  className={`rounded-full w-16 h-16 ${isActive ? 'bg-red-500 hover:bg-red-600' : 'btn-gradient'}`}
                >
                  {isActive ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                </Button>
                <Button 
                  onClick={resetTimer}
                  variant="outline"
                  className="rounded-full w-16 h-16 border-purple"
                >
                  <RotateCcw className="h-6 w-6 text-purple" />
                </Button>
              </div>
              
              {/* Timer Mode Selector */}
              <div className="flex justify-center mt-8 space-x-4">
                <Button 
                  onClick={() => switchMode('pomodoro')}
                  variant={mode === 'pomodoro' ? 'default' : 'outline'}
                  className={mode === 'pomodoro' ? 'btn-gradient' : 'border-purple text-purple'}
                >
                  Pomodoro
                </Button>
                <Button 
                  onClick={() => switchMode('shortBreak')}
                  variant={mode === 'shortBreak' ? 'default' : 'outline'}
                  className={mode === 'shortBreak' ? 'btn-gradient' : 'border-purple text-purple'}
                >
                  Short Break
                </Button>
                <Button 
                  onClick={() => switchMode('longBreak')}
                  variant={mode === 'longBreak' ? 'default' : 'outline'}
                  className={mode === 'longBreak' ? 'btn-gradient' : 'border-purple text-purple'}
                >
                  Long Break
                </Button>
              </div>
              
              {/* Sessions Counter */}
              <div className="text-center text-muted-foreground">
                {sessions} Pomodoro sessions completed today
              </div>
            </CardContent>
          </Card>
          
          {/* Tips Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-purple-dark">Focus Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">The Pomodoro Technique</h3>
                <p className="text-muted-foreground text-sm">
                  Work for 25 minutes, then take a 5-minute break. After 4 pomodoros, take a longer 15-30 minute break.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Prepare Your Environment</h3>
                <p className="text-muted-foreground text-sm">
                  Clear your desk, silence notifications, and have water nearby before starting a focus session.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Set Clear Goals</h3>
                <p className="text-muted-foreground text-sm">
                  Before each pomodoro, write down exactly what you want to accomplish during that session.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default FocusMode;
