'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  useGetApplicationByIdQuery,
  useToggleApplicationArchiveMutation,
  useLogoutMutation,
} from '@/lib/api';

export default function ApplicationDetail() {
  const router = useRouter();
  const params = useParams();
  const [checking, setChecking] = useState(true);

  const applicationId = params.id as string;
  const {
    data: application,
    isLoading,
    refetch,
  } = useGetApplicationByIdQuery(applicationId, { skip: !applicationId });
  const [toggleApplicationArchive, { isLoading: isTogglingArchive }] =
    useToggleApplicationArchiveMutation();
  const [logout] = useLogoutMutation();

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

  async function handleLogout() {
    try {
      await logout().unwrap();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      router.push('/admin/login');
    }
  }

  function handleBack() {
    router.back();
  }

  async function handleToggleArchive() {
    if (!application) return;
    try {
      await toggleApplicationArchive(applicationId).unwrap();
      // Refetch the application data to update the UI
      refetch();
    } catch (error) {
      console.error('Failed to toggle archive status:', error);
    }
  }

  if (checking || isLoading) return null;

  if (!application) {
    return (
      <div className='min-h-[70vh] flex items-center justify-center px-4 py-12 bg-[#f6f8fb]'>
        <div className='w-full max-w-3xl bg-white p-6 rounded shadow'>
          <div className='flex items-center justify-between mb-6'>
            <h1 className='text-2xl font-semibold'>Application Not Found</h1>
            <button
              onClick={handleBack}
              className='text-sm bg-slate-600 text-white px-3 py-1.5 rounded cursor-pointer hover:bg-slate-700'
            >
              Back
            </button>
          </div>
          <p className='text-slate-600'>
            The application you are looking for does not exist.
          </p>
        </div>
      </div>
    );
  }

  const parseTruckTypes = () => {
    if (typeof application.truckTypes === 'string') {
      try {
        return Object.entries(JSON.parse(application.truckTypes))
          .filter(([, value]) => value)
          .map(([key]) => key);
      } catch {
        return [];
      }
    }
    return Array.isArray(application.truckTypes) ? application.truckTypes : [];
  };

  const truckTypes = parseTruckTypes();

  return (
    <div className='min-h-[70vh] px-4 py-12 bg-[#f6f8fb]'>
      <div className='w-full max-w-3xl mx-auto bg-white p-6 rounded shadow'>
        <div className='flex items-center justify-between mb-6 flex-wrap'>
          <div className='flex items-center gap-3'>
            <h1 className='text-2xl font-semibold'>Application Details</h1>
            {application.archived && (
              <span className='inline-block bg-red-100 text-red-700 px-3 py-1 rounded text-sm font-semibold'>
                ARCHIVED
              </span>
            )}
          </div>
          <div className='flex gap-2 flex-wrap'>
            <button
              onClick={handleBack}
              className='text-sm bg-slate-600 text-white px-3 py-1.5 rounded cursor-pointer hover:bg-slate-700'
            >
              Back
            </button>
            <button
              onClick={handleLogout}
              className='text-sm bg-red-600 text-white px-3 py-1.5 rounded cursor-pointer hover:bg-red-700'
            >
              Logout
            </button>
          </div>
        </div>

        <div className='space-y-6'>
          {/* Personal Information */}
          <div className='border-b pb-6'>
            <h2 className='text-lg font-semibold text-slate-800 mb-4'>
              Personal Information
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-slate-600 mb-1'>
                  Full Name
                </label>
                <p className='text-slate-800 overflow-auto'>
                  {application.fullName}
                </p>
              </div>
              <div>
                <label className='block text-sm font-medium text-slate-600 mb-1'>
                  Email
                </label>
                <p className='text-slate-800 overflow-auto'>
                  {application.email}
                </p>
              </div>
              <div>
                <label className='block text-sm font-medium text-slate-600 mb-1'>
                  Phone Number
                </label>
                <p className='text-slate-800 overflow-auto'>
                  {application.phoneNumber}
                </p>
              </div>
              <div>
                <label className='block text-sm font-medium text-slate-600 mb-1'>
                  State
                </label>
                <p className='text-slate-800 overflow-auto'>
                  {application.state}
                </p>
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className='border-b pb-6'>
            <h2 className='text-lg font-semibold text-slate-800 mb-4'>
              Professional Information
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-slate-600 mb-1'>
                  CDL License
                </label>
                <p className='text-slate-800'>{application.cdlLicense}</p>
              </div>
              <div>
                <label className='block text-sm font-medium text-slate-600 mb-1'>
                  Driving Experience
                </label>
                <p className='text-slate-800 overflow-auto'>
                  {application.drivingExperience}
                </p>
              </div>
              <div>
                <label className='block text-sm font-medium text-slate-600 mb-1'>
                  Long Haul Trips
                </label>
                <p
                  className={`text-slate-800 font-medium ${
                    application.longHaulTrips === 'yes'
                      ? 'text-green-600'
                      : 'text-slate-600'
                  }`}
                >
                  {application.longHaulTrips === 'yes' ? 'Yes' : 'No'}
                </p>
              </div>
            </div>
          </div>

          {/* Truck Types */}
          <div className='border-b pb-6'>
            <h2 className='text-lg font-semibold text-slate-800 mb-4'>
              Truck Types
            </h2>
            {truckTypes.length > 0 ? (
              <div className='flex flex-wrap gap-2'>
                {truckTypes.map((type) => (
                  <span
                    key={type}
                    className='inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm font-medium'
                  >
                    {type.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                ))}
              </div>
            ) : (
              <p className='text-slate-600'>No truck types selected</p>
            )}
          </div>

          {/* Comments */}
          {application.comments && (
            <div className='border-b pb-6'>
              <h2 className='text-lg font-semibold text-slate-800 mb-4'>
                Comments
              </h2>
              <p className='text-slate-800 whitespace-pre-wrap overflow-auto'>
                {application.comments}
              </p>
            </div>
          )}

          {/* Status and Dates */}
          <div>
            <h2 className='text-lg font-semibold text-slate-800 mb-4'>
              Status & Dates
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div>
                <label className='block text-sm font-medium text-slate-600 mb-1'>
                  Status
                </label>
                <span
                  className={`inline-block px-3 py-1 rounded text-sm font-semibold ${
                    application.archived
                      ? 'bg-red-100 text-red-700'
                      : 'bg-green-100 text-green-700'
                  }`}
                >
                  {application.archived ? 'Archived' : 'Active'}
                </span>
              </div>
              <div>
                <label className='block text-sm font-medium text-slate-600 mb-1'>
                  Submitted
                </label>
                <p className='text-slate-800'>
                  {new Date(application.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <div>
                <label className='block text-sm font-medium text-slate-600 mb-1'>
                  Last Updated
                </label>
                <p className='text-slate-800'>
                  {new Date(application.updatedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Archive Toggle Button */}
        <div className='mt-8 pt-6 border-t border-slate-200'>
          <button
            onClick={handleToggleArchive}
            disabled={isTogglingArchive}
            className={`cursor-pointer px-4 py-2 rounded font-medium text-white transition-colors ${
              application.archived
                ? 'bg-green-600 hover:bg-green-700 disabled:bg-green-400'
                : 'bg-yellow-600 hover:bg-yellow-700 disabled:bg-yellow-400'
            } disabled:cursor-not-allowed`}
          >
            {isTogglingArchive
              ? 'Processing...'
              : application.archived
                ? 'Unarchive Application'
                : 'Archive Application'}
          </button>
        </div>
      </div>
    </div>
  );
}
