'use client';

import { useState, useRef } from 'react';
import { useDriverCreateApplicationMutation } from '@/lib/api';
import { useDriverGetProfileQuery } from '@/lib/api';
import { toast, Toaster } from 'sonner';
import { CDL_CLASSES, US_STATES } from '@/lib/constants';
import Link from 'next/link';
import Image from 'next/image';

const Page = () => {
  const [formData, setFormData] = useState({
    cdlLicense: '',
    state: '',
    drivingExperience: '',
    truckTypes: {
      reefer: false,
      smallTruck: false,
      carCarrier: false,
      liveStock: false,
      semiTrailer: false,
      tankTruck: false,
    },
    longHaulTrips: false,
    comments: '',
  });
  const [resume, setResume] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [submitForm, { isLoading }] = useDriverCreateApplicationMutation();
  const { data: profile, isLoading: profileLoading } = useDriverGetProfileQuery();

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    if (name === 'longHaulTrips') {
      setFormData((prev) => ({
        ...prev,
        [name]: value === 'yes' ? true : false,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    const truckType = id.replace('truck-', '');
    setFormData((prev) => ({
      ...prev,
      truckTypes: {
        ...prev.truckTypes,
        [truckType]: checked,
      },
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setResume(e.target.files[0]);
    }
  };

  const handleClearFile = () => {
    setResume(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if driver has passed the knowledge test
    if (!profile?.knowledgeTestPassed) {
      toast.error('You must pass the knowledge test before creating an application.');
      return;
    }

    // Verify driver token exists and get driver ID from localStorage
    const driverToken = localStorage.getItem('driver-token');
    const driverData = localStorage.getItem('driver');

    if (!driverToken || !driverData) {
      toast.error('Driver information not found. Please login again.');
      return;
    }

    const driver = JSON.parse(driverData);
    const driverId = driver._id;

    // Extra validation to ensure we have a valid driver ID
    if (!driverId || typeof driverId !== 'string') {
      toast.error('Invalid driver information. Please login again.');
      return;
    }

    const form = new FormData();
    form.append('fullName', driver.fullName);
    form.append('phoneNumber', driver.phoneNumber);
    form.append('email', driver.email);
    form.append('cdlLicense', formData.cdlLicense);
    form.append('state', formData.state);
    form.append('drivingExperience', formData.drivingExperience);
    form.append('truckTypes', JSON.stringify(formData.truckTypes));
    form.append('longHaulTrips', JSON.stringify(formData.longHaulTrips));
    form.append('comments', formData.comments);
    form.append('driverId', driverId);
    if (resume) {
      form.append('resume', resume);
    }
    try {
      await submitForm(form).unwrap();
      toast.success('Application submitted successfully!');
      setFormData({
        cdlLicense: '',
        state: '',
        drivingExperience: '',
        truckTypes: {
          reefer: false,
          smallTruck: false,
          carCarrier: false,
          liveStock: false,
          semiTrailer: false,
          tankTruck: false,
        },
        longHaulTrips: false,
        comments: '',
      });
      setResume(null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      let errorMessage = 'Failed to submit application.';
      if (
        error.data &&
        typeof error.data === 'object' &&
        'error' in error.data
      ) {
        errorMessage += ` ${error.data.error}`;
      }
      console.error(error);
      toast.error(errorMessage);
    }
  };

  return (
    <section className='pt-[30px] px-5 max-w-[550px] lg:ps-[100px] lg:pt-[60px]'>
      <Toaster
        position='top-center'
        richColors
        toastOptions={{ className: '!text-base' }}
      />
      <Link
        href={'/driver/dashboard'}
        className='font-poppins mb-4 text-blue-600 flex items-center gap-1'
      >
        <Image
          src='/icons/arrow-right-blue.svg'
          height={10}
          width={12}
          className='rotate-180'
          alt='arrow right icon'
        />
        <span>Return to dashboard</span>
      </Link>

      {profileLoading ? (
        <div className='text-center py-8'>
          <div className='animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600 mx-auto mb-4'></div>
          <p>Loading...</p>
        </div>
      ) : !profile?.knowledgeTestPassed ? (
        <div className='text-center py-8'>
          <h1 className='font-poppins font-bold text-2xl lg:text-4xl text-[#383C3E] mb-4'>
            Knowledge Test Required
          </h1>
          <p className='font-poppins text-[#737B7D] text-sm lg:text-base mb-6'>
            You must pass the driver knowledge test before you can create an application.
          </p>
          <Link
            href='/driver/knowledge-test'
            className='inline-block bg-accent p-4 text-white uppercase tracking-wider font-inter font-medium text-sm cursor-pointer hover:bg-accent/95 active:bg-accent/90 lg:text-base'
          >
            Take Knowledge Test
          </Link>
        </div>
      ) : (
      <form onSubmit={handleSubmit} className='flex flex-col pb-[50px]'>
        <label htmlFor='cdl-license' className='form-label mb-3'>
          CDL License: *
        </label>
        <select
          required
          name='cdlLicense'
          id='cdl-license'
          value={formData.cdlLicense}
          onChange={handleInputChange}
          className='form-label bg-[#EBEBEB] px-3 py-2 rounded mb-6 cursor-pointer'
        >
          <option value='' disabled>
            Select
          </option>
          {CDL_CLASSES.map((cdl) => (
            <option value={cdl.value} key={cdl.value}>
              {cdl.label}
            </option>
          ))}
          <option value='none'>None</option>
        </select>
        <label htmlFor='state' className='form-label mb-3'>
          State *
        </label>
        <select
          required
          name='state'
          id='state'
          value={formData.state}
          onChange={handleInputChange}
          className='form-label bg-[#EBEBEB] px-3 py-2 rounded mb-6 cursor-pointer'
        >
          <option value='' disabled>
            Select
          </option>
          {US_STATES.map((state) => (
            <option value={state} key={state}>
              {state}
            </option>
          ))}
          <option value='none'>None</option>
        </select>
        <label htmlFor='driving-experience' className='form-label mb-3'>
          Driving Experience *
        </label>
        <textarea
          required
          name='drivingExperience'
          id='driving-experience'
          value={formData.drivingExperience}
          onChange={handleInputChange}
          className='border border-[#737B7D] mb-6 rounded p-3'
        ></textarea>
        <label className='form-label mb-3'>Types of Trucks Operated</label>
        <div className='flex items-center gap-2 mb-1'>
          <input
            type='checkbox'
            id='truck-reefer'
            checked={formData.truckTypes.reefer}
            onChange={handleCheckboxChange}
          />
          <label htmlFor='truck-reefer' className='form-label'>
            Reefer
          </label>
        </div>
        <div className='flex items-center gap-2 mb-1'>
          <input
            type='checkbox'
            id='truck-smallTruck'
            checked={formData.truckTypes.smallTruck}
            onChange={handleCheckboxChange}
          />
          <label htmlFor='truck-smallTruck' className='form-label'>
            Small Truck
          </label>
        </div>
        <div className='flex items-center gap-2 mb-1'>
          <input
            type='checkbox'
            id='truck-carCarrier'
            checked={formData.truckTypes.carCarrier}
            onChange={handleCheckboxChange}
          />
          <label htmlFor='truck-carCarrier' className='form-label'>
            Car Carrier
          </label>
        </div>
        <div className='flex items-center gap-2 mb-1'>
          <input
            type='checkbox'
            id='truck-liveStock'
            checked={formData.truckTypes.liveStock}
            onChange={handleCheckboxChange}
          />
          <label htmlFor='truck-liveStock' className='form-label'>
            Live Stock
          </label>
        </div>
        <div className='flex items-center gap-2 mb-1'>
          <input
            type='checkbox'
            id='truck-semiTrailer'
            checked={formData.truckTypes.semiTrailer}
            onChange={handleCheckboxChange}
          />
          <label htmlFor='truck-semiTrailer' className='form-label'>
            Semi-trailer Truck
          </label>
        </div>
        <div className='flex items-center gap-2 mb-6'>
          <input
            type='checkbox'
            id='truck-tankTruck'
            checked={formData.truckTypes.tankTruck}
            onChange={handleCheckboxChange}
          />
          <label htmlFor='truck-tankTruck' className='form-label'>
            Tank Truck
          </label>
        </div>
        <label className='form-label mb-3'>
          Willing to Take Long-Haul Trips
        </label>
        <div className='flex gap-6 mb-6'>
          <div className='flex items-center gap-2'>
            <input
              required
              type='radio'
              name='longHaulTrips'
              id='trips-yes'
              value='yes'
              checked={formData.longHaulTrips === true}
              onChange={handleInputChange}
            />
            <label htmlFor='trips-yes' className='form-label'>
              Yes
            </label>
          </div>
          <div className='flex items-center gap-2'>
            <input
              type='radio'
              name='longHaulTrips'
              id='trips-no'
              value='no'
              checked={formData.longHaulTrips === false}
              onChange={handleInputChange}
            />
            <label htmlFor='trips-no' className='form-label'>
              No
            </label>
          </div>
        </div>
        <textarea
          name='comments'
          id='comments'
          placeholder='Comments / Additional information'
          value={formData.comments}
          onChange={handleInputChange}
          className='form-comments p-3 border border-[#737B7D] rounded mb-6'
        ></textarea>
        {!resume && (
          <label
            htmlFor='resume'
            className='p-[40px] text-center border border-[#8E8E8E] border-dashed cursor-pointer text-[#8E8E8E] text-sm lg:text-base'
          >
            Upload Resume
          </label>
        )}
        {resume && (
          <div className='flex items-center gap-2 mt-2 font-inter'>
            <p className='text-sm'>Selected file: {resume.name}</p>
            <button
              type='button'
              onClick={handleClearFile}
              className='text-accent text-sm underline cursor-pointer'
            >
              Clear
            </button>
          </div>
        )}
        <p className='font-inter text-[#8E8E8E] text-xs mt-3 mb-10 lg:text-sm'>
          Attach file. File size of your documents should not exceed 10MB
        </p>
        <input
          type='file'
          name='resume'
          id='resume'
          hidden
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <button
          type='submit'
          disabled={isLoading}
          className='bg-accent p-4 text-white uppercase tracking-wider font-inter font-medium text-sm cursor-pointer hover:bg-accent/95 active:bg-accent/90 lg:text-base disabled:bg-accent/50 disabled:cursor-not-allowed'
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      )}
    </section>
  );
};

export default Page;
