'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLoginMutation } from '@/lib/api';
import { LoginError } from '@/lib/types';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const [login, { isLoading, isSuccess, data }] = useLoginMutation();

  useEffect(() => {
    if (isSuccess && data) {
      const token = data.accessToken;
      if (token) {
        localStorage.setItem('token', token);
      }
      // Redirect to admin root (update to your protected route)
      router.push('/admin');
    }
  }, [isSuccess, data, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    try {
      await login({ email, password }).unwrap();
      // success handled by effect
    } catch (err: unknown) {
      if ((err as LoginError).data && (err as LoginError).data.error) {
        const loginErr = err as LoginError;
        setError(loginErr.data.error);
        return;
      }
      setError('An unexpected error occurred. Please try again.');
    }
  }

  return (
    <div className='min-h-[70vh] flex items-center justify-center px-4 py-12 bg-[#f6f8fb]'>
      <form
        className='w-full max-w-[420px] shadow-[0_8px_28px_rgba(16,24,40,0.08)] flex flex-col gap-3 p-7 rounded-[10px] bg-white'
        onSubmit={handleSubmit}
      >
        <h1 className='text-xl font-semibold mt-0 mb-2 mx-0'>Admin Login</h1>

        <label
          className='flex flex-col gap-1.5 text-[13px] text-[#94a3b8]'
          htmlFor='email'
        >
          Email
          <input
            id='email'
            className='border text-sm px-3 py-2.5 rounded-lg border-solid border-[#e6edf3] text-black'
            type='email'
            autoComplete='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder='you@example.com'
          />
        </label>

        <label
          className='flex flex-col gap-1.5 text-[13px] text-[#94a3b8]'
          htmlFor='password'
        >
          Password
          <input
            id='password'
            className='border text-sm px-3 py-2.5 rounded-lg border-solid border-[#e6edf3] text-black'
            type='password'
            autoComplete='current-password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='••••••••'
          />
        </label>

        {error && <div className='text-sm text-red-600 mt-1'>{error}</div>}

        <button
          className='text-[white] cursor-pointer font-semibold mt-1.5 px-3 py-2.5 rounded-lg border-[none] disabled:opacity-70 disabled:cursor-not-allowed bg-[#2563eb]'
          type='submit'
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
