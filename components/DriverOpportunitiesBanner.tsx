import Image from 'next/image';
import Link from 'next/link';

const DriverOpportunitiesBanner = () => {
  return (
    <section className='driver-opportunities-banner text-white text-center py-[47px] lg:pt-[70px] lg:pb-[115px] px-2'>
      <Image
        src='/images/logo-white.png'
        alt='truck background'
        height={45}
        width={75}
        className='mx-auto lg:h-[96px] lg:w-[160px]'
      />
      <h1
        className='text-3xl font-bold uppercase my-5 lg:my-[40px] lg:text-[54px] lg:max-w-[610px] mx-auto'
        style={{ fontVariantCaps: 'all-small-caps' }}
      >
        driver opportunities at spacex
      </h1>
      <p className='font-poppins font-light text-xs leading-5 max-w-[310px] mx-auto mb-[60px] tracking-wider lg:text-[20px] lg:max-w-[540px] leading-7 lg:mb-[80px]'>
        At our trucking company, we value our drivers and logistics team as the
        backbone of our success. That’s why we offer a comprehensive benefits
        package designed to support your well-being on and off the road.
      </p>
      <div className='flex flex-wrap gap-[10px] lg:gap-[30px] items-center justify-center'>
        <Link
          href='#contacts'
          className='btn-base px-6 py-4 uppercase text-xs lg:text-xl lg:px-9 lg:py-6'
        >
          Contact Us
        </Link>
        <Link
          href='/application-form'
          className='font-poppins text-black bg-white rounded-md px-6 py-[14px] uppercase text-xs font-semibold hover:bg-white/90 active:bg-white/80 transition lg:text-xl lg:px-9 lg:py-6'
        >
          Full Application
        </Link>
      </div>
    </section>
  );
};

export default DriverOpportunitiesBanner;
