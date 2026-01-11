const OurFleet = () => {
  return (
    <section
      className='our-fleet pt-[62px] pb-[113px] px-[30px] text-white flex flex-col items-center lg:py-[158px]'
      id='our-fleet'
    >
      <div className='max-w-7xl mx-auto'>
        <h2
          className='font-bold text-3xl text-center uppercase tracking-wide mb-15 before:content-[""] before:me-2 before:bg-accent before:h-0.5 before:w-4 before:inline-block flex items-center justify-center lg:justify-start lg:text-4xl'
          style={{ fontVariantCaps: 'all-small-caps' }}
        >
          Our Fleet
        </h2>
        <p className='font-poppins font-light text-sm text-justify tracking-wider leading-6 max-w-3xl w-full lg:text-lg lg:leading-8'>
          At Spasex Ltd, we operate a robust fleet of over 50 modern trucks,
          including a mix of long-haul tractors and regional delivery vehicles.
          Each truck is equipped with advanced GPS tracking and telematics
          systems, allowing for real-time monitoring of vehicle performance and
          driver behavior.
        </p>
      </div>
    </section>
  );
};

export default OurFleet;
