import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import RegisterForm from '../components/auth/RegisterForm';
import LoginForm from '../components/auth/LoginForm';

const SignupPage: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'register'>('register');
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-navy mb-4">You are already logged in!</h1>
          <a href="/" className="text-gold hover:text-orange">Go to Home</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {mode === 'register' ? (
          <RegisterForm 
            onSuccess={() => window.location.href = '/'}
            onSwitchToLogin={() => setMode('login')}
          />
        ) : (
          <LoginForm 
            onSuccess={() => window.location.href = '/'}
            onSwitchToRegister={() => setMode('register')}
          />
        )}
      </div>
    </div>
  );
};

export default SignupPage;
