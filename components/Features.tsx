import Link from 'next/link';

const Features = () => {
  return (
    <section className='flex flex-col lg:flex-row'>
      <div className='feature-banner feature-banner-1 lg:flex-1 lg:hover:flex-2 transition-all duration-200 ease-in-out'>
        <h2 className='feature-banner-title'>solo driver</h2>
        <p className='feature-banner-text hidden'>
          Get on the road faster with our flexible truck leasing
          options—affordable, reliable, and ready when you are
        </p>
        <Link
          href='/driver-opportunities'
          className='btn-base uppercase py-3 px-6 hidden'
        >
          Learn more
        </Link>
      </div>
      <div className='feature-banner feature-banner-2 lg:flex-1 lg:hover:flex-2 transition-all duration-200 ease-in-out'>
        <h2 className='feature-banner-title'>team drivers</h2>
        <p className='feature-banner-text hidden'>
          Get on the road faster with our flexible truck leasing
          options—affordable, reliable, and ready when you are
        </p>
        <Link
          href='/driver-opportunities'
          className='btn-base uppercase py-3 px-6 hidden'
        >
          Learn more
        </Link>
      </div>
      <div className='feature-banner feature-banner-3 lg:flex-1 lg:hover:flex-2 transition-all duration-200 ease-in-out'>
        <h2 className='feature-banner-title'>leasing features</h2>
        <p className='feature-banner-text hidden'>
          Get on the road faster with our flexible truck leasing
          options—affordable, reliable, and ready when you are
        </p>
        <Link
          href='/driver-opportunities'
          className='btn-base uppercase py-3 px-6 hidden'
        >
          Learn more
        </Link>
      </div>
      <div className='feature-banner feature-banner-4 lg:flex-1 lg:hover:flex-2 transition-all duration-200 ease-in-out'>
        <h2 className='feature-banner-title'>owner features</h2>
        <p className='feature-banner-text hidden'>
          Get on the road faster with our flexible truck leasing
          options—affordable, reliable, and ready when you are
        </p>
        <Link
          href='/driver-opportunities'
          className='btn-base uppercase py-3 px-6 hidden'
        >
          Learn more
        </Link>
      </div>
    </section>
  );
};

export default Features;
