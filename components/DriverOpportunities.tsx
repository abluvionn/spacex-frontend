import Image from 'next/image';
import Link from 'next/link';

const DriverOpportunities = () => {
  return (
    <section className='max-w-6xl mx-auto'>
      <div className='py-8 px-[22px] text-center lg:text-end'>
        <h2
          className='text-[22px] font-bold uppercase lg:text-4xl'
          style={{ fontVariantCaps: 'all-small-caps' }}
        >
          Driver opportunities at <span className='text-accent'>spacex</span>
        </h2>
        <p className='font-poppins font-light text-dark-gray text-sm my-5 lg:my-7 lg:text-base'>
          Discover more about work conditions and benefits for our drivers
        </p>
        <Link
          href='/driver-opportunities'
          className='py-3 px-6 bg-primary text-white uppercase font-poppins font-semibold text-sm rounded inline-block hover:bg-primary/90 active:bg-primary/80 transition'
        >
          learn more
        </Link>
      </div>
      <div className='h-[256px] flex lg:h-[402px]'>
        <div className='relative flex-1 max-w-[184px] lg:max-w-[402px]'>
          <div>
            <div className='absolute w-full h-full bg-[#090A3F73] z-20 rounded-r-2xl lg:rounded-none'></div>
          </div>
          <Image
            src='/images/driver-opportunities-1.jpg'
            fill
            alt='man in the truck'
            className='rounded-r-2xl object-cover lg:rounded-none'
          />
        </div>
        <div className='flex-1 flex flex-col justify-center items-center'>
          <Link
            href='/driver-opportunities#job-benefits'
            className='font-poppins text-sm py-4 w-full text-center border-t border-[#D6D6D6] hover:text-accent transition lg:text-base'
          >
            Job Benefits
          </Link>
          <Link
            href='/driver-opportunities#work-conditions'
            className='font-poppins text-sm py-4 w-full text-center border-t border-[#D6D6D6] hover:text-accent transition lg:text-base'
          >
            Work Conditions
          </Link>
          <Link
            href='/driver-opportunities#faq'
            className='font-poppins text-sm py-4 w-full text-center border-t border-b border-[#D6D6D6] hover:text-accent transition lg:text-base'
          >
            FAQ
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DriverOpportunities;
