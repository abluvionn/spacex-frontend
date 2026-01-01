import Link from 'next/link';

const OurMission = () => {
  return (
    <section className='flex flex-col lg:flex-row lg:items-center lg:justify-between'>
      <div className='px-5 py-11 lg:ps-10 2xl:ps-[120px] lg:pe-12 lg:max-w-[534px] box-content'>
        <span
          className='uppercase text-sm before:content-[""] before:me-2 before:bg-accent before:h-0.5 before:w-3 before:inline-block flex items-center lg:before:h-0.5 lg:before:w-5 lg:text-lg lg:before:me-3'
          style={{ fontVariantCaps: 'all-small-caps' }}
        >
          spacex
        </span>
        <h2
          className='font-bold text-2xl uppercase leading-7 my-[26px] lg:text-[45px] lg:leading-12 lg:my-5'
          style={{ fontVariantCaps: 'all-small-caps' }}
        >
          Drive Your Future with Us Today!
        </h2>
        <p className='font-poppins font-light text-sm text-light-gray mb-10 text-justify leading-6 lg:text-[25px] lg:leading-10 lg:text-dark-gray tracking-wide lg:mb-[100px]'>
          At Spasex Ltd, our mission is to deliver safe, reliable, and efficient
          transportation solutions across the United States.
        </p>
        <div className='flex flex-wrap gap-3'>
          <Link href='#' className='btn-base py-3 px-6 uppercase text-xs lg:text-[20px] lg:py-4 lg:px-9 lg:rounded-lg'>
            Join
          </Link>
          <Link href='#' className='btn-outline py-3 px-5 uppercase text-xs lg:text-[20px] lg:py-4 lg:px-8 lg:rounded-lg'>
            Learn More
          </Link>
        </div>
      </div>
      <div className='our-mission-image relative w-full h-44 lg:h-[752px] lg:max-w-[645px] rounded-tl-[20px] rounded-tr-[20px] lg:rounded-tl-[40px] lg:rounded-bl-[40px] lg:rounded-tr-none'></div>
    </section>
  );
};

export default OurMission;
