


import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { registerApi } from '../../services/allAPI';
import { showToast } from '../../reusable/Toast';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

const AuthForm = () => {
  const [mode, setMode] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false); // Separate loading state for registration
  const [isLoginLoading, setIsLoginLoading] = useState(false); // Separate loading state for login
  const navigate = useNavigate();

  const [loginFields, setLoginFields] = useState({
    email: '',
    password: '',
  });

  const [signupFields, setSignupFields] = useState({
    userName: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
  });

  const isRegister = mode === 'register';

  const toggleMode = () => {
    setMode((prev) => (prev === 'login' ? 'register' : 'login'));
    setErrors({ name: '', email: '', password: '' });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateUserName = (userName) => {
    const usernameRegex = /^[A-Za-z\s]+$/;
    return usernameRegex.test(userName.trim());
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleValidation = () => {
    let valid = true;
    let newErrors = {};

    if (isRegister) {
      if (!validateUserName(signupFields.userName)) {
        valid = false;
        newErrors.name = 'Name must contain only alphabets.';
      } else if (signupFields.userName.trim().length < 3) {
        valid = false;
        newErrors.name = 'Name must be at least 3 characters.';
      }

      if (!validateEmail(signupFields.email)) {
        valid = false;
        newErrors.email = 'Invalid email format.';
      }

      if (!signupFields.password) {
        valid = false;
        newErrors.password = 'Password is required.';
      }
    } else {
      if (!validateEmail(loginFields.email)) {
        valid = false;
        newErrors.email = 'Invalid email format.';
      }
      if (!loginFields.password) {
        valid = false;
        newErrors.password = 'Password is required.';
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (handleValidation()) {
      setIsRegisterLoading(true); // Start loading for register

      try {
        const result = await registerApi(signupFields);
        console.log('reg', result);

        if (result.status === 200) {
          showToast(`${result.data.message}`, 'success');
          navigate('/otp', { state: { email: signupFields.email } });

          setSignupFields({
            userName: '',
            email: '',
            password: '',
          });
        } else {
          showToast(`${result.response.data.message}`, 'error');
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          'Something went wrong!';
        console.log(error);
        showToast(errorMessage, 'error');
      } finally {
        setIsRegisterLoading(false); // Stop loading for register
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (handleValidation()) {
      setIsLoginLoading(true); // Start loading for login

      // Add login logic here, such as calling an API to login the user
      console.log('Logging in with: ', loginFields);

      // Simulate a successful login (replace with actual API call)
      setTimeout(() => {
        setIsLoginLoading(false); // Stop loading for login
        showToast('Login successful!', 'success');
        navigate('/dashboard'); // Redirect to the dashboard (or another page)
      }, 2000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!handleValidation()) return;

    if (isRegister) {
      handleRegister(e);
    } else {
      handleLogin(e); // Call handleLogin for login mode
    }
  };

  return (
    <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white p-8 shadow-xl transition-all duration-300">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          {isRegister ? 'Create an account' : 'Welcome back'}
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          {isRegister
            ? 'Fill in your details to get started'
            : 'Sign in to access your account'}
        </p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        {/* Name (Register only) */}
        {isRegister && (
          <div className="space-y-1">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <User size={18} />
              </div>
              <input
                id="name"
                name="userName"
                type="text"
                value={signupFields.userName}
                onChange={(e) =>
                  setSignupFields({ ...signupFields, userName: e.target.value })
                }
                className={`block w-full rounded-lg border ${errors.name ? 'border-red-300' : 'border-gray-300'} py-2 pl-11 pr-3`}
                placeholder="John Doe"
              />
            </div>
            {errors.name && <p className="text-xs text-red-600">{errors.name}</p>}
          </div>
        )}

        {/* Email */}
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
              value={isRegister ? signupFields.email : loginFields.email}
              onChange={(e) => {
                isRegister
                  ? setSignupFields({ ...signupFields, email: e.target.value })
                  : setLoginFields({ ...loginFields, email: e.target.value });
              }}
              className={`block w-full rounded-lg border ${errors.email ? 'border-red-300' : 'border-gray-300'} py-2 pl-11 pr-3`}
              placeholder="johndoe@example.com"
            />
          </div>
          {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <Lock size={18} />
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={isRegister ? signupFields.password : loginFields.password}
              onChange={(e) =>
                isRegister
                  ? setSignupFields({ ...signupFields, password: e.target.value })
                  : setLoginFields({ ...loginFields, password: e.target.value })
              }
              className={`block w-full rounded-lg border ${errors.password ? 'border-red-300' : 'border-gray-300'} py-2 pl-11 pr-3`}
              placeholder="********"
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-red-600">{errors.password}</p>}
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="w-full rounded bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
            disabled={isRegisterLoading || isLoginLoading} // Disable the button while loading
          >
            {isRegister ? (
              isRegisterLoading ? (
                <>
                  <Spinner animation="border" role="status" size="sm" className="me-2">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                  Signing Up...
                </>
              ) : (
                'Sign Up'
              )
            ) : isLoginLoading ? (
              <>
                <Spinner animation="border" role="status" size="sm" className="me-2">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
                Logging In...
              </>
            ) : (
              'Login'
            )}
          </button>
        </div>
      </form>

      {/* Toggle mode */}
      <div className="mt-6 text-center text-sm">
        <p className="text-gray-600">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}
          <button
            type="button"
            onClick={toggleMode}
            className="ml-1 font-medium text-blue-600 hover:text-blue-500"
          >
            {isRegister ? 'Sign in' : 'Sign up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
