
import React from 'react';
import AuthForm from '../components/AuthForm';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-purple-light/30 to-blue-light/30">
      <div className="w-full max-w-md">
        <AuthForm />
      </div>
    </div>
  );
};

export default Login;
