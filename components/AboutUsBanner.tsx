import Image from 'next/image';

const AboutUsBanner = () => {
  return (
    <section className='about-us-banner py-[46px] text-white uppercase flex flex-col items-center justify-center px-5 text-center gap-5 lg:pt-[130px] lg:pb-[191px] lg:gap-[50px]'>
      <Image
        src='/images/logo-white.png'
        alt='Logo'
        width={65}
        height={45}
        className='lg:w-[160px] lg:h-[96px]'
      />
      <h1
        className='text-4xl font-bold mb-3 lg:text-7xl'
        style={{ fontVariantCaps: 'all-small-caps' }}
      >
        About Us
      </h1>
      <p className='font-poppins font-light lg:text-[20px] lg:tracking-wide'>
        discover our journey, values, and mission
      </p>
    </section>
  );
};

export default AboutUsBanner;
