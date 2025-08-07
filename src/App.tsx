import React, { useEffect, useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Calendar } from './components/Calendar';
import { TaskBoard } from './components/TaskBoard';
import { StudyMaterials } from './components/StudyMaterials';
import { ReflectionDashboard } from './components/ReflectionDashboard';
import { Notes } from './components/Notes';
import { ChanceIt } from './components/ChanceIt';
import { Login } from './components/auth/Login';
import { SignUp } from './components/auth/SignUp';
import { ForgotPassword } from './components/auth/ForgotPassword';
import { AuthProvider, useAuth } from './context/AuthContext';
const AppContent = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [authView, setAuthView] = useState('login'); // 'login', 'signup', 'forgot-password'
  const {
    isAuthenticated
  } = useAuth();
  // Handle hash-based navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && ['dashboard', 'calendar', 'tasks', 'materials', 'notes', 'reflection', 'chanceit'].includes(hash)) {
        setActiveView(hash);
      }
    };
    // Set initial view based on hash if present
    handleHashChange();
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);
  // Update hash when activeView changes
  useEffect(() => {
    window.location.hash = activeView;
  }, [activeView]);
  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'calendar':
        return <Calendar />;
      case 'tasks':
        return <TaskBoard />;
      case 'materials':
        return <StudyMaterials />;
      case 'reflection':
        return <ReflectionDashboard />;
      case 'notes':
        return <Notes />;
      case 'chanceit':
        return <ChanceIt />;
      default:
        return <Dashboard />;
    }
  };
  if (!isAuthenticated) {
    switch (authView) {
      case 'signup':
        return <SignUp onSwitchToLogin={() => setAuthView('login')} />;
      case 'forgot-password':
        return <ForgotPassword onBack={() => setAuthView('login')} />;
      default:
        return <Login onSwitchToSignup={() => setAuthView('signup')} onForgotPassword={() => setAuthView('forgot-password')} />;
    }
  }
  return <div className="flex h-screen w-full bg-gray-50">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-1 overflow-auto p-6">{renderActiveView()}</main>
    </div>;
};
export function App() {
  return <AuthProvider>
      <AppContent />
    </AuthProvider>;
}