'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetApplicationsQuery } from '@/lib/api';

export default function AdminDashboard() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [page, setPage] = useState(1);
  const {
    data: applicationsData,
    isLoading,
    error,
  } = useGetApplicationsQuery({ page, limit: 10 });

  useEffect(() => {
    // protect route on client
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      router.replace('/admin/login');
      return;
    }

    // Avoid setting state synchronously inside the effect
    setTimeout(() => setChecking(false), 0);
  }, [router]);

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/admin/login');
  }

  function handleProfileClick() {
    router.push('/admin/profile');
  }

  function handleApplicationClick(id: string) {
    router.push(`/admin/applications/${id}`);
  }

  if (checking) return null;

  const applications = applicationsData?.data || [];
  const pagination = applicationsData?.pagination;

  return (
    <div className='min-h-[70vh] px-4 py-12 bg-[#f6f8fb]'>
      <div className='w-full max-w-6xl mx-auto bg-white p-6 rounded shadow'>
        <div className='flex items-center justify-between mb-6'>
          <h1 className='text-2xl font-semibold'>Admin Dashboard</h1>
          <div className='flex gap-2'>
            <button
              onClick={handleProfileClick}
              className='text-sm bg-slate-600 text-white px-3 py-1.5 rounded cursor-pointer hover:bg-slate-700'
            >
              Profile
            </button>
            <button
              onClick={handleLogout}
              className='text-sm bg-red-600 text-white px-3 py-1.5 rounded cursor-pointer hover:bg-red-700'
            >
              Logout
            </button>
          </div>
        </div>

        {isLoading && (
          <div className='text-center py-8 text-slate-600'>
            Loading applications...
          </div>
        )}

        {error && (
          <div className='text-center py-8 text-red-600'>
            Error loading applications
          </div>
        )}

        {!isLoading && !error && applications.length > 0 ? (
          <div>
            <div className='overflow-x-auto'>
              <table className='w-full border-collapse'>
                <thead>
                  <tr className='bg-slate-100 border-b border-slate-300'>
                    <th className='px-4 py-2 text-left text-sm font-semibold text-slate-700'>
                      Full Name
                    </th>
                    <th className='px-4 py-2 text-left text-sm font-semibold text-slate-700'>
                      Email
                    </th>
                    <th className='px-4 py-2 text-left text-sm font-semibold text-slate-700'>
                      Phone
                    </th>
                    <th className='px-4 py-2 text-left text-sm font-semibold text-slate-700'>
                      State
                    </th>
                    <th className='px-4 py-2 text-left text-sm font-semibold text-slate-700'>
                      CDL License
                    </th>
                    <th className='px-4 py-2 text-left text-sm font-semibold text-slate-700'>
                      Long Haul
                    </th>
                    <th className='px-4 py-2 text-left text-sm font-semibold text-slate-700'>
                      Submitted
                    </th>
                    <th className='px-4 py-2 text-left text-sm font-semibold text-slate-700'>
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr
                      key={app._id}
                      onClick={() => handleApplicationClick(app._id)}
                      className='border-b border-slate-200 hover:bg-slate-100 cursor-pointer transition-colors'
                    >
                      <td className='px-4 py-2 text-sm text-slate-700'>
                        {app.fullName}
                      </td>
                      <td className='px-4 py-2 text-sm text-slate-700'>
                        {app.email}
                      </td>
                      <td className='px-4 py-2 text-sm text-slate-700'>
                        {app.phoneNumber}
                      </td>
                      <td className='px-4 py-2 text-sm text-slate-700'>
                        {app.state}
                      </td>
                      <td className='px-4 py-2 text-sm text-slate-700'>
                        {app.cdlLicense}
                      </td>
                      <td className='px-4 py-2 text-sm text-slate-700'>
                        <span
                          className={
                            app.longHaulTrips === 'yes'
                              ? 'text-green-600'
                              : 'text-slate-600'
                          }
                        >
                          {app.longHaulTrips}
                        </span>
                      </td>
                      <td className='px-4 py-2 text-sm text-slate-700'>
                        {new Date(app.createdAt).toLocaleDateString()}
                      </td>
                      <td className='px-4 py-2 text-sm'>
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            app.archived
                              ? 'bg-red-100 text-red-700'
                              : 'bg-green-100 text-green-700'
                          }`}
                        >
                          {app.archived ? 'Archived' : 'Active'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {pagination && (
              <div className='mt-6 flex items-center justify-between'>
                <div className='text-sm text-slate-600'>
                  Showing {(pagination.page - 1) * pagination.limit + 1} to{' '}
                  {Math.min(
                    pagination.page * pagination.limit,
                    pagination.total
                  )}{' '}
                  of {pagination.total} applications
                </div>
                <div className='flex gap-2'>
                  <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className='text-sm bg-slate-600 text-white px-3 py-1.5 rounded cursor-pointer hover:bg-slate-700 disabled:bg-slate-300 disabled:cursor-not-allowed'
                  >
                    Previous
                  </button>
                  <div className='flex items-center px-3 py-1.5 text-sm text-slate-700'>
                    Page {pagination.page} of {pagination.pages}
                  </div>
                  <button
                    onClick={() =>
                      setPage(Math.min(pagination.pages, page + 1))
                    }
                    disabled={page === pagination.pages}
                    className='text-sm bg-slate-600 text-white px-3 py-1.5 rounded cursor-pointer hover:bg-slate-700 disabled:bg-slate-300 disabled:cursor-not-allowed'
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          !isLoading &&
          !error && (
            <div className='text-center py-8 text-slate-600'>
              No applications found.
            </div>
          )
        )}
      </div>
    </div>
  );
}
