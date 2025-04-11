
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '../hooks/use-toast';
import { Loader2 } from 'lucide-react';

type AuthMode = 'login' | 'register';

const AuthForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<AuthMode>('login');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let result;
      
      if (mode === 'login') {
        result = await login(email, password);
      } else {
        result = await register(email, password);
      }

      if (result.success) {
        toast({
          title: mode === 'login' ? 'Welcome back!' : 'Account created successfully!',
          description: 'You are now logged in.',
        });
        navigate('/dashboard');
      } else {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: result.error || 'Please try again.',
        });
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'An unexpected error occurred',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
  };

  return (
    <Card className="w-full max-w-md mx-auto gradient-card">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-purple-dark">
          {mode === 'login' ? 'Welcome Back! 👋' : 'Join Us! 🎉'}
        </CardTitle>
        <CardDescription className="text-center text-muted-foreground">
          {mode === 'login' 
            ? 'Log in to continue your journey' 
            : 'Create an account to start your journey'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full btn-gradient"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {mode === 'login' ? 'Logging in...' : 'Signing up...'}
              </>
            ) : (
              mode === 'login' ? 'Log in' : 'Sign up'
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="link" onClick={toggleMode} className="text-purple">
          {mode === 'login' 
            ? "Don't have an account? Sign up" 
            : 'Already have an account? Log in'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
