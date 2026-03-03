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
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6044.667237344281!2d-73.9828925589817!3d40.75468647424072!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259003c32025f%3A0x3640f353d26bbd07!2s500%20Fifth%20Avenue%2C%20500%205th%20Ave%20Suite%20400%2C%20New%20York%2C%20NY%2010110%2C%20USA!5e0!3m2!1sen!2skg!4v1772526807265!5m2!1sen!2skg'
          className='mx-auto mt-10 lg:mt-15 w-full h-[250px] lg:h-[600px] rounded-xl'
          allowFullScreen={true}
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
        ></iframe>
      </div>
    </section>
  );
};

export default OurCoverage;
