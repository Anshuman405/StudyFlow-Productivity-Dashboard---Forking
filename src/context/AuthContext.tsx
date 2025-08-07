import React, { useEffect, useState, createContext, useContext } from 'react';
type User = {
  id: string;
  name: string;
  email: string;
  academicLevel?: string;
};
type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, academicLevel: string) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  useEffect(() => {
    // Check for saved user in localStorage (simulating persistent session)
    const savedUser = localStorage.getItem('studyflow_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);
  const login = async (email: string, password: string) => {
    // Simulate API call with a delay
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Mock user data - in a real app, this would come from the backend
      const mockUser = {
        id: '123',
        name: 'Alex Johnson',
        email: email,
        academicLevel: 'University'
      };
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('studyflow_user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };
  const signup = async (name: string, email: string, password: string, academicLevel: string) => {
    // Simulate API call with a delay
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Mock user data - in a real app, this would be created in the backend
      const mockUser = {
        id: '123',
        name,
        email,
        academicLevel
      };
      setUser(mockUser);
      setIsAuthenticated(true);
      localStorage.setItem('studyflow_user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Signup failed:', error);
      throw new Error('Email already in use or registration failed');
    } finally {
      setIsLoading(false);
    }
  };
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('studyflow_user');
  };
  const resetPassword = async (email: string) => {
    // Simulate API call with a delay
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In a real app, this would send a password reset email
      console.log(`Password reset email sent to ${email}`);
    } catch (error) {
      console.error('Password reset failed:', error);
      throw new Error('Failed to send password reset email');
    } finally {
      setIsLoading(false);
    }
  };
  return <AuthContext.Provider value={{
    user,
    isLoading,
    isAuthenticated,
    login,
    signup,
    logout,
    resetPassword
  }}>
      {children}
    </AuthContext.Provider>;
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};