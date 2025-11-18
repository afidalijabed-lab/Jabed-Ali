import React, { useState } from 'react';

interface LoginComponentProps {
  onLogin: (email: string, password: string) => boolean;
}

const LoginComponent: React.FC<LoginComponentProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'student' | 'teacher' | 'admin'>('student');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [selectedClass, setSelectedClass] = useState('1');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
      const success = onLogin(email, password);
      if (!success) {
        setError('Invalid credentials. Please try again.');
      } else {
        // Clear fields on successful login
        setEmail('');
        setPassword('');
      }
      setIsLoading(false);
    }, 500);
  };
  
  const handleTabChange = (tab: 'student' | 'teacher' | 'admin') => {
    setActiveTab(tab);
    setError('');
    setEmail('');
    setPassword('');
  }

  const getTabClass = (tab: 'student' | 'teacher' | 'admin') => {
    return `w-full py-3 text-sm font-medium text-center transition-colors duration-300 focus:outline-none ${
      activeTab === tab
        ? 'text-white bg-indigo-600'
        : 'text-gray-600 bg-gray-200 dark:text-gray-300 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
    }`;
  };

  const isStudent = activeTab === 'student';
  const isAdmin = activeTab === 'admin';
  const placeholder = isAdmin ? 'Admin ID' : 'Email address';
  const inputType = isAdmin ? 'text' : 'email';
  const autoComplete = isAdmin ? 'username' : 'email';

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl transform transition-all hover:scale-105 duration-300">
        <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white flex justify-center items-center">
                <div style={{width: '1rem', height: '2.5rem', position: 'relative'}}>
                    <span 
                        className="font-medium text-indigo-600 dark:text-indigo-400"
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%) rotate(-90deg)',
                            whiteSpace: 'nowrap',
                            letterSpacing: '-0.05em',
                            fontSize: '0.6rem',
                        }}
                    >
                        Alampur
                    </span>
                </div>
                <span>
                    Ideal Public School
                </span>
            </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Welcome! Please sign in to your account.
          </p>
        </div>
        
        <div className="flex rounded-md overflow-hidden shadow-sm">
          <button onClick={() => handleTabChange('student')} className={`${getTabClass('student')} rounded-l-md`}>Student</button>
          <button onClick={() => handleTabChange('teacher')} className={`${getTabClass('teacher')}`}>Teacher</button>
          <button onClick={() => handleTabChange('admin')} className={`${getTabClass('admin')} rounded-r-md`}>Admin</button>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {isStudent && (
             <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                 </div>
                <select 
                    id="class" 
                    value={selectedClass} 
                    onChange={e => setSelectedClass(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                    {Array.from({ length: 10 }, (_, i) => i + 1).map(c => (
                        <option key={c} value={c}>Class {c}</option>
                    ))}
                </select>
            </div>
          )}

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                 { isAdmin ? (
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                 ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                 )}
            </div>
            <input
              id="loginId"
              name="loginId"
              type={inputType}
              autoComplete={autoComplete}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder={placeholder}
            />
          </div>

          <div className="relative">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
            </div>
            <input
              id="password"
              name="password"
              type={isPasswordVisible ? 'text' : 'password'}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md placeholder-gray-500 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Password"
            />
             <button type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                {isPasswordVisible ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C3.732 4.943 7.523 3 10 3s6.268 1.943 9.542 7c-3.274 5.057-7.03 7-9.542 7S3.732 15.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 8.07 15.768 5.83 13 4.646L12.973 4.62A8.01 8.01 0 0010 4c-1.898 0-3.64.6-5.068 1.586L3.707 2.293zM10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        <path d="M2 10s3.732 5.057 7.542 7c1.453-.984 2.74-2.31 3.688-3.84a1.996 1.996 0 00.323-1.031l-1.42.946A2.002 2.002 0 0110 12c-1.105 0-2-.895-2-2 0-.27.053-.526.15-.765l-1.66 1.107A3.977 3.977 0 006 10c0 .39.06.77.172 1.134l-1.213.809A8.025 8.025 0 012 10z" />
                    </svg>
                )}
            </button>
          </div>
          
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 transition-transform transform hover:translate-y-[-2px] shadow-lg disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>
        </form>
         <div className="text-center text-xs text-gray-500 dark:text-gray-400 space-y-1">
            <p>For demo: student/teacher use email (e.g., alice.j@school.edu) with password "password".</p>
            <p>Admin use ID "admin123" with password "admin123".</p>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;