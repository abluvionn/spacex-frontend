'use client';

import React, { useState } from 'react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    console.log('Login attempt:', { email, password });
    setTimeout(() => {
      setLoading(false);
      alert('Logged in (demo)');
    }, 600);
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
            className='border text-sm px-3 py-2.5 rounded-lg border-solid border-[#e6edf3]'
            type='email'
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
            className='border text-sm px-3 py-2.5 rounded-lg border-solid border-[#e6edf3]'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='••••••••'
          />
        </label>

        <button
          className='text-[white] cursor-pointer font-semibold mt-1.5 px-3 py-2.5 rounded-lg border-[none] disabled:opacity-70 disabled:cursor-not-allowed bg-[#2563eb]'
          type='submit'
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
