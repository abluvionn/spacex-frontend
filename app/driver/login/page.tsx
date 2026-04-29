'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDriverLoginMutation } from '@/lib/api';
import type { DriverLoginRequest } from '@/lib/types';

export default function DriverLogin() {
  const router = useRouter();
  const [login, { isLoading, error }] = useDriverLoginMutation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const loginData: DriverLoginRequest = {
        email: formData.email,
        password: formData.password,
      };

      const result = await login(loginData).unwrap();

      // Clear any admin data to prevent conflicts
      localStorage.removeItem('token');
      localStorage.removeItem('admin');

      // Store driver token and info
      localStorage.setItem('driver-token', result.accessToken);
      localStorage.setItem('driver', JSON.stringify(result.driver));

      // Redirect to dashboard
      router.push('/driver/dashboard');
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <div className='min-h-screen bg-primary flex items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        <div className='bg-white rounded-lg shadow-2xl p-8'>
          <div className='text-center mb-8'>
            <h1 className='text-3xl font-bold text-gray-900'>Driver Login</h1>
            <p className='text-gray-600 mt-2'>Sign in to your driver account</p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-4'>
            {/* Email */}
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Email
              </label>
              <input
                id='email'
                name='email'
                type='email'
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  validationErrors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder='your@email.com'
              />
              {validationErrors.email && (
                <p className='text-red-500 text-sm mt-1'>
                  {validationErrors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Password
              </label>
              <input
                id='password'
                name='password'
                type='password'
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  validationErrors.password
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
                placeholder='••••••••'
              />
              {validationErrors.password && (
                <p className='text-red-500 text-sm mt-1'>
                  {validationErrors.password}
                </p>
              )}
            </div>

            {/* API Error */}
            {error && (
              <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded'>
                {typeof error === 'object' && 'data' in error && error.data
                  ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    JSON.stringify((error.data as any).error || error.data)
                  : 'Login failed. Please check your credentials.'}
              </div>
            )}

            {/* Submit Button */}
            <button
              type='submit'
              disabled={isLoading}
              className='w-full bg-primary text-white font-semibold py-2 rounded-lg hover:bg-primary/90 transition disabled:bg-gray-400'
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Signup Link */}
          <p className='text-center text-gray-600 mt-6'>
            Don&apos;t have an account?{' '}
            <Link
              href='/driver/signup'
              className='text-blue-600 hover:text-blue-700 font-semibold'
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
