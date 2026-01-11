const page = () => {
  return (
    <section className='pt-[30px] px-5 max-w-[550px] lg:ps-[100px] lg:pt-[60px]'>
      <h1 className='font-poppins font-bold text-2xl lg:text-4xl text-[#383C3E]'>
        Application form
      </h1>
      <p className='font-poppins text-[#737B7D] text-sm lg:text-base mt-4 mb-10'>
        Complete the Form to join our driving team!
      </p>
      <form action='' className='flex flex-col pb-[50px]'>
        <input
          required
          name='full-name'
          type='text'
          placeholder='Full Name'
          className='pt-3 px-3 border-b border-[#737B7D] form-input mb-6'
        />
        <input
          name='phone-number'
          type='tel'
          placeholder='Phone Number'
          className='pt-3 px-3 border-b border-[#737B7D] form-input mb-6'
        />
        <input
          type='email'
          placeholder='email@gmail'
          className='pt-3 px-3 border-b border-[#737B7D] form-input mb-6'
        />
        <label htmlFor='cdl-license' className='form-label mb-3'>
          CDL License:
        </label>
        <select
          name='cdl-license'
          id='cdl-license'
          defaultValue='Select'
          className='form-label bg-[#EBEBEB] px-3 py-2 rounded mb-6 cursor-pointer'
        >
          <option value='Select' disabled>
            Select
          </option>
          <option value='cdl-a'>Class A</option>
          <option value='cdl-b'>Class B</option>
          <option value='cdl-c'>Class C</option>
          <option value='cdl-none'>None</option>
        </select>
        <label htmlFor='state' className='form-label mb-3'>
          State
        </label>
        <select
          name='state'
          id='state'
          defaultValue='Select'
          className='form-label bg-[#EBEBEB] px-3 py-2 rounded mb-6 cursor-pointer'
        >
          <option value='Select' disabled>
            Select
          </option>
          <option value='state-texas'>Texas</option>
          <option value='state-california'>California</option>
          <option value='state-washington'>Washington</option>
          <option value='state-none'>None</option>
        </select>
        <label htmlFor='driving-experience' className='form-label mb-3'>
          Driving Experience
        </label>
        <textarea
          name='driving-experience'
          id='driving-experience'
          className='border border-[#737B7D] mb-6 rounded'
        ></textarea>
        <label className='form-label mb-3'>Types of Trucks Operated</label>
        <div className='flex items-center gap-2 mb-1'>
          <input type='checkbox' id='truck-reefer' />
          <label htmlFor='truck-reefer' className='form-label'>
            Reefer
          </label>
        </div>
        <div className='flex items-center gap-2 mb-1'>
          <input type='checkbox' id='truck-small-truck' />
          <label htmlFor='truck-small-truck' className='form-label'>
            Small Truck
          </label>
        </div>
        <div className='flex items-center gap-2 mb-1'>
          <input type='checkbox' id='truck-car-carrier' />
          <label htmlFor='truck-car-carrier' className='form-label'>
            Car Carrier
          </label>
        </div>
        <div className='flex items-center gap-2 mb-1'>
          <input type='checkbox' id='truck-live-stock' />
          <label htmlFor='truck-live-stock' className='form-label'>
            Live Stock
          </label>
        </div>
        <div className='flex items-center gap-2 mb-1'>
          <input type='checkbox' id='truck-semi-trailer' />
          <label htmlFor='truck-semi-trailer' className='form-label'>
            Semi-trailer Truck
          </label>
        </div>
        <div className='flex items-center gap-2 mb-6'>
          <input type='checkbox' id='truck-tank' />
          <label htmlFor='truck-tank' className='form-label'>
            Tank Truck
          </label>
        </div>
        <label className='form-label mb-3'>
          Willing to Take Long-Haul Trips
        </label>
        <div className='flex gap-6 mb-6'>
          <div className='flex items-center gap-2'>
            <input type='radio' name='trips' id='trips-yes' />
            <label htmlFor='trips-yes' className='form-label'>
              Yes
            </label>
          </div>
          <div className='flex items-center gap-2'>
            <input type='radio' name='trips' id='trips-no' />
            <label htmlFor='trips-no' className='form-label'>
              No
            </label>
          </div>
        </div>
        <textarea
          name='comments'
          id='comments'
          placeholder='Comments / Additional information'
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
        <input type='file' name='resume' id='resume' hidden />
        <button
          type='submit'
          className='bg-accent p-4 text-white uppercase tracking-wider font-inter font-medium text-sm cursor-pointer hover:bg-accent/95 active:bg-accent/90 lg:text-base'
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default page;
