import Image from 'next/image';

const OurCoverage = () => {
  return (
    <section
      className='pt-[30px] pb-[40px] px-[30px] lg:pt-[100px] lg:pb-[200px]'
      id='our-coverage'
    >
      <div className='max-w-6xl mx-auto'>
        <h2
          className='font-bold text-[28px] lg:text-4xl uppercase before:content-[""] before:me-2 before:bg-accent before:h-0.5 before:w-3 before:inline-block flex items-center justify-start lg:before:w-5'
          style={{ fontVariantCaps: 'all-small-caps' }}
        >
          Our Coverage
        </h2>
        <p className='text-sm lg:text-lg mt-7 lg:mt-10 font-inter font-light text-justify'>
          With routes spanning over 70% of U.S. states, we ensure fast, reliable
          deliveries across major regions. Whether it’s coast-to-coast or
          regional freight, our growing network keeps your business moving with
          efficiency and care. We’re constantly expanding—so wherever you need
          us, we’re getting closer
        </p>
        <Image
          src='/images/our-coverage.png'
          alt='us map'
          width={306}
          height={220}
          className='mx-auto mt-10 lg:mt-15 lg:w-[821px] lg:h-[589px]'
        />
      </div>
    </section>
  );
};

export default OurCoverage;
