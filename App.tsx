
import React, { useState, useCallback } from 'react';
import { User, UserRole } from './types';
import { MOCK_USERS } from './constants';
import LoginComponent from './components/LoginComponent';
import AdminDashboard from './components/dashboards/AdminDashboard';
import TeacherDashboard from './components/dashboards/TeacherDashboard';
import StudentDashboard from './components/dashboards/StudentDashboard';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = useCallback((email: string, password: string): boolean => {
    const user = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  }, []);

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
  }, []);

  const renderDashboard = () => {
    if (!currentUser) return null;

    switch (currentUser.role) {
      case UserRole.Admin:
        return <AdminDashboard user={currentUser} onLogout={handleLogout} />;
      case UserRole.Teacher:
        return <TeacherDashboard user={currentUser} onLogout={handleLogout} />;
      case UserRole.Student:
        return <StudentDashboard user={currentUser} onLogout={handleLogout} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
      {currentUser ? renderDashboard() : <LoginComponent onLogin={handleLogin} />}
    </div>
  );
};

export default App;