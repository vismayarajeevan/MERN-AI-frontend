import React, { useState } from 'react'
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';


const AuthForm = () => {
    const [mode, setMode] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
  });

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setErrors({ name: '', email: '', password: '' });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white p-8 shadow-xl transition-all duration-300">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-gray-900">
        {mode === 'login' ? 'Welcome back' : 'Create an account'}
      </h2>
      <p className="mt-2 text-sm text-gray-600">
        {mode === 'login' 
          ? 'Sign in to access your account' 
          : 'Fill in your details to get started'}
      </p>
    </div>

    <form className="mt-8 space-y-6">
      

      {/* Name field (only for register) */}
      {mode === 'register' && (
        <div className="space-y-1">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <User size={18} />
            </div>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={formData.name}
             
              className={`block w-full rounded-lg border ${
                errors.name ? 'border-red-300' : 'border-gray-300'
              } py-2 pl-11 pr-3 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm transition-all duration-200`}
              placeholder="John Doe"
            />
          </div>
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
        </div>
      )}

      {/* Email field */}
     

<div className="space-y-1">
  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
    Email address
  </label>
  <div className="relative">
    <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
      <Mail size={18} />
    </div>
    <input
      id="email"
      name="email"
      type="email"
      autoComplete="email"
      value={formData.email}
      className={`block w-full rounded-lg border ${
        errors.email ? 'border-red-300' : 'border-gray-300'
      } py-2 pl-11 pr-3 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm transition-all duration-200`}
      placeholder="johndoe@example.com"
    />
  </div>
  {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
</div>

      {/* Password field */}
      <div className="space-y-1">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <Lock size={18} />
          </div>
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            value={formData.password}
            
            className={`block w-full rounded-lg border ${
              errors.password ? 'border-red-300' : 'border-gray-300'
            } py-2 pl-11 pr-3 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm transition-all duration-200`}
            placeholder="********"
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
        
      </div>

      {/* Remember me / Forgot password */}
      {mode === 'login' && (
        <div className="flex justify-end">
         
          <div className="text-sm">
            <a href="#" className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200">
              Forgot your password?
            </a>
          </div>
        </div>
      )}

      {/* Submit button */}
      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300"
        >
          {mode === 'login' ? 'Sign in' : 'Create account'}
        </button>
      </div>
    </form>

    {/* Toggle between login and register */}
    <div className="mt-6 text-center text-sm">
      <p className="text-gray-600">
        {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
        <button
          type="button"
          onClick={toggleMode}
          className="ml-1 font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition-colors duration-200"
        >
          {mode === 'login' ? 'Sign up' : 'Sign in'}
        </button>
      </p>
    </div>
  </div>  )
}

export default AuthForm