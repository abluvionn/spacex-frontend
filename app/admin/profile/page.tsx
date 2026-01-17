'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { User } from '@/lib/types';

export default function AdminProfile() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // protect route on client
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      router.replace('/admin/login');
      return;
    }

    const raw = localStorage.getItem('user');
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as User;
        // avoid synchronous setState within effect
        setTimeout(() => setUser(parsed), 0);
      } catch {
        setTimeout(() => setUser(null), 0);
      }
    }

    // Avoid setting state synchronously inside the effect
    setTimeout(() => setChecking(false), 0);
  }, [router]);

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/admin/login');
  }

  function handleBack() {
    router.back();
  }

  if (checking) return null;

  return (
    <div className='min-h-[70vh] flex items-center justify-center px-4 py-12 bg-[#f6f8fb]'>
      <div className='w-full max-w-3xl bg-white p-6 rounded shadow'>
        <div className='flex items-center justify-between'>
          <h1 className='text-xl font-semibold mb-3'>Admin Profile</h1>
          <div className='flex gap-2'>
            <button
              onClick={handleBack}
              className='text-sm bg-slate-600 text-white px-3 py-1.5 rounded cursor-pointer'
            >
              Back
            </button>
            <button
              onClick={handleLogout}
              className='text-sm bg-red-600 text-white px-3 py-1.5 rounded cursor-pointer'
            >
              Logout
            </button>
          </div>
        </div>

        {user ? (
          <div className='mt-4 space-y-2 text-sm text-slate-700'>
            <div>
              <strong>Full name:</strong> {user.fullName}
            </div>
            <div>
              <strong>Email:</strong> {user.email}
            </div>
            <div>
              <strong>Phone:</strong> {user.phone}
            </div>
            <div>
              <strong>Account created:</strong>{' '}
              {new Date(user.createdAt).toLocaleString()}
            </div>
          </div>
        ) : (
          <div className='mt-4 text-sm text-slate-600'>
            No user info available.
          </div>
        )}
      </div>
    </div>
  );
}
