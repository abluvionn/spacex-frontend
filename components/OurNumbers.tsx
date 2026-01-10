const OurNumbers = () => {
  return (
    <div className='bg-[#E7EAF1] p-[30px] lg:py-[60px]'>
      <div className='flex flex-col justify-center items-center gap-10 lg:flex-row lg:gap-25'>
        <div className='px-[60px] pt-[10px] pb-[20px] gap-2 rounded-xl bg-[#090A3F] text-white flex flex-col items-center lg:px-[80px]'>
          <span
            className='font-poppins font-bold text-5xl uppercase lg:text-7xl'
            style={{ fontVariantCaps: 'all-small-caps' }}
          >
            50
          </span>
          <div className='w-[110px] lg:w-[140px] h-0.5 bg-white'></div>
          <span className='font-poppins font-medium text-center lg:text-xl'>
            Trucks in Use
          </span>
        </div>
        <div className='px-[60px] pt-[10px] pb-[20px] gap-2 rounded-xl bg-[#090A3F] text-white flex flex-col items-center lg:px-[80px]'>
          <span
            className='font-poppins font-bold text-5xl uppercase lg:text-7xl'
            style={{ fontVariantCaps: 'all-small-caps' }}
          >
            1654
          </span>
          <div className='w-[110px] lg:w-[140px] h-0.5 bg-white'></div>
          <span className='font-poppins font-medium text-center lg:text-xl'>
            Satisfied Clients
          </span>
        </div>
      </div>
    </div>
  );
};

export default OurNumbers;
