import Link from 'next/link';
import AboutUsCard from './AboutUsCard';
import Image from 'next/image';

const AboutUs = () => {
  return (
    <section className='bg-[#E7EAF1] flex flex-col items-center px-10 pt-7 pb-5 gap-8'>
      <div className='flex flex-col lg:flex-row gap-5'>
        <AboutUsCard
          title='Why drive with Us?'
          description='With a modern, reliable fleet and expertly planned routes, we deliver your goods safely and on time'
          href='#'
          img='/images/about-us-card-1.jpg'
        />
        <AboutUsCard
          title='Our Fleet'
          description='Our fleet features modern, well-maintained trucks equipped for efficiency, safety, and reliability—ready for any haul, big or small'
          href='#'
          img='/images/about-us-card-2.jpg'
        />
        <AboutUsCard
          title='Our routes on Map'
          description='From local deliveries to cross-country hauls, our interactive map shows the routes we cover to keep your business moving'
          href='#'
          img='/images/about-us-card-3.jpg'
        />
      </div>
      <Link
        href='#'
        className='py-3 ps-4 pe-5 bg-primary text-white uppercase text-sm font-medium font-poppins rounded-full flex items-center gap-[10px] hover:bg-primary/90 active:bg-primary/80 transition'
      >
        <span>More About Us</span>
        <Image
          src='/icons/arrow-right-white.svg'
          alt='arrow right icon'
          width={14}
          height={12}
        />
      </Link>
    </section>
  );
};

export default AboutUs;
