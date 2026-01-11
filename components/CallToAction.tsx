import Link from 'next/link';

const CallToAction = () => {
  return (
    <section className='bg-[#E7EAF1] px-3 text-center pt-[48px] lg:pt-[89px] pb-[40px] lg:pb-[73px]'>
      <h2 className='font-poppins text-sm lg:text-xl lg:tracking-wide mb-[27px] lg:mb-[43px]'>
        Interested in joining SpaceX? Click join to get started.
      </h2>
      <Link
        href='/application-form'
        className='btn-base uppercase rounded lg:rounded-[10px] py-3 px-6 lg:py-5 lg:px-11 lg:font-bold text-sm lg:text-xl inline-block'
      >
        join
      </Link>
    </section>
  );
};

export default CallToAction;
