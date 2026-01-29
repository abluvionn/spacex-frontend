'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRegisterMutation } from '@/lib/api';

export default function CreateUser() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [register, { isLoading }] = useRegisterMutation();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: '',
  });

  useEffect(() => {
    // protect route on client
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      router.replace('/admin/login');
      return;
    }

    setTimeout(() => setChecking(false), 0);
  }, [router]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    // Validation
    if (
      !formData.email ||
      !formData.password ||
      !formData.fullName ||
      !formData.phone
    ) {
      setError('All fields are required');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }

    try {
      await register({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        phone: formData.phone,
      }).unwrap();

      setSuccess(true);
      setFormData({
        email: '',
        password: '',
        fullName: '',
        phone: '',
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        router.push('/admin');
      }, 2000);
    } catch (err) {
      const error = err as { data?: { message?: string; error?: string } };
      const errorMessage =
        error?.data?.message ||
        error?.data?.error ||
        'Failed to create user. Please try again.';
      setError(errorMessage);
    }
  }

  function handleBack() {
    router.back();
  }

  if (checking) return null;

  return (
    <div className='min-h-[70vh] px-4 py-12 bg-[#f6f8fb]'>
      <div className='w-full max-w-2xl mx-auto bg-white p-6 rounded shadow'>
        <div className='flex items-center justify-between mb-6'>
          <h1 className='text-2xl font-semibold'>Create New User</h1>
          <button
            onClick={handleBack}
            className='text-sm bg-slate-600 text-white px-3 py-1.5 rounded cursor-pointer hover:bg-slate-700'
          >
            Back
          </button>
        </div>

        {success && (
          <div className='mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded'>
            User created successfully! Redirecting to dashboard...
          </div>
        )}

        {error && (
          <div className='mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded'>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label
              htmlFor='fullName'
              className='block text-sm font-medium text-slate-700 mb-1'
            >
              Full Name
            </label>
            <input
              type='text'
              id='fullName'
              name='fullName'
              value={formData.fullName}
              onChange={handleInputChange}
              className='w-full px-3 py-2 border border-slate-300 rounded text-slate-900 placeholder-slate-500 focus:outline-none focus:border-blue-500'
              placeholder='John Doe'
              disabled={isLoading}
            />
          </div>

          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-slate-700 mb-1'
            >
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              className='w-full px-3 py-2 border border-slate-300 rounded text-slate-900 placeholder-slate-500 focus:outline-none focus:border-blue-500'
              placeholder='john@example.com'
              disabled={isLoading}
            />
          </div>

          <div>
            <label
              htmlFor='phone'
              className='block text-sm font-medium text-slate-700 mb-1'
            >
              Phone
            </label>
            <input
              type='tel'
              id='phone'
              name='phone'
              value={formData.phone}
              onChange={handleInputChange}
              className='w-full px-3 py-2 border border-slate-300 rounded text-slate-900 placeholder-slate-500 focus:outline-none focus:border-blue-500'
              placeholder='+1234567890'
              disabled={isLoading}
            />
          </div>

          <div className='relative'>
            <label
              htmlFor='password'
              className='block text-sm font-medium text-slate-700 mb-1'
            >
              Password
            </label>
            <span
              className='absolute right-0 top-0 text-sm font-medium text-slate-700 cursor-pointer'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              id='password'
              name='password'
              value={formData.password}
              onChange={handleInputChange}
              className='w-full px-3 py-2 border border-slate-300 rounded text-slate-900 placeholder-slate-500 focus:outline-none focus:border-blue-500'
              placeholder='••••••••'
              disabled={isLoading}
            />
            <p className='text-xs text-slate-600 mt-1'>Minimum 6 characters</p>
          </div>

          <div className='flex gap-2 pt-4'>
            <button
              type='submit'
              disabled={isLoading}
              className='flex-1 bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors cursor-pointer'
            >
              {isLoading ? 'Creating User...' : 'Create User'}
            </button>
            <button
              type='button'
              onClick={handleBack}
              disabled={isLoading}
              className='flex-1 bg-slate-600 text-white px-4 py-2 rounded font-medium hover:bg-slate-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors cursor-pointer'
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
