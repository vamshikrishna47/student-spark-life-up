
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, TrendingUp, Calendar, LineChart, Award, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Helper functions
const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month + 1, 0).getDate();
};

// Generate mock data
const generateMoodData = () => {
  const currentDate = new Date();
  const daysInMonth = getDaysInMonth(currentDate.getMonth(), currentDate.getFullYear());
  const data = [];
  
  // Moods: 1 = sad, 2 = neutral, 3 = happy
  for (let i = 1; i <= daysInMonth; i++) {
    const moodValue = getRandomInt(1, 3);
    const moodName = moodValue === 1 ? 'Sad' : moodValue === 2 ? 'Neutral' : 'Happy';
    
    data.push({
      day: i,
      mood: moodValue,
      moodName,
    });
  }
  
  return data;
};

const generateLearningData = () => {
  const data = [
    { name: 'Web Dev', completed: getRandomInt(20, 80), total: 100 },
    { name: 'DSA', completed: getRandomInt(10, 70), total: 100 },
    { name: 'GitHub', completed: getRandomInt(30, 90), total: 100 },
    { name: 'AI', completed: getRandomInt(5, 60), total: 100 },
  ];
  
  return data.map(item => ({
    ...item,
    percentage: Math.round((item.completed / item.total) * 100)
  }));
};

const generateHabitsData = () => {
  return [
    { name: 'Exercise', completed: getRandomInt(3, 7), goal: 7 },
    { name: 'Meditation', completed: getRandomInt(4, 7), goal: 7 },
    { name: 'Reading', completed: getRandomInt(2, 7), goal: 7 },
    { name: 'Water', completed: getRandomInt(5, 7), goal: 7 },
    { name: 'No Social Media', completed: getRandomInt(1, 7), goal: 7 },
  ];
};

const Progress = () => {
  const navigate = useNavigate();
  const [moodData, setMoodData] = useState<any[]>([]);
  const [learningData, setLearningData] = useState<any[]>([]);
  const [habitsData, setHabitsData] = useState<any[]>([]);
  
  useEffect(() => {
    // In a real app, this would fetch from a database
    setMoodData(generateMoodData());
    setLearningData(generateLearningData());
    setHabitsData(generateHabitsData());
  }, []);
  
  // Calculate mood statistics
  const moodStats = {
    happy: moodData.filter(d => d.mood === 3).length,
    neutral: moodData.filter(d => d.mood === 2).length,
    sad: moodData.filter(d => d.mood === 1).length,
  };
  
  const moodPieData = [
    { name: 'Happy', value: moodStats.happy, color: '#9b87f5' },
    { name: 'Neutral', value: moodStats.neutral, color: '#d3e4fd' },
    { name: 'Sad', value: moodStats.sad, color: '#fde1d3' },
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-light/30 to-blue-light/30 pb-10">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
          <Button variant="ghost" onClick={() => navigate('/dashboard')} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold text-purple-dark">Progress Dashboard</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="space-y-6">
          <Card className="gradient-card border-purple-light/30">
            <CardHeader>
              <CardTitle className="text-xl text-purple-dark flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple" />
                Your Growth Journey
              </CardTitle>
              <p className="text-muted-foreground">
                Track your progress and see how far you've come
              </p>
            </CardHeader>
          </Card>
          
          <Tabs defaultValue="mood" className="space-y-4">
            <TabsList className="grid grid-cols-3 gap-2">
              <TabsTrigger value="mood" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Mood Tracker</span>
              </TabsTrigger>
              <TabsTrigger value="learning" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                <span>Learning Progress</span>
              </TabsTrigger>
              <TabsTrigger value="habits" className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                <span>Habit Streaks</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="mood" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Monthly Mood Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={moodPieData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {moodPieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="md:col-span-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Daily Mood Chart</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={moodData}
                          margin={{
                            top: 5,
                            right: 10,
                            left: 10,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="day" />
                          <YAxis domain={[0, 3]} ticks={[1, 2, 3]} tickFormatter={(value) => {
                            return value === 1 ? 'Sad' : value === 2 ? 'Neutral' : value === 3 ? 'Happy' : '';
                          }} />
                          <Tooltip 
                            formatter={(value, name) => {
                              if (name === 'mood') {
                                return [value === 1 ? 'Sad' : value === 2 ? 'Neutral' : 'Happy', 'Mood'];
                              }
                              return [value, name];
                            }}
                          />
                          <Bar dataKey="mood" fill="#9b87f5" name="Mood" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Mood Insights</CardTitle>
                </CardHeader>
                <CardContent className="text-sm">
                  <p>This month, you've been mostly feeling {
                    moodStats.happy >= moodStats.neutral && moodStats.happy >= moodStats.sad
                      ? 'happy'
                      : moodStats.neutral >= moodStats.happy && moodStats.neutral >= moodStats.sad
                        ? 'neutral'
                        : 'sad'
                  }. Keep tracking your mood to notice patterns and triggers.</p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="learning" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Learning Path Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={learningData}
                        layout="vertical"
                        margin={{
                          top: 5,
                          right: 30,
                          left: 50,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" domain={[0, 100]} />
                        <YAxis dataKey="name" type="category" />
                        <Tooltip formatter={(value) => [`${value}%`, 'Completed']} />
                        <Bar dataKey="percentage" fill="#9b87f5" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {learningData.map((course) => (
                  <Card key={course.name}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-purple" />
                          <h3 className="font-medium">{course.name}</h3>
                        </div>
                        <span className="font-bold text-purple">{course.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-purple h-2.5 rounded-full" 
                          style={{ width: `${course.percentage}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        {course.completed} of {course.total} topics completed
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="habits" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Weekly Habit Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={habitsData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 7]} />
                        <Tooltip />
                        <Bar dataKey="completed" fill="#9b87f5" name="Days Completed" />
                        <Bar dataKey="goal" fill="#d3e4fd" name="Weekly Goal" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {habitsData.map((habit) => (
                  <Card key={habit.name}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-medium">{habit.name}</h3>
                        <span className="text-sm text-muted-foreground">
                          {habit.completed}/{habit.goal} days
                        </span>
                      </div>
                      <div className="flex space-x-1 mt-2">
                        {[...Array(habit.goal)].map((_, i) => (
                          <div
                            key={i}
                            className={`h-2 flex-1 rounded-full ${
                              i < habit.completed ? 'bg-purple' : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mt-4">
                        {habit.completed === habit.goal
                          ? '🎉 Perfect week!'
                          : habit.completed >= Math.ceil(habit.goal * 0.7)
                          ? '👍 Good progress!'
                          : '💪 Keep going!'}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Progress;
