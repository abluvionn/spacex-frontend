'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  useGetApplicationByIdQuery,
  useUpdateApplicationStatusMutation,
  useLogoutMutation,
} from '@/lib/api';
import { API_BASE_URL } from '@/lib/constants';
import { toast } from 'sonner';
import { AppStatus } from '@/lib/types';

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
  const [updateApplicationStatus, { isLoading: isUpdatingStatus }] =
    useUpdateApplicationStatusMutation();
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

  async function handleUpdateStatus(status: AppStatus) {
    if (!application) return;
    try {
      await updateApplicationStatus({
        id: applicationId,
        status: status,
      }).unwrap();
      // Refetch the application data to update the UI
      refetch();
    } catch (error) {
      console.error('Failed to update application status:', error);
      toast.error('Failed to update application status. Please try again.');
    }
  }

  async function handleDownloadResume() {
    if (!application?.resumeUrl) return;
    try {
      const token =
        typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const res = await fetch(API_BASE_URL + application.resumeUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        // include credentials if server uses cookies
        credentials: 'include',
      });
      if (!res.ok) {
        console.error('Failed to fetch resume:', res);
        toast.error(`Failed to download: ${res.status}`);
        return;
      }
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${application.createdAt.split('T')[0]}-${application.fullName}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error fetching resume:', err);
      toast.error('Failed to download resume. Please try again later.');
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

  return (
    <div className='min-h-[70vh] px-4 py-12 bg-[#f6f8fb]'>
      <div className='w-full max-w-3xl mx-auto bg-white p-6 rounded shadow'>
        <div className='flex items-center justify-between mb-6 flex-wrap gap-4'>
          <div className='flex items-center gap-3'>
            <h1 className='text-2xl font-semibold'>Application Details</h1>
            <span
              className={`inline-block px-3 py-1 rounded text-sm font-semibold uppercase status-${application.status}`}
            >
              {application.status}
            </span>
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
                    application.longHaulTrips
                      ? 'text-green-600'
                      : 'text-slate-600'
                  }`}
                >
                  {application.longHaulTrips ? 'Yes' : 'No'}
                </p>
              </div>
            </div>
          </div>

          {/* Truck Types */}
          <div className='border-b pb-6'>
            <h2 className='text-lg font-semibold text-slate-800 mb-4'>
              Truck Types
            </h2>
            {application.truckTypes.length > 0 ? (
              <div className='flex flex-wrap gap-2'>
                {application.truckTypes.map((type) => (
                  <span
                    key={type}
                    className='inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm font-medium'
                  >
                    {type}
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

          {/* Resume download */}
          <div className='border-b pb-6'>
            <h2 className='text-lg font-semibold text-slate-800 mb-4'>
              Resume
            </h2>
            {application.resumeUrl ? (
              <button
                onClick={handleDownloadResume}
                className='text-blue-600 hover:underline cursor-pointer'
              >
                Download
                {application.resumeFilename
                  ? ` ${application.resumeFilename}`
                  : ''}
              </button>
            ) : (
              <p className='text-slate-600'>No resume uploaded</p>
            )}
          </div>

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
                  className={`inline-block px-3 py-1 rounded text-sm font-semibold capitalize status-${application.status}`}
                >
                  {application.status}
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

        <div className='mt-8 pt-6 border-t border-slate-200'>
          <label>
            {isUpdatingStatus ? 'Updating...' : 'Update Status'}
          </label>
          <select
            id='app-status'
            value={application.status}
            onChange={(e) => handleUpdateStatus(e.target.value as AppStatus)}
            className='mt-2 w-full p-2 border border-slate-300 rounded-md cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 hover:border-slate-400'
            disabled={isUpdatingStatus}
          >
            <option value='reviewing'>Reviewing</option>
            <option value='rejected'>Rejected</option>
            <option value='accepted'>Accepted</option>
          </select>
        </div>
      </div>
    </div>
  );
}
