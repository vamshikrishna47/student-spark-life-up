
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, BookOpen, BrainCircuit, Clock, MessageCircle, LineChart } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-light/30 to-blue-light/30">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center animate-fade-in">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-purple-dark">
            Your Supportive Student Companion 
            <span className="inline-block ml-2 emoji-float">🚀</span>
          </h1>
          <p className="text-xl mb-8 text-foreground/80">
            Overcome challenges, stay motivated, and grow with a companion that understands student struggles.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/login')} 
              className="btn-gradient text-lg px-8 py-6 rounded-full hover-lift"
            >
              Get Started
            </Button>
            <Button 
              onClick={() => navigate('/about')} 
              variant="outline" 
              className="text-lg px-8 py-6 rounded-full hover-lift border-purple"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-purple-dark">
            Features to Support Your Journey 
            <span className="inline-block ml-2 emoji-float">✨</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <Card className="gradient-card overflow-hidden hover-lift">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-full bg-purple/10 flex items-center justify-center mb-4">
                  <BrainCircuit className="h-7 w-7 text-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Buddy Chat</h3>
                <p className="text-muted-foreground">
                  Chat with an AI companion that understands your emotions and provides personalized support.
                </p>
              </CardContent>
            </Card>
            
            {/* Feature 2 */}
            <Card className="gradient-card overflow-hidden hover-lift">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-full bg-purple/10 flex items-center justify-center mb-4">
                  <Clock className="h-7 w-7 text-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Focus Mode</h3>
                <p className="text-muted-foreground">
                  Stay productive with Pomodoro timers and distraction-free environments.
                </p>
              </CardContent>
            </Card>
            
            {/* Feature 3 */}
            <Card className="gradient-card overflow-hidden hover-lift">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-full bg-purple/10 flex items-center justify-center mb-4">
                  <BookOpen className="h-7 w-7 text-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Learning Zone</h3>
                <p className="text-muted-foreground">
                  Step-by-step tech learning paths for HTML, DSA, GitHub, and more.
                </p>
              </CardContent>
            </Card>
            
            {/* Feature 4 */}
            <Card className="gradient-card overflow-hidden hover-lift">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-full bg-purple/10 flex items-center justify-center mb-4">
                  <MessageCircle className="h-7 w-7 text-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-2">English Practice</h3>
                <p className="text-muted-foreground">
                  Build confidence in English communication with supportive practice tools.
                </p>
              </CardContent>
            </Card>
            
            {/* Feature 5 */}
            <Card className="gradient-card overflow-hidden hover-lift">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-full bg-purple/10 flex items-center justify-center mb-4">
                  <Heart className="h-7 w-7 text-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Self-Care Reminders</h3>
                <p className="text-muted-foreground">
                  Gentle nudges to maintain balance in health, relationships, and values.
                </p>
              </CardContent>
            </Card>
            
            {/* Feature 6 */}
            <Card className="gradient-card overflow-hidden hover-lift">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-14 w-14 rounded-full bg-purple/10 flex items-center justify-center mb-4">
                  <LineChart className="h-7 w-7 text-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Progress Dashboard</h3>
                <p className="text-muted-foreground">
                  Track your mood, habits, and learning progress with visual insights.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-r from-purple-light to-peach">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-purple-dark">
            Ready to Transform Your Student Life? 
            <span className="inline-block ml-2 emoji-float">🌟</span>
          </h2>
          <p className="text-xl mb-8 text-foreground/80">
            Join thousands of students who have found their balance, motivation, and growth path.
          </p>
          <Button 
            onClick={() => navigate('/login')} 
            className="btn-gradient text-lg px-8 py-6 rounded-full hover-lift"
          >
            Start Your Journey
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 px-4 text-center bg-white/80">
        <p className="text-muted-foreground">
          © {new Date().getFullYear()} Student Spark | Your supportive companion for student life
        </p>
      </footer>
    </div>
  );
};

export default Index;
