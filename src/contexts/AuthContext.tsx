
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from 'firebase/auth';
import { auth, loginUser, registerUser, logoutUser, getCurrentUser } from '../lib/firebase';
import { useToast } from '../hooks/use-toast';

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error: string | null }>;
  register: (email: string, password: string) => Promise<{ success: boolean; error: string | null }>;
  logout: () => Promise<{ success: boolean; error: string | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await getCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { user, error } = await loginUser(email, password);
      if (user) {
        setCurrentUser(user);
        return { success: true, error: null };
      }
      return { success: false, error: error || 'Failed to login' };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const { user, error } = await registerUser(email, password);
      if (user) {
        setCurrentUser(user);
        return { success: true, error: null };
      }
      return { success: false, error: error || 'Failed to register' };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      const { success, error } = await logoutUser();
      if (success) {
        setCurrentUser(null);
        return { success: true, error: null };
      }
      return { success: false, error: error || 'Failed to logout' };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const value = {
    currentUser,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
