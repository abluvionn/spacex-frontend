'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLogoutMutation } from '@/lib/api';
import type { Admin } from '@/lib/types';

export default function AdminProfile() {
  const router = useRouter();
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [checking, setChecking] = useState(true);
  const [logout] = useLogoutMutation();

  useEffect(() => {
    // protect route on client
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      router.replace('/admin/login');
      return;
    }

    const raw = localStorage.getItem('admin');
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as Admin;
        // avoid synchronous setState within effect
        setTimeout(() => setAdmin(parsed), 0);
      } catch {
        setTimeout(() => setAdmin(null), 0);
      }
    }

    // Avoid setting state synchronously inside the effect
    setTimeout(() => setChecking(false), 0);
  }, [router]);

  async function handleLogout() {
    try {
      await logout().unwrap();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('admin');
      router.push('/admin/login');
    }
  }

  function handleBack() {
    router.back();
  }

  if (checking) return null;

  return (
    <div className='min-h-[70vh] flex items-center justify-center px-4 py-12 bg-[#f6f8fb]'>
      <div className='w-full max-w-3xl bg-white p-6 rounded shadow'>
        <div className='flex items-center justify-between'>
          <h1 className='text-xl font-semibold mb-3'>Profile</h1>
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

        {admin ? (
          <div className='mt-4 space-y-2 text-sm text-slate-700'>
            <div>
              <strong>Full name:</strong> {admin.fullName}
            </div>
            <div>
              <strong>Email:</strong> {admin.email}
            </div>
            <div>
              <strong>Phone:</strong> {admin.phone}
            </div>
            <div>
              <strong>Account created:</strong>{' '}
              {new Date(admin.createdAt).toLocaleString()}
            </div>
          </div>
        ) : (
          <div className='mt-4 text-sm text-slate-600'>
            No admin info available.
          </div>
        )}
      </div>
    </div>
  );
}
