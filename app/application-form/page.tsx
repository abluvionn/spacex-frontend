'use client';

import { useState } from 'react';
import { useSubmitApplicationFormMutation } from '@/lib/api';

const Page = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    cdlLicense: 'Select',
    state: 'Select',
    drivingExperience: '',
    truckTypes: {
      reefer: false,
      smallTruck: false,
      carCarrier: false,
      liveSock: false,
      semiTrailer: false,
      tankTruck: false,
    },
    longHaulTrips: '',
    comments: '',
  });
  const [resume, setResume] = useState<File | null>(null);
  const [submitForm, { isLoading }] = useSubmitApplicationFormMutation();

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData();
    form.append('fullName', formData.fullName);
    form.append('phoneNumber', formData.phoneNumber);
    form.append('email', formData.email);
    form.append('cdlLicense', formData.cdlLicense);
    form.append('state', formData.state);
    form.append('drivingExperience', formData.drivingExperience);
    form.append('truckTypes', JSON.stringify(formData.truckTypes));
    form.append('longHaulTrips', formData.longHaulTrips);
    form.append('comments', formData.comments);
    if (resume) {
      form.append('resume', resume);
    }
    try {
      await submitForm(form).unwrap();
      alert('Application submitted successfully!');
      setFormData({
        fullName: '',
        phoneNumber: '',
        email: '',
        cdlLicense: 'Select',
        state: 'Select',
        drivingExperience: '',
        truckTypes: {
          reefer: false,
          smallTruck: false,
          carCarrier: false,
          liveSock: false,
          semiTrailer: false,
          tankTruck: false,
        },
        longHaulTrips: '',
        comments: '',
      });
      setResume(null);
    } catch (error) {
      console.error('Failed to submit application:', error);
      alert('Failed to submit application. Please try again.');
    }
  };

  return (
    <section className='pt-[30px] px-5 max-w-[550px] lg:ps-[100px] lg:pt-[60px]'>
      <h1 className='font-poppins font-bold text-2xl lg:text-4xl text-[#383C3E]'>
        Application form
      </h1>
      <p className='font-poppins text-[#737B7D] text-sm lg:text-base mt-4 mb-10'>
        Complete the Form to join our driving team!
      </p>
      <form onSubmit={handleSubmit} className='flex flex-col pb-[50px]'>
        <input
          required
          name='fullName'
          type='text'
          placeholder='Full Name'
          value={formData.fullName}
          onChange={handleInputChange}
          className='pt-3 px-3 border-b border-[#737B7D] form-input mb-6'
        />
        <input
          required
          name='phoneNumber'
          type='tel'
          placeholder='Phone Number'
          value={formData.phoneNumber}
          onChange={handleInputChange}
          className='pt-3 px-3 border-b border-[#737B7D] form-input mb-6'
        />
        <input
          required
          name='email'
          type='email'
          placeholder='email@gmail'
          value={formData.email}
          onChange={handleInputChange}
          className='pt-3 px-3 border-b border-[#737B7D] form-input mb-6'
        />
        <label htmlFor='cdl-license' className='form-label mb-3'>
          CDL License:
        </label>
        <select
          required
          name='cdlLicense'
          id='cdl-license'
          value={formData.cdlLicense}
          onChange={handleInputChange}
          className='form-label bg-[#EBEBEB] px-3 py-2 rounded mb-6 cursor-pointer'
        >
          <option value='Select' disabled>
            Select
          </option>
          <option value='ALS123456'>Class A</option>
          <option value='BTC468706'>Class B</option>
          <option value='CBE795168'>Class C</option>
          <option value='none'>None</option>
        </select>
        <label htmlFor='state' className='form-label mb-3'>
          State
        </label>
        <select
          required
          name='state'
          id='state'
          value={formData.state}
          onChange={handleInputChange}
          className='form-label bg-[#EBEBEB] px-3 py-2 rounded mb-6 cursor-pointer'
        >
          <option value='Select' disabled>
            Select
          </option>
          <option value='texas'>Texas</option>
          <option value='california'>California</option>
          <option value='washington'>Washington</option>
          <option value='none'>None</option>
        </select>
        <label htmlFor='driving-experience' className='form-label mb-3'>
          Driving Experience
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
            id='truck-liveSock'
            checked={formData.truckTypes.liveSock}
            onChange={handleCheckboxChange}
          />
          <label htmlFor='truck-liveSock' className='form-label'>
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
              type='radio'
              name='longHaulTrips'
              id='trips-yes'
              value='yes'
              checked={formData.longHaulTrips === 'yes'}
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
              checked={formData.longHaulTrips === 'no'}
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
        <label
          htmlFor='resume'
          className='p-[40px] text-center border border-[#8E8E8E] border-dashed cursor-pointer text-[#8E8E8E] text-sm lg:text-base'
        >
          Upload Resume
        </label>
        <p className='font-inter text-[#8E8E8E] text-xs mt-3 mb-10 lg:text-sm'>
          Attach file. File size of your documents should not exceed 10MB
        </p>
        <input
          type='file'
          name='resume'
          id='resume'
          hidden
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
    </section>
  );
};

export default Page;
