'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  useDriverGetProfileQuery,
  useDriverGetApplicationQuery,
  useDriverLogoutMutation,
  useDriverUpdateProfileMutation,
  useDriverUpdateApplicationMutation,
} from '@/lib/api';
import type { Driver, DriverApplication } from '@/lib/types';
import { API_BASE_URL } from '@/lib/constants';
import { toast, Toaster } from 'sonner';

export default function DriverDashboard() {
  const router = useRouter();
  const [logout] = useDriverLogoutMutation();
  const [updateProfile] = useDriverUpdateProfileMutation();
  const [updateApplication] = useDriverUpdateApplicationMutation();

  const {
    data: profile,
    isLoading: profileLoading,
    refetch: refetchProfile,
  } = useDriverGetProfileQuery();
  const {
    data: application,
    isLoading: appLoading,
    refetch: refetchApplication,
  } = useDriverGetApplicationQuery();

  const [editingProfile, setEditingProfile] = useState(false);
  const [editingApplication, setEditingApplication] = useState(false);
  const [profileData, setProfileData] = useState<Partial<Driver>>({});
  const [applicationData, setApplicationData] = useState<
    Partial<DriverApplication>
  >({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (profile) {
      setProfileData(profile);
    }
  }, [profile]);

  useEffect(() => {
    if (application) {
      setApplicationData(application);
    }
  }, [application]);

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      localStorage.removeItem('driver-token');
      localStorage.removeItem('driver');
      router.push('/driver/login');
    } catch (err) {
      console.error('Logout error:', err);
      // Still redirect even if logout API fails
      localStorage.removeItem('driver-token');
      localStorage.removeItem('driver');
      router.push('/driver/login');
    }
  };

  const handleProfileUpdate = async () => {
    if (!profileData.fullName?.trim() || !profileData.phoneNumber?.trim()) {
      setError('Full name and phone number are required');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setMessage('');
      await updateProfile({
        fullName: profileData.fullName,
        phoneNumber: profileData.phoneNumber,
      }).unwrap();
      setMessage('Profile updated successfully!');
      setEditingProfile(false);
      refetchProfile();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError('Failed to update profile. Please try again.');
      console.error('Profile update error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApplicationUpdate = async () => {
    if (
      !applicationData.fullName ||
      !applicationData.email ||
      !applicationData.phoneNumber
    ) {
      setError('Full name, email, and phone number are required');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setMessage('');

      // Prepare the update data
      const updateData: Partial<DriverApplication> = {
        fullName: applicationData.fullName,
        email: applicationData.email,
        phoneNumber: applicationData.phoneNumber,
        cdlLicense: applicationData.cdlLicense,
        state: applicationData.state,
        drivingExperience: applicationData.drivingExperience,
        truckTypes: applicationData.truckTypes,
        longHaulTrips: applicationData.longHaulTrips,
        comments: applicationData.comments,
      };

      await updateApplication(updateData).unwrap();
      setMessage('Application updated successfully!');
      setEditingApplication(false);
      refetchApplication();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError('Failed to update application. Please try again.');
      console.error('Application update error:', err);
    } finally {
      setLoading(false);
    }
  };
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

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'reviewing':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (profileLoading || appLoading) {
    return (
      <div className='min-h-screen bg-[#090a3f] flex items-center justify-center'>
        <div className='text-white text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mx-auto mb-4'></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <Toaster
        position='top-center'
        richColors
        toastOptions={{ className: '!text-base' }}
      />
      {/* Header */}
      <div className='bg-white shadow'>
        <div className='max-w-7xl mx-auto px-4 py-6 flex justify-between items-center'>
          <h1 className='text-3xl font-bold text-gray-900'>Driver Dashboard</h1>
          <button
            onClick={handleLogout}
            className='bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition'
          >
            Logout
          </button>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 py-8'>
        {/* Alert Messages */}
        {message && (
          <div className='mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg'>
            {message}
          </div>
        )}
        {error && (
          <div className='mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg'>
            {error}
          </div>
        )}

        <div className='grid md:grid-cols-2 gap-8'>
          {/* Profile Section */}
          <div className='bg-white rounded-lg shadow-lg p-6'>
            <div className='flex justify-between items-center mb-6'>
              <h2 className='text-2xl font-bold text-gray-900'>Profile</h2>
              <button
                onClick={() => setEditingProfile(!editingProfile)}
                className='text-blue-600 hover:text-blue-700 font-semibold'
              >
                {editingProfile ? 'Cancel' : 'Edit'}
              </button>
            </div>

            {editingProfile ? (
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Full Name
                  </label>
                  <input
                    type='text'
                    value={profileData.fullName || ''}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        fullName: e.target.value,
                      })
                    }
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Phone Number
                  </label>
                  <input
                    type='tel'
                    value={profileData.phoneNumber || ''}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        phoneNumber: e.target.value,
                      })
                    }
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  />
                </div>
                <button
                  onClick={handleProfileUpdate}
                  disabled={loading}
                  className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400'
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            ) : (
              <div className='space-y-4'>
                <div>
                  <p className='text-sm text-gray-600'>Email</p>
                  <p className='text-lg font-semibold text-gray-900'>
                    {profile?.email}
                  </p>
                </div>
                <div>
                  <p className='text-sm text-gray-600'>Full Name</p>
                  <p className='text-lg font-semibold text-gray-900'>
                    {profile?.fullName}
                  </p>
                </div>
                <div>
                  <p className='text-sm text-gray-600'>Phone Number</p>
                  <p className='text-lg font-semibold text-gray-900'>
                    {profile?.phoneNumber}
                  </p>
                </div>
                <div>
                  <p className='text-sm text-gray-600'>Member Since</p>
                  <p className='text-lg font-semibold text-gray-900'>
                    {profile?.createdAt
                      ? new Date(profile.createdAt).toLocaleDateString()
                      : '-'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Application Status Section */}
          <div className='bg-white rounded-lg shadow-lg p-6'>
            <h2 className='text-2xl font-bold text-gray-900 mb-6'>
              Application Status
            </h2>

            {application ? (
              <div>
                <div className='mb-4 p-4 bg-gray-50 rounded-lg'>
                  <p className='text-sm text-gray-600'>Current Status</p>
                  <div className='flex items-center gap-2 mt-2'>
                    <span
                      className={`px-3 py-1 rounded-full font-semibold text-sm ${getStatusColor(application.status)}`}
                    >
                      {application.status?.charAt(0).toUpperCase() +
                        application.status?.slice(1)}
                    </span>
                  </div>
                </div>
                <p className='text-sm text-gray-600 text-center'>
                  Last updated:{' '}
                  {application.updatedAt
                    ? new Date(application.updatedAt).toLocaleDateString()
                    : '-'}
                </p>
              </div>
            ) : (
              <div className='text-center py-8'>
                <p className='text-gray-600 mb-4'>
                  You haven&apos;t submitted an application yet.
                </p>
                <a
                  href='/driver/application-form'
                  className='inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition'
                >
                  Start Application
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Application Details Section */}
        {application && (
          <div className='mt-8 bg-white rounded-lg shadow-lg p-6'>
            <div className='flex justify-between items-center mb-6'>
              <h2 className='text-2xl font-bold text-gray-900'>
                Application Details
              </h2>
              <button
                onClick={() => setEditingApplication(!editingApplication)}
                className='text-blue-600 hover:text-blue-700 font-semibold'
              >
                {editingApplication ? 'Cancel' : 'Edit'}
              </button>
            </div>

            {editingApplication ? (
              <form className='space-y-4'>
                <div className='grid md:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Full Name
                    </label>
                    <input
                      type='text'
                      value={applicationData.fullName || ''}
                      onChange={(e) =>
                        setApplicationData({
                          ...applicationData,
                          fullName: e.target.value,
                        })
                      }
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Email
                    </label>
                    <input
                      type='email'
                      value={applicationData.email || ''}
                      onChange={(e) =>
                        setApplicationData({
                          ...applicationData,
                          email: e.target.value,
                        })
                      }
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Phone Number
                    </label>
                    <input
                      type='tel'
                      value={applicationData.phoneNumber || ''}
                      onChange={(e) =>
                        setApplicationData({
                          ...applicationData,
                          phoneNumber: e.target.value,
                        })
                      }
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      CDL License
                    </label>
                    <input
                      type='text'
                      value={applicationData.cdlLicense || ''}
                      onChange={(e) =>
                        setApplicationData({
                          ...applicationData,
                          cdlLicense: e.target.value,
                        })
                      }
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      State
                    </label>
                    <input
                      type='text'
                      value={applicationData.state || ''}
                      onChange={(e) =>
                        setApplicationData({
                          ...applicationData,
                          state: e.target.value,
                        })
                      }
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg'
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                      Driving Experience
                    </label>
                    <input
                      type='text'
                      value={applicationData.drivingExperience || ''}
                      onChange={(e) =>
                        setApplicationData({
                          ...applicationData,
                          drivingExperience: e.target.value,
                        })
                      }
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg'
                    />
                  </div>
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Comments
                  </label>
                  <textarea
                    value={applicationData.comments || ''}
                    onChange={(e) =>
                      setApplicationData({
                        ...applicationData,
                        comments: e.target.value,
                      })
                    }
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg'
                    rows={4}
                  />
                </div>

                <button
                  type='button'
                  onClick={handleApplicationUpdate}
                  disabled={loading}
                  className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400'
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            ) : (
              <div className='grid md:grid-cols-2 gap-6'>
                <div>
                  <p className='text-sm text-gray-600'>Full Name</p>
                  <p className='text-lg font-semibold'>
                    {application.fullName}
                  </p>
                </div>
                <div>
                  <p className='text-sm text-gray-600'>Email</p>
                  <p className='text-lg font-semibold'>{application.email}</p>
                </div>
                <div>
                  <p className='text-sm text-gray-600'>Phone Number</p>
                  <p className='text-lg font-semibold'>
                    {application.phoneNumber}
                  </p>
                </div>
                <div>
                  <p className='text-sm text-gray-600'>CDL License</p>
                  <p className='text-lg font-semibold'>
                    {application.cdlLicense}
                  </p>
                </div>
                <div>
                  <p className='text-sm text-gray-600'>State</p>
                  <p className='text-lg font-semibold'>{application.state}</p>
                </div>
                <div>
                  <p className='text-sm text-gray-600'>Driving Experience</p>
                  <p className='text-lg font-semibold'>
                    {application.drivingExperience}
                  </p>
                </div>
                <div>
                  <p className='text-sm text-gray-600'>Long Haul Trips</p>
                  <p className='text-lg font-semibold'>
                    {application.longHaulTrips ? 'Yes' : 'No'}
                  </p>
                </div>
                {application.truckTypes &&
                  application.truckTypes.length > 0 && (
                    <div>
                      <p className='text-sm text-gray-600'>Truck Types</p>
                      <p className='text-lg font-semibold'>
                        {application.truckTypes.join(', ')}
                      </p>
                    </div>
                  )}

                {application.comments && (
                  <div className='md:col-span-2'>
                    <p className='text-sm text-gray-600'>Comments</p>
                    <p className='text-lg font-semibold'>
                      {application.comments}
                    </p>
                  </div>
                )}
                {application.resumeUrl && (
                  <div className='md:col-span-2'>
                    <p className='text-sm text-gray-600'>Resume</p>
                    <button
                      onClick={handleDownloadResume}
                      className='text-blue-600 hover:underline cursor-pointer font-semibold'
                    >
                      Download Resume
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
